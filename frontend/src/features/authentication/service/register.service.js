import fetch_handler from "../../../utils/fetch_handler.js";

export default async function register_service(form ) {
  return await fetch_handler("authentication/register", {
    body: JSON.stringify(form),
    method: "POST",
  });
}
