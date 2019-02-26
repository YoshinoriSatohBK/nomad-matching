import libAuth from "../lib/auth";

const needAuthRouteNames = ["mypage"];

export default async (to, from, next) => {
  console.log("auth middleware");
  if (needAuthRouteNames.includes(to.name)) {
    await libAuth.authenticate();
  }
  next();
};
