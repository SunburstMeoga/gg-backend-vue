<template>
    <b-sidebar id="add-new-role-sidebar" 
    :visible="isAddNewRoleSidebarActive" 
    bg-variant="white" sidebar-class="sidebar-lg" 
    shadow 
    backdrop 
    no-header 
    right 
    @hidden="resetForm" 
    @change="(val) => $emit('update:is-add-new-role-sidebar-active', val)"
    >
        <template #default="{ hide }">
                  <!-- Header -->
                  <div
                    class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
                  >
                    <h5 class="mb-0">{{button_text}} New Role</h5>
            
                    <feather-icon
                      class="ml-1 cursor-pointer"
                      icon="XIcon"
                      size="16"
                      @click="hide"
                    />
                  </div>
            
                  <!-- Body -->
                  <validation-observer 
                    #default="{ handleSubmit }"
                    ref="refFormObserver"
                  >
                  <b-overlay
                        :show = 'loading'
                        spinner-variant="primary"
                        spinner-type="grow"
                        spinner-small
                        rounded="sm"
                        >
                    <!-- Form -->
                    <b-form
                      class="p-2"
                      @submit.prevent="handleSubmit(onSubmit)"
                      @reset.prevent="resetForm"
                    >
                      <!-- Name -->
                      <validation-provider
                        #default="validationContext"
                        name="Role Name"
                        rules="required"
                      >
                        <b-form-group label="Role Name" label-for="name">
                          <b-form-input
                            id="name"
                            v-model="roleData.name"
                            autofocus
                            :state="getValidationState(validationContext)"
                            trim
                            placeholder="Role Name"
                           />
                            <b-form-invalid-feedback>
                              {{ validationContext.errors[0] }}
                            </b-form-invalid-feedback>
                         
                        </b-form-group>
                      </validation-provider>
                      <!-- Form Actions -->
                      
                      <div class="d-flex mt-2">
                        <b-button
                          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                          variant="primary"
                          class="mr-2"
                          type="submit"
                        >
                          {{button_text}}
                        </b-button>
                        <b-button
                          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                          type="button"
                          variant="outline-secondary"
                          @click="hide"
                        >
                          Cancel
                        </b-button>
                      </div>
                      
                    </b-form>
                    </b-overlay>
                  </validation-observer>
</template>
  </b-sidebar>
</template>

<script>
import {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    BFormTextarea,
    BFormCheckbox,
    BOverlay,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref, watch } from "@vue/composition-api";
import { required, alphaNum, email } from "@validations";
import { max } from "@/libs/validations.js"
import formValidation from "@core/comp-functions/forms/form-validation";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import store from "@/store";
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
    components: {
        BSidebar,
        BForm,
        BFormGroup,
        BFormInput,
        BFormInvalidFeedback,
        BButton,
        BFormTextarea,
        BFormCheckbox,
        vSelect,
        BOverlay,

        // Form Validation
        ValidationProvider,
        ValidationObserver,
    },
    directives: {
        Ripple,
    },
    model: {
        prop: 'isAddNewRoleSidebarActive',
        event: 'update:is-add-new-role-sidebar-active',
    },
    props: {
        isAddNewRoleSidebarActive: {
            type: Boolean,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            required,
            alphaNum,
            email,
            max,
        }
    },
    setup(props, { emit }) {

        const loading = ref(false)

        const blankRoleData = {
            id: 0,
            name: '',
        }
        const button_text = ref('Add')

        const roleData = ref(JSON.parse(JSON.stringify(blankRoleData)))

        const resetroleData = () => {
            roleData.value = JSON.parse(JSON.stringify(blankRoleData))
        }

        const toast = useToast()

        watch(() => [props.id, props.isAddNewRoleSidebarActive], () => {
            if (props.id > 0 && props.isAddNewRoleSidebarActive) {
                roleData.value.id = props.data.id
                roleData.value.name = props.data.name
                if (roleData.value.id > 0) {
                    button_text.value = 'Edit'
                } else {
                    button_text.value = 'Add'
                }
            } else {
                button_text.value = 'Add'
            }


        })

        const onSubmit = () => {
            loading.value = true
            store.dispatch("app-role/addRole", roleData.value)
                .then((response) => {
                    loading.value = false
                    emit("update:is-add-new-role-sidebar-active", false);
                    emit('refetch-data')
                    toast({
                        component: ToastificationContent,
                        props: {
                            title: 'Success',
                            text: response.data.message,
                            icon: 'CheckIcon',
                            variant: 'success'
                        }
                    })
                })
                .catch((error) => {
                    loading.value = false
                    toast({
                        component: ToastificationContent,
                        props: {
                            title: 'Fail',
                            text: error.response.data.message,
                            icon: 'HeartIcon',
                            variant: 'danger'
                        }
                    })
                })
        };

        const {
            refFormObserver,
            getValidationState,
            resetForm,
        } = formValidation(resetroleData)

        return {
            roleData,
            onSubmit,
            refFormObserver,
            getValidationState,
            resetForm,
            button_text,
            loading,
        };


    }

};
</script>

</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
#add-new-role-sidebar {
    .vs__dropdown-menu {
        max-height: 200px !important;
    }
}
</style>