import InformationBoard from "@/modules/common/_view/InformationBoard";
import Login from "@/modules/authentication/_view/Login";
import Dashboard from "@/modules/common/_view/Dashboard";
import Repository from "@/modules/repository/_view/Repository";
import Repositories from "@/modules/repository/_view/Repositories";
import { userInfo } from "os";
import User from "@/modules/user/_view/User";
import Organization from "@/modules/organization/_view/Organization";
import Organizations from "@/modules/organization/_view/Organizations";
import Users from "@/modules/user/_view/Users";

const routes = [
  {
    path: "/",
    name: "landing",
    component: Dashboard,
    redirect: { name: "dashboard" },
    meta: { auth: true }
  },
  {
    path: "/",
    name: "main",
    component: Dashboard,
    meta: { auth: true },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: InformationBoard,
        meta: { auth: true }
      },
      {
        path: "/users",
        name: "Users",
        component: Users,
        meta: { auth: true }
      },
      {
        path: "/users/:uuid",
        name: "User",
        component: User,
        meta: { auth: true }
      },
      {
        path: "/repositories",
        name: "Repositories",
        component: Repositories,
        meta: { auth: true }
      },
      {
        path: "/repositories/:uuid",
        name: "Repository",
        component: Repository,
        meta: { auth: true }
      },
      {
        path: "/organizations",
        name: "Organizations",
        component: Organizations,
        meta: { auth: true }
      },
      {
        path: "/organizations/:uuid",
        name: "Organization",
        component: Organization,
        meta: { auth: true }
      },
    ]
  },
  {
    path: "/login",
    component: Login,
    name: "login"
    // meta: { auth: false }
  }
];

export default routes;
