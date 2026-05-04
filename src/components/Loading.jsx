import { TbHanger } from "react-icons/tb";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-white">
      {/* Background Subtle Pattern (Optional) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Animated Icon Container */}
        <div className="relative mb-6">
          {/* Outer Ring Animation */}
          <div className="w-20 h-20 border-2 border-gray-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-gray-900 rounded-full animate-spin"></div>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center text-3xl text-gray-900 animate-pulse">
            <TbHanger />
          </div>
        </div>

        {/* Text Styling */}
        <div className="text-center">
          <h2 className="text-xl font-serif font-bold text-gray-900 tracking-[0.3em] uppercase ml-[0.3em]">
            Boutique
          </h2>
          <div className="flex items-center justify-center gap-1 mt-2">
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <p className="absolute bottom-10 text-[10px] tracking-[0.5em] text-gray-400 uppercase font-medium">
        Loading Excellence
      </p>
    </div>
  );
}