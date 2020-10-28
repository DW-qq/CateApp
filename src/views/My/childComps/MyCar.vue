<template>
    <div>
        <div class="carList" v-for="(addList,index) in $store.state.addList" :key="index">
            <div class="carLeft">
                <check-button :is-checked="addList.check" @click.native="checkBtn(index)"/>
            </div>
            <div class="carRight">
                    <div class="carCenter">
                        <img :src="require('assets/img/good/'+addList.img)" style="width: 8.5rem;border-radius: 0.4rem;margin-right: 1.5rem;height: 100%" v-if="addList.img != undefined">
                </div>
                <div style="padding-top: 0.5rem">
                    <h5 style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 6rem">{{addList.title}}</h5>
                    <p  style="font-size: 0.8rem;padding-top: 1rem;padding-bottom: 1rem">{{addList.specsChoice}}/{{addList.tasteChoice}}</p>

                    <div style="display: flex;">
                        <p style="padding-top: 0rem;color: red;">￥{{addList.price}}</p>
                        <div class="btnList">
                            <button @click="subtractCarBtn(addList.count--,addList.id)">-</button>
                            <span style="width: 2.8rem;display: inline-block;text-align: center" v-show="addList.count>0">{{addList.count}}</span>
                            <button @click="addBtn(addList.id)">+</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import CheckButton from "../../../components/content/checkButton/CheckButton";
    import {addBtn,subtractCarBtn} from "../../../common/mixin";
    import {mapState} from 'vuex'

    export default {
        name: "MyCar",
        components:{
            CheckButton
        },
        mixins:[addBtn,subtractCarBtn],
        data(){
            return{
                isShowCheckBtn:false,
                num:5
            }
        },
        methods:{
            ...mapState(["addList"]),
            checkBtn(index){
                console.log(index)
                this.$store.state.addList[index].check = !this.$store.state.addList[index].check
            }
        }
    }
</script>

<style scoped>
.carList{
   /* border: 1px solid red;*/
    padding: 1rem 1rem 0rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

}
.carLeft{
    padding-right: 0.5rem;
}
    .carRight {
       background-color: white;
        height: 6rem;
        margin-bottom: 0.5rem;
        /*border: 1px solid red;*/
        width: 22rem;
        display: flex;
    }
    .btnList{
        border: 1px solid #d9d9d9;
        width: 7rem;
        border-radius: 0.2rem;
        height: 1.7rem;
        position: relative;
        left: 2.3rem;
        top: -0.5rem;
    }
    .btnList button{
        border: 0;
        width: 2rem;
        height: 1.7rem;
        outline: none;
    }
</style>