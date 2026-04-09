import { Link } from "react-router-dom";
import bg from "../assets/cosmic.png";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />

      {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#071952]/80 via-[#0B666A]/50 to-[#071952]/80" />
    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#35A29F] opacity-20 blur-[150px] rounded-full" />

      {/* NAVBAR */}
    <nav className="relative z-10 flex justify-between items-center px-10 py-6">

  <h1 className="text-4xl font-semibold">StudyVerse</h1>

  {/* CENTER NAV */}
  <div className="absolute left-1/2 -translate-x-1/2 flex gap-4 
    bg-white/10 backdrop-blur-md border border-white/20 
    px-6 py-2 rounded-full">

    <Link to="/" className="hover:text-[#97FEED]">Home</Link>
    <Link to="/about" className="hover:text-[#97FEED]">About Us</Link>
  </div>

  {/* RIGHT BUTTONS */}
  <div className="flex gap-3">
    <Link className="px-4 py-1 rounded-full bg-white/10 border border-white/20">
      Login
    </Link>
    <Link className="px-4 py-1 rounded-full bg-white/10 border border-white/20">
      Sign up
    </Link>
  </div>

</nav>

      {/* HERO CARD */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">

  <div className="
    max-w-[700px] w-full
    bg-white/10
    backdrop-blur-lg
    border border-white/20
    rounded-2xl
    p-8
    text-center
    shadow-[0_10px_40px_rgba(0,0,0,0.6)]
  ">

    <p className="text-lg leading-relaxed text-white/90">
      A modern platform for studying smarter. Upload your materials,
      generate summaries with AI, and explore knowledge through an
      interactive 3D map.
    </p>

    <button className="mt-6 px-6 py-2 bg-[#35A29F] rounded-md hover:bg-[#2c8f8c] transition">
      Learn More
    </button>

  </div>
</div>

      {/* PLANET GLOW EFFECT */}
      <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#7ED7C1] opacity-20 blur-[180px] rounded-full"></div>

    </div>
  );
}