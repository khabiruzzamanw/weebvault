import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import register_service from "../service/register.service.js";

const max_length = 72;
const min_length = 8;

export async function register_controller(c) {
  const body = await c.req.json();
  const { name, password, repassword, email } = body;

  if (!email || !password || !name) {
    throw new App_error(
      " email or pasword or name is missing",
      400,
      "VALIDATION_ERROR",
    );
  }
  if (password !== repassword) {
    throw new App_error(
      "password mismatch",
      400,
      "VALIDATION_ERROR",
    );
  }

  if (!email.includes("@")) {
    throw new App_error("the email is inappropriate", 401, "INVALID_EMAIL");
  }

  const email_parts = email.trim().toLowerCase().split("@");

  if (email_parts.length !== 2) {
    throw new App_error(
      "the email is inappropriate",
      401,
      "INVALID_EMAIL_DOMAIN",
    );
  }

  if (password.length < min_length || password.length > max_length) {
    throw new App_error(
      "password has to be between 8 and 72 chars",
      400,
      "WEAK_PASSWORD",
    );
  }

  await register_service({ name, email, password })
  return new App_response(
    "a user is registered successfully",
    200,
  ).send_response(c);
}
