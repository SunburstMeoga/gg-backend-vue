<template>
    <b-modal
      id="modal-login"
      ok-title="Submit"
      cancel-variant="outline-secondary"
      scrollable
      title="登入"
      title-class="font-weight-bolder"
      body-class="common_modal "
      hide-footer
      centered
      size="sm"
    >
      <!-- form -->
      <validation-observer ref="loginValidation" #default="{ invalid }">
        <b-overlay
          :show="loading"
          spinner-variant="primary"
          spinner-type="grow"
          spinner-small
          rounded="sm"
        >
          <b-form class="auth-form mt-2" @submit.prevent>
            <!-- name -->
            <b-form-group label="用戶名" label-for="login-name">
              <validation-provider
                #default="{ errors }"
                name="用戶名"
                rules="required"
              >
                <b-form-input
                  id="login-name"
                  v-model="userName"
                  :state="errors.length > 0 ? false : null"
                  name="login-name"
                  placeholder="輸入用戶名"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
  
            <!-- forgot password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="login-password">密碼</label>
              </div>
              <validation-provider
                #default="{ errors }"
                name="密碼"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="login-password"
                    v-model="password"
                    :state="errors.length > 0 ? false : null"
                    class="form-control-merge"
                    :type="passwordFieldType"
                    name="login-password"
                    placeholder="輸入密碼"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
              <b-link
                class="float-right"
                :to="{ name: 'auth-forgot-password-v2' }"
              >
                <small>忘記密碼?</small>
              </b-link>
            </b-form-group>
  
            <b-button
              class="my-3 btn-login"
              type="submit"
              variant="primary"
              block
              @click="validationForm"
              :disabled="invalid"
            >
              立即登入
            </b-button>
          </b-form>
        </b-overlay>
      </validation-observer>
    </b-modal>
  </template>
  
  <script>
  import {
    BButton,
    BModal,
    BLink,
    VBModal,
    BCardText,
    BOverlay,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardBody,
    BCard,
  } from "bootstrap-vue";
  import vSelect from "vue-select";
  import Ripple from "vue-ripple-directive";
  import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
  import useJwt from "@/auth/jwt/useJwt";
  import { togglePasswordVisibility } from "@core/mixins/ui/forms";
  import { ValidationProvider, ValidationObserver, localize } from "vee-validate";
  import zh_CN from "vee-validate/dist/locale/zh_CN.json";
  localize("zh_cn", zh_CN);
  import { required } from "@validations";
  
  export default {
    components: {
      BButton,
      BModal,
      VBModal,
      BLink,
      BCardText,
      BOverlay,
      BForm,
      BFormGroup,
      BFormInput,
      BInputGroupAppend,
      BInputGroup,
      BCardBody,
      vSelect,
      BCard,
      ValidationProvider,
      ValidationObserver,
    },
    directives: {
      "b-modal": VBModal,
      Ripple,
    },
    mixins: [togglePasswordVisibility],
    data() {
      return {
        status: "",
        password: "",
        userName: "",
        required,
        loading: false,
      };
    },
    computed: {
      passwordToggleIcon() {
        return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
      },
    },
    methods: {
      hide() {
        this.$bvModal.hide("modal-user");
      },
      validationForm() {
        this.$refs.loginValidation.validate().then((success) => {
          if (success) {
            this.login();
          }
        });
      },
      login() {
        this.$refs.loginValidation.validate().then((success) => {
          if (success) {
            this.loading = true;
            useJwt
              .login({
                email: this.userName,
                password: this.password,
              })
              .then((response) => {
                this.loading = false
                const {userData} = response.data
                useJwt.setToken(response.data.access_token)
                localStorage.setItem('userData', JSON.stringify(userData))
                localStorage.setItem('language_id', this.language_id)

               // this.$ability.update(userData.ability)
                this.$router.replace('/')
                  .then(() => {
                      this.$toast({
                      component: ToastificationContent,
                      position: 'top-right',
                      props: {
                        title: `歡迎 ${userData.name}`,
                        icon: 'CoffeeIcon',
                        variant: 'success',
                        text: `你已成功登入 ${userData.name}!`,
                      },
                    })
                  })
                  .catch(error => {
                    console.log(error)
                    this.$refs.loginForm.setErrors(error.response.data.error)

                  })
              })
              .catch((error) => {
                console.log(error)
                this.$swal({
                  text:
                    (error &&
                      error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    "用戶名或密碼不正確!",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-primary",
                  },
                  showClass: {
                    popup: "animate__animated animate__bounceIn",
                  },
                  buttonsStyling: false,
                });
                this.loading = false;
              });
          }
        });
      },
    },
    props: {},
  };
  </script>
  
  <style lang="scss" scoped>
  @import "@core/scss/vue/libs/vue-select.scss";
  </style>