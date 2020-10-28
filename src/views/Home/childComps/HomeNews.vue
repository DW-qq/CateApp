<template>
    <div>
        <div class="news">
            <p class="title">|今日新品</p>
            <div class="news_goods">
                <ul>
                    <li v-for="item in cake" :key="item.cakeId"  @click="newsGoodsItem(item.cakeId,type)">
                        <div>
                            <img :src="require('assets/img/cake/'+item.cakePhoto)" @load="NewsLoad">
                            <p class="goods_title">{{item.cakeName}}</p>
                            <p class="price">{{item.cakePrice}}元/份</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeNews",
        data(){
            return{
               isLoad:false,
                type:1
            }
        },
        props:{
            cake:{
                type:Array,
                default() {
                    return []
                }
            }
        },

        methods:{
            //监听图片加载
            NewsLoad(){
                if(!this.isLoad){
                    this.$emit('NewsImgLoad');
                    this.isLoad = true
                }
            },
            //发送事件
            newsGoodsItem(id,type){
                /*console.log(id);*/

                this.$emit('newsGoodsItem',id,type)
            }
        }

    }
</script>

<style scoped>
    .news{
         /*border: 1px solid red;*/
        /*margin: 1rem 0rem 0rem 2rem;*/
        padding-left: 0.6rem;
        height:28rem;
        overflow: hidden;
        zoom: 1;
    }
    .news,.title{
        color: #ffcc3e ;
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }

    .news_goods ul li{
        margin-right:0.53rem;
        margin-bottom: 1.2rem;
        padding: 0;
        list-style-type: none;
        float: left;
        /*border: 1px solid blue;*/
        width: 12rem;
        height: 13rem;
        line-height: 2rem;
    }

    .news_goods ul li div img{
        width: 100%;
        height:8rem;
        border-radius: 0.7rem;
    }
    .news_goods ul li div .goods_title{
        color: black;
        font-size: 1rem;
    }
    .news_goods ul li div .price{
        font-size: 0.8rem;
        color: red;
    }
</style>