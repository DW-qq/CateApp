import  Vue from 'vue'
import Vuex from 'vuex'
import el from "element-ui/src/locale/lang/el";
import {compile} from "vue-template-compiler";

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        num:0,
        carNum:0,
        isShowsubtractBtn:false,
        addList:[],
        isShowGoods:true,
        isCarShow:true,
        addCarList:[],
        dialogVisible: false,//购物车弹框
        show:true,//搜索框消失与现实
        hotGoodsList:[],//热门商品,
        rxTitle:'热销',
        searchShow:false,
        hotIndex:10,
        userInfo:[],//用户信息
        isLogin:'',//登入状态
        uId:'',//用户id
        nid:'',//代付款Id
        payordersList:[],//代付款后成功添加
        userShow:{
            "uphoto":false,
            "petname":false,
            "ubirthday":false,
            "uadderss":false,
            "utelephone":false
        },
    },
    mutations:{

        decrement(state){
            state.addList.splice(1,1)
            if(state.num>=1){
                state.num--
            }
            if(state.num<=0){
                state.isShowsubtractBtn = false
            }

        },
        addCounter(state,payload){
            /*payload.count +=1*/
            payload.count +=1
            state.num++
        },
        addToCart(state,payload){
            state.addList.push(payload)
            state.num++
           /* state.dialogHeight=state.dialogHeight-130*/
        },
        subtractInfo(state,payload){
            console.log(payload.id)
            const addList = state.addList
            for (let i=0;i<addList.length;i++){
                console.log("遍历id："+addList[i].id)
                if(payload.id === addList[i].id){
                    console.log("可删除")
                    if(state.addList[i].count>=1){
                        state.addList[i].count--
                        state.num--
                    }
                    if(state.addList[i].count<=0){
                        console.log("count0")
                        state.addList[i].isShowsubtractBtn=false
                        payload.isShowsubtractBtn=state.addList[i].isShowsubtractBtn
                       //根据id删除数据
                        addList.splice(i,1)
                       state.isShowGoods=true
                    }
                }
            }
        },
        addCarGoods(state,payload){
            state.addList.push(payload)
            state.num =  state.num+payload.count
            state.carNum = payload.count
            // //购物车数量+1
            console.log(payload)
        },
        addCarGoodsCounter(state,payload){
            console.log("购物车数量")
        },


    },
    getters:{
        addCarList(state){
            return state.addCarList
        },
        goodsList(state) {
            return state.addList
        },
    },
    actions:{
        addGoods(context,payload){
            return new Promise((resolve, reject) => {
                payload.isShowsubtractBtn=true
                context.state.isShowsubtractBtn=payload.isShowsubtractBtn
                    context.state.isShowGoods=false

                const goodsInfo = context.state.addList.find(item => item.id === payload.id)

                if(goodsInfo){
                    context.commit('addCounter',goodsInfo)
                    console.log(goodsInfo.count);
                    resolve(goodsInfo.count)
                }else {

                    context.commit('addToCart',payload)
                    payload.count = 1
                    /*resolve('成功添加商品')*/
                    resolve(payload.count)
                    console.log(payload);
                }
            })
        },
        subtractGoods(context,payload){
            return new Promise((resolve, reject) => {
                const goodsInfo = context.state.addList.find(item => item.id === payload.id)
                    if(goodsInfo){
                    context.commit('subtractInfo',goodsInfo)
                    console.log(goodsInfo);
                    console.log("删除")
                }else {
                    console.log("不显示")
                    payload.isShowsubtractBtn=false
                }
            })
        },
        addCarGoods(context,payload){
            return new Promise((resolve, reject) => {
                payload.isShowsubtractBtn=true
                context.state.isShowsubtractBtn=payload.isShowsubtractBtn
                context.state.isShowGoods=false
                const goodsInfo = context.state.addCarList.find(item => item.id === payload.id)
                console.log(goodsInfo)
                if(goodsInfo){
                    //第二次添加
                    console.log("第二次添加")
                    context.commit('addCarGoodsCounter',goodsInfo)
                }else {
                    //第一次添加
                    console.log("第一次添加")
                    context.commit('addCarGoods',payload)
                    payload.count = 1;
                }

            })
        },
        addCar(context,payload){
            return new Promise((resolve, reject) => {
                payload.isShowsubtractBtn=true
                context.state.isShowsubtractBtn=payload.isShowsubtractBtn
                context.state.isShowGoods=false
                const goodsInfo = context.state.addList.find(item => item.id === payload.id)
                if(goodsInfo){
                    console.log("第二次")
                    goodsInfo.count = goodsInfo.count+ payload.count
                    context.state.num =  context.state.num + payload.count

                }else {
                    console.log("第一次")
                    context.commit('addCarGoods',payload)
                }
            })
        }

    }
})

//3.导出store独享
export default store