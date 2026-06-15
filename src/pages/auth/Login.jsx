import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import HeaderSection from "../../components/HeaderSection";
import AlertBox from "@/components/AlertBox";
import LoadingSpinner from "@/components/LoadingSpinner";

import { userAPI } from "../../services/userAPI";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const users = await userAPI.fetchUser();

      const user = users.find(
        (item) =>
          item.email === dataForm.email && item.password === dataForm.password,
      );

      if (!user) {
        throw new Error("Email atau password salah");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <HeaderSection
        title="Welcome back!"
        subtitle="Enter your Credentials to access your account"
      />

      {error && <AlertBox type="error">{error}</AlertBox>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[14px] font-medium mb-2">
            Email address
          </label>

          <input
            name="email"
            type="email"
            required
            onChange={handleChange}
            className="
            w-full border rounded-lg px-4 py-3
            "
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium mb-2">Password</label>

          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
            className="
            w-full border rounded-lg px-4 py-3
            "
            placeholder="Enter your password"
          />
        </div>

        <button
          disabled={loading}
          className="
          w-full
          bg-[#3A5B22]
          text-white
          py-3
          rounded-lg
          "
        >
          {loading ? <LoadingSpinner /> : "Login"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?
          <Link to="/register" className="ml-2 font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
