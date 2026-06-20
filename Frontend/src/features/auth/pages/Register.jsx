import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth.js";
import { useNavigate, Link } from "react-router";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await handleRegister(formData);
      if (result.success) {
        navigate("/");
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        contact: "",
        role: "buyer",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans text-stone-900 dark:text-stone-100 bg-white dark:bg-[#0a0a0a] selection:bg-stone-200 dark:selection:bg-stone-800 relative">
      {/* Dark Mode Toggle Button */}
      <button 
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors shadow-sm"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        )}
      </button>

      {/* Left Image Section - Hidden on smaller screens */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-stone-900 dark:bg-black items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop"
          alt="Luxury Perfume"
          className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 hover:scale-105 transition-transform duration-[2000ms] ease-out"
        />
        <div className="z-10 text-center text-white px-8 pointer-events-none">
          <h2 className="text-5xl md:text-6xl font-serif tracking-[0.2em] uppercase mb-4 drop-shadow-lg">
            Still
          </h2>
          <p className="text-sm tracking-[0.3em] font-light uppercase opacity-90 drop-shadow-md">
            Discover your signature scent
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 bg-[#FAF9F6] dark:bg-[#0a0a0a]">
        <div className="w-full max-w-md">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl md:text-4xl font-serif tracking-wide mb-4 text-stone-800 dark:text-stone-100">
              Create Account
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs tracking-[0.2em] uppercase">
              Join the exclusive club
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-8 sm:space-y-10">
            <div className="relative group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full bg-transparent border-b border-stone-300 dark:border-stone-800 py-3 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 transition-colors placeholder:text-stone-400 dark:placeholder:text-stone-600 placeholder:tracking-wide placeholder:uppercase placeholder:text-xs text-stone-900 dark:text-stone-100"
                required
              />
            </div>

            <div className="relative group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-stone-300 dark:border-stone-800 py-3 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 transition-colors placeholder:text-stone-400 dark:placeholder:text-stone-600 placeholder:tracking-wide placeholder:uppercase placeholder:text-xs text-stone-900 dark:text-stone-100"
                required
              />
            </div>

            <div className="relative group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-transparent border-b border-stone-300 dark:border-stone-800 py-3 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 transition-colors placeholder:text-stone-400 dark:placeholder:text-stone-600 placeholder:tracking-wide placeholder:uppercase placeholder:text-xs text-stone-900 dark:text-stone-100"
                required
              />
            </div>

            <div className="relative group">
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number"
                className="w-full bg-transparent border-b border-stone-300 dark:border-stone-800 py-3 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 transition-colors placeholder:text-stone-400 dark:placeholder:text-stone-600 placeholder:tracking-wide placeholder:uppercase placeholder:text-xs text-stone-900 dark:text-stone-100"
              />
            </div>

            <div className="relative pt-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3">
                I am a...
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-300 dark:border-stone-800 py-3 text-sm focus:outline-none focus:border-stone-800 dark:focus:border-stone-400 transition-colors appearance-none cursor-pointer text-stone-700 dark:text-stone-300 tracking-wide uppercase"
                >
                  <option value="buyer" className="dark:bg-[#0a0a0a]">Buyer</option>
                  <option value="seller" className="dark:bg-[#0a0a0a]">Seller</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-500 dark:text-stone-600">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="pt-6 sm:pt-8">
              <button
                disabled={loading}
                className="w-full bg-stone-900 dark:bg-stone-100 hover:bg-black dark:hover:bg-white text-white dark:text-stone-900 uppercase tracking-[0.2em] text-xs py-4 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-xl dark:hover:shadow-stone-800/50"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </div>
            
            <div className="text-center mt-6 sm:mt-8">
              <p className="text-xs tracking-wider text-stone-500 dark:text-stone-400 uppercase">
                Already have an account?{" "}
                <Link to="/login" className="text-stone-900 dark:text-stone-100 font-medium hover:underline ml-1">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;