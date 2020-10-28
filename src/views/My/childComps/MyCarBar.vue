<template>
    <div class="myBar">
        <div class="myCarCheck">
            <check-button :is-checked="isSelcetAll" @click.native="checkBtn" style="height: 1.5rem;"/><span style="padding-top: 0.3rem">全选</span>
        </div>
        <div style="width: 20.5rem;display: flex;">
            <div style="margin-top: 1rem;margin-left: 9rem">合计：{{totalPrice}}</div>
            <div class="js"><button @click="jsBtn">结算</button></div>
        </div>
    </div>
</template>

<script>
    import CheckButton from "../../../components/content/checkButton/CheckButton";
    import {mapGetters,mapState} from 'vuex'
    import {formatDate} from "../../../common/util";
    export default {
        name: "MyCarBar",
        components:{
            CheckButton
        },
        data(){
            return{
                isShowCheckBtn:false,
                orderList:[],
            }
        },
        ...mapState(["ordersList","addList","payordersList","nid"]),
        computed:{
            ...mapGetters(["goodsList"]),
            isSelcetAll(){
                //filter数组函数(如果有一个不选中则为false)
                return !this.goodsList.find(item => !item.check)
            },
            totalPrice(){
                return this.$store.state.addList.filter(item => {
                    return item.check
                }).reduce((previousValue, currentValue) => {
                    return previousValue+currentValue.price*currentValue.count
                },0).toFixed(2)
            },
        },
        methods:{
            checkBtn(){
                if(this.isSelcetAll){
                    //全部不选中
                    this.goodsList.forEach(item => item.check = false)
                }else {
                    //部分不选中
                    this.goodsList.forEach(item => item.check = true)
                }
            },
            jsBtn(){
                this.$store.state.payordersList.splice(0,this.$store.state.payordersList.length)
               for(let i=0;i<this.goodsList.length;i++){
                   if(this.goodsList[i].check == true){
                       if(this.goodsList[i].count>0){
                           const order ={"goodsId":'',"userId":'',count:0,orderDate:'',specsChoice:'',tasteChoice:''}
                           order.goodsId = this.goodsList[i].id
                           order.userId = this.$store.state.uId
                           order.count =  this.goodsList[i].count
                           order.orderDate=formatDate(new Date(),"yyyy-MM-dd hh:mm:ss")
                           order.specsChoice= this.goodsList[i].specsChoice
                           order.tasteChoice= this.goodsList[i].tasteChoice
                           this.$store.state.payordersList.push(order);
                       }
                       this.$store.state.nid=0
                       this.$router.push('/wxPay')
                   }

               }

            }
        }
    }
</script>

<style scoped>
.myBar{
    background-color: white;
    height: 2rem;
    justify-content: center;
    align-content: center;
    display: flex;
}
.myCarCheck{
    padding-top: 0.7rem;
    padding-right: 0.5rem;
    display: flex;
}
    .js button{
        outline: none;
        height: 55px;
        border: 0;
        position: absolute;
        right: 0;
        padding: 1rem;
        background-color: #fdce41;
        color: white;
        width: 6rem;
    }
</style>