import React, { Suspense, useState } from "react";
import "./assets/tailwind.css";

// import Dashboard from "./pages/Dashboard";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
// import Orders from "./pages/Orders";
const Orders = React.lazy(() => import("./pages/Orders"));
// import Customers from "./pages/Customers";
const Customers = React.lazy(() => import("./pages/Customers"));
// import Products from "./pages/Products";
const Products = React.lazy(() => import("./pages/Products"));

import { Route, Routes } from "react-router-dom";

// import NotFound from "./pages/NotFound";
const NotFound = React.lazy(() => import("./pages/NotFound"));
// import Error400 from "./pages/error400";
const Error400 = React.lazy(() => import("./pages/Error400"));
// import Error401 from "./pages/error401";
const Error401 = React.lazy(() => import("./pages/Error401"));
// import Error403 from "./pages/error403";
const Error403 = React.lazy(() => import("./pages/Error403"));
// import MainLayout from "./layouts/MainLayout";
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
// import AuthLayout from "./layouts/AuthLayout";
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))

const Home = React.lazy(() => import("./pages/Home"))

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";

import Loading from "./components/Loading";

export default function App() {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Route MainLayout */}
        <Route element={<MainLayout />}>
          {/* Error Pages */}
          <Route path="*" element={<NotFound />} />
          <Route path="/error400" element={<Error400 />} />
          <Route path="/error401" element={<Error401 />} />
          <Route path="/error403" element={<Error403 />} />

          {/* Admin */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} /> 
        </Route>

        {/* Member */}
          <Route path="/home" element={<Home />} />

        {/* Route AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
