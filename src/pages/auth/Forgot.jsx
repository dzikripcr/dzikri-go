import { TbHanger } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image Full Screen */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80')" 
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 m-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-serif font-bold text-gray-900 tracking-widest flex items-center gap-2">
            <TbHanger />
            BOUTIQUE
          </span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Enter your email to receive a reset link
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all text-gray-900 placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-full transition-all shadow-md flex justify-center items-center"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}