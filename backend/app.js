import { Hono } from "hono";
import { cors } from "hono/cors";
import authentication_route from "./features/authentication/route/authentication.route.js";
import { App_error } from "./utils/app_outcome_handler.js";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.route("/api/authentication", authentication_route);
//
// app.get("/", function (c) {
//  return c.json("hi from app")
// })











app.onError(function (err, c) {
  if (err instanceof App_error) {
    return err.send_response(c);
  }
  if (err.name === "JwtTokenExpired") {
    return new App_error("token expired", 401, "TOKEN_EXPIRED").send_response(c);
  }
  if (
    err.name === "JwtTokenInvalid" ||
    err.name === "JwtTokenSignatureMismatched"
  ) {
    return new App_error("invalid token", 401, "INVALID_TOKEN").send_response(c);
  }
  if (err.name === "ValidationError" || err.name === "CastError") {
    return new App_error(err.message, 400, "VALIDATION_ERROR").send_response(c);
  }
  console.error(err);
  return c.json(
    { success: false, message: "Internal server error", code: "INTERNAL_ERROR" },
    500,
  );
});
export default app;
