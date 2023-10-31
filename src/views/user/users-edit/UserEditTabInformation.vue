<template>
  <div>
    <!-- Header: Personal Info -->
    <div class="d-flex">
      <feather-icon icon="UserIcon" size="19" />
      <h4 class="mb-0 ml-50">Staff Information</h4>
    </div>
    <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
      <!-- Form: Personal Info Form -->
      <b-form class="mt-1" @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <!-- Field: Staff ID -->
          <b-col cols="12" md="12">
            <b-form-group label="Staff ID" label-for="id">
              <b-form-input id="id" v-model="userData.id" readonly />
            </b-form-group>
          </b-col>

          <!-- Field: Name -->
          <b-col cols="12" md="12">
            <validation-provider
              #default="validationContext"
              name="Name"
              rules="required"
            >
              <b-form-group label="Name" label-for="name">
                <b-form-input
                  id="name"
                  v-model="userData.name"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="12" md="12">
            <validation-provider
              #default="validationContext"
              name="Email"
              rules="required"
            >
              <b-form-group label="Email Address" label-for="email">
                <b-form-input
                  id="email"
                  v-model="userData.email"
                  placeholder="Email"
                  :state="getValidationState(validationContext)"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>

        <!-- Form: Personal Info Form -->
        <b-row class="mt-1">
          <b-col cols="12" md="12" v-if="userData.id == 0">
            <h4 class="mb-0">Password</h4>
            <hr />
          </b-col>
          <!-- Field: Password -->
          <b-col cols="12" md="6" v-if="userData.id == 0">
            <validation-provider
              #default="validationContext"
              name="Password"
              rules="required|min:8"
            >
              <b-form-group
                class="required"
                label="Password"
                label-for="password"
              >
                <b-form-input
                  id="password"
                  type="password"
                  :state="getValidationState(validationContext)"
                  v-model="userData.password"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
          <!-- Field: Password Confirm -->
          <b-col cols="12" md="6" v-if="userData.id == 0">
            <validation-provider
              #default="validationContext"
              name="Password Confirm"
              rules="required|min:8|confirmed:Password"
            >
              <b-form-group
                class="required"
                label="Password Confirm"
                label-for="password_confirmation"
              >
                <b-form-input
                  id="password_confirmation"
                  type="password"
                  :state="getValidationState(validationContext)"
                  v-model="userData.password_confirmation"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-row>
        <hr />

        <b-row>
          <b-col cols="12" md="6">
            <b-form-group label-for="is_active">
              <b-form-checkbox
                checked="true"
                v-model="userData.is_active"
                class="custom-control-success"
                name="check-button"
                switch
                inline
              />
              {{ userData.is_active ? "Enable" : "Disable" }}
            </b-form-group>
          </b-col>
        </b-row>
        <!-- Button: Submit & Reset Button.-->
        <b-row class="mt-2">
          <b-col>
            <b-button
              variant="primary"
              class="mb-1 mb-sm-0 mr-0 mr-sm-1"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              type="submit"
            >
              Save
            </b-button>
            <b-button
              variant="outline-secondary"
              class="mr-0 mr-sm-1"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="resetData"
            >
              Reset
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'"
              @click="hide"
            >
              Cancel
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BFormCheckboxGroup,
  BButton,
  BFormCheckbox,
  BFormInvalidFeedback,
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import { ref, onMounted } from "@vue/composition-api";
import vSelect from "vue-select";
import store from "@/store";
import Ripple from "vue-ripple-directive";
import "animate.css";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import formValidation from "@core/comp-functions/forms/form-validation";
import { required, alphaNum, email } from "@validations";

export default {
  directives: {
    Ripple,
  },
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    flatPickr,
    BFormInput,
    vSelect,
    BFormRadioGroup,
    BFormCheckboxGroup,
    BButton,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
  },
  methods: {
    hide() {
      this.$router.replace("/users/list");
    },
    onSubmit() {
      this.$swal({
        title: "Are you sure?",
        showCancelButton: true,
        confirmButtonText: "Save Changes",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {

          store
            .dispatch("app-user/updateUser", this.userData)
            .then((response) => {
              this.$swal({
                text: response.data.message,
                icon: "success",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
                showClass: {
                  popup: "animate__animated animate__bounceIn",
                },
                buttonsStyling: false,
              });
              this.$emit("refetch-data");
            })
            .catch((error) => {
              this.$swal({
                text: JSON.stringify(error.response.data.message),
                icon: "error",
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
      });
    },
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const positionOptions = ref([]);
    const teamOptions = ref([]);

    const genderOptions = [
      { text: "Male", value: "m" },
      { text: "Female", value: "f" },
    ];

    const contactOptionsOptions = ["Email", "Message", "Phone"];

    const resetData = () => {
      emit("refetch-data");
    };
    const resetuserData = () => {
      props.clientData = JSON.parse(JSON.stringify({}));
    };
    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetuserData);


    onMounted(() => {
      console.log(props.userData);
    });

    return {
      genderOptions,
      contactOptionsOptions,
      positionOptions,
      teamOptions,
      resetData,
      refFormObserver,
      getValidationState,
      resetForm,
      resetuserData,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
.teamleader_selected {
  background: #110f6a;
  padding: 3px 10px;
  border-radius: 3px;
  color: white;
}
</style>
