import HelloWorld from '@/modules/common/_view/HelloWorld'
import Login from '@/modules/authentication/_view/Login'
import Dashboard from '@/modules/common/_view/Dashboard'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: { auth: true },
        children:[
            {
                path: '/HelloWorld',
                name: 'HelloWorld',
                component: HelloWorld,
                meta: { auth: true }
              },
              {
                path: '/4',
                name: 'lol',
                component: HelloWorld,
                meta: { auth: true }
              },
        ]
    },
    {
    path: "/login",
    component: Login,
    name: "login",
    },
  ]

export default routes