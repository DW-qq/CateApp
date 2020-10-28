<template>
    <div>
        <MyListItem v-for="item in this.refundList">
            <div slot="carImg">
                <img :src="require('assets/img/good/'+item.goodsalls.goodsPhoto)" style="width: 8.5rem;border-radius: 0.4rem;margin-right: 1.5rem;height: 100%">
            </div>
            <div slot="right">
                <h5 style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 6rem">{{item.goodsalls.goodsName}}</h5>
                <p  style="font-size: 0.8rem;padding-top: 1rem;padding-bottom: 1rem">{{item.specsChoice}}/{{item.tasteChoice}}</p>
                <div style="display: flex;">
                    <p style="color: red;">￥{{item.goodsalls.goodsPrice}}</p>
                    <p style="position: relative;left: 10rem">x{{item.count}}</p>
                </div>
            </div>
        </MyListItem>
    </div>
</template>

<script>
    import MyListItem from "./MyListItem";
    import {findByIdRefund} from "../../../network/My";

    export default {
        name: "MyRefund",
        components:{
            MyListItem
        },
        created() {
            this.getAll()
        },
        data(){
            return{
                refundList:''
            }
        },
        methods:{
            getAll(){
                let uid =sessionStorage.getItem("userId")
                if(uid!=undefined && uid!='') {
                    findByIdRefund(uid).then(res => {
                        this.refundList = res
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>