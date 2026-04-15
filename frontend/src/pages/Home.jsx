import { Link } from "react-router-dom";
import bg from "../assets/cosmic.png";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* BACKGROUND */}
     <div className="fixed inset-0 z-0">
  <img
    src={bg}
    alt="background"
    className="w-screen h-screen object-cover"
  />
</div>

      {/* SOFT DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      <nav className="relative z-10 flex justify-center mt-6">

  <div className="
    flex items-center justify-between
    w-[1900px] max-w-[90%]
rounded-[40px]
    px-8 py-3
    bg-[#B8C7DA]/20
    backdrop-blur-xl
    border border-white/20
    shadow-lg
  ">

    {/* LEFT: LOGO */}
<h1 className="
  text-[64px]
  font-[Agbalumo]
  flex items-center
  h-full
">
  StudyVerse
</h1>
    {/* CENTER: LINKS */}
<div className="flex gap-4">

  <Link to="/">
    <span className="
      inline-block
      px-6 py-2
      rounded-full
      bg-white/20
      text-white
      font-medium
      backdrop-blur-md
      transition
      hover:bg-white/40
    ">
      Home
    </span>
  </Link>

  <Link to="/about">
    <span className="
      inline-block
      px-6 py-2
      rounded-full
      bg-white/20
      text-white
      font-medium
      backdrop-blur-md
      transition
      hover:bg-white/40
    ">
      About Us
    </span>
  </Link>
  

</div>

    {/* RIGHT: BUTTONS */}
    <div className="flex gap-3">
      <Link to="/register" className="px-4 py-1 rounded-full bg-white/20 hover:bg-white/30 transition">
        Sign up
      </Link>
      <Link to="/login" className="px-4 py-1 rounded-full bg-white/20 hover:bg-white/30 transition">
        Login
      </Link>
    </div>

  </div>

</nav>

      {/* HERO SECTION */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">

        <div className="
          max-w-[750px] w-full
          bg-white/10
          backdrop-blur-2xl
          border border-white/20
          rounded-3xl
          p-10
          text-center
          shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        ">

          {/* BIG TITLE */}
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            A modern platform for studying smarter.
          </h2>

          {/* DESCRIPTION */}
          <p className="text-lg text-white/80 leading-relaxed">
            Upload your materials, generate summaries with AI,
            and explore knowledge through an interactive 3D map.
          </p>

          {/* BUTTON */}
          <button className="
            mt-8 px-8 py-3 
            rounded-full 
            bg-gradient-to-r from-[#4facfe] to-[#00f2fe]
            text-white font-medium
            hover:scale-105 transition
          ">
            Learn More
          </button>

        </div>
      </div>

      {/* SOFT GLOW (BOTTOM PLANET LIGHT) */}
      <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 
        w-[800px] h-[800px] bg-[#4facfe] opacity-20 blur-[200px] rounded-full" />

    </div>
  );
}