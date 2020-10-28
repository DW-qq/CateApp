<template>
    <div>
        <div  class="searchDiv">
            <nav-tab class="hotNav" >
                <div slot="left" class="back" @click="backOf"> <i class="el-icon-arrow-left"></i> </div>
                <div slot="center"><input id="text"/></div>
                <div slot="right"> <el-button icon="el-icon-search" circle id="icon-search" @click="searchBtn"></el-button></div>
            </nav-tab>

           <div style="position: absolute;top: 6%;width: 100%;height: 15rem;padding: 1rem">
               <p style="margin-bottom: 1rem">热门搜索</p>
               <div style="display: inline;margin-right: 2rem" v-for="(item,index) in rmGoodsList">
                   <button class="rmBtn" type="button" @click="rmBtn(index)">{{item}}</button>
               </div>
           </div>
            <div style="position: absolute;top: 50%;left: 50%;transform:translate(-50%,-50%)">
                <h5 style="color: #d9d9d9;letter-spacing: 0.4rem">快搜索加入购物车吧！</h5>
            </div>
        </div>
    </div>
</template>

<script>
    import navTab from "../../components/common/navTabBar/navTab";
    import {getFindTj} from "../../network/hot";
    import {mapState} from 'vuex'
    export default {
        name: "HotSearch",
        components:{
            navTab
        },
        data(){
            return{
                drawer: false,
                rmGoodsList:['百香果','草莓蛋糕','拉菲红酒'],
                rmGoods:''
            }
        },
        methods:{
            ...mapState(["show","hotGoodsList","rxTitle","searchShow","hotIndex"]),
            search(){
                console.log("失去焦点")
            },
            backOf(){
                /*this.$router.go(-1)*/
                console.log("返回热销")
                this.$store.state.show = ! this.$store.state.show
                this.$store.state.rxTitle="热销"
            },
            rmBtn(index){
                this.rmGoods = this.rmGoodsList[index]
                getFindTj(this.rmGoods).then(res =>{
                    this.$store.state.hotGoodsList = res;
                    this.$store.state.show = ! this.$store.state.show
                    this.$store.state.rxTitle=''
                    this.$store.state.searchShow=true
                    this.$store.state.hotIndex=0
                })
                console.log(this.rmGoods)
            },
            searchBtn(){
                console.log("搜索")
                this.rmGoods=document.getElementById("text").value
                if (this.rmGoods==''||this.rmGoods==null){
                    this.$message.error("请输入你要查询的商品")
                }else {
                    getFindTj(this.rmGoods).then(res =>{
                        this.$store.state.hotGoodsList = res;
                        this.$store.state.show = ! this.$store.state.show
                        this.$store.state.rxTitle=''
                        this.$store.state.searchShow=true
                        this.$store.state.hotIndex=0
                    })
                }

                /*this.$store.state.show = ! this.$store.state.show*/
            }
        }
    }
</script>

<style scoped>
    .searchDiv{
        height: 736px;
        position: relative;
        z-index: 10;
        /*border: 1px solid red;*/
        width: 100%;
        overflow: hidden;
        background-color: white;
    }
    .hotNav{
        background-color: #ffcc3e;
        color: white;
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        z-index: 9;
    }
    .center input{
        border-radius: 0.8rem;
        border: 1px solid #d9d9d9;
        height: 1.7rem;
        width: 15rem;
        outline: none;
        padding: 0.5rem;
        font-size: 0.7rem;
    }
    #icon-search{
        padding: 0.4rem;
    }
    .rmBtn{
        border: 0;
        outline: none;
        padding: 0.7rem;
        border-radius: 1rem;
        font-size: 0.9rem;
    }

</style>