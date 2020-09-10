import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Layout from '../views/layout/Layout'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/account',
        meta: { title: '常用操作', icon: 'el-icon-star-off' },
        children: [
            {
                path:'/account',
                name:'Account',
                meta: { title: '账号管理', icon: '' },
                component: () => import('../views/Account.vue'),
            },
            {
                path:'/account1',
                name:'Account1',
                meta: { title: '账号管理1', icon: '' },
                component: () => import('../views/Account.vue'),
            },
        ]
    },
    {
        path: '/others',
        name: 'Frend',
        component: Layout,
        meta: { title: 'Others', icon: 'el-icon-star-off' },
        children: [
            {
                path:'/others/list',
                name:'otherList',
                meta: { title: 'Others', icon: 'el-icon-star-off' },
                component: () => import('../views/Others.vue'),
            },
        ]
    },
    {
        path:'/account/upload',
        name:'upload',
        component: Layout,
        hidden: true,
        children: [
            {
                path:'/account/upload/excel',
                name:'Xlsx',
                component: () => import('../views/UploadExcel.vue'),
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
