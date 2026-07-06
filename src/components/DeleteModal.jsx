import { FaExclamationTriangle } from "react-icons/fa";

export default function DeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Konfirmasi Hapus", 
  message = "Apakah Anda yakin ingin menghapus data ini? Data yang dihapus tidak dapat dikembalikan." 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full text-red-600 text-2xl">
            <FaExclamationTriangle />
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">
          {message}
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors w-full"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors w-full"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}