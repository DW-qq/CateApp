<template>
    <div id="My">

       <div class="my_head">
           <div class="block"  v-if="$store.state.userInfo.length<=0"><el-avatar :size="70" :src="circleUrl"></el-avatar></div>
           <div class="block" @click="pimBtn" v-else><el-avatar :size="70" :src="require('assets/img/my/'+$store.state.userInfo[0].uphoto)"></el-avatar></div>

           <p style="margin-top: 0.3rem;letter-spacing: 0.5rem" @click="loginBtn()" v-if="$store.state.userInfo.length<=0">{{title}}</p>
           <p style="margin-top: 0.3rem;letter-spacing: 0.5rem" v-else>{{$store.state.userInfo[0].petname}}</p>
           <!--{{this.$store.state.userInfo[0].uid}}-->

       </div>
        <div class="myOrder">
            <p style="border-bottom: 1px #d9d9d9 solid;color: black;padding-bottom: 0.5rem">我的订单</p>
            <my-nav @tabBtn="tabBtn"/>
        </div>
        <scroll ref="scroll" class="scroll"  :probe-type="3" :pull-up-load="true" :style="{height:scrollHeight} ">
            <router-view/>
        </scroll>
        <MyCarBar v-show="currentCount==0"/>
    </div>
</template>

<script>
    import MyNav from "./childComps/MyNav";
    import Scroll from "../../components/content/scroll/Scroll";
    import MyCar from "./childComps/MyCar";
    import MyCarBar from "./childComps/MyCarBar";
    export default {
        name: "My",
        components:{
            MyNav,
            Scroll,
            MyCar,
            MyCarBar
        },
        created() {
            console.log("aa")
            let userInfo=window.sessionStorage.getItem("userInfo");
            console.log(userInfo);
            /*  let a =JSON.parse(userInfo);
              if(a!=undefined){
                  console.log(a.petname)
              }*/

        },
        data(){
            return{
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                title:'请登入',
                userInfo:[],
                currentCount:0,
                scrollHeight:18.5+'rem'
            }
        },
        methods:{
            pimBtn(){
                console.log("改信息")
                this.$router.push('/myInfo')
            },
            tabBtn(index){
               this.currentCount = index
                switch (index) {
                    case 0:
                       this.$router.push('/my/myCar')
                        this.scrollHeight=18.5+'rem'
                        break
                    case  1:
                        this.$router.push('/my/myPayment')
                        this.scrollHeight=22.5+'rem'
                        break
                    case 2:
                        this.$router.push('/my/myOrders')
                        this.scrollHeight=22.5+'rem'
                        break
                    case 3:
                        this.$router.push('/my/myRefund')
                        this.scrollHeight=22.5+'rem'
                        break
                }
            },
            loginBtn(){
                //跳转登入界面
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
    #My{
        height: 680px;
        /*border:1px solid red;*/
        background-image: url("../../assets/img/my/my-bg.png");
        background-repeat: no-repeat;
        background-size: 25.83rem 20rem;
        overflow: hidden;
    }
    .my_head {
        height: 6rem;
        text-align: center;
        margin-top: 8rem;
    }
    .myOrder{
        height: 7rem;
       /* border: 1px solid red;*/
        padding: 1.5rem;
    }
    .scroll{
        height: 18.5rem;
        padding-top: 1rem;
       /* border: 1px solid red;*/
        overflow: hidden;
        background: #f9f9f9;
    }
</style>