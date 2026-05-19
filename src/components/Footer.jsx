import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-[#4EA674]">MyApp</h2>

            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              Dashboard management sederhana berbasis React dan Tailwind CSS.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link
              to="/"
              className="hover:text-[#4EA674] transition-colors"
            >
              Dashboard
            </Link>

            <Link
              to="/orders"
              className="hover:text-[#4EA674] transition-colors"
            >
              Orders
            </Link>

            <Link
              to="/customers"
              className="hover:text-[#4EA674] transition-colors"
            >
              Customers
            </Link>

            <Link
              to="/products"
              className="hover:text-[#4EA674] transition-colors"
            >
              Product
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-400">
            © 2026 MyApp. All rights reserved.
          </p>

          <p className="text-sm text-gray-400">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
