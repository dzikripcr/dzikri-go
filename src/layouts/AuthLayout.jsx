import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-white font-['Poppins']">
      {/* Kolom Kiri: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="max-w-md mx-auto w-full">
          <Outlet />
        </div>
      </div>

      {/* Kolom Kanan: Gambar */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center rounded-l-[40px]"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80')" 
          }}
        >
          {/* Overlay gradien halus jika ingin teks di atas gambar lebih terbaca */}
          <div className="absolute inset-0 bg-black/5 rounded-l-[40px]"></div>
        </div>
      </div>
    </div>
  );
}