import React from "react";
import { FaStar } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      text: "Saya sangat kagum dengan kualitas dan model pakaian dari Boutiquera. Mulai dari pakaian kasual hingga gaun malam, setiap produknya benar-benar melebihi ekspektasi saya.",
    },
    {
      id: 2,
      name: "Alex K.",
      text: "Mencari pakaian yang pas dengan gaya personal saya dulunya sulit, sampai akhirnya saya menemukan Boutiquera. Pilihan koleksinya sangat lengkap untuk berbagai acara.",
    },
    {
      id: 3,
      name: "James L.",
      text: "Sebagai orang yang selalu mencari fashion unik, saya senang sekali menemukan Boutiquera. Pilihan pakaiannya tidak hanya beragam, tetapi juga selalu mengikuti tren terbaru.",
    },
    {
      id: 4,
      name: "Amanda R.",
      text: "Bahan kainnya premium sekali! Saat dipakai sangat nyaman dan potongannya pas di badan. Sudah beberapa kali belanja di sini dan tidak pernah kecewa dengan kualitasnya.",
    },
    {
      id: 5,
      name: "Dimas S.",
      text: "Pelayanan keanggotaannya luar biasa. Sejak bergabung jadi member, saya dapat banyak diskon eksklusif dan gratis ongkir. Pengirimannya juga sangat cepat sampai rumah.",
    },
    {
      id: 6,
      name: "Citra T.",
      text: "Gaun yang saya beli untuk acara formal kemarin mendapat banyak pujian. Desainnya terlihat sangat mewah dan elegan, mirip butik desainer papan atas tetapi harga tetap masuk akal.",
    },
    {
      id: 7,
      name: "Rian D.",
      text: "Koleksi pakaian kasual pria di sini potongannya rapi dan bahannya tidak panas. Sangat cocok untuk dipakai kerja harian maupun saat santai di akhir pekan.",
    },
    {
      id: 8,
      name: "Nadia W.",
      text: "Fitur pre-order untuk member benar-benar membantu saya mengamankan koleksi limited edition sebelum kehabisan. Pengalaman belanja yang sangat eksklusif!",
    },
    {
      id: 9,
      name: "Hendra B.",
      text: "Transaksinya aman, pelayanannya responsif, dan kualitas bajunya konsisten. Ini sudah menjadi butik andalan keluarga kami untuk kebutuhan fashion harian.",
    },
    {
      id: 10,
      name: "Siti A.",
      text: "Suka sekali dengan detail jahitan produk Boutiquera, sangat rapi dan kokoh. Poin belanja yang dikumpulkan juga bisa ditukar dengan hadiah menarik, menguntungkan sekali.",
    },
  ];

  return (
    <section id="testimonials" className="scroll-mt-16 py-24 relative overflow-hidden bg-gradient-to-b from-white via-[#fafafa] to-white">
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
            animation: marquee-review 50s linear infinite;
          }
          .review-container:hover .animate-marquee-review {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-8 flex justify-between items-end mb-16 relative z-20">
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">
          Testimoni Pelanggan
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
    </section>
  );
}