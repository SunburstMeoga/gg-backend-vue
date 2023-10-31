<template>
  <!-- modal Edit-->
   <validation-observer 
    ref="passwordForm" 
    #default="{ handleSubmit }"
    >
  <b-modal
    id="modal-reset-user-password"
    cancel-variant="outline-secondary"
    ok-title="Edit"
    cancel-title="Close"
    centered
    :title="getTitle()"
    @ok="handleEdit"
    :ok-disabled="false"
  >
    <b-overlay :show='loading' spinner-variant="primary" spinner-type="grow" spinner-small rounded="sm">
      <b-form @submit.prevent="handleSubmit(handleEdit)" ref="resetPasswordForm"> 
        <validation-provider
            #default="{ errors }"
            name="Password"
            vid="old_password"
            rules="required"
        >
        <b-form-group>
          <label for="password">Password:</label>
          <b-form-input
            id="password"
            type="password"
            placeholder="password"
            v-model="userInfo.password"
            :state="errors.length > 0 ? false:null"
          />
        </b-form-group>
        <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
         <validation-provider
            #default="{ errors }"
            name="Password Confirmation"
            vid="password_confirmation"
            rules="required"
        >
        <b-form-group>
          <label for="name">Password Confirm:</label>
          <b-form-input
            type="password"
            v-model="userInfo.password_confirmation"
            placeholder="password_confirmation"
            :state="errors.length > 0 ? false:null"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
        </validation-provider>
      </b-form>
      </b-overlay>
    
  </b-modal>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import { ref, onMounted } from "@vue/composition-api";
import store from "@/store";
import axiosIns from "@/libs/axios";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BModal,
  BButton,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BForm,
  BFormGroup,
  BFormInvalidFeedback,
  BOverlay,
} from "bootstrap-vue";

export default {
  components: {
    BModal,
    BButton,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BForm,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    BOverlay,
  },
  data() {
    return {
      required,
      loading: false,
    };
  },
  props:{
      userInfo:{
          type: Object,
          required: true
      }
  },
  methods: {
    getTitle() {
        return 'Edit '+ this.userInfo.name+ ' password'
    },
    resetForm() {
        this.userInfo = { passowrd: "", password_confirmation: "" }
    },  
    hideModal() {
        this.$root.$emit('bv::hide::modal', 'modal-reset-user-password', '#btnShow')
    },
    handleEdit(bvModalEvt) {
      bvModalEvt.preventDefault()  
      this.loading = true
      axiosIns
        .post("/setPassword", this.userInfo)
        .then((response) => {
          this.loading = false
          this.$bvModal.hide('modal-reset-user-password') 
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
        })
        .catch((error) => {
          this.loading = false
          const message = error.response.data.message
          var showMessage = ''
          var showMessage = message
          if(typeof(showMessage) === 'object'){
            showMessage = ''  
            for(var key in message){
                if (message.hasOwnProperty(key)) {
                    showMessage += message[key]+'\n'
                }
            }
          }
          this.$swal({
              text: showMessage,
              icon: 'error',
              customClass: {
                  confirmButton: 'btn btn-primary',
              },
              showClass: {
                  popup: 'animate__animated animate__bounceIn',
              },
              buttonsStyling: false,
          })
        });
    },
  },
};
</script>

<style></style>
