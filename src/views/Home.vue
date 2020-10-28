<template>
  <div class="upload">
    <div class="img-container">
      <!-- 上传预览图片 -->
      <img :src="src" alt />
    </div>
    <!-- 文件上传的input -->
    <form class="input-file" enctype="multipart/form-data" method="post">
      <input type="file" ref="upload" name="uploadImg" id="file" @change="getFile" multiple />
      <!-- label一个 for 属性指向input的唯一 id ，这样点击label就相当于点击input -->
      <label for="file">上传图片</label>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      src:require('assets/img/home/home1.png'),
      srcPath:''//图片相对路径
    };
  },
  methods: {
    getFile(e) {
      let files = e.target.files[0]; //获取上传图片信息
      let formData = new FormData()
      formData.append('file',files)
      this.$http.post("http://localhost:8899/userController/uploadImg",formData).then(result=>{
        this.srcPath = result.data
        this.src = require('assets/img/home/'+this.srcPath)
        console.log(this.src)
        console.log(result.data)
      /*  if(result.data.flag){
          /!*this.srcPath = result.data.message*!/
          this.src = `/imgURL${this.srcPath}`
        }else{
          console.log(result.data.message)
        }*/
      })
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>