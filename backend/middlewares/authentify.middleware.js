import variables from "../config/ENV_VARIABLES.js";
import User from "../features/user/model/user.model.js";
import { App_error } from "../utils/app_outcome_handler.js";
import { verify } from "hono/jwt";

export async function authentify(c, next) {
  console.log("authentify hit:", c.req.method, c.req.path);
  const token = c.req.header("Authorization");
  // const { token } = header;
  if (!token) {
    throw new App_error("token isn't sent", 401, "UNAUTHENTICATED");
  }
  if (!token.startsWith("Bearer ")) {
    throw new App_error("token isn't sent", 401, "UNAUTHENTICATED");
  }
  const access_token = token.split(" ")[1];
  let decoded_user;
  try {
    decoded_user = await verify(
      access_token,
      variables.ACCESS_TOKEN_SECRET_KEY,
      "HS256",
    );
  } catch (error) {
    console.log(`${error}`);

    throw new App_error("token is expired", 401, "TOKEN_EXPIRED");
  }
  const authorized_user = await User.findById(decoded_user._id).select(
    "-password",
  );

  if (!authorized_user) {
    throw new App_error("token is invalid", 401, "TOKEN_IS_INVALID");
  }

  c.set("user", authorized_user);
  await next();
}
