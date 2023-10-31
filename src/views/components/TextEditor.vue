<template>
    <div class="quill-editor">
        <!-- 图片上传组件辅助-->
        <el-upload class="avatar-uploader" :action="uploadUrl" :headers="headerObj" name="file" :show-file-list="false" :on-success="uploadSuccess">
        </el-upload>
        <!--富文本编辑器组件-->
        <quill-editor :content="content" :options="editorOption" ref="QuillEditor" @input="val => $emit('update:content', val)" >
        </quill-editor>
      </div>
</template>

<script>
import "quill/dist/quill.core.css";
// eslint-disable-next-line
import "quill/dist/quill.snow.css";
// eslint-disable-next-line
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
    components: {
        quillEditor,
    },
    props:{
        content:{
            type:String,
            default:''
        }
    },
    methods: {
        uploadSuccess (res) {
      let quill = this.$refs.QuillEditor.quill
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', res.file_path)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
      
      }
    },
    },
    setup(props){
        const editorOption = {
      modules: {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],                    
            [{ 'header': 1 }, { 'header': 2 }],               
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],    
            [{ 'script': 'sub' }, { 'script': 'super' }],    
            [{ 'indent': '-1' }, { 'indent': '+1' }],      
            [{ 'direction': 'rtl' }],                      
            [{ 'size': ['small', false, 'large', 'huge'] }], 
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }], 
            [{ 'font': ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial'] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image']
          ],
          handlers: {
            image: (value) => {
              console.log("image", value);
              if (value) {
               document.querySelector('.avatar-uploader input').click()
              } else {
                this.quill.format("image", false);
              }
            }
          },
        },
      },
    };

    const uploadUrl = process.env.VUE_APP_SERVICE_URL

    const headerObj = {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    };

    return {
        editorOption,
        uploadUrl,
        headerObj
    }
    }




}


</script>

<style>
.ql-editor {
  min-height: 350px;
}
</style>