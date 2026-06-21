import React, { useEffect, useRef } from "react";
import useProduct from "../../hooks/useProduct.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const perfumeStories = [
  {
    name: "Still",
    subtitle: "The Original",
    year: "2024",
    story: "Conceived as an ode to nature, Still is an act of creation inspired by wide-open spaces. Compositions marked by raw freshness, combining power and nobility. Raw and lively, sensual and mysterious — born in nature, shaped by elegance.",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1600&auto=format&fit=crop",
    accent: "#c9a96e",
  },
  {
    name: "Midnight Orchid",
    subtitle: "Dark Floral Collection",
    year: "2024",
    story: "A journey into the darkness of night, where rare orchids bloom under a moonless sky. Black truffle and ylang-ylang open the senses, before dark orchid and patchouli seduce you into the depths of the unknown.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1600&auto=format&fit=crop",
    accent: "#a855f7",
  },
  {
    name: "Amber Dusk",
    subtitle: "Warm & Radiant Collection",
    year: "2024",
    story: "As the sun dips below the horizon, warm amber light bathes the earth in gold. This Extrait de Parfum captures that fleeting moment — crushed coriander and Madagascar vanilla blending seamlessly with smoky woods.",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1600&auto=format&fit=crop",
    accent: "#f59e0b",
  },
  {
    name: "Silk Oud",
    subtitle: "Luxury Oud Collection",
    year: "2024",
    story: "Draped in opulence, Silk Oud is an ode to the ancient trade routes of the East. Rich Cambodian oud, softened by delicate saffron and sweet praline, creates a fragrance as smooth and precious as silk itself.",
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1600&auto=format&fit=crop",
    accent: "#d97706",
  },
  {
    name: "Azure Breeze",
    subtitle: "Fresh & Oceanic Collection",
    year: "2024",
    story: "Close your eyes and feel the ocean breeze rush through you. Sea salt, blue lotus, and the crisp coolness of melon carry you to an endless horizon where the sky meets the sea in perfect stillness.",
    image: "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=1600&auto=format&fit=crop",
    accent: "#38bdf8",
  },
];

const marqueeItems = [
  "Midnight Orchid", "·", "Amber Dusk", "·", "Silk Oud", "·",
  "Azure Breeze", "·", "Obsidian Rose", "·", "Velvet Night", "·",
  "Ruby Oud", "·", "Crystal Snow", "·", "Golden Wood", "·",
];

const awards = [
  { label: "Fragrance of the Year", body: "Perfumer's Guild — 2024" },
  { label: "Best Luxury Debut", body: "Paris Fragrance Awards — 2024" },
  { label: "Design Excellence", body: "LVMH Innovation Prize — 2023" },
];

