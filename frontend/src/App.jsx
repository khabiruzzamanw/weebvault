import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./features/authentication/pages/Register.jsx";
import Login from "./features/authentication/pages/Login.jsx";
import Home from "./features/home/pages/Home.jsx";
import { Auth_Provider } from "./context/Auth_context.jsx";
import Profile from "./features/user/pages/Profile.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
      <Auth_Provider>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />

        </Routes>
    </Auth_Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
