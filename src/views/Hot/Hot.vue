<template>
    <div>
        <nav-tab class="hotNav" v-show="this.$store.state.show">
            <div slot="left" v-show="this.$store.state.searchShow"  @click="hotBtn"><i class="el-icon-arrow-left"></i></div>
            <div slot="center">{{this.$store.state.rxTitle}}</div>
            <div slot="right">
                <i class="el-icon-search"  @click="searchBtn" v-show="!this.$store.state.searchShow"></i>
            </div>
        </nav-tab>
        <scroll
                class="scroll"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                v-if="this.$store.state.show"
        >

            <HotGoodsList :hotGoodsList=" this.$store.state.hotGoodsList"/>
            <back-top @click.native="backClick" v-show="isbackTop"/>
        </scroll>

       <HotSearch v-show="!this.$store.state.show"/>

    </div>
</template>

<script>

    import navTab from "../../components/common/navTabBar/navTab";
    import Scroll from "../../components/content/scroll/Scroll";
    import {getFindByNum,} from "../../network/hot";
    import {backTopMixin} from "../../common/mixin";

    import {mapState} from 'vuex'

    import HotGoodsList from "./HotGoodsList";
    import HotSearch from "./HotSearch";

    export default {
        name: "Hot",
        components:{
            navTab,
            Scroll,
            HotGoodsList,
            HotSearch
        },
        mixins:[backTopMixin],

        data(){
          return{
              isbackTop:false,


          }
        },
        created() {
            this.getFindByNum()
        },
        methods: {
            ...mapState(["show","hotGoodsList"]),
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            getFindByNum(){
                getFindByNum().then(res =>{
                   this.$store.state.hotGoodsList = res
                })
            },
            contentScroll(position) {
                //1.判断BackTop是否显示
                this.listenShowBackTop(position)
            },
            searchBtn(){
                this.$store.state.show =!this.$store.state.show
                console.log("aaa")
            },
            hotBtn(){
                console.log("返回")
                /*this.$router.go(0)*/
                this.$store.state.rxTitle="热销"
                this.$store.state.searchShow=!this.$store.state.searchShow
                this.getFindByNum()
            }
        }


    }
</script>

<style scoped>
    .scroll{
        height: 630px;
        /*border: 1px solid red;*/
        overflow: hidden;
        position: absolute;
        top:3.3rem;
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
    .el-icon-search{
        margin-right: 0.7rem;
        font-size: 1.3rem;
    }

</style>