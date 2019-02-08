import store from "@/store";

export default async (to, from, next) => {
  await store.dispatch("route/setShowHeaderFooter", { routeName: to.name });
  next();
};
