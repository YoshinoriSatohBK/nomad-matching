import libAuth from "../lib/auth";

const excludePaths = ["top", "twitter-auth-callback"];

export default async (to, from, next) => {
  console.log("auth middleware");
  console.log(from);
  console.log(to);
  if (!excludePaths.includes(to.name)) {
    await libAuth.authenticate();
  }
  next();
};
