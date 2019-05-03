import HelloWorld from '@/modules/HelloWorld'
import Login from '@/modules/authentication/_view/Login'
import Dashboard from '@/modules/common/_view/Dashboard'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        children:[
            {
                path: '/HelloWorld',
                name: 'HelloWorld',
                component: HelloWorld,
                meta: { auth: true }
              },
        ]
    },
    {
    path: "/login",
    component: Login,
    name: "login",
    meta: { auth: false }
    },
  ]

export default routes