import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div id="dashboard-container" className="min-h-[80vh] flex items-center justify-center">
      <div className="p-5 w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
          
          {/* Elemen Visual Bertema Boutique */}
          <div className="relative mb-8">
            <h1 className="text-[120px] font-extrabold text-gray-100 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <HiOutlineShoppingBag className="text-6xl text-gray-800" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-semibold text-gray-900">
              Kehilangan Jejak Gaya?
            </h2>
            
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              Halaman yang Anda cari tidak ditemukan dalam koleksi kami. 
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-50 w-full">
            <Link
              to="/"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 shadow-lg shadow-gray-200"
            >
              KEMBALI KE BERANDA
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}