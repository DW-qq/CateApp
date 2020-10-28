import {debounce} from "./const";
import backTop from "../components/content/backTop/backTop";
import {mapState} from "vuex";
/*export const  itemListenerMixin = {
    data(){
        newRefresh:null
    },
    mounted(){
        //这个地方img标签的确被挂载，但是其中的图片还没有占据高度
        //this.$refs.content.refresh对这个函数进行防抖操作
        this.newRefresh = debounce(this.$refs.scroll.refresh,200)
        //监听图片加载
        this.itemImgListenter = () => {  this.newRefresh() }
        this.$bus.$on('itemImageLoad' , this.itemImgListenter)
    }
}*/

export const backTopMixin = {
    components: {
        backTop
    },
    data() {
        isbackTop:null
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0)
        },
        listenShowBackTop(position) {
            //1.判断BackTop是否显示
            this.isbackTop = (-position.y) > 700
        },
    }
}

    export const GoodsBtn ={
    methods: {
        GoodsBtn(id,type){
            /* this.$router.push("/details"+id)*/
            console.log("点击按钮")
            console.log(type);
            this.$router.push({
                path:'/details',
                query:{id:id,type:type}
            })
        }
    }

    }

    export const addBtn={
    ...mapState(['addList','num']),
        methods:{
            addBtn(id) {
                for (let i=0;i<this.$store.state.addList.length;i++){
                    if(this.$store.state.addList[i].id === id){
                        this.$store.state.addList[i].count++
                    }
                }
                this.$store.state.num++
            },
        }
    }
    export const subtractCarBtn={
        ...mapState(['addList','num','dialogVisible','isShowGoods','isCarShow']),
        methods:{
            subtractCarBtn(count,id){
                console.log(count)
                console.log(id)
                if(count<=1){
                    const goodsList = this.$store.state.addList;
                    for (let i =0;i<goodsList.length;i++){
                        if(goodsList[i].id === id){
                            //根据id删除数据
                            goodsList.splice(i,1)
                            console.log("删除成功")
                            this.$store.state.isShowGoods=true
                        }
                    }
                }
                this.$store.state.dialogVisible = this.$store.state.addList.length>0

                this.$store.state.num--
            },
        }

    }