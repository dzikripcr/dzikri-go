import { useState } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";

export default function Form() {
  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [hobi, setHobi] = useState("");
  const [gender, setGender] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // VALIDASI
  const errorNama = !nama
    ? "Nama wajib diisi"
    : nama.length < 3
    ? "Minimal 3 karakter"
    : /\d/.test(nama)
    ? "Nama tidak boleh mengandung angka"
    : "";

  const errorUmur = !umur
    ? "Umur wajib diisi"
    : isNaN(umur)
    ? "Harus berupa angka"
    : umur < 17
    ? "Minimal umur adalah 17 tahun"
    : "";

  const errorHobi = !hobi
    ? "Hobi wajib diisi"
    : hobi.length < 5
    ? "Deskripsi hobi terlalu pendek"
    : hobi.includes("@")
    ? "Tidak boleh mengandung simbol @"
    : "";

  const errorGender = !gender ? "Pilih jenis kelamin" : "";
  const errorPekerjaan = !pekerjaan ? "Pilih pekerjaan" : "";

  const isFormValid = !errorNama && !errorUmur && !errorHobi && !errorGender && !errorPekerjaan;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 
    via-purple-100 to-pink-100 flex flex-col items-center py-10">

      {/* CARD */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl 
      shadow-xl w-full max-w-md border border-white/40 hover:shadow-2xl 
      transition duration-300">

        {/* TITLE */}
        <h2 className="text-3xl font-extrabold text-center 
        bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text 
        text-transparent mb-6">
          Form Data Diri
        </h2>

        {/* INPUT COMPONENT */}
        <InputField
          label="Nama Lengkap"
          type="text"
          placeholder="Contoh: Budi Santoso"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          error={errorNama}
        />

        <InputField
          label="Umur"
          type="number"
          placeholder="Masukkan umur"
          value={umur}
          onChange={(e) => setUmur(e.target.value)}
          error={errorUmur}
        />

        <InputField
          label="Hobi"
          type="text"
          placeholder="Membaca, Berenang, dsb"
          value={hobi}
          onChange={(e) => setHobi(e.target.value)}
          error={errorHobi}
        />

        <SelectField
          label="Gender"
          options={["Laki-laki", "Perempuan"]}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          error={errorGender}
        />

        <SelectField
          label="Pekerjaan"
          options={["Programmer", "Desainer", "Guru", "Pelajar"]}
          value={pekerjaan}
          onChange={(e) => setPekerjaan(e.target.value)}
          error={errorPekerjaan}
        />

        {/* BUTTON */}
        {isFormValid && (
          <button
            onClick={() => setIsSubmitted(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 
            hover:from-purple-500 hover:to-pink-500
            text-white font-bold py-3 px-4 rounded-lg 
            transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg mt-4">
            Simpan Data
          </button>
        )}
      </div>

      {/* HASIL */}
      {isSubmitted && isFormValid && (
        <div className="mt-8 bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl 
        border border-green-300 w-full max-w-md shadow-lg animate-fade-in">
          <h3 className="text-lg font-bold text-green-800 mb-3 border-b border-green-200">
            Data Berhasil Terinput:
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Nama:</strong> {nama}</li>
            <li><strong>Umur:</strong> {umur} Tahun</li>
            <li><strong>Hobi:</strong> {hobi}</li>
            <li><strong>Gender:</strong> {gender}</li>
            <li><strong>Pekerjaan:</strong> {pekerjaan}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

