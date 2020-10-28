<template>
    <div class="detailsBar">
        <!--卡片-->
        <el-badge :value="$store.state.num" class="item" :hidden="$store.state.num<=0">

            <i class="el-icon-shopping-cart-2"  v-if="$store.state.num<=0"></i>
            <i class="el-icon-shopping-cart-2" @click="dialogVisibleBtn" v-else-if="$store.state.num>=1"></i>
        </el-badge>
        <button class="jiesuan" @click="jsBtn">结算（{{totalPrice}}）</button>
        <el-dialog
                :visible.sync="$store.state.dialogVisible"
                width="100%"
                :modal="false"
                :lock-scroll="false"
                :top="dialogHeight"
                :show-close="false"
                class="el-dialog__wrapper"
        >

            <div class="carList" style="height: 420px;" >
                <div style="height: 30px;background-color: #fdf2d1;text-align: center;padding-top: 6px;letter-spacing: 2px;color: #b1b1b1">美食甜品屋</div>
               <div class="headCarList">
                   <h4>已选商品</h4>
                   <i class="el-icon-delete" @click="emptyCarBtn"></i>
                   <span style="font-size: 0.8rem;margin-left: 0.7rem;letter-spacing: 0.3rem;">清空</span>
               </div>
                <scroll class="scroll" ref="scroll"
                        :probe-type="3"
                        :pull-up-load="true">

                    <ul v-for="(addList,index) in $store.state.addList" :key="index">
                        <li>
                            <table border="0">
                                <tr>
                                    <td rowspan="3" width="22rem"><img :src="require('assets/img/good/'+addList.img)" style="width: 7rem;border-radius: 0.4rem;margin-right: 1.5rem" v-if="addList.img != undefined"></td>
                                    <td width="100px" colspan="2"><h4>{{addList.title}}</h4></td>
                                </tr>
                                <tr>
                                    <td  v-if="addList.specsChoice!=undefined||addList.tasteChoice!=undefined" colspan="3" style="padding-top: 1rem;font-size: 0.7rem">{{addList.specsChoice}}/{{addList.tasteChoice}}</td>
                                </tr>
                                <tr>
                                    <td height="30px" style="padding-top: 1rem;color: red;">￥{{addList.price}}</td>
                                    <td width="190px" align="right" style="padding: 0rem">
                                        <i @click="subtractCarBtn(addList.count--,addList.id)" class="el-icon-minus" v-show="addList.count>0" ></i>
                                        <span  class="num"  v-show="addList.count>0">{{addList.count}}</span>
                                        <i class="el-icon-plus" @click="addBtn(addList.id)" ></i>
                                    </td>
                                </tr>
                            </table>

                        </li>
                    </ul>
                </scroll>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import { mapState ,mapGetters} from 'vuex'

    import Scroll from "../../../components/content/scroll/Scroll";
    import {addBtn,subtractCarBtn} from "../../../common/mixin";

    export default {
        name: "DetailsBar",
        data(){
            return{
                goodsCarList:{},
                totalCarNum:0,
                dialogHeight:260+'px'
            }
        },
        mixins:[addBtn,subtractCarBtn],
        components:{
            Scroll
        },
        mounted() {
            this.goodsCarList = this.$store.state.addList
        },
        watch:{

        },
        methods:{
            ...mapState(['addList','num','dialogVisible','isShowGoods','isCarShow']),
            dialogVisibleBtn(){
                this.$store.state.dialogVisible= true
            },
            jsBtn(){
                if(this.$store.state.addList.length>0){
                    this.$router.push('/wxPay')
                }else {
                    this.$message.error("请选择你要购买的商品")
                }

            },

            emptyCarBtn(){
                this.$confirm('确认要清空购物车吗?', '提示', {
                    customClass: 'message-logout'
                }).then(() => {
                    //清空购物车
                    this.$store.state.addList.splice(0,this.$store.state.addList.length)
                    this.$store.state.num=0;
                    this.$store.state.dialogVisible=false
                    this.$store.state.isShowGoods=true

                    this.$message({
                        message: '已清空',
                        type: 'success'
                    })
                }).catch(() => { /* 用户取消注销 */ })
            }
        },
        computed:{
            ...mapGetters(['goodsList','carNum']),
            totalPrice(){
                return this.$store.state.addList.filter(item =>{
                    return item.count
                }).reduce((previousValue, currentValue) => {
                    return previousValue+currentValue.price*currentValue.count
                },0)
            },

        }
    }
</script>

<style scoped>
.detailsBar{
    background-color: white;
    height: 55px;
    padding-left: 1rem;

}
    .el-icon-shopping-cart-2{
        color: #fdce41;
        font-size: 2.3rem;
        position: relative;

    }
    .jiesuan{
        outline: none;
        height: 55px;
        border: 0;
        position: absolute;
        right: 0;
        padding: 1rem;
        background-color: #fdce41;
        color: white;

    }
    .item{
        margin-top: 1rem;
    }
    .car{
        background-color: white;
        height: 200px;
        position: relative;

    }
    ul li {
        list-style-type: none;
        margin-bottom: 1rem;
        padding: 10px;
        /*border: 1px solid red;*/

    }
.el-icon-minus{
    border: 0.02rem solid #cccccc;
    border-radius: 2rem;
    background-color: #fafdfd;
    color: #ccc;
    font-size: 1rem;
    padding: 0.45rem;
    position: absolute;
    right: 5rem;
    margin-top: -0.7rem;
}
.el-icon-plus{
    border-radius: 2rem;
    background-color: #fdce41;
    color: white;
    font-size: 1rem;
    padding: 0.45rem;
    position: absolute;
    right: 1.5rem;
    margin-top: -0.7rem;
}
.num{
    position: absolute;
    right: 4rem;
}

    .headCarList h4{
        padding-left: 1.3rem;
        padding-top: 1rem;
        padding-bottom: 0.7rem;
       /* border: 1px solid red;*/
        width: 20rem;
        display: inline-block;

    }
    .el-button{
        background-color: #eeeeee;
        border: 0px;
        display: inline-block;
        padding: 0.7rem;
        border: 0;
        border-radius: 80rem;
    }

.scroll{
    height: 330px;
    overflow: hidden;
    /*border: 1px solid red;*/
}
</style>
<style>
.el-dialog__body{
    /*border: 1px solid red;*/
    padding: 0px;
}
#el-popover-3789{
    background-color: #fdce41;
}
.message-logout {
    width: 350px;
}

</style>