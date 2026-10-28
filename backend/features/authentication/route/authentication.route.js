import { Hono } from "hono";
import { register_controller } from "../controller/register.controller.js";
import login_controller from "../controller/login.controller.js";
import { authentify } from "../../../middlewares/authentify.middleware.js";
import refresh_token_controller from "../controller/refresh_tokens.controller.js";

const route = new Hono();

route.post("/register", register_controller);
route.post("/login", login_controller);
route.post("/refresh-tokens",refresh_token_controller);

export default route;
