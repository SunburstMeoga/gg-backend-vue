<template>
  <!-- modal Edit-->
  <b-modal
    id="modal-edit-password"
    cancel-variant="outline-secondary"
    ok-title="Edit"
    cancel-title="Close"
    centered
    title="Edit Password"
    @ok="handleEdit"
    :ok-disabled="false"
  >
    <validation-observer 
    ref="passwordForm" 
    #default="{invalid}">
      <b-form>
        <validation-provider
            #default="{ errors }"
            name="Old Password"
            vid="old_password"
            rules="required"
        >
          <b-form-group>
            <label for="old_password">Current Password:</label>
            <b-form-input
              id="old_password"
              type="password"
              placeholder="old_password"
              :state="errors.length > 0 ? false:null"
              v-model="userInfo.old_password"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </b-form-group>
        </validation-provider>
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
    </validation-observer>
  </b-modal>
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
  },
  data() {
    return {
      userInfo: { old_password: "", passowrd: "", password_confirmation: "" },
      required,
    };
  },
  methods: {
    resetForm() {
        this.userInfo = { old_password: "", passowrd: "", password_confirmation: "" }
    },  
    hideModal() {
        this.$root.$emit('bv::hide::modal', 'modal-edit-passworder', '#btnShow')
    },
    handleEdit(bvModalEvt) {
      bvModalEvt.preventDefault()  
      axiosIns
        .post("/resetpassword", this.userInfo)
        .then((response) => {
          this.$bvModal.hide('modal-edit-passworder')  
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Success`,
              icon: "CoffeeIcon",
              variant: "success",
              text: response.data.message,
            },
          });
    
        })
        .catch((error) => {
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
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Error`,
              icon: "CoffeeIcon",
              variant: "danger",
              text: showMessage,
            },
          });
        });
    },
  },
};
</script>

<style></style>
