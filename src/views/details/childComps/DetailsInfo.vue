<template>
    <div>
        <img :src="require('assets/img/good/'+goods.img)" v-if="goods.img != undefined" style="height: 14rem;width: 103%;"/>
        <div class="detailsInfo">
            <h4>{{goods.title}}</h4>
            <p class="xiaosao"><span>月销售{{goods.sellNum}} 好评100%</span></p>


            <div v-if="$store.state.isShowGoods" >
                <span class="price">￥{{goods.price}}</span>
                <i class="el-icon-plus" @click="addBtn" v-if="type!=2"></i>
                <button type="button" class="xz" @click="dialogVisible = true" v-else>请选择规格</button>
            </div>

            <div v-for="item in $store.state.addList" v-else>
                <span  :key="item.id" v-if="item.id==goods.id">
                    <span class="price">￥{{item.price}}</span>

                    <i @click="subtractBtn" class="el-icon-minus" v-show="item.isShowsubtractBtn" v-if="type!=2"></i>
                    <i @click="$store.state.dialogVisible=true" class="el-icon-minus" v-show="item.isShowsubtractBtn" v-else></i>

                <span  class="num"  v-show="item.isShowsubtractBtn">{{item.count}}</span>
                <i class="el-icon-plus" @click="addBtn" v-if="type!=2"></i>
                    <i class="el-icon-plus" @click="dialogVisible=true" v-else></i>
                </span>
            </div>

            <el-dialog
                    :visible.sync="dialogVisible"
                    width="100%"
                    :modal="false"
                    :lock-scroll="false"
                    top="200px"
            class="el-dialog__wrapper"
                    @close="close"
                    @open="open"
            >

                <div style="height: 540px;padding: 30px 20px">
                    <table border="0">
                        <tr>
                            <td rowspan="3" width="70rem" style="padding-right: 1rem"><img :src="require('assets/img/good/'+goods.img)" v-if="goods.img != undefined" style="height: 7rem;border-radius: 0.5rem;"></td>

                            <td><h4>{{goods.title}}</h4></td>

                        </tr>
                        <tr>
                            <td>已选：{{tasteChoice}}/{{specsChoice}}</td>
                        </tr>
                        <tr>
                            <td class="price">￥{{goods.price}}</td>
                        </tr>
                        <tr>
                            <td style="padding-top: 0.5rem">数量</td>
                            <td width="300px" align="right" style="padding-bottom: 1.5rem">
                                <i @click="subtractCarBtn" class="el-icon-minus"></i>
                                <span  class="num">{{num}}</span>
                                <i class="el-icon-plus" @click="addCarBtn"></i>
                            </td>
                        </tr>
                        <tr>味道</tr>
                        <tr>
                            <td colspan="3" style="padding-bottom: 1rem">
                                <div v-for="(item,index) in taste" class="taste" >
                                    <button type="button" @click="tasteBtn(index)" class="tasteBtn" :class="{active : index === tasteCurrentIndex}">{{item}}</button>
                                </div>
                            </td>
                        </tr>
                        <tr >规格</tr>
                        <tr>
                            <td colspan="3">
                                <div v-for="(item,index) in specs" class="specs" >
                                    <button type="button" @click="specsBtn(index)" class="specsBtn" :class="{active : index === specsCurrentIndex}">{{item}}</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" colspan="3">
                                <button class="addCar" @click="addCar">加入购物车</button>
                            </td>
                        </tr>
                    </table>

                </div>

            </el-dialog>

        </div>
        <!--{{$store.state.addList}}
        {{$store.state.isShowGoods}}
        {{goods.id}}-->
        <!--{{type}}-->
        <!--{{$store.state.addList}}
        {{$store.state.addCarList}}-->

    </div>



</template>

