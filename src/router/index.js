import VueRouter from 'vue-router';



//引入路由组件
import Wait from '@/views/wait/Wait'
import Already from '@/views/already/Already'
import Wait1 from '@/views/wait/Wait1'
import Wait2 from '@/views/wait/Wait2'
import Already1 from '@/views/already/Already1'
import Statistics from '@/views/statistics/Statistics'
import Login from '@/views/login/Login'
import Cookie from "js-cookie"
import Adduser from "@/views/adduser/Adduser"
import Edituser from "@/views/edituser/Edituser"
import Roleadministrate from "@/views/roleadministrate/Roleadministrate"
import Useradministrate from "@/views/useradministrate/Useradministrate"


//配置路由



const router = new VueRouter({
    //配置路由
    routes: [
        {
            path: '/',
            redirect: '/wait'
        },
        {
            path: '/wait',
            component: Wait,
            meta: {
                keepAlive: true,
                requireAuth: true
            }
        },
        {
            path: '/wait1',
            component: Wait1,
            meta: {
                keepAlive: true,
                requireAuth: true
            }
        },
        {
            path: '/wait2',
            component: Wait2,
            meta: {
                keepAlive: true,
                requireAuth: true
            }
        },
        {
            path: '/already',
            component: Already,
            meta: {
                keepAlive: true,
                requireAuth: true
            }
        },
        {
            path: '/already1',
            component: Already1,
            meta: {
                keepAlive: true,
                requireAuth: true
            }
        },
        {
            path: '/statistics',
            component: Statistics,
            meta: {
                keepAlive: true,
                requireAuth: true
            }
        },
        {
            path: '/adduser',
            component: Adduser,
            meta: {
                keepAlive: true,
                requireAuth: true
            }
        },
        {
            path: '/edituser',
            component: Edituser,
            meta: {
                keepAlive: true,
                requireAuth: true
            }
        },
        {
            path: '/roleadministrate',
            component: Roleadministrate,
            meta: {
                keepAlive: true,
                requireAuth: true
            }
        },
        {
            path: '/useradministrate',
            component: Useradministrate,
            meta: {
                keepAlive: true,
                requireAuth: true
            }
        },

        {
            path: '/login',
            component: Login,
            meta: {
                keepAlive: false,
                requireAuth: false
            }
        },

    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === "/login") return next()
    const token = Cookie.get("loginSwitch")
    if (!token) {
        return next("/login")
    } else {
        next()
    }

})
export default router