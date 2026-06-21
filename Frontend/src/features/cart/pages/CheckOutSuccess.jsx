import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";

const LUXURY_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
  .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
  .font-sans-luxury  { font-family: 'Inter', system-ui, sans-serif; }

  @keyframes drawCircle {
    from { stroke-dashoffset: 314; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes drawCheck {
    from { stroke-dashoffset: 80; opacity: 0; }
    to   { stroke-dashoffset: 0;  opacity: 1; }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes particleFloat {
    0%   { transform: translateY(0px)   rotate(0deg);   opacity: 0.6; }
    50%  { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
    100% { transform: translateY(0px)   rotate(360deg); opacity: 0.6; }
  }

  .circle-anim {
    stroke-dasharray: 314;
    stroke-dashoffset: 314;
    animation: drawCircle 1s cubic-bezier(.4,0,.2,1) 0.2s forwards;
  }
  .check-anim {
    stroke-dasharray: 80;
    stroke-dashoffset: 80;
    opacity: 0;
    animation: drawCheck 0.5s ease 1s forwards;
  }
  .fade-1 { opacity: 0; animation: fadeSlideUp 0.7s ease 1.4s forwards; }
  .fade-2 { opacity: 0; animation: fadeSlideUp 0.7s ease 1.6s forwards; }
  .fade-3 { opacity: 0; animation: fadeSlideUp 0.7s ease 1.8s forwards; }
  .fade-4 { opacity: 0; animation: fadeSlideUp 0.7s ease 2.0s forwards; }
  .fade-5 { opacity: 0; animation: fadeSlideUp 0.7s ease 2.2s forwards; }

  .shimmer-text {
    background: linear-gradient(90deg, #c9a96e 0%, #fff8e7 40%, #c9a96e 60%, #fff8e7 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear 1.5s infinite;
  }

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: rgba(201,169,110,0.5);
    animation: particleFloat linear infinite;
  }
`;

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 4}s`,
  duration: `${3 + Math.random() * 4}s`,
  size: Math.random() > 0.5 ? "3px" : "2px",
}));

const CheckOutSuccess = () => {
  const navigate = useNavigate();
  const orderNumber = useRef(`STL-${Date.now().toString().slice(-8)}`).current;

  // Auto-redirect after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0c0b09] text-stone-100 flex items-center justify-center overflow-hidden relative">
      <style>{LUXURY_STYLES}</style>

      {/* ─── AMBIENT PARTICLES ─── */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }}
        />
      ))}

      {/* ─── RADIAL GLOW ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-lg w-full">

        {/* Animated Check Circle */}
        <div className="mb-10">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {/* Glow ring */}
            <circle cx="50" cy="50" r="49" stroke="rgba(201,169,110,0.06)" strokeWidth="1" />
            {/* Animated outer ring */}
            <circle
              className="circle-anim"
              cx="50" cy="50" r="46"
              stroke="rgba(201,169,110,0.5)"
              strokeWidth="0.8"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            {/* Inner static ring */}
            <circle cx="50" cy="50" r="38" stroke="rgba(201,169,110,0.08)" strokeWidth="1" />
            {/* Animated checkmark */}
            <path
              className="check-anim"
              d="M32 50 L44 62 L68 38"
              stroke="#c9a96e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Label */}
        <p className="font-sans-luxury text-[9px] tracking-[0.6em] uppercase text-stone-500 mb-4 fade-1">
          Still · Maison de Parfum
        </p>

        {/* Main heading */}
        <h1
          className="font-serif-luxury text-5xl md:text-6xl uppercase leading-tight mb-2 fade-2 shimmer-text"
          style={{ fontWeight: 300 }}
        >
          Order Confirmed
        </h1>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-stone-600 to-transparent my-6 fade-2" />

        {/* Subtitle */}
        <p className="font-sans-luxury text-stone-400 text-sm leading-relaxed tracking-wide max-w-sm mb-8 fade-3">
          Thank you for your purchase. Your fragrance is being carefully prepared and will be with you soon.
        </p>

        {/* Order Number */}
        <div className="border border-stone-800 bg-[#0f0e0b] px-8 py-4 mb-10 fade-3">
          <p className="font-sans-luxury text-[8px] tracking-[0.5em] uppercase text-stone-600 mb-2">
            Order Reference
          </p>
          <p className="font-serif-luxury text-xl text-stone-300 tracking-widest" style={{ fontWeight: 300 }}>
            {orderNumber}
          </p>
        </div>

        {/* Timeline / What's next */}
        <div className="w-full border-t border-stone-800 pt-8 mb-10 fade-4">
          <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-6 text-left">
            What happens next
          </p>
          <div className="flex flex-col gap-0">
            {[
              { step: "01", label: "Order confirmed", status: "done", desc: "Your payment was successful" },
              { step: "02", label: "Preparation", status: "active", desc: "Your fragrance is being packaged" },
              { step: "03", label: "Dispatch", status: "pending", desc: "Shipped within 1–2 business days" },
              { step: "04", label: "Delivery", status: "pending", desc: "Complimentary tracked delivery" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 text-left relative">
                {/* Vertical line connector */}
                {i < 3 && (
                  <div
                    className="absolute left-[11px] top-6 w-px h-full"
                    style={{
                      background: item.status === "done"
                        ? "rgba(201,169,110,0.3)"
                        : "rgba(255,255,255,0.06)",
                    }}
                  />
                )}
                {/* Step dot */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 relative z-10"
                  style={{
                    background: item.status === "done"
                      ? "rgba(201,169,110,0.15)"
                      : item.status === "active"
                      ? "rgba(255,255,255,0.04)"
                      : "transparent",
                    border: item.status === "done"
                      ? "1px solid rgba(201,169,110,0.5)"
                      : item.status === "active"
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {item.status === "done" ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5 L4 7 L8 3" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span
                      className="font-sans-luxury text-[7px]"
                      style={{ color: item.status === "active" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)" }}
                    >
                      {item.step}
                    </span>
                  )}
                </div>
                {/* Text */}
                <div className="pb-7">
                  <p
                    className="font-sans-luxury text-[10px] tracking-[0.3em] uppercase mb-0.5"
                    style={{
                      color: item.status === "done"
                        ? "#c9a96e"
                        : item.status === "active"
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.2)",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-sans-luxury text-[10px] leading-relaxed"
                    style={{ color: item.status === "done" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full fade-5">
          <Link
            to="/"
            className="font-sans-luxury flex-1 border border-stone-700 hover:border-stone-300 text-stone-300 hover:text-white text-[9px] tracking-[0.45em] uppercase py-4 transition-all duration-300 hover:bg-stone-800/20 text-center"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => navigate("/")}
            className="font-sans-luxury flex-1 bg-[#c9a96e]/10 hover:bg-[#c9a96e]/20 border border-[#c9a96e]/30 hover:border-[#c9a96e]/60 text-[#c9a96e] text-[9px] tracking-[0.45em] uppercase py-4 transition-all duration-300"
          >
            View Orders
          </button>
        </div>

        {/* Auto-redirect note */}
        <p className="font-sans-luxury text-[8px] tracking-widest uppercase text-stone-700 mt-8 fade-5">
          You will be redirected to the home page in 10 seconds
        </p>

      </div>
    </div>
  );
};

export default CheckOutSuccess;