import React from "react";
import { 
  FiShoppingBag, 
  FiTruck, 
  FiTag, 
  FiGift, 
  FiStar, 
  FiShield 
} from "react-icons/fi";

export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: <FiShoppingBag />,
      title: "Koleksi Premium",
      desc: "500+ model baju berkualitas tinggi dengan bahan pilihan terbaik.",
    },
    {
      id: 2,
      icon: <FiTruck />,
      title: "Pengiriman Cepat",
      desc: "Gratis ongkir ke seluruh Indonesia tanpa minimum order.",
    },
    {
      id: 3,
      icon: <FiTag />,
      title: "Diskon Eksklusif",
      desc: "Hemat hingga 30% untuk setiap pembelian sebagai member.",
    },
    {
      id: 4,
      icon: <FiGift />,
      title: "Reward & Poin",
      desc: "Kumpulkan poin setiap belanja dan tukar dengan hadiah menarik.",
    },
    {
      id: 5,
      icon: <FiStar />,
      title: "Akses Pre-Order",
      desc: "Jadi yang pertama mendapatkan koleksi terbaru dan limited edition.",
    },
    {
      id: 6,
      icon: <FiShield />,
      title: "Belanja Aman",
      desc: "Transaksi terjamin aman dengan sistem pembayaran terpercaya.",
    },
  ];

  return (
    // Penambahan kelas scroll-mt-24 menghentikan scroll pas di bawah header yang melayang
    <section id="alasan" className="bg-white py-16 px-8 font-sans scroll-mt-11">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
            Kenapa Memilih Kami
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 uppercase">
            Semua yang Kamu Butuhkan dalam Satu Platform
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed">
            Nikmati pengalaman belanja fashion terbaik dengan berbagai keuntungan eksklusif.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => (
            <div
              key={item.id}
              className="
                group
                bg-white 
                border border-gray-100 
                rounded-2xl 
                p-8 
                shadow-sm
                transition-all 
                duration-300 
                ease-out
                hover:shadow-xl 
                hover:-translate-y-1
                hover:border-gray-200
              "
            >
              {/* ICON BADGE */}
              <div 
                className="
                  w-12 
                  h-12 
                  rounded-xl 
                  bg-red-50 
                  text-red-500 
                  flex 
                  items-center 
                  justify-center 
                  text-xl 
                  mb-6
                  transition-all
                  duration-300
                  group-hover:bg-black
                  group-hover:text-white
                "
              >
                {item.icon}
              </div>

              {/* TEXT CONTENT */}
              <h3 className="font-extrabold text-lg text-gray-900 tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}