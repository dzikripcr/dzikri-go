import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">Create Account ✨</h2>
        <p className="text-sm text-gray-500 mt-2">Join our exclusive community today</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</label>
          <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
          <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
          <input type="password" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 outline-none transition-all" placeholder="••••••••" />
        </div>

        <button className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3 rounded-full transition-all shadow-lg mt-2">
          Create Account
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-gray-900 hover:underline hover:text-blue-900 font-semibold">Sign In</Link>
        </p>
      </div>
    </>
  );
}