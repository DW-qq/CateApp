<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data(){
            return{
                scroll:null
            }
        },
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
             type: Boolean,
                default: false
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad,
                click:true
            })

            //监听滚动的位置
            if(this.probeType === 2 || this.probeType === 3){
                console.log("aaa");
                this.scroll.on('scroll',(position) => {

                    this.$emit('scroll',position)
                })
            }

            //加载完成
            if(this.pullUpLoad) {
                this.scroll.on('pullingUp' , () => {
                    /*console.log("加载更多")*/;
                    //发送上拉加载更多事件
                    this.$emit('pullUpLoad')
                })
            }

        },
        methods: {
            scrollTo(x,y,time=300) {
                this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
            },
            //刷新数据
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
            },
            refresh() {
                /* console.log("jiji") */
                this.scroll  && this.scroll.refresh && this.scroll.refresh()
            },
            //获取Y值
            getCurrentY(){
                //条件1 || 条件2 ||条件3
                return this.scroll ? this.scroll.y : 0
            }
        }
    }
</script>

<style scoped>
</style>