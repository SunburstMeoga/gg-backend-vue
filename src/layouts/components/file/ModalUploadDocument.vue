<template>
    <b-modal
      id="modal-upload-document"
      ok-title="Submit"
      cancel-variant="outline-secondary"
      scrollable
      body-class="common_modal modal_visible"
      hide-header
      hide-footer
      centered
      size="lg"
      hide-header-close
    >
      <template #modal-header="{ close }">
        <h3 class="m-0">
          上傳文件資料
        </h3>
        <a @click="close()">
          <font-awesome-icon style="font-size: 20px" icon="fas fa-times" />
        </a>
      </template>
      <b-overlay
        :show="loading"
        spinner-variant="primary"
        spinner-type="grow"
        spinner-small
        rounded="sm"
      >
        <b-form class="mt-1" @submit.prevent="onSubmit">
          <b-row>
            <b-col cols="12">
              <b-form-group label="檔案名稱">
                <b-form-input
                  type="text"
                  placeholder="檔案名稱"
                  v-model="newDocumentData.name_cn"
                />
                </b-form-group>
            </b-col>
            <b-col cols="12">
                <upload-file v-on:file-uploaded="onFileUploaded"></upload-file>
              </b-col>
          </b-row>
          <div class="d-flex mt-2 justify-content-end">
          
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-danger"
              class="mr-1"
              @click="hide"
            >
              取消
            </b-button>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              type="submit"
            >
              <feather-icon size="16" class="mr-1" icon="CheckCircleIcon" />
              上傳
            </b-button>
          </div>
        </b-form>
      </b-overlay>
    </b-modal>
  </template>
  
  <script>
  import {
    BButton,
    BModal,
    VBModal,
    BCardText,
    BOverlay,
    BForm,
    BFormGroup,
    BFormInput,
    BFormFile,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BFormInvalidFeedback
  } from "bootstrap-vue";
  import vSelect from "vue-select";
  import Ripple from "vue-ripple-directive";
  import flatPickr from "vue-flatpickr-component";
  import { required } from "@validations";
  import { ref, watch, onUnmounted } from "@vue/composition-api";
  import { ValidationProvider, ValidationObserver, localize } from "vee-validate";
  import zh_CN from "vee-validate/dist/locale/zh_CN.json";
  localize("zh_cn", zh_CN);
  import formValidation from "@core/comp-functions/forms/form-validation";
  import uploadFile from "@/layouts/components/file/uploadFile.vue";
  import axiosIns from "@/libs/axios.js";
  
  
  export default {
    components: {
      BButton,
      BModal,
      VBModal,
      BCardText,
      BOverlay,
      BForm,
      BFormGroup,
      BFormInput,
      BFormFile,
      BRow,
      BCol,
      BCardBody,
      BCard,
      BFormInvalidFeedback,
      vSelect,
      flatPickr,
      ValidationProvider,
      ValidationObserver,
      uploadFile
    },
    directives: {
      "b-modal": VBModal,
      Ripple,
    },
    props: {
      apiUrl:{
        type:String,
        required:true
      },
    },
    data() {
      return {
        required,
        dragAndDrop:false
      };
    },
    methods: {
      hide() {
        this.$bvModal.hide("modal-upload-document");
      },
      onFileUploaded(file){
        console.log('onFileupload', file)
        this.newDocumentData.file = file
        this.newDocumentData.name_cn = file.name
      },
      onSubmit() {
        this.$swal({
          title: "你確定嗎?",
          showCancelButton: true,
          confirmButtonText: "提交",
          cancelButtonText: "取消",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-outline-danger ml-1",
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            let formData = new FormData();
            if (this.newDocumentData.file) {
              if (this.newDocumentData.file.size >= 10485760) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: "Error! Your Image size is larger then 10M",
                    icon: "AlertTriangleIcon",
                    variant: "danger",
                  },
                });
                return false;
              } else {
                formData.append("file", this.newDocumentData.file);
              }
            }

            formData.append("name_cn", this.newDocumentData.name_cn);
  
            this.loading = true;
            axiosIns.post(this.apiUrl, formData)
              .then((response) => {
                this.loading = false;
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
                this.$emit('refetch-data')
                this.$bvModal.hide("modal-upload-document");
              })
              .catch((error) => {
                this.loading = false;
                this.$swal({
                  text: JSON.stringify(error.response.data.message),
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
        });
      },
    },
    setup(props) {
      const loading = ref(false)
      const newDocumentData = ref({name_cn: "", name_en: "", file: null});
      
      const resetDocumentData = () => {
        newDocumentData.value = JSON.parse(JSON.stringify({ name_cn: "", name_en: "", file: null}));
      };
  
      const { refFormObserver, getValidationState, resetForm } = formValidation(
        resetDocumentData
      );
  
      return {
        loading,
        newDocumentData,
        refFormObserver,
        getValidationState,
        resetForm,
      };
    }
  };
  </script>
  
  <style lang="scss">
  @import "@core/scss/vue/libs/vue-select.scss";
  @import "@core/scss/vue/libs/vue-flatpicker.scss";
  </style>
  