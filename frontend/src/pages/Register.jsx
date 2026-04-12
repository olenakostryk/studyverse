import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/auth/register/", form);

    navigate("/login");
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
  Register
</h2>

{/* CENTERED CONTENT */}
<div className="flex-1 flex flex-col justify-center">

  <div className="flex flex-col  px-2">


  <div
  className="flex flex-col items-center w-full"
  style={{
    marginTop: 50,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  }}
>

  {/* Username */}
<div
  className="
    w-[300px]
    flex items-center
    px-5
    h-[60px]
    rounded-[7px]
    bg-gradient-to-r from-[#0A2A4A] via-[#0B3B63] to-[#1B6FA8]
    shadow-[0_8px_25px_rgba(0,0,0,0.5)]
    overflow-hidden
  "
  style={{
    marginLeft: "auto",
    marginRight: "auto",
  }}
>

 <input
  placeholder="Username"
  value={form.username}
  onChange={(e) =>
    setForm({ ...form, username: e.target.value })
  }
  className="bg-transparent w-full outline-none text-white placeholder-gray-400 border-none"
  style={{ fontSize: 15 }}
/>
  </div>


  {/* Password */}
  <div
  className="
    w-[300px]
    flex items-center
    px-5
    h-[60px]
    rounded-[7px]
    bg-gradient-to-r from-[#0A2A4A] via-[#0B3B63] to-[#1B6FA8]
    shadow-[0_8px_25px_rgba(0,0,0,0.5)]
    overflow-hidden
  "
  style={{
    marginLeft: "auto",
    marginRight: "auto",
  }}
>

   <input
  type="password"
  placeholder="Password"
  value={form.password}
  onChange={(e) =>
    setForm({ ...form, password: e.target.value })
  }
  className="bg-transparent w-full outline-none text-white placeholder-gray-400 border-none"
  style={{ fontSize: 15 }}
/>
  </div>

</div>


  </div>

</div>

{/* BOTTOM */}

<form onSubmit={handleSubmit}>
  <div className="flex flex-col items-center gap-6">

    <button
      type="submit"
      className="
        w-[75%] h-[55px] rounded-[7px]
        bg-gradient-to-r from-[#0A2A4A] via-[#0B3B63] to-[#1B6FA8]
        text-white tracking-widest
        shadow-[0_10px_30px_rgba(0,0,0,0.6)]
      "
      style={{ marginBottom: 70 }}
    >
      REGISTER
    </button>

  </div>
</form>


    </div>
  </div>
);


}