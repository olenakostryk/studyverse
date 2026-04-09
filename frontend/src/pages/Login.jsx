import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/login/", form);
    localStorage.setItem("token", res.data.access);

    navigate("/");
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#071952] via-[#0B666A] to-[#071952] relative overflow-hidden">

    {/* soft radial glow */}
    <div className="absolute w-[900px] h-[900px] bg-[#35A29F] opacity-20 blur-[220px] rounded-full"></div>

    {/* glass card */}
   <div className="
  relative z-10 w-[460px] h-[620px] px-12 py-10 rounded-[38px]
  bg-white/[0.06] backdrop-blur-2xl
  border border-white/20
  shadow-[0_25px_120px_rgba(0,0,0,0.6),0_0_60px_rgba(53,162,159,0.25)]
  flex flex-col
">

   {/* HEADER */}
<h2 className="text-center text-3xl font-medium text-[#E8FFFF]"  style={{ marginTop: 50 }} >
  Login
</h2>

{/* CENTERED CONTENT */}
<div className="flex-1 flex flex-col justify-center">

  <div className="flex flex-col  px-2">


<div className="flex flex-col items-center w-full mt-10 space-y-4">

  {/* Username */}
  <div 
  style={{ marginBottom: 50 }}
  className="
    w-[75%]
    flex items-center 
    px-5 h-[60px]
    rounded-[7px]
    bg-gradient-to-r from-[#0A2A4A] via-[#0B3B63] to-[#1B6FA8]
    shadow-[0_8px_25px_rgba(0,0,0,0.5)]
    overflow-hidden
    pt-10
  ">

    <input
      placeholder="Username"
      className="bg-transparent w-full outline-none text-white placeholder-gray-400 border-none "
      style={{ fontSize: 15 }}

    />
  </div>


  {/* Password */}
  <div 
   className="
    w-[75%]
    flex items-center 
     h-[60px]
    rounded-[7px]
    bg-gradient-to-r from-[#0A2A4A] via-[#0B3B63] to-[#1B6FA8]
    shadow-[0_8px_25px_rgba(0,0,0,0.5)]
    overflow-hidden
  " >

    <input
      type="password"
      placeholder="Password"
      className="bg-transparent w-full outline-none text-white placeholder-gray-400 border-none"
       style={{ fontSize: 15 }}
    />
  </div>

</div>



    {/* Row */}
    <div className="flex justify-between text-[15px] text-gray-300 ">
      <label className="flex items-center"   style={{ marginLeft: 50 , marginTop: 30}}>
        <input type="checkbox" className="accent-[#35A29F]" />
        Remember me
      </label>
      <Link to="/forgot-password" className="text-[#97FEED] cursor-pointer"  style={{ marginRight: 50 , marginTop: 30}} >
  Forgot password?
</Link>
    </div>

  </div>

</div>

{/* BOTTOM */}
<div className="flex flex-col items-center gap-6">

  <button className="
    w-[75%] h-[55px] rounded-[7px]
    bg-gradient-to-r from-[#0A2A4A] via-[#0B3B63] to-[#1B6FA8]
    text-white tracking-widest
    shadow-[0_10px_30px_rgba(0,0,0,0.6)]
  "
  
 style={{ marginBottom: 70 }}>
    LOGIN
  </button>

  <div className="text-sm text-gray-300"  style={{ marginBottom: 50 }}>
    Don’t have an account?{" "}
    <Link to="/register" className="text-[#97FEED] cursor-pointer">
  Register
</Link>
  </div>

</div>
    </div>
  </div>
);
}