<template>
    <div class="Home">
        <nav-tab class="home-nav">
            <div slot="center">首页</div>
        </nav-tab>
        <tab-control :title="['甜点','奶茶' ,'红酒']" @tabClick="tabClick" ref="tabControl" class="tab-control" v-show="isTabFixed"></tab-control>

        <scroll class="scroll" ref="scroll"
            :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullUpLoad = "loadMore"
        >

        <!--主题-->
            <div class="main_body">
            <!--轮播图-->
            <Slideshow/>
            <home-swiper/>
            <!--今日新品-->
            <HomeNews :cake="cake" @NewsImgLoad="NewsImgLoad" @newsGoodsItem="newsGoodsItem"/>
            <tab-control :title="['甜点','奶茶' ,'红酒']" @tabClick="tabClick" ref="tabControl2" class="tab-control"></tab-control>
           <!-- <GoodsList :goods="goods" :currentType="dessertId"/>-->
                <GoodsList :goods="goods"/>
            </div>
        </scroll>
        <back-top @click.native="backClick" v-show="isbackTop"/>
    </div>
</template>

<script>

    import navTab from "../../components/common/navTabBar/navTab";
    import Slideshow from "./childComps/Slideshow";
    import HomeSwiper from "./childComps/HomeSwiper";
    import HomeNews from "./childComps/HomeNews";
    import TabControl from "../../components/content/tabControl/TabControl";

    import GoodsList from "../../components/content/goods/GoodsList";
    import Scroll from "../../components/content/scroll/Scroll";
    import backTop from "../../components/content/backTop/backTop";

    import {getFindAll,getFindType} from "../../network/home";
    import {backTopMixin} from "../../common/mixin";

    export default {
        name: "Home",
        data(){
            return{
                dessertId:1,
                cake:[],
                goods:[],
                pageIndex:1,
                isTabFixed:false,
                tabOffseTop:0,
                isbackTop:false,
                saveY:0
            }
        },
        components:{
            navTab,
            Slideshow,
            HomeSwiper,
            HomeNews,
            TabControl,
            GoodsList,
            Scroll,
            backTop
        },
        mixins:[backTopMixin],
        activated() {
            console.log(this.saveY);
            //1.先刷新
            this.$refs.scroll.refresh()
            //2.在滚到离开时的位置
           this.$refs.scroll.scrollTo(0, this.saveY, 0);

            console.log("新建")

        },
        deactivated() {
            //记录离开时的位置
            this.saveY = this.$refs.scroll.getCurrentY()
            console.log(this.saveY)
            console.log("记录离开时的位置")
        },
        created() {
            this.getFindAll();
            this.getFindType(1)
            console.log("home")

        },
        methods:{
            /* 事件监听相关方法 */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.dessertId = 1
                        break
                    case 1:
                        this.dessertId = 2
                        break
                    case 2:
                        this.dessertId = 3
                }
                //保存当前状态
                this.$refs.tabControl2.currentIndex = index
                this.$refs.tabControl.currentIndex = index
                /*this.getFindType(this.dessertId)*/
                console.log("dessertId="+this.dessertId)
                this.getFindType(this.dessertId)
            },
            contentScroll(position){
                //1.判断BackTop是否显示
                this.listenShowBackTop(position)
              //决定tab-control是否吸顶（position:fixed）
                this.isTabFixed = -(position.y) > this.tabOffseTop
                /*console.log(this.tabOffseTop);*/
            },
            loadMore() {
                console.log("加载更多");
                this.getFindType(this.currentType);
            },
            NewsImgLoad(){
                console.log("bb"+this.$refs.tabControl2.$el.offsetTop);
                this.tabOffseTop = this.$refs.tabControl2.$el.offsetTop

            },
            //获取新品id跳转详情界面
            newsGoodsItem(id,type){
              console.log(id);
                console.log(type);
                this.$router.push({
                    path:'/details',
                    query:{id:id,type:type}
                })
                /* this.$router.push("/details"+id)*/
            },
            getFindAll(){
                getFindAll().then(res => {
                    this.cake = res
                })
            },
            getFindType(dessertId){
                const pageIndex = this.pageIndex;
                console.log(pageIndex);
                console.log(dessertId)
                getFindType(pageIndex,this.dessertId).then(res =>{
                    console.log(res);
                    console.log(dessertId);
                    this.goods=res
                    this.pageIndex +=1 ;
                   /*this.$refs.scroll.finishPullUp()*/
                })
            }
        }
    }
</script>

<style scoped>

.home-nav{
    background-color: #ffcc3e;
    color: white;
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9;
}

.tab-control{
    margin-top: 2.4rem;
    position: relative;
    z-index: 9;
}
    .main_body{
    }
    .scroll{
        height: 690px;
        overflow: hidden;
        position: absolute;
        top:3rem;
    }
</style>