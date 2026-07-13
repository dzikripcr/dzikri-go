import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import HeaderSection from "../../components/HeaderSection";
import AlertBox from "@/components/AlertBox";
import LoadingSpinner from "@/components/LoadingSpinner";

import { userAPI } from "../../services/userAPI";
import { customerAPI } from "../../services/customerAPI";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password.length < 6) {
      setType("error");
      setMessage("Password minimal 6 karakter");
      return;
    }

    try {
      setLoading(true);

      const users = await userAPI.fetchUser();
      const checkEmail = users.find((user) => user.email === form.email);

      if (checkEmail) {
        setType("error");
        setMessage("Email sudah terdaftar");
        setLoading(false);
        return;
      }

      const newUser = await userAPI.createUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: "member",
      });

      await customerAPI.createCustomerFromUser(newUser);

      setType("success");
      setMessage("Register berhasil, silahkan login");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setType("error");
      setMessage("Register gagal");
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <HeaderSection title="Get Started Now" subtitle="Create your account" />

      {message && <AlertBox type={type}>{message}</AlertBox>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-['Poppins'] text-[14px] font-medium mb-2">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full border border-[#D9D9D9] rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block font-['Poppins'] text-[14px] font-medium mb-2">
            Email address
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full border border-[#D9D9D9] rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block font-['Poppins'] text-[14px] font-medium mb-2">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="w-full border border-[#D9D9D9] rounded-lg px-4 py-3"
          />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" required className="w-4 h-4" />
          <label className="text-sm text-gray-600">
            I agree with terms and conditions
          </label>
        </div>

        <button
          disabled={loading}
          className="w-full bg-[#3A5B22] hover:bg-[#2d461a] text-white py-3 rounded-lg"
        >
          {loading ? <LoadingSpinner text="Creating..." /> : "Create Account"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="ml-2 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}