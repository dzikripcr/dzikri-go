import React, { Suspense } from "react";
import "./assets/tailwind.css";

import { Route, Routes } from "react-router-dom";

// Komponen global - auto scroll ke atas tiap pindah route
const ScrollToTop= React.lazy(() => import("./components/crm/ScrollToTop"));

// =====================
// Pages Lazy Load
// =====================

const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const Orders = React.lazy(() => import("./pages/Orders"));

const Customers = React.lazy(() => import("./pages/Customers"));

const Products = React.lazy(() => import("./pages/Products"));

const User = React.lazy(() => import("./pages/User"));

const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

const ProductDetailCRM = React.lazy(() => import("./components/crm/Productdetail"));

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

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />
      <Routes>

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
          element={
            <ProtectedAdmin>
              <MainLayout />
            </ProtectedAdmin>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/customers" element={<Customers />} />

          <Route path="/products" element={<Products />} />

          <Route path="/products/:id" element={<ProductDetail />} />

          <Route path="/users" element={<User />} />
        </Route>

        {/* ==========================
    AUTH
========================== */}

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}