<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0" v-html="userName">
              
            </p>
            <span class="user-status" v-html="storeName"></span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            :src="require('@/assets/images/avatars/19.png')"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item link-class="d-flex align-items-center" @click="handleEditPassword">
          <feather-icon
            size="16"
            icon="EditIcon"
            class="mr-50"
          />
          <span>Edit Password</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item link-class="d-flex align-items-center"  @click="handleLogout">
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

    <edit-password/>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
import {getUserData, getHomeRouteForLoggedInUser} from '@/auth/utils'
import useJwt from '@/auth/jwt/useJwt'
import axiosIns from '@/libs/axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import EditPassword from './EditPassword.vue'
export default {
  data(){
    return {
      userName:getUserData().name,
      storeName:'',
      storeId:''

    }
  },
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,

    // Navbar Components
    DarkToggler,

    EditPassword
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  methods:{
    handleEditPassword() {
      this.$root.$emit("bv::show::modal", "modal-edit-password", "#btnShow");
    },
    handleLogout(){
      //Request server to void the token
      axiosIns.get('/api/auth/logout')
      localStorage.clear()
      //Reqired to login page
      //Show the success message
      this.$router.replace('/login')
          .then(()=>{
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Success`,
                icon: 'CoffeeIcon',
                variant: 'success',
                text: `你已成功登出!`,
              },
            })
            
          })
      
    }
  },mounted(){
      if(!getUserData()){
        this.$router.replace('/login')
          .then(()=>{
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Success`,
                icon: 'CoffeeIcon',
                variant: 'success',
                text: `You have successfully logged out!`,
              },
            })
            
          })
      }
  }
}
</script>
