import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";
import { LandingRoute } from "./components/LandingRoute.jsx";
import { SeoWrapper } from "./components/SeoWrapper.jsx";

// Create router with all routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SeoWrapper pathname="/">
        <LandingRoute />
      </SeoWrapper>
    ),
  },
  {
    path: "/how-it-works",
    element: (
      <SeoWrapper pathname="/how-it-works">
        <LandingRoute />
      </SeoWrapper>
    ),
  },
  {
    path: "/asset-coverage",
    element: (
      <SeoWrapper pathname="/asset-coverage">
        <LandingRoute />
      </SeoWrapper>
    ),
  },
  {
    path: "/pricing",
    element: (
      <SeoWrapper pathname="/pricing">
        <LandingRoute />
      </SeoWrapper>
    ),
  },
  {
    path: "/documentation",
    element: (
      <SeoWrapper pathname="/documentation">
        <LandingRoute />
      </SeoWrapper>
    ),
  },
  {
    path: "/about",
    element: (
      <SeoWrapper pathname="/about">
        <LandingRoute />
      </SeoWrapper>
    ),
  },
  {
    path: "/faq",
    element: (
      <SeoWrapper pathname="/faq">
        <LandingRoute />
      </SeoWrapper>
    ),
  },
  {
    path: "/contact",
    element: (
      <SeoWrapper pathname="/contact">
        <LandingRoute />
      </SeoWrapper>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <SeoWrapper pathname="/dashboard">
        <Dashboard />
      </SeoWrapper>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
