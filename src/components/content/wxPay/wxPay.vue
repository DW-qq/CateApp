<template>
    <div class="wxPay">
        <nav-tab class="login_nav">
            <div slot="left" class="back" @click="backOf" style="padding-top: 1rem"><i class="el-icon-arrow-left" style="font-size: 1.8rem"></i> </div>
        </nav-tab>
        <div class="wxPayCenter">
            <h3 style="letter-spacing: 1.5rem">微信支付</h3>
            <img :src="'http://localhost:8899/wxpay/doPay/'+this.$store.state.uId" style="width: 300px;height: 300px">

        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {formatDate} from "../../../common/util"
    import navTab from "../../common/navTabBar/navTab";
    import {deleteById} from "../../../network/My";

    export default {
        name: "wxPay",
        ...mapState(["addList","uId","num","isShowGoods","nid","ordersList","payordersList","num"]),
        components:{
            navTab
        },
        data(){
            return{
                uid:'',
                ordersList:[],
                status:false,
                fromUrl:'',
                oneOrder:[]
            }
        },
        mounted() {
            this.uid = this.$store.state.uId
            //存储订单信息
            this.addOrderList()
            window.addNonpayment = this.addNonpayment;
            window.addOrder = this.addOrder// 方法赋值给window


            //接收goeasy值
            this.$goEasy.subscribe({
                channel:"state",
                onMessage:function (message) {
                    console.log("Channel:" + message.channel + " content:" + message.content);
                    if(message.content == "200"){
                       alert("支付成功，还有三秒跳转首页")
                        //添加订单表
                        addOrder();
                        setTimeout(function () {
                            window.location.href="http:localhost:8080"
                        },3000)
                    }else {
                        addNonpayment();
                    }
                }
            })
        },
        beforeDestroy() {
            console.log("页面销毁")
        },
        beforeRouteEnter(to,form,next){
            sessionStorage.setItem("formUrl",form.name)
            next();
        },
        methods:{
            addOrderList(){
                console.log(sessionStorage.getItem("formUrl"))
                for (let i=0;i<this.$store.state.addList.length;i++){
                    const order ={"orderDate":'',"userId":'',"goodsId":'',"count":0,"specsChoice":'',"tasteChoice":''}
                    order.goodsId = this.$store.state.addList[i].id
                    order.userId = this.$store.state.uId
                    order.count = this.$store.state.addList[i].count
                    order.orderDate=formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")
                    order.specsChoice=this.$store.state.addList[i].specsChoice
                    order.tasteChoice=this.$store.state.addList[i].tasteChoice
                    this.ordersList.push(order)
                }
            },
            addNonpayment(){
                //添加代付款
                this.$http.post("http://localhost:8899/nonpaymentController/addNonpayment",this.ordersList).then(res =>{
                    if(res.data == true){
                        if(sessionStorage.getItem("formUrl")=="Details") {
                            this.$store.state.addList.splice(0, this.$store.state.addList.length)
                            this.$store.state.num = 0
                            this.$store.state.isShowGoods = true
                        }
                    }
                })
            },
            addOrder(){
                //添加订单
                //多个添加order
                if(sessionStorage.getItem("formUrl")=="Details") {
                    console.log("111")
                    this.$http.post("http://localhost:8899/orderController/addOrder", this.ordersList).then(res => {
                        if (res.data == true) {
                            this.$store.state.addList.splice(0, this.$store.state.addList.length)
                            this.$store.state.num = 0
                        } else {
                            //支付失败
                            this.addNonpayment();
                        }
                    })
                }else {
                    console.log(this.$store.state.payordersList)
                    //单个添加order
                    this.$http.post("http://localhost:8899/orderController/addOrder", this.$store.state.payordersList).then(res => {
                        if (res.data == true){
                            //下单成功后删除addList的数据记录
                            for(let i =0;i<this.$store.state.addList.length;i++){
                                console.log(this.$store.state.addList[i].id )
                                console.log(this.$store.state.payordersList[i].goodsId);
                                if (this.$store.state.addList[i].id == this.$store.state.payordersList[i].goodsId){
                                    //根据id删除数据
                                    this.$store.state.addList.splice(i,1)
                                    this.$store.state.num=this.$store.state.num-this.$store.state.payordersList[i].count
                                }
                            }
                            //下单成功删除代付款
                            let nonPaymentId=this.$store.state.nid;
                            console.log(nonPaymentId)
                            if(nonPaymentId!=0){
                                deleteById(nonPaymentId).then(res =>{
                                    console.log(res)
                                })
                            }

                        }
                    })

                }
            },
            getdeleteById(){
                //下单成功删除订单表
                let nonPaymentId=this.$route.query.nonPaymentId;
                deleteById(nonPaymentId).then(res =>{
                    console.log(res)
                })
            },
            backOf(){
                this.$confirm('确认要取消订单吗?', '提示', {
                    customClass: 'message-logout'
                }).then(() => {
                    console.log("确定")
                    if(sessionStorage.getItem("formUrl")=="Details") {
                        //添加代付款
                        this.addNonpayment();
                    }


                    this.$router.go(-1)
                }).catch(() =>{
                    console.log("取消")
                })
            }
        }
    }
</script>

<style scoped>
.wxPay{
    position: fixed;
    z-index: 11;
    height: 736px;
    width: 100%;
    background-color: white;
}
    .wxPayCenter{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        justify-content: center;
        align-content: center;
        text-align: center;
        line-height: 4rem;
    }

</style>
<style>
    .message-logout {
        width: 350px;
    }
</style>