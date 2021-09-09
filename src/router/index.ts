import Vue from "vue";
import store from '@/store'
import VueRouter from "vue-router";
import routes from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


// Auth Guard
router.beforeEach((to, form, next) => {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    if (!store.getters["user/isLoggedIn"]) {
      next({
        name: 'Login'
      });
    } else {
      next()
    }
    next()
  } else if (to.matched.some((record: any) => record.meta.requiresVisitor)) {
    if (store.getters["user/isLoggedIn"]) {
      next({
        name: 'Dashboard'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
