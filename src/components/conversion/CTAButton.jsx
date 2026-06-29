import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiChevronRight } from "react-icons/fi";

const styles = {
  primary:
    "bg-black text-white hover:bg-zinc-800 hover:shadow-2xl hover:shadow-black/30",
  outline:
    "border-2 border-black text-black hover:bg-black hover:text-white",
};

export default function CTAButton({
  guestLabel = "Join Membership",
  memberLabel = "Start Shopping",
  guestTo = "/register",
  memberTo = "/",
  variant = "primary",
  icon = true,
  className = "",
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const label = user ? memberLabel : guestLabel;
  const to = user ? memberTo : guestTo;

  return (
    <button
      onClick={() => navigate(to)}
      className={`inline-flex items-center gap-2 font-bold py-4 px-10 rounded-full
        transition-all duration-300 ease-out hover:scale-105 active:scale-95
        ${styles[variant]} ${className}`}
    >
      {label}
      {icon && <FiChevronRight className="text-lg" />}
    </button>
  );
}
