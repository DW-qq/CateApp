import axios from "axios"
export function request(config) {
    //创建axios实例
    const instance = axios.create({
        baseURL:'http://47.115.132.232/CataApp',
        timeout:3000,
    });

    //2.axios拦截器
    //请求拦截器
    instance.interceptors.request.use(config => {
        return config
    },error => {
        console.log(error);
    })

    //响应拦截器
    instance.interceptors.response.use(res =>{
        return res.data
    },error => {
        console.log(error.response);
        return Promise.reject(error)
    })

    return instance(config)
}