<template>
    <div class="goods">
        <div class="bd" >
                    <div class="cake_info" v-for="item in goods" :key="item.goodsId">
                            <img :src="require('assets/img/good/'+item.goodsPhoto)" v-if="item.goodsPhoto != undefined">
                            <p class="cate_title">{{item.goodsName}}</p> <span class="cate_count" v-if="item.sells != undefined">已销售:{{item.sells[0].sellNum}}</span><br>
                            <span class="cate_price">{{item.goodsPrice}}元/份</span>
                            <button  type="button" class="btn" @click="GoodsBtn(item.goodsId,item.dessertId)">立即购买</button>

                    </div>
        </div>

    </div>
</template>

<script>
    import {GoodsBtn} from "../../../common/mixin";

    export default {
        name: "GoodsList",
        props:{
            goods:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        mixins:[GoodsBtn],
        methods:{

        }
    }
</script>

<style scoped>

    .bd{

        height: 700px;
    }
    .cake_info{
        background-color: #fcfbfb;border-radius: 0.7rem;
        width: 12rem;
        height: 12.5rem;
        float: left;
        box-shadow: 0px -3px 1px rgba(100,100,100,0.05);
        margin-left: 0.6rem;
      margin-bottom: 1rem;

    }
    .bd .cake_info img{
        width: 100%;
        height:8rem;
        border-radius: 0.7rem;
    }
    .bd .cake_info .btn {
        border: 0;
        font-size: 0.8rem;
        color: white;
        background-color: #fdce41;
        border-radius: 0.4rem;
        width: 4rem;
        height: 2rem;
        outline: none;
        margin-left: 3.5rem;
    }
    .bd .cake_info .cate_title{
        color: black;
        font-size: 0.8rem;
        overflow: hidden;
        width: 5rem;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .bd .cake_info .cate_price{
        font-size: 1rem;
        color: red;
        width: 4rem;
    }
    .bd .cake_info .cate_count{
        color: #d2d2d5;
        margin-left: 2rem;
        font-size: 0.8rem;
        position: relative;
        bottom: 0rem;
        top: -1rem;
        left: 4.6rem;
    }

</style>