import Home from "@/views/Home.vue";
import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "users/create",
        name: "Create-User",
        component: () => import("@/views/Users/create.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "users/transactions",
        name: "User Transactions",
        component: () => import("@/views/Users/transactions.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "users/:id",
        name: "Update User",
        component: () => import("@/views/Users/update.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "users",
        name: "Users",
        component: () => import("@/views/Users/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "transactions/:id",
        name: "Update Transaction",
        component: () => import("@/views/Transactions/update.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "transactions",
        name: "Transactions",
        component: () => import("@/views/Transactions/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "payment-provider/create",
        name: "Create PaymentProvider",
        component: () => import("@/views/PaymentProviders/create.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "payment-provider/:id",
        name: "Update PaymentProvider",
        component: () => import("@/views/PaymentProviders/update.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "payment-provider",
        name: "PaymentProvider",
        component: () => import("@/views/PaymentProviders/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "subscription-plan/create",
        name: "Create SubscriptionPlan",
        component: () => import("@/views/SubscriptionPlan/create.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "subscription-plan/:id",
        name: "Update SubscriptionPlan",
        component: () => import("@/views/SubscriptionPlan/update.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "subscription-plan",
        name: "SubscriptionPlan",
        component: () => import("@/views/SubscriptionPlan/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "points/create",
        name: "Create Point",
        component: () => import("@/views/Point/create.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "points/:id",
        name: "Update Point",
        component: () => import("@/views/Point/update.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "points",
        name: "Point",
        component: () => import("@/views/Point/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "invitations/create",
        name: "Create Invitation",
        component: () => import("@/views/Point/create.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "invitations/:id",
        name: "Update Invitation",
        component: () => import("@/views/Invitation/update.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "invitations",
        name: "Invitation",
        component: () => import("@/views/Invitation/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "remote-config/create",
        name: "Create RemoteConfig",
        component: () => import("@/views/RemoteConfig/create.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "remote-config/:id",
        name: "Update RemoteConfig",
        component: () => import("@/views/RemoteConfig/update.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "remote-config",
        name: "RemoteConfig",
        component: () => import("@/views/RemoteConfig/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/auth/",
    name: "Auth",
    component: () => import("@/views/auth/index.vue"),
    meta: {
      requiresVisitor: true,
    },
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/auth/Login.vue"),
        meta: {
          requiresVisitor: true,
        },
      },
    ],
  },
];

export default routes;
