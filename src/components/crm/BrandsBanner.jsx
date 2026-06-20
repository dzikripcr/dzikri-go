import React from "react";

export default function BrandsBanner() {
  const brands = [
    "VERSACE",
    "ZARA",
    "GUCCI",
    "PRADA",
    "Calvin Klein",
    "CHANEL",
    "DIOR",
    "BURBERRY",
    "HERMÈS",
    "BALENCIAGA",
    "LOUIS VUITTON",
    "ARMANI",
  ];

  return (
    <div
      className="scroll-mt-24 bg-black py-8 overflow-hidden relative flex items-center group"
    >
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 35s linear infinite;
          }
          .group:hover .animate-scroll {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="absolute top-0 left-0 w-16 md:w-40 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-16 md:w-40 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div className="animate-scroll flex items-center gap-12 md:gap-24 px-6">
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {brands.map((brand, index) => (
              <span
                key={`${brand}-${i}-${index}`}
                className="text-white text-2xl md:text-4xl font-serif font-bold tracking-widest opacity-90 whitespace-nowrap hover:text-gray-300 hover:scale-110 transition-all duration-300 cursor-default"
              >
                {brand}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}