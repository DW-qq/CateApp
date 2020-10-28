<template>
    <div class="register">
        <nav-tab class="register_nav">
            <div slot="left" class="back" @click="backOf"> <i class="el-icon-arrow-left"></i> </div>
            <div slot="center">注册</div>
        </nav-tab>

        <div class="content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号码" prop="telephone">
                    <el-input v-model="ruleForm.telephone" name="utelephone" ref="utelephone"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="phoneValidation">
                    <el-input v-model="ruleForm.phoneValidation" style="width: 12rem;margin-right: 10rem"></el-input>
                    <el-link :underline="false" class="link" style="position: relative;top: -1.2rem;left: 4.7rem" @click="yzBtn(ruleForm.telephone)">获取验证码</el-link>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd" name="upassword"></el-input>
                </el-form-item>

                <input type="button" value="注册" class="tj"  @click="submitForm('ruleForm')"/>
            </el-form>
        </div>
    </div>
</template>

<script>
    import navTab from "../../components/common/navTabBar/navTab";
    import {getDx,addUser,findUser} from "../../network/login";
    import {mapState} from "vuex";
    export default {
        name: "Register",
        components:{
            navTab
        },
        data(){
            const validationPhone = (rule,value,callback) =>{
                if(value !=this.yzNum){
                    callback(new Error("请输入正确的验证码"))
                }else {
                    callback()
                }
            };
            const validationtelephone =(rule,value,callback) =>{
                let a = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/;
                if(a.test(value)){
                    console.log("正确")
                    findUser(value).then(res =>{
                        this.telephoneValidation = res
                        console.log(res)
                       if(this.telephoneValidation==500){
                           callback()
                       }else {
                           callback(new Error("该手机已被注册"))
                       }
                    })
                }else {
                    callback(new Error("请输入正确的手机号码"))
                }
            }
            return{
                yzNum:0,
                telephoneValidation:0,
                ruleForm: {
                    pwd: '',
                    phoneValidation: '',
                    telephone:'',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
                    ],
                    telephone:[
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {trigger: 'blur',validator:validationtelephone },
                    ],
                    phoneValidation:[
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {required: true,trigger: 'blur',validator:validationPhone}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm)
                        addUser(this.ruleForm.telephone,this.ruleForm.pwd).then(res =>{
                           if(res === 200){
                               this.$message.success("注册成功,请登入")
                              this.$router.push({path:'/login'})
                           }
                        })
                    } else {
                        console.log('error submit!!');
                    }
                });
            },

            ...mapState(["loginTitle"]),

            backOf() {
                    this.$router.push({path:'/login'})
            },

            yzBtn(utelephone) {
                this.$refs.ruleForm.validateField('telephone', (telephoneError) => {
                    if (!telephoneError) {
                        /* console.log('submit!');*/
                        getDx(utelephone).then(res => {
                            console.log(res)
                            //验证码
                            this.yzNum = res
                        })

                        this.$confirm('验证码已发送至登记手机号上，请查收。', {
                            confirmButtonText: '确定',
                            center: true,
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                })
            },
        }
    }
</script>

<style scoped>
    .register{
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
    .register_nav{
        background-color: #fdce41;
        color: white;
    }


</style>

<style>
    .el-form-item__content{
        line-height: 0px;
    }
</style>

