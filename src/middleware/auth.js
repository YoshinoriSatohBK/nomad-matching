import libAuth from "../lib/auth";

const needAuthRouteNames = ["mypage"];

export default async (to, from, next) => {
  if (libAuth.authenticated()) {
    await libAuth.setCredentials();
  } else if (needAuthRouteNames.includes(to.name)) {
    await libAuth.authenticate();
  }
  next();
};
