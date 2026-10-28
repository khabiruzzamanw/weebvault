import fetch_handler from "../../../utils/fetch_handler.js";

export default async function login_service(form) {
  return await fetch_handler("authentication/login", {
    body: JSON.stringify(form),
    method: "POST",
  });
}
