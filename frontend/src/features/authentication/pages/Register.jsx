import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import register_controller from "../controller/register.controller";
import { useAuth } from "../../../context/Auth_context";

export default function Register() {
  const [form, set_form] = useState({});
  const [registering, set_registering] = useState(false);
  const { user, user_loading } = useAuth();
  const navigate = useNavigate();
  if (user_loading) {
    console.log(` user data is loading`);
    return (<><div className="w-full min-h-screen bg-rose-700 text-6xl text-rose-200">Loading</div></>)
      {/* add a loading screen*/}

  }
  if (user) {
   return <Navigate to={"/profile"} replace={true} />
  }


  async function submit_handler(e) {
    e.preventDefault();
    set_registering(true);
    const data = await register_controller(form);
    if (!data.success) {
      console.log(`error : ${data.message}`);
      return set_registering(false);
    }
    console.log(`success : ${data.message}`);
    set_registering(false);
    navigate("/login");
  }
  function input_handler(e) {
    set_form(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <>
      <main className="w-full min-h-screen bg-blue-900 flex justify-center items-center">
        <div className="w-1/4 h-3/5 bg-blue-950 flex justify-center items-center py-10 px-5 shadow-md rounded-xs">
          <form onSubmit={submit_handler} className=" flex flex-col gap-3.5 ">
            <div className="flex flex-col gap-1">
              <label>Full Name</label>
              <input
                type="text"
                onChange={input_handler}
                name="name"
                value={form.name}
                placeholder="Enter your fullname"
                className="border border-blue-400 rounded-md py-1 px-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Email Address</label>
              <input
                type="email"
                onChange={input_handler}
                name="email"
                value={form.email}
                placeholder="Enter your email"
                className="border border-blue-400 rounded-md py-1 px-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                type="password"
                onChange={input_handler}
                name="password"
                value={form.password}
                placeholder="Create a STRONG password"
                className="border border-blue-400 rounded-md py-1 px-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Retype Password</label>
              <input
                type="password"
                onChange={input_handler}
                name="repassword"
                value={form.repassword}
                placeholder="Match the password"
                className="border border-blue-400 rounded-md py-1 px-2"
              />
            </div>
            <div className="w-full flex gap-1.5">
              <span>Already registered?</span>
              <span
                onClick={function () {
                  navigate("/login");
                }}
                className="underline cursor-pointer hover:text-blue-300"
              >
                Sign in
              </span>
            </div>
            <button
              disabled={registering}
              type="submit"
              className="w-full py-2 px-3.5 bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
