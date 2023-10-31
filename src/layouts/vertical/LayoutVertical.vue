<template>
  <layout-vertical>

    <router-view />

    <template #navbar="{ toggleVerticalMenuActive }">
      <navbar :toggle-vertical-menu-active="toggleVerticalMenuActive" />
    </template>

    <!-- <app-customizer
      v-if="showCustomizer"
      slot="customizer"
    /> -->
      <div
      slot="vertical-menu-header"
      class="d-flex align-items-center h-100"
    >
      <div class="nav_div">
      <!--
      <div class="nav_logo">
        <img :src="appLogoImage" style="height:35px;">
      </div>
      -->
      <div class="nav_brand">
      <h1 class="font-medium-5 mb-0 text-primary" id="menu_title">
        <img class="menu-logo" src="~@/assets/images/logo/logo.png"><span class="ml-1" >GUANGONG</span>
      </h1>
      </div>
      </div>
    </div>

    <div slot="footer">
      <p class="mb-0">
        &copy; {{footer}} {{ new Date().getFullYear() }}
      </p>
    </div>
  </layout-vertical>
</template>

<script>
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'
// import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
// import { $themeConfig } from '@themeConfig'
import Navbar from '../components/Navbar.vue'
import { $themeConfig } from '@themeConfig'


export default {
  components: {
    // AppCustomizer,
    LayoutVertical,
    Navbar,
  },
  data() {
    return {
      // showCustomizer: $themeConfig.layout.customizer,
      appName : $themeConfig.app.appName,
      appLogoImage : $themeConfig.app.appLogoImage,
      footer : $themeConfig.app.footer,
    }
  },
}
</script>

<style lang="scss">

#menu_title{
  font-size:1.3rem !important;
}
.nav_div{
  display:flex;
}
.nav_brand{
  margin-left:10px;
  margin-top:3px;
 
}


</style>
