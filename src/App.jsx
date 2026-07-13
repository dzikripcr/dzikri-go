import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";

// =====================
// 1. IMPORT CONTEXT PROVIDERS
// =====================
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Komponen global - auto scroll ke atas tiap pindah route
const ScrollToTop = React.lazy(() => import("./components/crm/Scrolltotop"));

// =====================
// Pages Lazy Load
// =====================
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products")); // Admin
const User = React.lazy(() => import("./pages/User"));
const Transaksi = React.lazy(() => import("./pages/Transaksi"));
const KategoriProduk = React.lazy(() => import("./pages/KategoriProduk"));
const Kupon = React.lazy(() => import("./pages/Kupon"));
const Feedback = React.lazy(() => import("./pages/Feedback"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

// Halaman Pelanggan (CRM)
const Home = React.lazy(() => import("./pages/crm/Home"));
const ProductsCRM = React.lazy(() => import("./components/crm/Products"));
const ProductDetailCRM = React.lazy(() => import("./components/crm/Productdetail"));
const ProfileMember = React.lazy(() => import("./components/crm/ProfileMember"));
const CartCRM = React.lazy(() => import("./components/crm/Cart"));
// Tambahkan komponen riwayat pesanan yang telah dibuat sebelumnya
const OrderHistory = React.lazy(() => import("./components/crm/OrderHistory")); 

// Error Page
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Error400 = React.lazy(() => import("./pages/Error400"));
const Error401 = React.lazy(() => import("./pages/Error401"));
const Error403 = React.lazy(() => import("./pages/Error403"));

// Layout
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Auth Page
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";

// Component Guard
import Loading from "./components/Loading";
import RoleGuard from "./components/RoleGuard";
const RequireMember = React.lazy(() => import("./components/RequireMember"));

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<Loading />}>
          <ScrollToTop />

          <Routes>
            {/* CRM LAYOUT (Rute Sisi Pelanggan) */}
            <Route path="/" element={<Home />} />

            <Route
              path="/produk"
              element={
                <RequireMember>
                  <ProductsCRM />
                </RequireMember>
              }
            />

            <Route
              path="/product/:id"
              element={
                <RequireMember>
                  <ProductDetailCRM />
                </RequireMember>
              }
            />

            <Route
              path="/profile"
              element={
                <RequireMember>
                  <ProfileMember />
                </RequireMember>
              }
            />

            <Route
              path="/cart"
              element={
                <RequireMember>
                  <CartCRM />
                </RequireMember>
              }
            />

            {/* RUTE BARU: Halaman Riwayat Pesanan Pelanggan */}
            <Route
              path="/pesanan"
              element={
                <RequireMember>
                  <OrderHistory />
                </RequireMember>
              }
            />

            {/* MAIN LAYOUT (Rute Sisi Dashboard Admin) */}
            <Route element={<MainLayout />}>
              <Route
                path="/dashboard"
                element={
                  <RoleGuard allowedRoles={["admin", "superadmin"]}>
                    <Dashboard />
                  </RoleGuard>
                }
              />
              <Route
                path="/orders"
                element={
                  <RoleGuard allowedRoles={["admin", "superadmin"]}>
                    <Orders />
                  </RoleGuard>
                }
              />
              <Route
                path="/customers"
                element={
                  <RoleGuard allowedRoles={["admin", "superadmin"]}>
                    <Customers />
                  </RoleGuard>
                }
              />
              <Route
                path="/products"
                element={
                  <RoleGuard allowedRoles={["admin", "superadmin"]}>
                    <Products />
                  </RoleGuard>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <RoleGuard allowedRoles={["admin", "superadmin"]}>
                    <ProductDetail />
                  </RoleGuard>
                }
              />
              <Route
                path="/transaksi"
                element={
                  <RoleGuard allowedRoles={["admin", "superadmin"]}>
                    <Transaksi />
                  </RoleGuard>
                }
              />
              <Route
                path="/kategori-produk"
                element={
                  <RoleGuard allowedRoles={["admin", "superadmin"]}>
                    <KategoriProduk />
                  </RoleGuard>
                }
              />
              <Route
                path="/kupon"
                element={
                  <RoleGuard allowedRoles={["admin", "superadmin"]}>
                    <Kupon />
                  </RoleGuard>
                }
              />
              <Route
                path="/feedback"
                element={
                  <RoleGuard allowedRoles={["admin", "superadmin"]}>
                    <Feedback />
                  </RoleGuard>
                }
              />
              <Route 
                path="/users" 
                element={
                  <RoleGuard allowedRoles={["superadmin"]}>
                    <User />
                  </RoleGuard>
                } 
              />

              {/* ERROR PAGE */}
              <Route path="/error400" element={<Error400 />} />
              <Route path="/error401" element={<Error401 />} />
              <Route path="/error403" element={<Error403 />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* AUTH LAYOUT */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot" element={<Forgot />} />
            </Route>
          </Routes>
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}