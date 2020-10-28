<template>
    <div class="myInfo">
        <nav-tab class="nav_tab">
            <div slot="left" @click="backOf"> <i class="el-icon-arrow-left"></i></div>
            <div slot="center">个人信息</div>
        </nav-tab>
        <div class="bodyCenter">
            <my-info-item @click.native="uphotoBtn">
                <p slot="title">头像</p>
                <img id="myImg" class="info" slot="info" :src="require('assets/img/my/'+$store.state.userInfo[0].uphoto)" style="width: 50px;height: 50px;border-radius:0.7rem;margin-left: 4rem">

            </my-info-item>
            <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="getFile"
                    style="display: none"
            >


            <my-info-item @click.native="petnameBtn">
                <p slot="title">昵称</p>
                <p slot="info" class="info">{{$store.state.userInfo[0].petname}}</p>
            </my-info-item>
            <my-info-item  @click.native="utelephoneBtn">
                <p slot="title">电话</p>
                <p slot="info" class="info">{{$store.state.userInfo[0].utelephone}}</p>
            </my-info-item>
            <my-info-item @click.native="ubirthdayBtn">
                <p slot="title">生日</p>
                <p slot="info" class="info">
                    {{$store.state.userInfo[0].ubirthday}}
                </p>
            </my-info-item>
            <my-info-item @click.native="uadderssBtn">
                <p slot="title">地址</p>
                <p slot="info" class="info">{{$store.state.userInfo[0].uadderss}}</p>
            </my-info-item>
        </div>


        <div class="logout" @click="logout">
            退出
        </div>

    </div>
</template>

<script>
    import navTab from "../../../components/common/navTabBar/navTab";
    import {mapState} from 'vuex'
    import MyInfoItem from "./MyInfoItem";
    import {updateUserInfo} from "../../../network/My";

    export default {
        name: "MyInfo",
        ...mapState(["userInfo","userShow"]),
        components:{
            navTab,
            MyInfoItem
        },
        data() {
            return {

                action: 'http://localhost:8899/userController/updateUser/' + this.$store.state.userInfo[0].uid,
                fileList: [],
                files: '',
                user:{
                    "utelephone":'',
                    "upassword":'',
                    "uphoto":'',
                    "petname":'',
                    "ubirthday":'',
                    "uadderss":'',
                },
            }
        },
        created() {
           /* console.log(this.$store.state.userInfo);*/
        },
        methods: {
            backOf() {
                const user = {"utelephone":'',"upassword":'',"uphoto":'',"petname":'',"ubirthday":'',"uadderss":''}
                user.petname= this.$store.state.userInfo[0].petname
                user.uadderss= this.$store.state.userInfo[0].uadderss
                user.ubirthday = this.$store.state.userInfo[0].ubirthday
                user.uphoto = this.$store.state.userInfo[0].uphoto
                user.utelephone = this.$store.state.userInfo[0].utelephone
                const uid = this.$store.state.userInfo[0].uid
                console.log(user)
                this.$http.post("http://47.115.132.232/CataApp/userController/updateUser/"+uid,user).then(res => {
                    console.log(res)
                })
                this.$router.go(-1)

            },
            logout() {
                console.log("退出")
                //清除缓存
                sessionStorage.clear();
                //跳转登入页面
                this.$router.push('/login')
            },
            //通过onchanne触发方法获得文件列表
            handleChange(file, fileList) {
                this.fileList=fileList;
                 this.files = new FormData();
                fileList.forEach(item => {
                    //文件信息中raw才是真的文件
                    this.files.append("files", item.raw);
                    console.log(item.raw)
                })
            },
            petnameBtn(){
                this.$router.push('/myDetail')
                this.$store.state.userShow.petname=true
            },
            utelephoneBtn(){
                this.$message.error("禁止修改")
            },
            ubirthdayBtn(){
                this.$router.push('/myDetail')
                this.$store.state.userShow.ubirthday=true
            },
            uadderssBtn(){
                this.$router.push('/myDetail')
                this.$store.state.userShow.uadderss=true
            },
            uphotoBtn(){
                this.$refs.fileInput.click()
            },
            getFile(e){
                let files = e.target.files[0]; //获取上传图片信息
                let formData = new FormData()
                formData.append('file',files)
                this.$http.post("http://47.115.132.232/CataApp/userController/uploadImg",formData).then(result=>{
                    console.log(result.data);
                    this.$store.state.userInfo[0].uphoto=result.data
                    let fr = new FileReader();
                    fr.readAsDataURL(files);//转码
                    console.log(files)
                    fr.onload = function (el) {
                        document.getElementById("myImg").setAttribute("src",el.target.result)
                        console.log(el.target.result);
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .myInfo{
        position: absolute;
        z-index: 11;
        background-color: #f1f1f1;
        height: 735px;
        width: 100%;
    }
    .nav-tab{
        background-color: #fdce41;
        color: white;
    }

    ul li{
        list-style-type: none;
        background-color: white;
        border-bottom: 1px solid #e4e4e4;
        align-items: center;
        text-align: center;
        line-height: 3rem;

    }
    .info{
        width: 7rem;
        position: absolute;
        left: 16rem;
    }
    .logout{
        height: 3rem;
        background-color: white;
        text-align: center;
        position: absolute;
        bottom: 20rem;
        padding-top: 1rem;
        width: 100%;
    }
    .upload-demo{
        background-color: white;
        border-bottom: 1px solid #e4e4e4;
        height: 3.6rem;
    }
</style>