import { sign } from "hono/jwt";
import variables from "../config/ENV_VARIABLES.js";

export async function token_generator(payload, token_name) {
  const is_access_token = token_name === "access";

  const expiry = is_access_token
    ? variables.ACCESS_TOKEN_EXPIRY
    : variables.REFRESH_TOKEN_EXPIRY;
  const secret = is_access_token
    ? variables.ACCESS_TOKEN_SECRET_KEY
    : variables.REFRESH_TOKEN_SECRET_KEY;

  const token = await sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000 + Number(expiry)),
    },
    secret,
  );
  return token;
}
