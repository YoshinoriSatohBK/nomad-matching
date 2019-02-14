import store from "@/store";

export default async (to, from, next) => {
  await store.dispatch("route/setShowHeaderFooter", { routeName: to.name });
  await store.dispatch("route/hideMenu");
  await store.dispatch("route/disableLoading");
  await store.dispatch("user/clearFilter");
  await store.dispatch("user/clearSort");
  console.log("route middleware");
  next();
};
