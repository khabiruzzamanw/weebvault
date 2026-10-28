import { getCookie, setCookie } from "hono/cookie";
import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import refresh_tokens_service from "../service/refresh_tokens.service.js";
import { cookie_options } from "../../../utils/cookie_options.js";
export default async function refresh_token_controller(c) {
  const token =  getCookie(c, "refreshToken");
  if (!token) {
    throw new App_error("token is expired", 401, "NO_REFRESH_TOKEN");
  }

  const refreshed_data = await refresh_tokens_service(token);
   setCookie(
    c,
    "refreshToken",
    refreshed_data.new_refresh_token,
    cookie_options,
  );

  return new App_response("tokens are refreshed", 200, {
    user: {
      _id: refreshed_data.user_with_new_refresh._id,
      name: refreshed_data.user_with_new_refresh.name,
      email: refreshed_data.user_with_new_refresh.email,
    },
    accessToken: refreshed_data.new_access_token,
  }).send_response(c);
}
