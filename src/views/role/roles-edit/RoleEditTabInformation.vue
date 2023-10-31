<template>
    <div>
        <!-- User Info: Input Fields -->
        <b-form>
            <b-row>
                <b-col cols="12" md="12">
                    <div class="d-flex mb-1">
                        <feather-icon icon="UserIcon" size="19" />
                        <h4 class="mb-0 ml-50">Role of {{roleData.name}}</h4>
                    </div>
                    <b-form-group label="Role Name" label-for="name">
                          <b-form-input
                            id="name"
                            v-model="roleData.name"
                            autofocus
                            trim
                            placeholder="Role Name"
                           />                         
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <!-- Role Permission -->
        <b-card no-body class="border mt-1">
            <b-card-header class="p-1">
                <b-card-title class="font-medium-2">
                    <feather-icon icon="LockIcon" size="18" />
                    <span class="align-middle ml-50">Role Permission</span>
                </b-card-title>
            </b-card-header>
            <b-table striped responsive class="mb-0" :items="permissionData">
                <template #cell(module)="data">
                      {{ data.value }}
</template>

<template #cell()="data">
    <b-form-checkbox v-model="rolePermission" :value="data.item.module+'.'+data.field.key" :checked="data.value" />
</template>
      </b-table>
    </b-card>
    <!-- Action Buttons -->
    <b-button
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="handleSubmit"
    >
      Save Changes
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="handleReset"
    >
      Reset
    </b-button>
  </div>
</template>

<script>
import {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import vSelect from "vue-select";
import { ref, onMounted, watch } from "@vue/composition-api";
import useRolesList from "../roles-list/useRolesList";
import store from "@/store";

export default {
    components: {
        BButton,
        BMedia,
        BAvatar,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BForm,
        BTable,
        BCard,
        BCardHeader,
        BCardTitle,
        BFormCheckbox,
        vSelect,
    },
    props: {
        roleData: {
            type: Object,
            required: true,
        },
        permissionData: {
            type: Array,
            required: true
        },
    },
    methods: {
        handleSubmit() {
            const data = {
                id: this.roleData.id,
                name: this.roleData.name,
                permission: this.rolePermission,
            }

            this.$swal({
                title: 'Are you sure?',
                showCancelButton: true,
                confirmButtonText: 'Save Changes',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1',
                },
                buttonsStyling: false,
            }).then(result => {
                if (result.value) {
                    store.dispatch("app-role/updateRole", data)
                        .then((response) => {
                            this.$swal({
                                text: response.data.message,
                                icon: 'success',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                showClass: {
                                    popup: 'animate__animated animate__bounceIn',
                                },
                                buttonsStyling: false,
                            })
                            this.$emit('refetch-data')
                        }).catch((error) => {
                            this.$swal({
                                text: JSON.stringify(error.response.data.message),
                                icon: 'error',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                showClass: {
                                    popup: 'animate__animated animate__bounceIn',
                                },
                                buttonsStyling: false,
                            })
                        })
                }
            })

        },
        handleReset() {
            this.updateRolePermission()
        }
    },
    setup(props) {

        const rolePermission = ref([])

        const updateRolePermission = () => {
            rolePermission.value = []
            props.permissionData.forEach(rp => {
                if (rp.admin) rolePermission.value.push(rp.module + '.admin')
                if (rp.create) rolePermission.value.push(rp.module + '.create')
                if (rp.read) rolePermission.value.push(rp.module + '.read')
                if (rp.update) rolePermission.value.push(rp.module + '.update')
                if (rp.delete) rolePermission.value.push(rp.module + '.delete')
            })
        }

        onMounted(() => {
            updateRolePermission()
        })

        return {
            rolePermission,
            updateRolePermission
        }

    },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>