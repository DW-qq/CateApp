<template>
    <div class="details">
        <nav-tab class="details-nav">
            <div slot="left" class="back" @click="backOf"> <i class="el-icon-arrow-left"></i> </div>
            <div slot="center">详情</div>
        </nav-tab>
       <!-- <scroll :pull-up-load="true" :probe-type="3" class="scroll" ref="scroll">-->
            <DetailsInfo class="DetailsInfo" :goods = "goods" :type="goodsType+''"></DetailsInfo>
            <DetailsIntro :materials="materials"/>
            <h5>{{$store.state.price}}</h5>
        <!--</scroll>-->

        <details-bar class="details-bar"/>
    </div>
</template>

<script>
    import navTab from "../../components/common/navTabBar/navTab";
    import Scroll from "../../components/content/scroll/Scroll";


    import DetailsInfo from "./childComps/DetailsInfo";
    import DetailsIntro from "./childComps/DetailsIntro";
    import DetailsBar from "./childComps/DetailsBar";
    import {getFindById,Goods} from "../../network/details";
    import {mapState} from "vuex";

    export default {
        name: "Details",
        components:{
            navTab,
            Scroll,
            DetailsInfo,
            DetailsIntro,
            DetailsBar,
        },
        data(){
            return{
                goodsId:[],
                img:'',
                goods:{},
                goodsType:0,
                materials:''
            }
        },
        created() {
            this.goodsId = this.$route.query.id
            this.goodsType = this.$route.query.type
            getFindById(this.goodsId).then(res =>{
                console.log(res);
                this.goods = new Goods(res,res.sells[0])
                this.materials = res.materials;

            })
            this.isShowGoodsInfo()
        },
        methods:{
            backOf(){
               this.$router.go(-1)
            },
            ...mapState({isShowGoods:'isShowGoods',addList:'addList'}),
            /*...mapGetters(['addList']),*/
            isShowGoodsInfo(){
                //判断DetailsInfo第一个内容是否显示
                this.$store.state.isShowGoods=true
                const addList = this.$store.state.addList;

                for (let i=0;i<addList.length;i++){

                    if(addList[i].id == this.goodsId){
                        this.$store.state.isShowGoods=false
                        console.log("第二次")
                    }
                }

            },
        }
    }
</script>

<style scoped>
.details{
   /* border: 1px solid red;*/
    height: 736px;
    position: relative;
    z-index: 10;
    background-color: #f6f6f6;
    width: 100%;
    overflow: hidden;
}
.details-nav{
    background-color: #ffcc3e;
    color: white;
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9;
}
.DetailsInfo{
    /*border: 1px solid red;*/
    position: relative;
    top: 2.5rem;
    margin-bottom: 4rem;
}
.scroll{
    overflow: hidden;
    height: 100%;
    /*border: 1px solid black;*/
}
    .details-bar{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>