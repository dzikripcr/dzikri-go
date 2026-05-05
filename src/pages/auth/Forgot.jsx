import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">Reset Password</h2>
        <p className="text-sm text-gray-500 mt-2">Enter your email to receive a reset link</p>
      </div>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email Address</label>
          <input
            type="email"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>

        <button className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3 rounded-full transition-all shadow-lg">
          Send Reset Link
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link to="/login" className="text-sm text-gray-400 hover:text-gray-900 font-medium underline-offset-4 hover:underline transition-all">
          Back to Sign In
        </Link>
      </div>
    </>
  );
}