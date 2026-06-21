import React, { useEffect } from "react";
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
    story: "Conceived as an ode to nature, Still is an act of creation inspired by wide-open spaces. Compositions marked by raw freshness, combining power and nobility. Raw and lively, sensual and mysterious — born in nature, shaped by elegance.",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1200&auto=format&fit=crop",
    accent: "#c9a96e",
  },
  {
    name: "Midnight Orchid",
    subtitle: "Dark Floral Collection",
    story: "A journey into the darkness of night, where rare orchids bloom under a moonless sky. Black truffle and ylang-ylang open the senses, before dark orchid and patchouli seduce you into the depths of the unknown.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
    accent: "#7c3aed",
  },
  {
    name: "Amber Dusk",
    subtitle: "Warm & Radiant Collection",
    story: "As the sun dips below the horizon, warm amber light bathes the earth in gold. This Extrait de Parfum captures that fleeting moment — crushed coriander and Madagascar vanilla blending seamlessly with smoky woods.",
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1200&auto=format&fit=crop",
    accent: "#d97706",
  },
  {
    name: "Silk Oud",
    subtitle: "Luxury Oud Collection",
    story: "Draped in opulence, Silk Oud is an ode to the ancient trade routes of the East. Rich Cambodian oud, softened by delicate saffron and sweet praline, creates a fragrance as smooth and precious as silk itself.",
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1200&auto=format&fit=crop",
    accent: "#b45309",
  },
  {
    name: "Azure Breeze",
    subtitle: "Fresh & Oceanic Collection",
    story: "Close your eyes and feel the ocean breeze rush through you. Sea salt, blue lotus, and the crisp coolness of melon carry you to an endless horizon where the sky meets the sea in perfect stillness.",
    image: "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=1200&auto=format&fit=crop",
    accent: "#0284c7",
  },
];

const Home = () => {
  const { handleGetAllProducts } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const products = useSelector((state) => state.product.products) || [];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-stone-900 dark:text-stone-100 font-sans selection:bg-stone-200 dark:selection:bg-stone-800">
      
      {/* 1. Hero Section */}
        <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-stone-950">
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000&auto=format&fit=crop" 
            alt="Still Hero" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 hover:scale-105 transition-transform duration-[3000ms] ease-out"
          />
          <div className="relative z-10 text-center text-white px-4">
            <h2 className="text-sm md:text-base tracking-[0.4em] uppercase mb-4 opacity-80 drop-shadow-md">Introducing</h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-[0.2em] uppercase drop-shadow-2xl">
              Still
            </h1>
            <p className="mt-6 text-sm tracking-[0.2em] uppercase font-light opacity-90 drop-shadow-md">
              The New Fragrance
            </p>
          </div>
        </section>

      {/* 2. Story Slider Section */}
      <section className="relative w-full overflow-hidden bg-stone-950">
        <style>{`
          .story-swiper .swiper-pagination-bullet {
            background: rgba(255,255,255,0.4);
            width: 6px;
            height: 6px;
            opacity: 1;
            transition: all 0.3s;
          }
          .story-swiper .swiper-pagination-bullet-active {
            background: white;
            width: 28px;
            border-radius: 3px;
          }
          .story-swiper .swiper-button-prev,
          .story-swiper .swiper-button-next {
            color: rgba(255,255,255,0.7);
            width: 44px;
            height: 44px;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 50%;
            background: rgba(255,255,255,0.05);
            backdrop-filter: blur(8px);
            transition: all 0.3s;
          }
          .story-swiper .swiper-button-prev::after,
          .story-swiper .swiper-button-next::after {
            font-size: 14px;
            font-weight: 700;
          }
          .story-swiper .swiper-button-prev:hover,
          .story-swiper .swiper-button-next:hover {
            background: rgba(255,255,255,0.15);
            color: white;
          }
        `}</style>
        <Swiper
          className="story-swiper"
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          speed={900}
        >
          {perfumeStories.map((story, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[85vh] w-full flex items-center">
                {/* Background Image */}
                <img
                  src={story.image}
                  alt={story.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent" />
                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full">
                  <div className="max-w-xl">
                    <p
                      className="text-[10px] uppercase tracking-[0.4em] mb-4 font-light"
                      style={{ color: story.accent }}
                    >
                      {story.subtitle}
                    </p>
                    <h2 className="text-5xl md:text-7xl font-serif tracking-widest uppercase text-white mb-8 leading-tight">
                      {story.name}
                    </h2>
                    <div
                      className="w-12 h-px mb-8"
                      style={{ backgroundColor: story.accent }}
                    />
                    <p className="text-stone-300 leading-relaxed text-sm tracking-wide max-w-md mb-10">
                      {story.story}
                    </p>
                    <button
                      className="border-b pb-1 text-xs uppercase tracking-[0.2em] text-white hover:opacity-60 transition-opacity"
                      style={{ borderColor: story.accent }}
                    >
                      Discover the story
                    </button>
                  </div>
                </div>
                {/* Slide Number */}
                <div className="absolute bottom-12 right-12 text-white/30 font-serif text-6xl select-none hidden md:block">
                  0{index + 1}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 3. Collection (Products Grid) */}
      <section className="bg-[#FAF9F6] dark:bg-[#121212] py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-3xl md:text-4xl font-serif tracking-widest uppercase">Fragrances</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-20">
            {products.map((product) => (
              <div
                onClick={() => navigate(`/product/${product._id}`)}
                key={product._id}
                className="group cursor-pointer flex flex-col items-center text-center"
              >
                {/* Image Container */}
                <div className="w-full aspect-[3/4] mb-8 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={product.images[0]?.url || "https://images.unsplash.com/photo-1523293115678-cb9269c258a4?q=80&w=600&auto=format&fit=crop"}
                    alt={product.title}
                    className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Details */}
                <h3 className="text-lg font-serif tracking-widest uppercase mb-3 group-hover:text-stone-500 transition-colors">
                  {product.title}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-[10px] tracking-[0.2em] uppercase mb-4 line-clamp-1 px-4">
                  {product.description}
                </p>
                <p className="text-sm font-light tracking-widest text-stone-800 dark:text-stone-200">
                  {product.price?.currency || "$"} {product.price?.amount || "0"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Immersive Banner Section */}
      <section className="relative h-[60vh] w-full overflow-hidden bg-stone-900">
        <img 
          src="https://images.unsplash.com/photo-1615486171434-6019a79a6331?q=80&w=2000&auto=format&fit=crop" 
          alt="Campaign" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/30 dark:bg-black/50"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-serif tracking-[0.2em] uppercase mb-8 drop-shadow-lg">
            The Essence
          </h2>
          <button onClick={() => navigate('/products')} className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-stone-900 transition-colors duration-300">
            Shop the collection
          </button>
        </div>
      </section>

      {/* 5. Special Edition / Footer Hook */}
      <section className="bg-stone-950 text-white py-24 px-6 border-t border-stone-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="md:w-1/3 flex flex-col items-center md:items-start">
            <h2 className="text-2xl md:text-3xl font-serif tracking-widest uppercase mb-2">
              Still
            </h2>
            <p className="text-xs tracking-[0.4em] font-sans text-stone-400 uppercase">
              by Baccarat
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop" 
              alt="Exceptional Piece" 
              className="h-64 md:h-80 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            />
          </div>
          <div className="md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-lg font-serif tracking-widest uppercase mb-4 text-stone-200">Exceptional Piece</h3>
            <p className="text-stone-400 text-xs tracking-wider leading-relaxed max-w-[250px]">
              Born from fire, water, earth, and air combined with the unparalleled expertise of master artisans.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;