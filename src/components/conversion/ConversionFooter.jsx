import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FiUsers, FiChevronRight } from "react-icons/fi";

export default function ConversionFooter() {
  const { user } = useAuth();

  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <FiUsers className="text-2xl" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
            Ready to unlock
            <br />
            your boutique experience?
          </h2>

          <p className="text-white/60 mt-4 text-sm md:text-base max-w-md mx-auto">
            Join thousands of exclusive members and enjoy premium benefits,
            special discounts, and personalized fashion experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            {user ? (
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-white text-black font-bold py-4 px-10 rounded-full
                  transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl
                  active:scale-95"
              >
                Start Shopping
                <FiChevronRight className="text-lg" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-white text-black font-bold py-4 px-10 rounded-full
                    transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl
                    active:scale-95"
                >
                  Create Account
                  <FiChevronRight className="text-lg" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold py-4 px-10 rounded-full
                    transition-all duration-300 ease-out hover:bg-white hover:text-black hover:scale-105
                    active:scale-95"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {!user && (
            <p className="text-xs text-white/40 mt-6">
              Free registration &middot; No hidden fees &middot; Cancel anytime
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
