import React, { Suspense } from "react";
import "./assets/tailwind.css";

import { Route, Routes } from "react-router-dom";

// Komponen global - auto scroll ke atas tiap pindah route
const ScrollToTop = React.lazy(() => import("./components/crm/Scrolltotop"));

// =====================
// Pages Lazy Load
// =====================

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const Orders = React.lazy(() => import("./pages/Orders"));

const Customers = React.lazy(() => import("./pages/Customers"));

const Products = React.lazy(() => import("./pages/Products"));

const User = React.lazy(() => import("./pages/User"));

const Transaksi = React.lazy(() => import("./pages/Transaksi"));

const KategoriProduk = React.lazy(() => import("./pages/KategoriProduk"));

const Kupon = React.lazy(() => import("./pages/Kupon"));

const Feedback = React.lazy(() => import("./pages/Feedback"));

const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

const ProductDetailCRM = React.lazy(
  () => import("./components/crm/Productdetail"),
);

const Home = React.lazy(() => import("./pages/crm/Home"));

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

// Component

import Loading from "./components/Loading";

const ProtectedAdmin = React.lazy(() => import("./components/ProtectedAdmin"));

const RequireMember = React.lazy(() => import("./components/RequireMember"));

const ProfileMember = React.lazy(() => import("./components/crm/ProfileMember"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />
      <Routes>

        {/* CRM LAYOUT */}
        
        <Route path="/" element={<Home />} />

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

        {/* MAIN LAYOUT */}

        <Route
          element={
              <MainLayout />
          }
        >
          {/* MAIN ROUTES */}

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/customers" element={<Customers />} />

          <Route path="/products" element={<Products />} />

          <Route path="/products/:id" element={<ProductDetail />} />

          <Route path="/users" element={<User />} />

          <Route path="/transaksi" element={<Transaksi />} />

          <Route path="/kategori-produk" element={<KategoriProduk />} />

          <Route path="/kupon" element={<Kupon />} />

          <Route path="/feedback" element={<Feedback />} />

          {/* ERROR PAGE */}

          <Route path="/error400" element={<Error400 />} />

          <Route path="/error401" element={<Error401 />} />

          <Route path="/error403" element={<Error403 />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/*AUTH LAYOUT*/}

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}