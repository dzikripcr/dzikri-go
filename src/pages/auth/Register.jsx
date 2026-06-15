// Register.jsx
import { Link } from "react-router-dom";
import HeaderSection from "../../components/HeaderSection";

export default function Register() {
  return (
    <div className="w-full">
      <HeaderSection
        title="Get Started Now"
        subtitle=""
      />

      <form className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block font-['Poppins'] text-[14px] font-medium text-[#000000] mb-2">
            Full Name
          </label>

          <input
            type="text"
            required
            className="w-full border border-[#D9D9D9] rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-500 transition-all placeholder:text-gray-300"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-['Poppins'] text-[14px] font-medium text-[#000000] mb-2">
            Email address
          </label>

          <input
            type="email"
            required
            className="w-full border border-[#D9D9D9] rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-500 transition-all placeholder:text-gray-300"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-['Poppins'] text-[14px] font-medium text-[#000000] mb-2">
            Password
          </label>

          <input
            type="password"
            required
            className="w-full border border-[#D9D9D9] rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-500 transition-all placeholder:text-gray-300"
            placeholder="Enter your password"
          />
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 rounded border-[#D9D9D9]"
          />

          <label
            htmlFor="terms"
            className="text-[14px] text-gray-600 font-['Poppins']"
          >
            I agree with terms and conditions
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#3A5B22] hover:bg-[#2d461a] text-white font-medium py-3 rounded-lg transition-all shadow-sm cursor-pointer"
        >
          Create Account
        </button>
      </form>

      {/* Separator */}
      <div className="relative my-8 text-center">
        <hr className="border-[#D9D9D9]" />

        <span
          className="
          absolute 
          top-1/2 
          left-1/2 
          -translate-x-1/2 
          -translate-y-1/2 
          bg-white 
          px-3 
          text-[12px] 
          text-gray-400 
          font-['Poppins']
          "
        >
          Or
        </span>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4">
        <button
          className="
          flex 
          items-center 
          justify-center 
          gap-2 
          border 
          border-[#D9D9D9] 
          py-2 
          rounded-lg 
          text-[13px] 
          font-medium 
          font-['Poppins']
          hover:bg-gray-50
          transition-all
          "
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-4"
            alt="google"
          />
          Sign up with Google
        </button>

        <button
          className="
          flex 
          items-center 
          justify-center 
          gap-2 
          border 
          border-[#D9D9D9] 
          py-2
          rounded-lg 
          text-[13px] 
          font-medium 
          font-['Poppins']
          hover:bg-gray-50
          transition-all
          "
        >
          <img
            src="https://th.bing.com/th/id/OIP.9g4dkKVAUyciOuDI9_vEYQHaHa?w=163&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
            className="w-8"
            alt="apple"
          />
          Sign up with Apple
        </button>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center">
        <p className="text-[14px] text-gray-600 font-['Poppins']">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#000000] font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
