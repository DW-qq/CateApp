import {request} from "./request";

export function getFindByNum() {
    return  request({
        url:'/goodController/findByNum'
    })

}

export function getFindTj(goodsName) {
    return request({
        url:'/goodController/findByTj/'+goodsName,
        params:{
            goodsName:goodsName
        }
    })

}