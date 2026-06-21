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
  .luxury-select {
    background: #0c0b09;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    color: #a8a29e;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 11px;
    padding-bottom: 12px;
    outline: none;
    width: 100%;
    cursor: pointer;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    appearance: none;
  }
  .luxury-select option { background: #0c0b09; }
  .role-btn { border: 1px solid rgba(255,255,255,0.1); padding: 10px 20px; font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; color: #78716c; }
  .role-btn.active { border-color: rgba(255,255,255,0.5); color: #e7e5e4; background: rgba(255,255,255,0.04); }
  .role-btn:hover:not(.active) { border-color: rgba(255,255,255,0.3); color: #a8a29e; }
`;

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", contact: "", role: "buyer",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await handleRegister(formData);
      if (result.success) navigate("/");
      setFormData({ name: "", email: "", password: "", contact: "", role: "buyer" });
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
          src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop"
          alt="Still"
          className="absolute inset-0 w-full h-full object-cover opacity-35 hover:scale-105 transition-transform duration-[4000ms] ease-out"
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
            Discover your signature scent
          </p>
        </div>
      </div>

      {/* ─── RIGHT — FORM ─── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 sm:px-16 md:px-24 py-16">
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
            New Member
          </p>
          <h1
            className="font-serif-luxury text-4xl uppercase text-white mb-2"
            style={{ fontWeight: 300, fontStyle: "italic" }}
          >
            Create Account
          </h1>
          <p className="font-sans-luxury text-stone-500 text-[10px] tracking-[0.3em] uppercase mb-14">
            Join the exclusive club
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="luxury-input"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="luxury-input"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="luxury-input"
              required
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              className="luxury-input"
            />

            {/* Role Toggle */}
            <div>
              <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-4">
                I am a...
              </p>
              <div className="flex gap-3">
                {["buyer", "seller"].map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setFormData((prev) => ({ ...prev, role: r }))}
                    className={`role-btn font-sans-luxury flex-1 ${formData.role === r ? "active" : ""}`}
                  >
                    {r === "buyer" ? "Buyer" : "Seller"}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={loading}
              className="font-sans-luxury w-full border border-stone-700 hover:border-stone-300 text-stone-300 hover:text-white text-[9px] tracking-[0.5em] uppercase py-5 transition-all duration-300 hover:bg-stone-800/20 disabled:opacity-40 disabled:cursor-not-allowed mt-4"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="font-sans-luxury text-center text-[9px] tracking-widest uppercase text-stone-600 mt-10">
            Already a member?{" "}
            <Link to="/login" className="text-stone-400 hover:text-white transition-colors border-b border-stone-700 hover:border-stone-400 pb-0.5">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;