<template>
  <div>
    <!-- User Info: Input Fields -->
    <b-form>
      <b-row>
        <!-- Field: Role -->

        <b-col cols="12" md="12">
          <div class="d-flex mb-1">
            <feather-icon icon="UserIcon" size="19" />
            <h4 class="mb-0 ml-50">User Role of {{userData.name_en}}</h4>
          </div>
          <b-form-group label-for="user-role">
            <v-select
              v-model="userData.roles"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="roleOptions"
              :clearable="false"
              label="name"
              @change="fetchRole"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <!-- PERMISSION TABLE -->
    <b-card no-body class="border mt-1">
      <b-card-header class="p-1">
        <b-card-title class="font-medium-2">
          <feather-icon icon="LockIcon" size="18" />
          <span class="align-middle ml-50">Permission</span>
        </b-card-title>
      </b-card-header>
      <b-table
        striped
        responsive
        class="mb-0"
        :items="userData.directPermission"
      >
        <template #cell(module)="data">
          {{ data.value }}
        </template>
        <template #cell()="data">
          <b-form-checkbox  v-model="directPermission" :value="data.item.module+'.'+data.field.key" :checked="data.value" />
        </template>
      </b-table>
    </b-card>

    <!-- Role Permission -->
    <b-card no-body class="border mt-1">
      <b-card-header class="p-1">
        <b-card-title class="font-medium-2">
          <feather-icon icon="LockIcon" size="18" />
          <span class="align-middle ml-50">Role Permission</span>
        </b-card-title>
      </b-card-header>
      <b-table
        striped
        responsive
        class="mb-0"
        :items="userData.rolesPermission"
      >
        <template #cell(module)="data">
          {{ data.value }}
        </template>
        <template #cell()="data">
          <b-form-checkbox :checked="data.value" disabled />
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
    <b-button
      v-ripple.400="'rgba(186, 191, 199, 0.15)'"
      type="button"
      variant="outline-secondary"
      @click="hide"
      class="ml-1"
    >
      Cancel
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
import useUsersList from "../users-list/useUsersList";
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
    userData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    hide() {
        this.$router.replace('/users/list')
    },
    handleReset() {
      console.log(this.directPermission)
      
    },
    handleSubmit() {
      var name = this.userData.roles.name
      if(!name) name = this.userData.roles[0].name
      const data = {
        id: this.userData.id,
        directPermission: this.directPermission,
        name,
      }
      console.log(data)

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
          store.dispatch("app-user/setUserRole", data)
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
  },
  setup(props) {
    const { resolveUserRoleVariant } = useUsersList();

    const roleOptions = ref([]);

    const directPermission = ref([])

    const fetchRoleOptions = () => {
      store
        .dispatch("app-user/fetchRoles")
        .then((response) => {
          roleOptions.value = response.data.roles;
        })
        .catch((error) => {
          if (error.response.status === 404) {
            teamOptions.value = undefined;
          }
        });
    };

    const fetchRole = () => {

      var name = props.userData.roles.name
      if(!name){
        name = props.userData.roles[0].name
      }

      store.dispatch("app-user/fetchRole", {name})
      .then((response) => {
        props.userData.rolesPermission = response.data.permissions
      })
      .catch((error) => {
        if(error.response.status === 404) {
          props.userData.rolesPermission = undefined
        }
      })
    }

    const updateDirectPermission = () => {
        props.userData.directPermission.forEach(dp => {
            if(dp.admin) directPermission.value.push(dp.module+'.admin')
            if(dp.create) directPermission.value.push(dp.module+'.create')
            if(dp.read) directPermission.value.push(dp.module+'.read')
            if(dp.update) directPermission.value.push(dp.module+'.update')
            if(dp.delete) directPermission.value.push(dp.module+'.delete')
        })
    }

    onMounted(() => {
      fetchRoleOptions()
      fetchRole()
      updateDirectPermission() 
    });

    watch(() => props.userData.roles, (selection, prevSelection) => {
      fetchRole()
    })

    return {
      resolveUserRoleVariant,
      avatarText,
      roleOptions,
      fetchRole,
      directPermission
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
