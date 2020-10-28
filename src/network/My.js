import {request} from "./request";

export function findByIdOrder(uid) {
    return request({
        url:'/orderController/findById/'+uid,
        params:{
            uid:uid
        }
    })
}

export function findByIdPayment(uid) {
    return request({
        url:'/nonpaymentController/findById/'+uid,
        params:{
            uid:uid
        }
    })
}


export function deleteById(nid) {
    return request({
        url:'/nonpaymentController/deleteById/'+nid,
        params:{
            nid:nid
        }
    })
}

export function deleteByOrderId(orderId) {
    return request({
        url:'/orderController/deleteById/'+orderId,
        params:{
            orderId:orderId
        }
    })
}

export function findByIdRefund(uid) {
return request({
    url:'/refundController/findById/'+uid,
    params:{
        uid:uid
    }
})
}

export function updateUserInfo(user,uid) {
    return request({
        url:'/userController/updateUser/'+uid,
        params:{
            user:user,
            uid:uid
        }
    })
}