import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth_context";

export default function Profile() {
  const { user, user_loading } = useAuth();
  if (user_loading) {
    console.log(`user data is loading`);
    return (<><div className="w-full min-h-screen bg-rose-700 text-6xl text-rose-200">Loading</div></>);
  }
  if (!user) {
    return <Navigate to={"/login"} replace={true} />
  }

  return (<div className="w-full min-h-screen bg-blue-900 flex flex-col items-center justify-center">

    <div className="w-1/4 h-1/2 bg-blue-950 py-3.5 px-2 flex flex-col">
      <h2 className=" text-blue-300 mb-10">Profile Stat</h2>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-1.5">
        <label className="text-xs text-blue-400">Name</label>
          <span className="text-sm text-blue-200">{user?.name}</span>
        </div>
        <div className="w-full flex flex-col gap-1.5">
        <label className="text-xs text-blue-400">Email Address</label>
          <span className="text-sm text-blue-200">{user?.email}</span>
        </div>
        {/* <div className="w-full flex flex-col gap-1.5">
        <label className="text-xs text-blue-400">Password</label>
          <span className="text-sm text-blue-200">{user?.password}</span>
        </div>*/}

      </div>
    </div>



  </div>)
}
