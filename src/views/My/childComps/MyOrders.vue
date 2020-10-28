<template>
    <div>
        <MyListItem v-for="item in this.ordersList">
            <div slot="carImg">
                <img :src="require('assets/img/good/'+item.goodsalls.goodsPhoto)" style="width: 8.5rem;border-radius: 0.4rem;margin-right: 1.5rem;height: 100%">
            </div>
            <div slot="right">
                <h5 style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 6rem">{{item.goodsalls.goodsName}}</h5>
                <p  style="font-size: 0.8rem;padding-top: 0.5rem;padding-bottom: 0.3rem">{{item.specsChoice}}/{{item.tasteChoice}}</p>
                <p style="font-size: 0.8rem">数量：{{item.count}}</p>
                <div style="display: flex;">

                    <p style="padding-top: 0.5rem;color: red;">￥{{item.goodsalls.goodsPrice}}</p>
                        <button type="button" @click="tkBtn(item.ordersId)">退货</button>
                </div>
            </div>
        </MyListItem>

    </div>
</template>

<script>
    import MyListItem from "./MyListItem";
    import {findByIdOrder,deleteByOrderId} from "../../../network/My";
    import {formatDate} from '../../../common/util'

    export default {
        name: "MyOders",
        components:{
            MyListItem,
        },
        data(){
         return{
             ordersList:''
         }
        },
        created() {
            this.findByIdOrder()
        },
        methods:{
            findByIdOrder(){
                console.log("aa")
                let uid =sessionStorage.getItem("userId")
                if(uid!=undefined && uid!=''){
                    findByIdOrder(uid).then( res => {
                        console.log(res)
                        this.ordersList = res
                    })
                }

            },
            tkBtn(ordersId){
                console.log(ordersId)
                for (let i=0;i<this.ordersList.length;i++){
                    if(this.ordersList[i].ordersId == ordersId){
                        //下单日期
                        let orderDate=new Date(this.ordersList[i].orderDate.substring(0,19).replace(/-/g, "/"));
                        //系统当前日期
                        let date=new Date();

                        let dateDiff = date.getTime() - orderDate.getTime();//时间差的毫秒数
                        let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
                        let leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
                        let hours=Math.floor(leave1/(3600*1000))//计算出小时数
                        //计算相差分钟数
                        let leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
                        let minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
                        //计算相差秒数
                        let leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
                        let seconds=Math.round(leave3/1000)
                        console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");
                        let time = dayDiff*(60*60)+(hours*60*60)+(minutes*60)+(seconds)

                        if(time<=1800){
                            //可以退款
                            console.log(this.ordersList[i]);
                            const refundList={"userId":'',"goodsId":'',"count":0,"specsChoice":'',"tasteChoice":'',"refundDate":''}
                            refundList.userId=sessionStorage.getItem("userId");
                            refundList.goodsId=this.ordersList[i].goodsalls.goodsId;
                            refundList.count = this.ordersList[i].count;
                            refundList.specsChoice=this.ordersList[i].specsChoice;
                            refundList.tasteChoice = this.ordersList[i].tasteChoice;
                            refundList.refundDate=formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")

                            this.$confirm('确认要取消退款吗?', '提示', {
                                customClass: 'message-logout'
                            }).then(() => {
                                console.log("确定")
                                this.$http.post("http://47.115.132.232/CataApp/refundController/addRefund",refundList).then(res =>{
                                    if(res.status==200){
                                        console.log("已退款")
                                        deleteByOrderId(ordersId).then(res =>{
                                            console.log(res)
                                            this.findByIdOrder()
                                        })
                                    }
                                })
                            }).catch(() =>{
                                console.log("取消")
                            })
                        }else {
                            //不可退款
                            alert("下单30分钟后不可退款")
                        }
                    }
                }
            }
        },
        computed:{
            isShowBtn(){
                this.ordersList.forEach(item =>{
                    console.log(item.orderDate);
                })
            }
        }
    }
</script>

<style scoped>
    .carRight {
        background-color: white;
        height: 6rem;
        margin-bottom: 0.5rem;
        /*border: 1px solid red;*/
        width: 93%;
        display: flex;
        margin-left: 1rem;
    }
   button{
        outline: none;
        border: 0;
        background-color: #fdce41;
        color: white;
       padding: 0.2rem;
       border-radius: 0.3rem;
       position: relative;
       left: 8rem;
    }

</style>
<style>
    .message-logout {
        width: 350px;
    }
</style>