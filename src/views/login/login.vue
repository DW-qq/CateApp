<template>
    <div class="login">
        <nav-tab class="login_nav">
            <div slot="left" class="back" @click="backOf"> <i class="el-icon-arrow-left"></i> </div>
            <div slot="center">登入</div>
        </nav-tab>
        <div class="content">
                <img src="../../assets/img/good/cate3.jpg" style="width: 5rem;height: 5rem;border-radius: 10rem;margin-bottom: 1rem ">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="telephone">
                        <el-input v-model="ruleForm.telephone"  placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pwd">
                        <el-input v-model="ruleForm.pwd"  placeholder="请输入密码"></el-input>
                        <p style="position: relative;top: 0.7rem;left: 7rem;font-size: 0.8rem;margin-bottom: 1rem" @click="wjPwd">忘记密码?</p>
                    </el-form-item>
                    <input type="button" value="登入" class="tj"  @click="submitForm('ruleForm')"/>
                </el-form>
                <el-link :underline="false" class="link" @click="zcBtn">没有账号？注册登入</el-link>

        </div>
    </div>
</template>

<script>
    import navTab from "../../components/common/navTabBar/navTab";

    import {mapState} from 'vuex'
    import {findUser,findOneUser} from "../../network/login";
    export default {
        name: "login",
        components:{
            navTab
        },
        data(){
            const validationtelephone =(rule,value,callback) =>{
                let a = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/;
                if(a.test(value)){
                    console.log("正确")
                    findUser(value).then(res =>{
                        this.telephoneValidation = res
                        console.log(res)
                        if(this.telephoneValidation==200){
                            callback()
                        }else {
                            callback(new Error("该手机未注册，请先注册"))
                        }
                    })
                }else {
                    callback(new Error("请输入正确的手机号码"))
                }
            }
            return{
                ruleForm: {
                    telephone: '',
                    pwd: '',
                },
                rules: {
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
                    ],
                    telephone:[
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {trigger: 'blur',validator:validationtelephone },
                    ],
                }
            }
        },
        methods: {
            ...mapState(["userInfo","isLogin","uId"]),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //登入
                        findOneUser(this.ruleForm.telephone,this.ruleForm.pwd).then(res =>{
                            console.log(res)
                            if(res == ''){
                                this.$message.error("账号或密码错误！")
                            }else {
                                this.$message.success("登入成功")
                                //保存状态
                                sessionStorage.setItem("userId",res[0].uid);
                                this.$store.state.uId = res[0].uid

                                this.$store.state.userInfo = res
                                this.$router.push("/my")

                            }
                        })
                    } else {
                        console.log('error submit!!');
                    }
                });
            },

            zcBtn(){
                //跳转注册界面
                this.$router.push({path:'/register'})
            },
            backOf(){
                    this.$router.go(-1)
            },
            wjPwd(){
                console.log("忘记密码");
            }
        }

    }
</script>

<style scoped>
.login{
    height: 760px;
    position: fixed;
    z-index: 10;
    width: 100%;
    background-color: white;

}
    .content{
       /* border: 1px solid red;*/
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
        text-align: center;
       padding-right: 2rem;
    }


    .tj{
        border: 0;
        outline: none;
        width: 97%;
        height: 2.5rem;
        border-radius: 0.4rem;
        background-color: #fdce41;
        color: white;
        margin-bottom: 2rem;
        margin-left: 2rem;
    }
    el-link{
        margin-top: 1rem;
    }
    .content h3,img,.link{
       margin-left: 2rem;
    }
    .login_nav{
        background-color: #fdce41;
        color: white;
    }

</style>
<style>
    .el-form-item__content{
        line-height: 0px;
    }
</style>