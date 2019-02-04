import libAuth from "../lib/auth";

export default async (to, from, next) => {
  console.log("auth middleware");
  console.log(from);
  console.log(to);
  if (!["home", "twitter-auth-callback"].includes(to.name)) {
    await libAuth.authenticate();
  }
  next();
};
