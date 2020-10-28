<template>
    <div class="MyNav">
            <div v-for="(item,index) in title"   @click="tabBtn(index)">
                <span :class="{active : index === currentIndex}">{{item}}</span>
            </div>
    </div>
</template>

<script>
    export default {
        name: "MyNav",
        data(){
            return{
                title:['购物车','代付款','订单','退款/售后'],
                currentIndex:0,
            }
        },
        methods:{
            tabBtn(index){
                this.currentIndex = index;
                this.$emit('tabBtn',index)
            }
        }
    }
</script>

<style scoped>
.MyNav{
    display: flex;
    padding: 1.5rem;
   /* border: 1px solid red;*/
}
    .MyNav div{
        flex: 1;
        color: black;
    }
    .MyNav div span{
        font-size: 0.9rem;
    }
.active{
    padding-bottom: 1rem;
    border-bottom: 2px solid #ffcc3e;

}
</style>