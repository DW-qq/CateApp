import {request} from "./request";

export function getFindAll(){
    return request({
        url:'/cakeController/toAll'
    })
}

export function getFindType(pageIndex,dessertId) {
    return request({
        url:'/goodController/findType/'+pageIndex+'/'+dessertId,
        params: {
            pageIndex:pageIndex,
            dessertId:dessertId
        }
    })

}