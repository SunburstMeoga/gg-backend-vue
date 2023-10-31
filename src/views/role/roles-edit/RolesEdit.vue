<template>
    <component :is="roleData === undefined ? 'div' : 'b-card'">
      <!-- Alert: No item found -->
      <b-alert variant="danger" :show="roleData === undefined">
        <h4 class="alert-heading">Error fetching role data</h4>
        <div class="alert-body">
          No user found with this role id. Check
          <b-link class="alert-link" :to="{ name: 'roles-list' }">
            Role List
          </b-link>
          for other roles.
          
        </div>
      </b-alert>
  
      <b-tabs v-if="roleData" pills>
        <!-- Tab: Information -->
        <b-tab active>
          <template #title>
            <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Role Information</span>
          </template>
          
          <role-edit-tab-information :role-data="roleData" :permission-data="permissionData" @refetch-data="refetchData" class="mt-2 pt-75" />
          
        </b-tab>
      </b-tabs>
    </component>
  </template>
  
  <script>
  import { BTab, BTabs, BCard, BAlert, BLink } from "bootstrap-vue";
  import { ref, onUnmounted } from "@vue/composition-api";
  import router from "@/router";
  import store from "@/store";
  import roleStoreModule from "../roleStoreModule";
  import RoleEditTabInformation from "./RoleEditTabInformation.vue";
  
  export default {
    components: {
      BTab,
      BTabs,
      BCard,
      BAlert,
      BLink,
      RoleEditTabInformation,
    },
    setup() {
      const roleData = ref(null);
  
      const permissionData = ref(null);
  
      const APP_ROLE_STORE_MODULE_NAME = "app-role";
  
      const user = {
        id : 0
      }
  
  
      // Register module
      if (!store.hasModule(APP_ROLE_STORE_MODULE_NAME))
        store.registerModule(APP_ROLE_STORE_MODULE_NAME, roleStoreModule);
  
      // UnRegister on leave
      onUnmounted(() => {
        if (store.hasModule(APP_ROLE_STORE_MODULE_NAME))
          store.unregisterModule(APP_ROLE_STORE_MODULE_NAME);
      });
  
      const refetchData = () => {
   
          store
          .dispatch("app-role/fetchRole", { id: router.currentRoute.params.id })
          .then((response) => {
            roleData.value = response.data.role;
            permissionData.value = response.data.permissions;
          })
          .catch((error) => {
            if (error.response.status === 404) {
              userData.value = undefined;
            }
          });
        
  
      };
  
      refetchData()
  
      return {
        roleData,
        permissionData,
        refetchData,
      };
    },
  };
  </script>
  
  <style></style>