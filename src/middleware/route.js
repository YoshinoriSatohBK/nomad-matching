import store from "@/store";

export default async (to, from, next) => {
  await store.dispatch("route/setShowHeaderFooter", { routeName: to.name });
  await store.dispatch("route/hideMenu");
  await store.dispatch("route/disableLoading");
  console.log("route middleware");
  next();
};
