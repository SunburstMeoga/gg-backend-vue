<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="userData === undefined">
      <h4 class="alert-heading">Error fetching user data</h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link class="alert-link" :to="{ name: 'users-list' }">
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <b-tabs v-if="userData" pills>
      <!-- Tab: Information -->
      <b-tab active>
        <template #title>
          <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">Staff Information</span>
        </template>
        <user-edit-tab-information
          :user-data="userData"
          @refetch-data="refetchData"
          class="mt-2 pt-75"
        />
      </b-tab>

      <!-- Tab: Account -->
      <b-tab v-if="userData.id > 0">
        <template #title>
          <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
          <span class="d-none d-sm-inline">Permission</span>
        </template>
        <user-edit-tab-account :user-data="userData" class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import { BTab, BTabs, BCard, BAlert, BLink } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import router from "@/router";
import store from "@/store";
import userStoreModule from "../userStoreModule";
import UserEditTabAccount from "./UserEditTabAccount.vue";
import UserEditTabInformation from "./UserEditTabInformation.vue";

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    UserEditTabAccount,
    UserEditTabInformation,
  },
  setup() {
    const userData = ref(null);

    const USER_APP_STORE_MODULE_NAME = "app-user";

    const user = {
      id : 0,
      is_active:true
    }


    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    const refetchData = () => {
      if(router.currentRoute.name == 'users-create') {
          userData.value = user
      }else{
        store
        .dispatch("app-user/fetchUser", { id: router.currentRoute.params.id })
        .then((response) => {
          userData.value = response.data.user;
          userData.value.is_active = (userData.value.is_active == 1)?true:false
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            userData.value = undefined;
          }else{
            console.log('Fail to refetchData', error)
          }
        });
      }

    };

    refetchData()

    return {
      userData,
      refetchData,
    };
  },
};
</script>

<style></style>
