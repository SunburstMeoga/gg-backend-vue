<template>
    <div>
      <b-modal
        :id="`modal-pdf${id}`"
        modal-class="modal-pdf"
        ok-title="OK"
        cancel-variant="outline-secondary"
        scrollable
        :title="title"
        title-class="font-weight-bolder"
        body-class="common_modal "
        hide-footer
        centered
        size="lg"
        :style="{ width: '100vw', height: '100vh' }"
      >
        <!-- form -->
        <embed
          id="pdfcontainer"
          :src="pdfUrl"
          type="application/pdf"
          width="100%"
          height="100%"
        />
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
        this.$bvModal.hide(`modal-pdf${this.id}`);
      },
    },
    props: {
      id:{
        type: String,
        default:""
      },
      title: {
        type: String,
        default: "PDF",
      },
      pdfUrl: {
        type: String,
        default: "",
      },
    },
  };
  </script>
    
    <style lang="scss">
  .modal-pdf .modal-dialog-centered.modal-dialog-scrollable .modal-content {
    width: 100vw;
    height: 100vh;
  }
  </style>
    
    