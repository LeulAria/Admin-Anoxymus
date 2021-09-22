import Home from "@/views/Home.vue";
import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import('@/views/Dashboard.vue'),
        meta: {
          requiresAuth: true
        },    
      },
      {
        path: "users/create",
        name: "Create-User",
        component: () => import('@/views/Users/createUser.vue'),
        meta: {
          requiresAuth: true
        },
      },
      {
        path: "users/:id",
        name: "Update User",
        component: () => import('@/views/Users/updateUser.vue'),
        meta: {
          requiresAuth: true
        },    
      },
      {
        path: "users",
        name: "Users",
        component: () => import('@/views/Users/index.vue'),
        meta: {
          requiresAuth: true
        },    
      },
      {
        path: "transactions/:id",
        name: "Update Transaction",
        component: () => import('@/views/Transactions/updateUser.vue'),
        meta: {
          requiresAuth: true
        },    
      },
      {
        path: "transactions",
        name: "Transactions",
        component: () => import('@/views/Transactions/index.vue'),
        meta: {
          requiresAuth: true
        },    
      }
    ],
  },
  {
    path: "/auth/",
    name: "Auth",
    component: () => import('@/views/auth/index.vue'),
    meta: {
      requiresVisitor: true
    },
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import('@/views/auth/Login.vue'),
        meta: {
          requiresVisitor: true
        },
      }
    ]
  }
];

export default routes