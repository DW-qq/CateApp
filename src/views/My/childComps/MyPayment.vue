<template>
    <div>
        <MyListItem v-for="(item,index) in this.paymentList">
            <div slot="carImg">
                <img :src="require('assets/img/good/'+item.goodsalls.goodsPhoto)" style="width: 8.5rem;border-radius: 0.4rem;margin-right: 1.5rem;height: 100%">

            </div>
            <div slot="right">
                <h5 style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 6rem">{{item.goodsalls.goodsName}}</h5>
                <p  style="font-size: 0.8rem;padding-top: 0.5rem;padding-bottom: 0.3rem">{{item.specsChoice}}/{{item.tasteChoice}}</p>
                <p style="font-size: 0.8rem">数量：{{item.count}}</p>
                <div style="display: flex;">

                    <p style="padding-top: 0.5rem;color: red;">￥{{item.goodsalls.goodsPrice}}</p>
                    <div class="btnList">
                       <button type="button" @click="xdBtn(item.nid,index)">下单</button>
                    </div>

                </div>
            </div>
        </MyListItem>
    </div>
</template>

<script>
    import MyListItem from "./MyListItem";
    import {findByIdPayment} from "../../../network/My";
    import {mapState} from 'vuex'
    import {formatDate} from "../../../common/util";

    export default {
        name: "MyPayment",
        components:{
            MyListItem
        },
        data(){
            return{
                paymentList:''
            }
        },
        created() {
            this.findByIdPayment()
        },
        ...mapState(["nid","ordersList","payordersList"]),
        methods:{
            findByIdPayment(){
                let uid =sessionStorage.getItem("userId")
                if(uid!=undefined && uid!=''){
                    findByIdPayment(uid).then( res => {
                        console.log(res)
                        this.paymentList = res
                    })
                }

            },
            xdBtn(nid,index){
                this.$store.state.payordersList.splice(0,this.$store.state.payordersList.length)
                this.$store.state.nid=nid
                const order ={"goodsId":'',"userId":'',count:0,orderDate:'',specsChoice:'',tasteChoice:''}
                order.goodsId = this.paymentList[index].goodsId
                order.userId = this.$store.state.uId
                order.count = this.paymentList[index].count
                order.orderDate=formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")
                order.specsChoice=this.paymentList[index].specsChoice
                order.tasteChoice=this.paymentList[index].tasteChoice
                this.$store.state.payordersList.push(order);
                console.log(this.$store.state.payordersList)
                this.$router.push('/wxPay')

            }
        }
    }
</script>

<style scoped>
.btnList button{
    border: 0;
    padding: 0.4rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    color: white;
    background-color: #fdce41;
    position: relative;
    left: 8rem;
    outline: none;
}
</style>