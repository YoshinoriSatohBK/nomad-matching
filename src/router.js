import Vue from "vue";
import Router from "vue-router";
import middleware from "./middleware";
import Top from "./views/Top.vue";
import TwitterAuthCallback from "./views/TwitterAuthCallback.vue";
import ProfileEdit from "./views/ProfileEdit.vue";
import ProfileShow from "./views/ProfileShow.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "top",
      component: Top
    },
    {
      path: "/twitter-auth-callback",
      name: "twitter-auth-callback",
      component: TwitterAuthCallback
    },
    {
      path: "/user/:id",
      name: "user",
      component: ProfileShow
    },
    {
      path: "/mypage",
      name: "mypage",
      component: ProfileEdit
    }
  ]
});

router.beforeEach(middleware.auth);
router.beforeEach(middleware.route);

export default router;
