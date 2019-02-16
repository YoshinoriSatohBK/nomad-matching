import store from "@/store";

export default async (to, from, next) => {
  await store.dispatch("route/setShowHeaderFooter", { routeName: to.name });
  await store.dispatch("route/hideMenu");
  await store.dispatch("route/disableLoading");
  await store.dispatch("user/clearFilter");
  await store.dispatch("user/clearSort");
  await store.dispatch("user/clearNextToken");
  await store.dispatch("user/clearHasMoreUsers");
  console.log("route middleware");
  next();
};
