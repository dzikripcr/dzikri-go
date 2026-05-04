import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TbHanger } from "react-icons/tb";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message || "An error occurred");
        } else {
          setError(err.message || "An unknown error occurred");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const errorInfo = error ? (
    <div className="bg-rose-50 mb-6 p-4 text-sm font-medium text-rose-700 border border-rose-100 rounded-xl flex items-center shadow-sm">
      <BsFillExclamationDiamondFill className="text-rose-500 me-3 text-lg flex-shrink-0" />
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-slate-50 mb-6 p-4 text-sm font-medium text-slate-700 border border-slate-200 rounded-xl flex items-center shadow-sm">
      <ImSpinner2 className="me-3 animate-spin text-gray-900 text-lg flex-shrink-0" />
      Authenticating...
    </div>
  ) : null;

  return (
    // Menggunakan fixed inset-0 z-50 agar memaksa full layar menutupi layout bawaan
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image Full Screen */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 m-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-serif font-bold text-gray-900 tracking-widest flex items-center gap-2">
            <TbHanger />
            BOUTIQUE
          </span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Please enter your details to sign in
          </p>
        </div>

        {errorInfo}
        {loadingInfo}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
              Username / Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all text-gray-900 placeholder-gray-400 disabled:opacity-50"
              placeholder="e.g. kminchelle"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1 mr-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <Link
                to="/forgot"
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all text-gray-900 placeholder-gray-400 disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-full transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Link ke Register */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-gray-900 hover:underline font-semibold transition-all"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
