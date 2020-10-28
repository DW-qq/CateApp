<template>
    <div>
        <div class="hot_list" v-for="(item,index) in hotGoodsList">
                <el-badge :value="index+1" class="item" v-if="index<$store.state.hotIndex">
                    <div class="hot_list_goods_left">
                    <img :src="require('assets/img/good/'+item.goodsPhoto)" v-if="item.goodsPhoto != undefined">
                    </div>
                </el-badge>
            <div class="hot_list_goods_left" v-else>
                <img :src="require('assets/img/good/'+item.goodsPhoto)" v-if="item.goodsPhoto != undefined">
            </div>
            <div class="hot_list_goods_right">
                <p class="hot_title">{{item.goodsName}}</p>
                <p class="hot_price">{{item.goodsPrice}}元/份</p>
                <span class="hot_count">已销售：{{item.sells[0].sellNum}}</span>
                <input value="购买" type="button" class="btn" @click="GoodsBtn(item.goodsId,item.dessertId)">
            </div>
        </div>
    </div>

</template>

<script>
    import {GoodsBtn} from "../../common/mixin";

    export default {
        name: "HotGoodsList",
        props:{
            hotGoodsList:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        mixins:[GoodsBtn]
    }
</script>

<style scoped>
    .hot_list{
        /*border: 1px solid red;*/
        width: auto;
        display: flex;
        padding-left: 0.5rem;
        margin-bottom: 1rem;
        padding-top: 0.5rem;

    }
    .hot_list_goods_left{
        width: 11rem;
       /* border: 1px solid blue;*/
        height: 6.8rem;
        border-radius: 1rem;
        overflow: hidden;
    }
    .hot_list_goods_right{
        width: 13.5rem;
       /* border: 1px solid brown;*/
        height: 7rem;
        line-height: 2.3rem;
        padding-left: 1.4rem;
    }
    .hot_list_goods_left img{
        height: 100%;
        width: 100%;
        max-width: 100%;
        height: 6.8rem;

    }
    .hot_list_goods_right .btn{
        border: 0;
        font-size: 1rem;
        color: white;
        background-color: #fdce41;
        border-radius: 0.8rem;
        padding: 0.3rem;
        width: 3rem;
        outline: none;
        position: relative;
        left: 4rem;

    }
    .hot_list_goods_right .hot_title{
        font-size: 1rem;
        color: black;
    }
    .hot_list_goods_right .hot_price{
        font-size: 0.8rem;
        color: red;
    }
    .hot_list_goods_right .hot_count{

        position: relative;
        font-size: 0.7rem;
        color: #d2d2d5;
    }
</style>