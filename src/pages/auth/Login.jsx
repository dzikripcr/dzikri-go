import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Badge from "../../components/Badge";
import HeaderSection from "../../components/HeaderSection";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then(() => navigate("/"))
      .catch((err) =>
        setError(err.response?.data?.message || "Authentication failed"),
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full">
      <HeaderSection
        title="Welcome back!"
        subtitle="Enter your Credentials to access your account"
      />

      {error && (
        <Badge type="error">
          <BsFillExclamationDiamondFill className="text-rose-500 text-lg mt-0.5 flex-shrink-0" />

          <div>
            <p className="mx-2">{error}</p>
          </div>
        </Badge>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          {/* Label: Poppins, 14px, Medium */}
          <label className="block font-['Poppins'] text-[14px] font-medium text-[#000000] mb-2">
            Email address
          </label>
          <input
            name="email"
            type="text"
            onChange={handleChange}
            required
            className="w-full border border-[#D9D9D9] rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-500 transition-all placeholder:text-gray-300"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            {/* Label: Poppins, 14px, Medium */}
            <label className="block font-['Poppins'] text-[14px] font-medium text-[#000000]">
              Password
            </label>
            <Link
              to="/forgot"
              className="text-[12px] text-[#0C2A92] hover:underline"
            >
              forgot password
            </Link>
          </div>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
            className="w-full border border-[#D9D9D9] rounded-lg px-4 py-3 text-sm outline-none focus:border-gray-500 transition-all placeholder:text-gray-300"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 rounded border-[#D9D9D9]"
          />
          <label
            htmlFor="remember"
            className="text-[14px] text-gray-600 font-['Poppins']"
          >
            Remember for 30 days
          </label>
        </div>

        {/* Button: Background #3A5B22 */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3A5B22] hover:bg-[#2d461a] text-white font-medium py-3.5 rounded-lg transition-all flex justify-center items-center shadow-sm disabled:opacity-70"
        >
          {loading ? <ImSpinner2 className="animate-spin text-lg" /> : "Login"}
        </button>
      </form>

      {/* Or Separator */}
      <div className="relative my-8 text-center">
        <hr className="border-[#D9D9D9]" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[12px] text-gray-400 font-['Poppins']">
          Or
        </span>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 border border-[#D9D9D9] py-2.5 rounded-lg text-[13px] font-medium font-['Poppins'] hover:bg-gray-50 transition-all">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="w-4"
            alt="google"
          />{" "}
          Sign in with Google
        </button>
        <button className="flex items-center justify-center gap-2 border border-[#D9D9D9] py-2.5 rounded-lg text-[13px] font-medium font-['Poppins'] hover:bg-gray-50 transition-all">
          <img
            src="https://www.svgrepo.com/show/445327/apple.svg"
            className="w-4"
            alt="apple"
          />{" "}
          Sign in with Apple
        </button>
      </div>

      <div className="mt-10 text-center">
        <p className="text-[14px] text-gray-600 font-['Poppins']">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#000000] font-bold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
