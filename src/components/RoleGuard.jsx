import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Error403 from "../pages/Error403"; // Atur path ini sesuai dengan struktur folder kamu

export default function RoleGuard({ allowedRoles, children }) {
  const { user } = useAuth();

  // Jika user belum login, arahkan ke halaman utama/login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Jika user tidak memiliki role yang diizinkan, tampilkan halaman Error403
  if (!allowedRoles.includes(user.role)) {
    return <Error403 />;
  }

  // Jika lolos semua pengecekan, tampilkan halaman yang dituju
  return children;
}