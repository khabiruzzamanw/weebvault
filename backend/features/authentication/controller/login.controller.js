import { setCookie } from "hono/cookie";
import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import { token_generator } from "../../../utils/tokens_generator.js";
import { login_service, update_refresh_token } from "../service/login.service.js";
import { cookie_options } from "../../../utils/cookie_options.js";


export default async function login_controller(c) {
   const body =  await c.req.json();
  const { email, password } = body;
  if (!email || !password) {
    throw new App_error(
      " email or pasword is missing",
      400,
      "VALIDATION_ERROR",
    );
  }

  const email_parts = email.trim().toLowerCase().split("@");

  if (email_parts.length !== 2) {
    throw new App_error("email is inappropriate", 400, "INVALID_EMAIL");
  }

  const logged_user = await login_service({ email, password });
  const access_token = await  token_generator({ _id: logged_user._id }, "access");
  const refresh_token = await  token_generator(
    {
      _id: logged_user._id,
      name: logged_user.name,
      email: logged_user.email,
    },
    "refresh",
  );

  await update_refresh_token(logged_user._id, refresh_token);
  setCookie(c, "refreshToken", refresh_token, cookie_options);

  return new App_response("login successful", 200, {
    user: {
      _id: logged_user._id,
      role: logged_user.role,
      name: logged_user.name,
      email:logged_user.email
    },
    accessToken: access_token,
  }).send_response(c);
}
