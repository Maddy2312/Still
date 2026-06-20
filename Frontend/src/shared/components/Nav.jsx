import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setUser } from "../../features/auth/state/auth.slice.js";

const Nav = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Navigation Links */}
        <div className="flex-1 flex items-center gap-6">
          <Link to="/" className="text-xs uppercase tracking-[0.2em] font-medium text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors">
            Shop
          </Link>
        </div>

        {/* Center: Brand Name */}
        <div className="flex-1 flex justify-center">
          <Link to="/" className="text-2xl md:text-3xl font-serif tracking-[0.2em] uppercase text-stone-900 dark:text-stone-100">
            Still
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-6">
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-stone-800 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
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

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login" className="hidden sm:block text-xs uppercase tracking-[0.2em] font-medium text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-2 hover:bg-black dark:hover:bg-white transition-colors">
                Register
              </Link>
            </div>
          ) : user.role === "seller" ? (
            <div className="flex items-center gap-6">
              <Link to="/seller/dashboard" className="hidden sm:block text-xs uppercase tracking-[0.2em] font-medium text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors">
                Atelier
              </Link>
              <button onClick={handleLogout} className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/cart" className="flex text-xs uppercase tracking-[0.2em] font-medium text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span className="hidden sm:inline">Bag</span>
              </Link>
              <button onClick={handleLogout} className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Nav;
