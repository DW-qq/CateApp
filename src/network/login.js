import {request} from "./request"

export function getLogin() {
    return request({
        url:'/userController/addUser'
    })
}

export function getDx(telephone) {
return request({
    url:'/userController/doDx/'+telephone,
    params:{
        telephone:telephone
    }
})
}

export function addUser(telephone,upassword) {
    return request({
        url:'/userController/addUser/'+telephone+'/'+upassword,
        headers: {
            "Content-Type": "application/json;charset=utf-8"  //头部信息
        },
        params: {
            upassword:upassword,
            telephone:telephone
        }
    })

}

export function findUser(telephone) {
return request({
    url:'/userController/findOne/'+telephone,
    params:{
        telephone:telephone
    }
})
}

export function findOneUser(telephone,upassword) {
    return request({
        url:'/userController/findOneUser/'+telephone+'/'+upassword,
        params:{
            upassword:upassword,
            telephone:telephone
        }
    })
}