const Home = () => {
  const { handleGetAllProducts } = useProduct();
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  // Subtle parallax on hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = useSelector((state) => state.product.products) || [];

  return (
    <div className="min-h-screen bg-[#0c0b09] text-stone-100 font-sans overflow-x-hidden">

      {/* ─── GLOBAL STYLES ─────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

        body { background: #0c0b09; }

        .font-serif-luxury { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-luxury  { font-family: 'Inter', system-ui, sans-serif; }

        /* Grain overlay */
        .grain::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          opacity: 0.4;
        }

        /* Marquee animation */
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marqueeScroll 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }

        /* Story slider custom */
        .story-swiper .swiper-pagination {
          bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 64px;
          gap: 8px;
        }
        .story-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.3);
          width: 6px; height: 6px;
          opacity: 1;
          border-radius: 99px;
          transition: all 0.4s cubic-bezier(.4,0,.2,1);
          margin: 0 !important;
        }
        .story-swiper .swiper-pagination-bullet-active {
          background: white;
          width: 32px;
        }
        .story-swiper .swiper-button-prev,
        .story-swiper .swiper-button-next {
          color: rgba(255,255,255,0.65);
          width: 48px; height: 48px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(10px);
          transition: all 0.3s;
          top: auto;
          bottom: 24px;
          right: auto;
        }
        .story-swiper .swiper-button-prev { left: auto; right: 80px; }
        .story-swiper .swiper-button-next { left: auto; right: 24px; }
        .story-swiper .swiper-button-prev::after,
        .story-swiper .swiper-button-next::after {
          font-size: 13px; font-weight: 800;
        }
        .story-swiper .swiper-button-prev:hover,
        .story-swiper .swiper-button-next:hover {
          background: rgba(255,255,255,0.12);
          color: white;
          border-color: rgba(255,255,255,0.4);
        }

        /* Product card hover line */
        .product-line {
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.5s cubic-bezier(.4,0,.2,1);
        }
        .product-card:hover .product-line { width: 100%; }

        /* Scroll-reveal */
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* ─── 1. FULLSCREEN HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0c0b09]">
        {/* Parallax BG */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={heroRef}
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2400&auto=format&fit=crop"
            alt="Still Hero"
            className="w-full h-[130%] object-cover opacity-35 scale-110"
            style={{ top: '-15%', position: 'absolute' }}
          />
        </div>
        {/* Radial gradient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0c0b09_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0c0b09] to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 select-none">
          <p className="font-sans-luxury text-[10px] tracking-[0.6em] uppercase text-stone-400 mb-8 letter-spacing">
            Maison de Parfum · Est. 2024
          </p>
          <h1
            className="font-serif-luxury text-[clamp(80px,16vw,200px)] leading-none tracking-[0.08em] uppercase text-white"
            style={{ fontWeight: 300, letterSpacing: '0.06em' }}
          >
            Still
          </h1>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-stone-400 to-transparent mx-auto mt-8 mb-8" />
          <p className="font-sans-luxury text-[10px] tracking-[0.5em] uppercase text-stone-400">
            The New Fragrance
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-sans-luxury text-[9px] tracking-[0.4em] uppercase text-stone-500">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-stone-500 to-transparent animate-pulse" />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-32 left-8 text-stone-600 font-sans-luxury text-[9px] tracking-widest uppercase hidden md:block">
          <span>50°N · 14°E</span>
        </div>
        <div className="absolute top-32 right-8 text-stone-600 font-sans-luxury text-[9px] tracking-widest uppercase hidden md:block">
          <span>Collection 2024</span>
        </div>
      </section>

      {/* ─── 2. MARQUEE BAND ────────────────────────────────────────────── */}
      <div className="relative border-y border-stone-800 py-4 overflow-hidden bg-[#0f0e0b]">
        <div className="flex whitespace-nowrap marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`font-serif-luxury text-sm tracking-[0.25em] uppercase mx-6 ${item === '·' ? 'text-stone-600' : 'text-stone-400 hover:text-stone-100 cursor-default transition-colors'}`}
              style={{ fontStyle: item === '·' ? 'normal' : 'italic', fontWeight: 300 }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── 3. STORY SLIDER ────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#0c0b09]">
        <Swiper
          className="story-swiper"
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          speed={1200}
        >
          {perfumeStories.map((story, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[92vh] w-full flex items-center">
                {/* BG Image */}
                <img
                  src={story.image}
                  alt={story.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b09] via-[#0c0b09]/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0c0b09] to-transparent" />

                {/* Text Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full pb-20">
                  <div className="max-w-2xl">
                    <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: story.accent }}>
                      {story.subtitle}
                    </p>
                    <h2
                      className="font-serif-luxury text-[clamp(52px,8vw,110px)] leading-none uppercase text-white mb-6"
                      style={{ fontWeight: 300 }}
                    >
                      {story.name}
                    </h2>
                    <div className="w-16 h-px mb-8" style={{ backgroundColor: story.accent, opacity: 0.8 }} />
                    <p className="font-sans-luxury text-stone-400 leading-relaxed text-sm tracking-wide max-w-lg mb-10">
                      {story.story}
                    </p>
                    <button
                      className="font-sans-luxury border-b pb-1 text-[10px] uppercase tracking-[0.35em] text-white hover:opacity-50 transition-opacity"
                      style={{ borderColor: story.accent }}
                    >
                      Discover the story
                    </button>
                  </div>
                </div>

                {/* Slide counter */}
                <div className="absolute bottom-12 right-16 font-serif-luxury text-stone-700 select-none hidden md:flex flex-col items-end gap-1">
                  <span className="text-5xl" style={{ fontWeight: 300 }}>0{index + 1}</span>
                  <span className="text-stone-700 text-[9px] tracking-widest uppercase">/ 0{perfumeStories.length}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ─── 4. AWARDS STRIP ────────────────────────────────────────────── */}
      <section className="border-y border-stone-800 bg-[#0f0e0b] py-10">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-800">
          {awards.map((a, i) => (
            <div key={i} className="flex flex-col items-center text-center py-6 md:py-0 px-8">
              <span className="font-sans-luxury text-[8px] tracking-[0.4em] uppercase text-stone-500 mb-2">Recognition</span>
              <span className="font-serif-luxury text-lg text-stone-100 italic mb-1" style={{ fontWeight: 300 }}>{a.label}</span>
              <span className="font-sans-luxury text-[9px] tracking-widest text-stone-500 uppercase">{a.body}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5. FRAGRANCES COLLECTION ───────────────────────────────────── */}
      <section className="bg-[#0c0b09] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-end justify-between mb-20 pb-6 border-b border-stone-800">
            <div>
              <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-3">The Edit</p>
              <h2 className="font-serif-luxury text-4xl md:text-6xl uppercase text-white" style={{ fontWeight: 300, fontStyle: 'italic' }}>
                Fragrances
              </h2>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="font-sans-luxury hidden md:flex items-center gap-3 text-[9px] tracking-[0.4em] uppercase text-stone-400 hover:text-white transition-colors border-b border-stone-700 hover:border-white pb-1"
            >
              View all
            </button>
          </div>

          {/* Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
              {products.map((product, idx) => (
                <div
                  onClick={() => navigate(`/product/${product._id}`)}
                  key={product._id}
                  className="product-card group cursor-pointer flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#161410] mb-5">
                    <img
                      src={product.images[0]?.url || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop"}
                      alt={product.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    {/* Tag */}
                    <div className="absolute top-3 left-3 bg-[#0c0b09]/70 backdrop-blur-sm px-2 py-1 font-sans-luxury text-[8px] tracking-widest uppercase text-stone-400">
                      {idx === 0 ? 'New' : idx === 1 ? 'Bestseller' : 'Exclusive'}
                    </div>
                  </div>
                  {/* Details */}
                  <p className="font-sans-luxury text-[8px] tracking-[0.4em] uppercase text-stone-500 mb-2">
                    Eau de Parfum
                  </p>
                  <h3 className="font-serif-luxury text-lg uppercase text-stone-100 mb-2 leading-tight group-hover:text-stone-300 transition-colors" style={{ fontWeight: 300 }}>
                    {product.title}
                  </h3>
                  <div className="product-line text-stone-700 mb-3" />
                  <p className="font-sans-luxury text-xs text-stone-400 mt-auto">
                    {product.price?.currency || "USD"} {product.price?.amount || "—"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <p className="font-serif-luxury text-3xl text-stone-700 italic" style={{ fontWeight: 300 }}>
                No fragrances yet
              </p>
              <p className="font-sans-luxury text-[10px] tracking-widest uppercase text-stone-600 mt-4">
                Check back soon
              </p>
            </div>
          )}

          {/* Mobile view all */}
          <div className="md:hidden text-center mt-16">
            <button
              onClick={() => navigate('/products')}
              className="font-sans-luxury text-[9px] tracking-[0.4em] uppercase text-stone-400 border-b border-stone-600 pb-1"
            >
              View all fragrances
            </button>
          </div>
        </div>
      </section>

      {/* ─── 6. SPLIT EDITORIAL SECTION ─────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        {/* Left — Image */}
        <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1615486171434-6019a79a6331?q=80&w=1200&auto=format&fit=crop"
            alt="The Atelier"
            className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-[4000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0b09]" />
        </div>
        {/* Right — Content */}
        <div className="bg-[#0c0b09] flex flex-col justify-center px-12 md:px-20 py-20">
          <p className="font-sans-luxury text-[9px] tracking-[0.5em] uppercase text-stone-500 mb-6">The Atelier</p>
          <h2 className="font-serif-luxury text-4xl md:text-5xl uppercase text-white leading-tight mb-8" style={{ fontWeight: 300, fontStyle: 'italic' }}>
            The Art<br />of Perfumery
          </h2>
          <div className="w-12 h-px bg-stone-600 mb-8" />
          <p className="font-sans-luxury text-stone-400 text-sm leading-relaxed tracking-wide max-w-md mb-10">
            At Still, we believe every fragrance is a narrative waiting to unfold. Our master perfumers work in small batches, sourcing the world's rarest ingredients to compose scents that transcend time.
          </p>
          <button
            className="font-sans-luxury self-start text-[10px] tracking-[0.4em] uppercase text-white border-b border-stone-500 hover:border-white pb-1 transition-colors"
          >
            Our philosophy
          </button>
        </div>
      </section>

      {/* ─── 7. FULL-BLEED BANNER ───────────────────────────────────────── */}
      <section className="relative h-[65vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=2400&auto=format&fit=crop"
          alt="Campaign"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[#0c0b09]/50" />
        {/* Centered text */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <p className="font-sans-luxury text-[9px] tracking-[0.6em] uppercase text-stone-300 mb-6">Limited Edition</p>
          <h2 className="font-serif-luxury text-5xl md:text-7xl uppercase leading-none mb-8" style={{ fontWeight: 300, fontStyle: 'italic' }}>
            The Essence
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="font-sans-luxury mt-2 bg-transparent border border-white/30 text-white px-10 py-4 text-[9px] uppercase tracking-[0.4em] hover:bg-white hover:text-[#0c0b09] transition-all duration-500 backdrop-blur-sm"
          >
            Shop the collection
          </button>
        </div>
      </section>

      {/* ─── 8. THREE PILLARS ───────────────────────────────────────────── */}
      <section className="bg-[#0c0b09] py-28 px-6 border-t border-stone-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {[
            { icon: "✦", title: "Rare Ingredients", text: "Sourced from the world's most precious botanical reserves, each note is hand-selected for quality." },
            { icon: "◈", title: "Small Batches", text: "Every bottle is crafted in limited quantities to preserve the integrity of the formula." },
            { icon: "❋", title: "Lifetime Guarantee", text: "We stand behind every fragrance we produce with an unconditional satisfaction guarantee." },
          ].map((pillar, i) => (
            <div key={i} className="flex flex-col items-center gap-5">
              <span className="text-stone-500 text-2xl">{pillar.icon}</span>
              <h3 className="font-serif-luxury text-xl uppercase text-white tracking-widest" style={{ fontWeight: 300 }}>
                {pillar.title}
              </h3>
              <div className="w-8 h-px bg-stone-700" />
              <p className="font-sans-luxury text-stone-500 text-xs leading-relaxed tracking-wide max-w-xs">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 9. FOOTER HOOK ─────────────────────────────────────────────── */}
      <section className="bg-[#080807] border-t border-stone-800 py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="md:w-1/3">
            <h2 className="font-serif-luxury text-4xl uppercase text-white mb-2" style={{ fontWeight: 300, fontStyle: 'italic' }}>
              Still
            </h2>
            <p className="font-sans-luxury text-[9px] tracking-[0.4em] text-stone-500 uppercase">
              Maison de Parfum
            </p>
          </div>

          <div className="md:w-1/3 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=500&auto=format&fit=crop"
              alt="Exceptional Piece"
              className="h-56 md:h-72 object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: '0 0 60px rgba(201,169,110,0.08)' }}
            />
          </div>

          <div className="md:w-1/3 flex flex-col items-center md:items-end gap-5 text-center md:text-right">
            <h3 className="font-serif-luxury text-xl uppercase text-stone-200 tracking-widest" style={{ fontWeight: 300 }}>
              Exceptional Piece
            </h3>
            <p className="font-sans-luxury text-stone-500 text-xs tracking-wider leading-relaxed max-w-[240px]">
              Born from fire, water, earth, and air — combined with the unparalleled expertise of master artisans.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="font-sans-luxury text-[9px] tracking-[0.4em] uppercase text-stone-300 border-b border-stone-600 hover:border-stone-300 hover:text-white pb-1 transition-all"
            >
              Explore the atelier
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans-luxury text-[9px] tracking-widest uppercase text-stone-700">
            © 2024 Still · Maison de Parfum · All rights reserved
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Contact'].map(link => (
              <span key={link} className="font-sans-luxury text-[9px] tracking-[0.3em] uppercase text-stone-600 hover:text-stone-300 cursor-pointer transition-colors">
                {link}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;