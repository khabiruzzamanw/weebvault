import login_service from "../service/login.service.js";

export default async function login_controller(form) {
  try {
    const data = await login_service(form);
    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error.message, success: false };
  }
}
