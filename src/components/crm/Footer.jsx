import React from "react";
import { FiMail } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] mt-40 relative pt-32 pb-20 px-8">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-7xl bg-black rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center shadow-2xl">
        <h2 className="text-3xl md:text-4xl text-white font-black leading-tight mb-8 md:mb-0 md:w-1/2 uppercase tracking-tight">
          DAPATKAN INFORMASI TERBARU
          <br />
          TENTANG PENAWARAN KAMI
        </h2>
        <div className="flex flex-col space-y-4 w-full md:w-[40%]">
          <div className="relative group">
            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-black transition-colors duration-300" />
            <input
              type="email"
              placeholder="Masukkan alamat email Anda"
              className="pl-12 pr-6 py-4 rounded-full w-full outline-none text-black bg-white focus:ring-4 focus:ring-gray-300/50 transition-all duration-300"
            />
          </div>
          <button className="bg-white text-black font-extrabold px-6 py-4 rounded-full w-full transition-all duration-300 ease-out relative outline-none hover:bg-white hover:scale-105 hover:shadow-[0_0_15px_#fff,0_0_30px_#fff,0_0_45px_rgba(255,255,255,0.6)] active:scale-95 active:shadow-[0_0_10px_#fff]">
            Berlangganan Buletin
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 border-b border-gray-300 pt-8 pb-12">
        <div className="md:col-span-1 space-y-6">
          <h3 className="text-3xl font-black uppercase tracking-tighter">
            Boutiquera
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Kami menyediakan pakaian yang sesuai dengan gaya Anda dan bangga untuk Anda
            kenakan. Mulai dari koleksi wanita hingga pria.
          </p>
          <div className="flex space-x-3 pt-2">
            <div className="w-9 h-9 rounded-full border border-gray-300 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition cursor-pointer text-lg">
              <RiTwitterXFill />
            </div>
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition cursor-pointer text-lg">
              <FaFacebookF />
            </div>
            <div className="w-9 h-9 rounded-full border border-gray-300 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition cursor-pointer text-lg">
              <FaInstagram />
            </div>
            <div className="w-9 h-9 rounded-full border border-gray-300 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition cursor-pointer text-lg">
              <FaGithub />
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold tracking-widest mb-6 uppercase">
            PERUSAHAAN
          </h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-black transition">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Fitur
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Karya
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Karier
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold tracking-widest mb-6 uppercase">BANTUAN</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-black transition">
                Dukungan Pelanggan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Detail Pengiriman
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Syarat & Ketentuan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Kebijakan Privasi
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold tracking-widest mb-6 uppercase">FAQ</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-black transition">
                Akun
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Kelola Pengiriman
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Pesanan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Pembayaran
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold tracking-widest mb-6 uppercase">
            SUMBER DAYA
          </h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-black transition">
                eBook Gratis
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Tutorial Pengembangan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Panduan - Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Playlist Youtube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>Boutiquera © 2025/2026, Hak Cipta Dilindungi Undang-Undang</p>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <div className="bg-white border rounded px-3 py-1 shadow-sm font-bold text-xs text-blue-900">
            VISA
          </div>
          <div className="bg-white border rounded px-3 py-1 shadow-sm font-bold text-xs">
            Mastercard
          </div>
          <div className="bg-white border rounded px-3 py-1 shadow-sm font-bold text-xs">
            PayPal
          </div>
        </div>
      </div>
    </footer>
  );
}