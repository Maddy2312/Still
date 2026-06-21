import { useState } from "react";
import useAuth from "../hooks/useAuth.js";
import { useNavigate, Link } from "react-router";

const LUXURY_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
  .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
  .font-sans-luxury  { font-family: 'Inter', system-ui, sans-serif; }
  .luxury-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    color: #e7e5e4;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px;
    padding-bottom: 12px;
    outline: none;
    width: 100%;
    transition: border-color 0.3s;
    letter-spacing: 0.04em;
  }
  .luxury-input::placeholder { color: rgba(255,255,255,0.2); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; }
  .luxury-input:focus { border-bottom-color: rgba(255,255,255,0.45); }
`;

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await handleLogin(formData);
      if (result?.success) navigate("/");
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0c0b09] text-stone-100">
      <style>{LUXURY_STYLES}</style>

      {/* ─── LEFT — IMAGE ─── */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1200&auto=format&fit=crop"
          alt="Still"
          className="absolute inset-0 w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-[4000ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0b09]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
          <p className="font-sans-luxury text-[9px] tracking-[0.6em] uppercase text-stone-400 mb-6">
            Maison de Parfum · Est. 2024
          </p>
          <h2
            className="font-serif-luxury text-7xl md:text-8xl uppercase leading-none"
            style={{ fontWeight: 300 }}
          >
            Still
          </h2>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-stone-500 to-transparent mt-6 mb-6" />
          <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-400">
            Welcome back
          </p>
        </div>
      </div>

      {/* ─── RIGHT — FORM ─── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 sm:px-16 md:px-24">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-14">
            <h2
              className="font-serif-luxury text-5xl uppercase text-white"
              style={{ fontWeight: 300 }}
            >
              Still
            </h2>
          </div>

          <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-3">
            Member Access
          </p>
          <h1
            className="font-serif-luxury text-4xl uppercase text-white mb-2"
            style={{ fontWeight: 300, fontStyle: "italic" }}
          >
            Sign In
          </h1>
          <p className="font-sans-luxury text-stone-500 text-[10px] tracking-[0.3em] uppercase mb-14">
            Access your account
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-10">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="luxury-input"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="luxury-input"
                required
              />
            </div>

            <button
              disabled={loading}
              className="font-sans-luxury w-full border border-stone-700 hover:border-stone-300 text-stone-300 hover:text-white text-[9px] tracking-[0.5em] uppercase py-5 transition-all duration-300 hover:bg-stone-800/20 disabled:opacity-40 disabled:cursor-not-allowed mt-4"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="font-sans-luxury text-center text-[9px] tracking-widest uppercase text-stone-600 mt-10">
            New to Still?{" "}
            <Link to="/register" className="text-stone-400 hover:text-white transition-colors border-b border-stone-700 hover:border-stone-400 pb-0.5">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;