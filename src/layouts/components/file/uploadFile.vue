<template>
    <div>
      <modal-image-viewer
        :id="innerID"
        :image-path="previewImage"
      ></modal-image-viewer>
      <modal-Pdf :id="innerID" :pdfUrl="pdfUrl"></modal-Pdf>
  
      <div class="">
        <b-form-group
          :label="`上傳${title ? title : ''}文件：`"
          label-class="full-label"
          label-for="upload"
          class="required"
        >
          <div id="file-drag-drop">
            <div class="fileform" ref="fileform">
              <div v-show="!image_files" class="mt-3">
                <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" />
                <p class="colorBlack mt-2 mb-50">選擇檔案或將檔案拖放於此</p>
                <p class="mb-2">File size no more than 10MB</p>
                <a
                  href="javascript:void(0)"
                  class="file-button backgroundColor1"
                  style="background: black;"
                  @click="$refs.pickFile.$el.childNodes[0].click()"
                  >選擇檔案</a
                >
  
                <b-form-file
                  v-model="image_files"
                  style="display: none"
                  @input="getImagePreviews"
                  ref="pickFile"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop one file here..."
                ></b-form-file>
              </div>
  
              <div class="file-listing" v-show="image_files && image_files.name">
                <h4 class="mb-2 color1">檔案已添加</h4>
                <div class="d-flex justify-content-center align-items-center">
                  <img class="preview mr-1" ref="preview" />
                  <span class="text"
                    >{{ image_files && image_files.name }}。</span
                  >
                  <a
                    class="color1"
                    href="javascript:void(0)"
                    @click="beforeSubmitPreview"
                    >preview</a
                  >
                  <span class="ml-3">{{ convertSize }}</span>
  
                  <a class="remove ml-2" v-on:click="removeFile">
                    <feather-icon size="18" class="" icon="Trash2Icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </b-form-group>
      </div>
    </div>
  </template>
  
  <script>
  import {
    BRow,
    BCol,
    BCard,
    BFormGroup,
    BButton,
    BFormFile,
    BOverlay,
  } from "bootstrap-vue";
  import draggable from "vuedraggable";
  import ModalImageViewer from "@/layouts/components/file/ModalImageViewer.vue";
  import ModalPdf from "@/layouts/components/file/ModalPdf.vue";
  import wordIcon from "@/assets/images/icons/file-icons/word.png"
  import excelIcon from "@/assets/images/icons/file-icons/excel.png"
  import pdfIcon from "@/assets/images/icons/file-icons/pdf.png"
  import othersIcon from "@/assets/images/icons/file-icons/others.jpeg"
  
  
  export default {
    components: {
      BRow,
      BCol,
      BCard,
      BButton,
      BFormGroup,
      BFormFile,
      draggable,
      BOverlay,
      ModalPdf,
      ModalImageViewer,
    },
    data() {
      return {
        image_files: null,
        previewImage: null,
        pdfUrl:null,
        dragAndDropCapable: false,
      };
    },
    props: {
      title:{
        type:String,
        default:''
      },
      innerID:{
        type:String,
        default:'-inner'
      }
  },
    methods: {
      determineDragAndDrop() {
        var div = document.createElement("div");
        return (
          ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
          "FormData" in window &&
          "FileReader" in window
        );
      },
      getImagePreviews() {
        // check image_files is empty array
        if (this.image_files) {
          // check size > 10MB
          if (this.image_files.size >= 1024 * 1024 * 10) {
            this.$bvToast.toast(`Please drop a file size < 10 MB file!`, {
              title: "Error",
              autoHideDelay: 2500,
              variant: "danger",
            });
            this.image_files = null;
          } else {
            let file = this.image_files;
            this.$emit("file-uploaded", file);
  
            if (
              file.type ==
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ) {
              // word file ".docx"
              this.$refs.preview.src = wordIcon;
            } else if (
              file.type ==
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
              file.type == "application/vnd.ms-excel"
            ) {
              // excel file ".xlsx" and ".xls"
              this.$refs.preview.src = excelIcon;
            } else if (file.type == "application/pdf") {
              const fileURL = URL.createObjectURL(file);
              this.pdfUrl = fileURL;
              
    
              // pdf file ".pdf"
              this.$refs.preview.src = pdfIcon;
            } else if (
              file.type == "image/jpeg" ||
              file.type == "image/jpg" ||
              file.type == "image/png" ||
              file.type == "image/gif" ||
              file.type == "image/webp" ||
              file.type == "image/svg"
            ) {
              /*
              Create a new FileReader object
            */
              let reader = new FileReader();
              //console.log(reader);
  
              /*
              Add an event listener for when the file has been loaded
              to update the src on the file preview.
            */
              reader.addEventListener(
                "load",
                function () {
                  this.$refs.preview.src = reader.result;
                  this.previewImage = reader.result;
                }.bind(this),
                false
              );
  
              /*
              Read the data for the file in through the reader. When it has
              been loaded, we listen to the event propagated and set the image
              src to what was loaded from the reader.
            */
              reader.readAsDataURL(file);
            } else if (
              file.type != "image/jpeg" &&
              file.type != "image/jpg" &&
              file.type != "image/png" &&
              file.type != "image/gif" &&
              file.type != "image/webp" &&
              file.type != "image/svg"
            ) {
              // files other than images
              this.$refs.preview.src = othersIcon;
            }
          }
        }
      },
      removeFile() {
        this.image_files = null;
        this.$emit("file-uploaded", this.image_files);
      },
      beforeSubmitPreview() {
        let file = this.image_files;
        if (
          file.type == "image/jpeg" ||
          file.type == "image/jpg" ||
          file.type == "image/png" ||
          file.type == "image/gif" ||
          file.type == "image/webp" ||
          file.type == "image/svg"
        ) {
          this.$bvModal.show("modal-image-viewer-inner");
        } else if(file.type == "application/pdf") {
          this.$bvModal.show("modal-pdf-inner");
        }
      },
    },
    computed: {
      convertSize() {
        var size;
        if (this.image_files) {
          size = this.image_files.size;
          const calc = size / (1024 * 1024);
  
          return calc > 0.1
            ? calc.toFixed(2) + "MB"
            : (calc * 1024).toFixed(2) + "KB";
        } else {
          return 0 + "KB";
        }
      },
    },
    mounted() {
      /*
        Determine if drag and drop functionality is capable in the browser
      */
      this.dragAndDropCapable = this.determineDragAndDrop();
      /*
        If drag and drop capable, then we continue to bind events to our elements.
      */
               /*
          Listen to all of the drag events and bind an event listener to each
          for the fileform.
        */
  
        [
              "drag",
              "dragstart",
              "dragend",
              "dragover",
              "dragenter",
              "dragleave",
              "drop",
            ].forEach(
              function (evt) {
                /*
                For each event add an event listener that prevents the default action
                (opening the file in the browser) and stop the propagation of the event (so
                no other elements open the file in the browser)
            */
                this.$refs.fileform.addEventListener(
                  evt,
                  function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                  }.bind(this),
                  false
                );
              }.bind(this)
            );
  
            /*
            Add an event listener for drop to the form
          */
            this.$refs.fileform.addEventListener(
              "drop",
              function (e) {
                /*
              Capture the files from the drop event and add them to our local files
              array.
            */
                if (e.dataTransfer.files.length > 1) {
                  this.$bvToast.toast(`Please drop only one file!`, {
                    title: "Error",
                    autoHideDelay: 2500,
                    variant: "danger",
                  });
                  e.dataTransfer.files = [];
                  this.image_files = null;
                } else if (e.dataTransfer.files[0].size >= 1024 * 1024 * 10) {
                  this.$bvToast.toast(`Please drop a file size < 10 MB file!`, {
                    title: "Error",
                    autoHideDelay: 2500,
                    variant: "danger",
                  });
                  e.dataTransfer.files = [];
                  this.image_files = null;
                } else {
                  // image files = the dropped files
                  this.image_files = e.dataTransfer.files[0];
                  this.getImagePreviews();
                }
              }.bind(this)
            );
    },
  };
  </script>