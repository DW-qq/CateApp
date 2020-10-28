import Vue from 'vue'
import VueRouter from 'vue-router'
import Home1 from '../views/Home.vue'
const Home = ()=> import('../views/Home/Home')
const Details = () => import('../views/details/Details')
const Login = () => import('../views/login/login')
const Register = () => import('../views/Register/Register')
import MyCar from "../views/My/childComps/MyCar";



Vue.use(VueRouter)

  const routes = [
    {
      path:'',
      redirect:'/home'
    },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
    ,
    {
      path: '/home1',
      name: 'Home',
      component: Home1
    },
  {
    path: '/hot',
    name: 'Hot',
    component: () => import('../views/Hot/Hot')
  },
    {
      path: '/my',
      name: 'My',
      component: () => import('../views/My/My'),
      children:[
        {
          path:'',
          redirect:'/my/myCar'
        },
        {
          path:'/my/myCar',
          component: () => import('../views/My/childComps/MyCar')
        },
        {
          path:'/my/myPayment',
          component: () => import('../views/My/childComps/MyPayment')
        },
        {
          path:'/my/myOrders',
          component: () => import('../views/My/childComps/MyOrders')
        },
        {
          path:'/my/myRefund',
          component: () => import('../views/My/childComps/MyRefund')
        }

      ]
    },
    {
      path:'/details',
      name:'Details',
      component:Details
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/wxPay',
      name:'WxPay',
      component:() => import('../components/content/wxPay/wxPay')
    },
    {
      path:'/myInfo',
      name:'MyInfo',
      component:() => import('../views/My/childComps/MyInfo')
    },
    {
      path:'/myDetail',
      name:'MyDetail',
      component:() => import('../views/My/childComps/MyDetail')
    }
]


const router = new VueRouter({
  mode:  'hash',
  routes,
})
//路由钩子

router.beforeEach((to,from,next) =>{
  //获取用户登入状态
  let userId = sessionStorage.getItem('userId')
  console.log(userId)
  //注销
  if(to.path == '/logout'){
    //清空
    sessionStorage.clear();
    //跳转登入页面
    next({path:'/login'})

  }else if(to.path == '/details') {
    if (userId == null) {
      next({path: '/login'})
    } else {
      next(true)
    }
  }
  else {
    next(true)
  }

})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
