import React from "react";
import { FaStar } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece has exceeded my expectations.",
    },
    {
      id: 2,
      name: "Alex K.",
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    },
    {
      id: 3,
      name: "James L.",
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-[#fafafa] to-white">
      {/* CSS Khusus untuk Marquee Review */}
      <style>
        {`
          @keyframes marquee-review {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-review {
            display: flex;
            width: max-content;
            animation: marquee-review 40s linear infinite;
          }
          .review-container:hover .animate-marquee-review {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-8 flex justify-between items-end mb-16 relative z-20">
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">
          Our Happy Customers
        </h3>
        <div className="hidden md:flex gap-2 opacity-50">
          <FaStar className="text-gray-300 text-3xl" />
          <FaStar className="text-gray-300 text-4xl -mt-4" />
          <FaStar className="text-gray-300 text-2xl" />
        </div>
      </div>

      {/* MARQUEE WRAPPER */}
      <div className="relative w-full review-container overflow-hidden pb-10">
        <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee-review flex items-stretch gap-6 md:gap-8 px-4 md:px-8">
          {[...Array(3)].map((_, arrayIndex) => (
            <React.Fragment key={arrayIndex}>
              {testimonials.map((testi, index) => (
                <div
                  key={`${testi.id}-${arrayIndex}-${index}`}
                  className="w-[320px] md:w-[420px] flex-shrink-0 bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-3 hover:border-gray-200 hover:shadow-[0_20px_50px_rgb(0,0,0,0.06)] group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none z-0"></div>

                  <div className="relative z-10">
                    <div className="flex space-x-1 text-[#FFC633] mb-6 text-xl">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <h4 className="font-extrabold text-2xl mb-4 flex items-center gap-2 text-gray-900">
                      {testi.name}{" "}
                      <BsCheckCircleFill className="text-green-500 text-xl" />
                    </h4>
                    <p className="text-gray-500 leading-relaxed text-base md:text-lg font-medium">
                      "{testi.text}"
                    </p>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* BUTTON VIEW ALL REVIEWS */}
      <div className="flex justify-center mt-12 relative z-20 px-8">
        <button className="group relative px-10 py-4 bg-transparent text-gray-900 font-bold text-lg rounded-full overflow-hidden border-2 border-gray-900 transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
          <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
            View All Customer Reviews
            <FiArrowRight className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </section>
  );
}