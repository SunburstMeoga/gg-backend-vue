<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">


          <h2 class="brand-text text-primary ml-1">
              <img src="@/assets/images/logo/minter-logo.png" class="login-logo" />
          </h2>
        </b-link>
        <!--
        <b-card-title class="mb-1">
          Welcome to FTW! 👋
        </b-card-title>
        <b-card-text class="mb-2">
          Please sign-in to your account and start the adventure
        </b-card-text>
        -->

        <!-- form -->
        <validation-observer
          ref="loginForm"
          #default="{invalid}"
        >
        <b-overlay :show='loading' spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm">
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent="login"
          >

            <!-- email -->
            <b-form-group
              label-for="email"
              label="Email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="userEmail"
                  name="login-email"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Email"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <div class="d-flex justify-content-between" v-if="false">
                <label for="password">Password</label>
                <!--<b-link :to="{name:'auth-forgot-password-v1'}"> -->
                  <small>Forgot Password?</small>
              
              </div>
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="login-password"
                    placeholder="Password"
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
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <b-form-checkbox
                id="remember-me"
                v-model="status"
                name="checkbox-1"
              >
                Remember Me
              </b-form-checkbox>
            </b-form-group>

            <!-- submit button -->
            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
            >
              Sign in
            </b-button>
          </b-form>
          </b-overlay>
        </validation-observer>


        <!--
        <div class="divider my-2">
          <div class="divider-text">
            or
          </div>
        </div>
        -->

 
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BCardText, BInputGroup, BInputGroupAppend, BFormCheckbox, BOverlay,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
        Ripple,
    },
  components: {
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    BOverlay,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userEmail: 'nickwong803@gmail.com',
      password: '12345678',
      status: '',
      // validation rules
      required,
      email,
      loading:false,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
          if(success){
            this.loading = true
            useJwt.login({
              email: this.userEmail,
              password: this.password,
            }).then(response => {
                this.loading = false
                const {userData} = response.data
                useJwt.setToken(response.data.access_token)
                localStorage.setItem('userData', JSON.stringify(userData))
                this.$ability.update(userData.ability)
                this.$router.replace('/')
                  .then(() => {
                      this.$toast({
                      component: ToastificationContent,
                      position: 'top-right',
                      props: {
                        title: `Welcome ${userData.name}`,
                        icon: 'CoffeeIcon',
                        variant: 'success',
                        text: `You have successfully logged in as ${userData.name}. Now you can start to explore!`,
                      },
                    })
                  })
                  .catch(error => {
                    console.log('error',error)
                    this.$refs.loginForm.setErrors(error.response.data.error)
                  })

            })
            .catch(error => {
              console.log(error)
              this.$swal({
                text: 'Email and Password not match',
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                showClass: {
                  popup: "animate__animated animate__bounceIn",
                },
                buttonsStyling: false,
              });
              this.loading = false
            })
          }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>