<script>
    import {mapState,mapGetters} from 'vuex'
    export default {
        name: "DetailsInfo",
        data() {
            return {
                num: 0,
                isShowsubtractBtn:false,
                addGoodsList:{},
                dialogVisible: false,
                taste:['冷','热','常温','加冰'],
                specs:['小杯（500ml）','大杯（700ml）'],
                specsCurrentIndex:0,
                tasteCurrentIndex:0,
                tasteChoice:'冷',
                specsChoice:'小杯（500ml）',
                closeNum:0
            };
        },
        props:{
            goods:{
                type:Object
            },
            type:{
                type:String
            }
        },
        methods: {

            addBtn() {
                console.log("add"+this.goods.price);
                const price = this.goods.price
                const count = this.goods.count
                const id = this.goods.id
                const title = this.goods.title
                const img = this.goods.img
                const isShowsubtractBtn = this.goods.isShowsubtractBtn
                const check = this.goods.check;
                const tasteChoice = ''
                const  specsChoice = ''
                this.addGoodsList = {price,id,count,isShowsubtractBtn,title,img,check,tasteChoice,specsChoice }
                // this.num++
                this.isShowsubtractBtn = true
                this.$store.dispatch('addGoods',this.addGoodsList).then(res =>{
                    console.log('立面已完成提交');
                    /*this.num = res*/
                })
            },
            subtractBtn(){
                const price = this.goods.price
                const count = this.num--
                const id = this.goods.id
                const title = this.goods.title
                const img =this.goods.img
                const isShowsubtractBtn = this.goods.isShowsubtractBtn
                const tasteChoice = this.tasteChoice
                const  specsChoice = this.specsChoice
                this.addGoodsList = {price,id,count,isShowsubtractBtn,title,img,tasteChoice,specsChoice }
                // this.num++
                this.isShowsubtractBtn = true

                console.log(this.addGoodsList)
                this.$store.dispatch('subtractGoods',this.addGoodsList).then(res =>{
                    console.log('立面已完成提交');
                    /*this.num = res*/
                })
                if(count<=0){
                    this.dialogVisible=false
                }
            },
            tasteBtn(index){
                this.tasteCurrentIndex = index
                this.tasteChoice=this.taste[index]
                /*console.log(this.taste[index])*/
            },
            specsBtn(index){
                this.specsCurrentIndex = index
                this.specsChoice = this.specs[index]
               /* console.log(index)*/
            },
            addCarBtn(){
                if(this.closeNum==0){
                    const price = this.goods.price
                    const count = 1+this.num++
                    const id = this.goods.id
                    const title = this.goods.title
                    const img =this.goods.img
                    const isShowsubtractBtn = this.goods.isShowsubtractBtn
                    const tasteChoice = this.tasteChoice
                    const  specsChoice = this.specsChoice
                    const check = this.goods.check;
                    this.addGoodsList = {price,id,count,isShowsubtractBtn,title,img,tasteChoice,specsChoice,check }
                    // this.num++
                    this.isShowsubtractBtn = true
                    console.log("添加")
                }else {
                    this.addGoodsList={}
                    console.log("不添加")
                }
            },
            subtractCarBtn(){
                const price = this.goods.price
                const count = this.num--
                const id = this.goods.id
                const title = this.goods.title
                const img =this.goods.img
                const isShowsubtractBtn = this.goods.isShowsubtractBtn
                const tasteChoice = this.tasteChoice
                const  specsChoice = this.specsChoice
                this.addGoodsList = {price,id,count,isShowsubtractBtn,title,img,tasteChoice,specsChoice }
                // this.num++
                this.isShowsubtractBtn = true

                console.log(this.addGoodsList)
                if(count<=0){
                    this.dialogVisible=false
                }
            },
            addCar(){
                console.log("点击")
                console.log(this.addGoodsList)
                this.$store.dispatch('addCar',this.addGoodsList)
                this.dialogVisible = false
            },
            close(){
                console.log("关闭")
                this.addGoodsList=''
                this.closeNum = 1;
                this.num = 0
            },
            open(){
                console.log("打开")
                this.addGoodsList=''
                this.closeNum = 0;
            },
        },
    }
</script>

<style scoped>
.detailsInfo{
    /*border: 1px solid red;*/
    background-color: white;
    position: relative;
    height: 110px;
    padding-left: 1rem;
    line-height: 2rem;
}
.el-icon-minus{
    border: 0.02rem solid #cccccc;
    border-radius: 2rem;
    background-color: #fafdfd;
    color: #ccc;
    font-size: 1rem;
    padding: 0.48rem;
    position: absolute;
    right: 5rem;
}
.el-icon-plus{
    border-radius: 2rem;
    background-color: #fdce41;
    color: white;
    font-size: 1rem;
    padding: 0.5rem;
    position: absolute;
    right: 1.5rem;
}
    .price{
        color: red;
    }
    .num{
        position: absolute;
        right: 4rem;
    }
    .xiaosao{
        font-size: 0.5rem;
        letter-spacing: 0.02rem;
        color: #8c939d;
    }
    .xz{
        border: 0;
        background-color: #fdce41;
        color: white;
        padding: 0.5rem;
        outline: none;
        border-radius: 0.8rem;
        width: 5rem;
        font-size: 0.8rem;
        position: absolute;
        right: 1.5rem;
    }
    .taste,.specs{
        display: inline;
    }

    .tasteBtn,.specsBtn{
        border: 0;
        outline: none;
        background-color: #f5f5f5;
        padding: 0.5rem;
        width: 7rem;
        margin-right: 0.5rem;
        margin-top: 1rem;
        border-radius: 0.3rem;
    }
    .active{
        background-color:#fdce41;
        color: white;
    }
    .addCar{
        border: 0;
        outline: none;
        background-color:#fdce41;
        color: white;
        width: 100%;
        padding: 0.7rem;
        border-radius: 0.3rem;
        margin-top: 3rem;
    }
</style>

<style>
    .el-dialog__wrapper{
        overflow: hidden;
        /*border: 1px solid red;*/
    }
    .el-dialog__wrapper .el-dialog__header{
        padding: 0px;
    }
</style>