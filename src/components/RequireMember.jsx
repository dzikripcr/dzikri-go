import { useNavigate, useLocation } from "react-router-dom";
import { FiLock, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function RequireMember({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return (
      <div className="relative">
        {/* Konten asli tetap dirender supaya ada "isi" di belakang popup,
            tapi diblur & interaksinya dikunci total (tidak bisa diklik/scroll). */}
        <div className="pointer-events-none select-none blur-md scale-105">
          {children}
        </div>

        {/* OVERLAY + MODAL */}
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/30 backdrop-blur-sm px-4">
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <button
              onClick={() => navigate("/")}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition cursor-pointer"
            >
              <FiX size={20} />
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black flex items-center justify-center">
              <FiLock className="text-white text-2xl" />
            </div>

            <h3 className="text-xl font-black uppercase tracking-tight mb-2">
              Login Diperlukan
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Anda harus login terlebih dahulu untuk melihat detail produk ini.
            </p>

            <div className="flex flex-col gap-3">
              {/* LOGIN SEKARANG - dengan efek kilau */}
              <button
                onClick={() =>
                  navigate("/login", { state: { from: location } })
                }
                className="bg-black text-white font-medium py-3 rounded-full w-full transition-all duration-300 ease-out relative outline-none
                hover:bg-black hover:scale-105 hover:shadow-[0_0_15px_rgba(0,0,0,0.5),0_0_30px_rgba(0,0,0,0.3),0_0_45px_rgba(0,0,0,0.2)]
                active:scale-95 active:shadow-[0_0_10px_rgba(0,0,0,0.4)] cursor-pointer"
              >
                Login Sekarang
              </button>

              <button
                onClick={() => navigate("/")}
                className="border border-gray-200 text-gray-700 py-3 rounded-full font-medium transition-all duration-500 ease-in-out hover:bg-black hover:text-white hover:border-black cursor-pointer"
              >
                Kembali ke Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
