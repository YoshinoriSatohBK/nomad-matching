import Vue from "vue";
import Router from "vue-router";
import middleware from "./middleware";
import Home from "./views/Home.vue";
import TwitterAuthCallback from "./views/TwitterAuthCallback.vue";
import UserProfile from "./views/UserProfile.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/twitter-auth-callback",
      name: "twitter-auth-callback",
      component: TwitterAuthCallback
    },
    {
      path: "/user-profile",
      name: "user-profile",
      component: UserProfile
    }
  ]
});

router.beforeEach(middleware.auth);

export default router;
