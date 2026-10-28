import register_service from "../service/register.service.js";

export default async function register_controller(form) {
  try {
    const data = await register_service(form)
    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error.message, success: false };
  }
}
