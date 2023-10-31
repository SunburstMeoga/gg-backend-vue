<template>
    <div class="auth-wrapper auth-v2">
      <b-row class="auth-inner m-0">
  
        <!-- Brand logo-->
        <b-link class="brand-logo">
          <!-- <vuexy-logo /> -->
           <img class="d-lg-none" src="~@/assets/images/logo/logo-dark.png">
           <img class="d-none d-lg-block" src="~@/assets/images/logo/logo.png">
        </b-link>
        <!-- /Brand logo-->
  
        <!-- Left Text-->
        <b-col
          lg="6"
          class="d-none d-lg-flex align-items-center bg-login-image"
        >
          <div class="bg-login-image__effect__wrapper">
            <img src="~@/assets/images/pages/login-bg2.png"  class="bg-login-image__effect">
          </div>
          <!-- <div class="w-100 d-lg-flex align-items-center justify-content-center px-5" style="z-index:2">
            <b-img
              fluid
              class="left-image"
              :src="imgUrl"
              alt="Login V2"
            />
          </div> -->
        </b-col>
        <!-- /Left Text-->
  
        <!-- Forgot password-->
        <b-col
          lg="6"
          class="d-flex align-items-center px-2 p-lg-5"
        >
          <b-col
            sm="8"
            md="6"
            lg="7"
            class="px-xl-2 mx-auto"
          >
            <b-card-title
              title-tag="h2"
              class="font-weight-bold mb-1"
            >
              忘記密碼？
            </b-card-title>
            <b-card-text class="mb-2">
              請輸入您的電郵並按下發送驗證碼按鈕，我們將向您發送驗證碼
            </b-card-text>
  
            <!-- form -->
  
            <validation-observer ref="simpleRules">
  
              <b-overlay
                :show="loading"
                spinner-variant="primary"
                spinner-type="grow"
                spinner-small
                rounded="sm"
              >
                <b-form
                  class="auth-form mt-3"
                  @submit.prevent="resetPasswordForm"
                >
                    <b-form-group class="required">
                      <label>電郵</label>
                      <validation-provider
                              #default="{ errors }"
                              name="電郵："
                              rules="required|email"
                            >
                          <b-input-group>
                              <b-form-input
                                id="forgot-password-email"
                                v-model="resetData.email"
                                :state="errors.length > 0 ? false:null"
                                name="forgot-password-email"
                                placeholder="輸入電郵"
                              />
                            <b-input-group-append is-text>
                              <b-button
                                variant="primary"
                                class="p-50"
                                @click="sendVertificationCode"
                              >
                                發送驗證碼
                              </b-button>
                            </b-input-group-append>
                          </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
  
                      <validation-provider
                        #default="{ errors }"
                        name="密碼"
                        vid="password"
                        rules="required"
                      >
                        <b-form-group class="required mt-1" label="密碼：">
                          <b-form-input
                            id="password"
                            type="password"
                            placeholder="輸入密碼"
                            v-model="resetData.password"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
  
                      <validation-provider
                        #default="{ errors }"
                        name="確認密碼"
                        vid="c_password"
                        rules="required"
                      >
                        <b-form-group class="required" label="確認密碼：">
                          <b-form-input
                            id="c_password"
                            type="password"
                            placeholder="輸入確認密碼"
                            v-model="resetData.c_password"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                      <validation-provider
                        #default="{ errors }"
                        name="驗證碼"
                        vid="vaildate"
                        rules="required"
                      >
                        <b-form-group class="required" label="驗證碼：">
                          <b-form-input
                            id="vaildate"
                            placeholder="輸入驗證碼"
                            v-model="resetData.vertification_code"
                            :state="errors.length > 0 ? false : null"
                          />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </validation-provider>
                    </b-form-group>
                    <div>
                      <b-button
                        type="submit"
                        variant="primary"
                        block
                        class=""
                      >
                        提交
                      </b-button>
                    </div>
                  
                </b-form>
              </b-overlay>
            </validation-observer>
  
            <p class="text-center mt-3">
              <b-link :to="{name:'auth-login-v2'}">
                <feather-icon icon="ArrowLeftIcon" /> 返回登入頁
              </b-link>
            </p>
          </b-col>
        </b-col>
        <!-- /Forgot password-->
      </b-row>
    </div>
  </template>
  
  <script>
  /* eslint-disable global-require */
  import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
  import zh_CN from 'vee-validate/dist/locale/zh_CN.json';
  localize('zh_cn',zh_CN)
  import VuexyLogo from '@core/layouts/components/Logo.vue'
  import {
    BRow, BCol, BLink, BOverlay, BCardTitle, BCardText, BImg, BForm, BFormGroup, BFormInput, BButton, BInputGroup, BInputGroupAppend,
  } from 'bootstrap-vue'
  import { required, email } from '@validations'
  import axiosIns from "@/libs/axios";
  
  
  export default {
    components: {
      VuexyLogo,
      BRow,
      BCol,
      BLink,
      BImg,
      BForm,
      BButton,
      BFormGroup,
      BFormInput,
      BCardTitle,
      BCardText,
      BInputGroup,
      BInputGroupAppend,
      BOverlay,
      ValidationProvider,
      ValidationObserver,
    },
    data() {
      return {
        userEmail: '',
        sideImg: require('@/assets/images/pages/forgot-password-v2.svg'),
        required,
        email,
        resetData:{},
        confirm_password:'',
        loading:false
      }
    },
    computed: {
      imgUrl() {
        return this.sideImg
      },
    },
    methods: {
      resetPasswordForm() {
          this.loading = true
          axiosIns.post("/resetpassword_with_code",this.resetData).then((response)=>{
            this.$swal({
                text: response.data.message,
                icon: "success",
                confirmButtonText: "確定",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                showClass: {
                  popup: "animate__animated animate__bounceIn",
                },
                buttonsStyling: false,
            });
            this.$router.replace("/login");
            this.loading = false
          }).catch((err) => {
            console.log(err);
            this.loading = false
            this.$swal({
                text: JSON.stringify(err.response.data.message),
                icon: "error",
                confirmButtonText: "確定",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                showClass: {
                  popup: "animate__animated animate__bounceIn",
                },
                buttonsStyling: false,
            });
          });
      },
      sendVertificationCode(){
        this.loading = true
        axiosIns.post("/sendVertificationCode",{email:this.resetData.email}).then((response)=>{
          this.$swal({
              text: response.data.message,
              icon: "success",
              confirmButtonText: "確定",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              showClass: {
                popup: "animate__animated animate__bounceIn",
              },
              buttonsStyling: false,
          });
        this.loading = false
        }).catch((err) => {
          console.log(err);
          this.loading = false
          this.$swal({
              text: JSON.stringify(err.response.data.message),
              icon: "error",
              confirmButtonText: "確定",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              showClass: {
                popup: "animate__animated animate__bounceIn",
              },
              buttonsStyling: false,
          });
        });
      }
    },
  }
  </script>
  
  <style lang="scss">
  @import '@core/scss/vue/pages/page-auth.scss';
  #forgot-password-email{
    border-radius: 0.357rem 0 0 0.357rem;
  }
  .auth-form{
    label{
      font-size: 14px;
    }
  }
  .input-group-text{
    padding: 0rem 0.5rem;
  }
  </style>