import {request} from "./request";

export  function  addOrder(order){
    return  request({
        url:'/orderController/addOrder',
        method: 'post',
        params:{
            orders:order
        }
    })
}