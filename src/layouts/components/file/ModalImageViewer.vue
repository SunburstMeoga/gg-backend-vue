<template>
    <div>
      <b-modal
        :id="`modal-image-viewer${id}`"
        modal-class="modal-image-viewer"
        ok-title="OK"
        cancel-variant="outline-secondary"
        scrollable
        title="圖片"
        title-class="font-weight-bolder"
        body-class="common_modal "
        hide-header
        hide-footer
        centered
        size="lg"
      >
      <font-awesome-icon @click="hide" class="close-button"
        style="font-size: 25px" icon="fa-solid fa-circle-xmark" />
        <!-- form -->
        <img id="" :src="imageuUrl" />
      </b-modal>
    </div>
  </template>
    
    <script>
  import { BModal, VBModal } from "bootstrap-vue";
  
  export default {
    components: {
      BModal,
    },
    directives: {
      "b-modal": VBModal,
    },
    methods: {
      hide() {
        this.$bvModal.hide(`modal-image-viewer${this.id}`);
      },
    },
    props: {
      id:{
        type: String,
        default:""
      },
      imagePath: {
        type: String,
        require: true,
      },
    },
    computed: {
      imageuUrl() {
        //console.log('this.imagePath',this.imagePath)
        return this.imagePath
        if(this.id.indexOf('-inner') > -1){
          return this.imagePath;
        }else{
          return process.env.VUE_APP_IMAGE_URL + this.imagePath;
        }
      },
    },
  };
  </script>
    
  <style lang="scss">
  .modal-image-viewer
    .modal-dialog-centered.modal-dialog-scrollable
    .modal-content {
    .modal-body {
      display: flex;
      justify-content: center;
      align-items: center;
      padding:2rem;
      img{
        max-width: 100%;
      }
    }
  }
  .close-button{
    position: absolute;
    top:3px;
    right:3px;
  }
  
  </style>
    
    