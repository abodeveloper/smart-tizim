import Layout from "@/components/layout/Layout";
import PageSpinner from "@/components/molecules/page-spinner/PageSpinner";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import IsAuth from "@/services/auth/IsAuth";
import IsGuest from "@/services/auth/IsGuest";

// Home page
const HomePage = lazy(() => import("@/pages/home/HomePage"));

// Auth page
const SignInPage = lazy(() => import("@/pages/auth/sign-in/SignInPage"));
const SignUpPage = lazy(() => import("@/pages/auth/sign-up/SignUpPage"));

// Admin Pages

const DashboardPage = lazy(() =>
  import("@/pages/admin/dashboard/DashboardPage")
);

const ProductsPage = lazy(() => import("@/pages/admin/products/ProductsPage"));

// Not found page
const NotFoundPage = lazy(() => import("@/pages/admin/not-found/NotFoundPage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSpinner />}>
        <IsAuth>
          <Routes>
            {/* <Route path={"/"} element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path={"dashboard"} element={<DashboardPage />} />
              <Route path={"*"} element={<NotFoundPage />} />
            </Route> */}

            <Route path={"/"} element={<Layout />}>
              <Route index element={<Navigate to="admin" />} />
              <Route path="admin">
                <Route index element={<Navigate to="dashboard" />} />
                <Route path={"dashboard"} element={<DashboardPage />} />
                <Route path={"products"} element={<ProductsPage />} />
                <Route path={"*"} element={<NotFoundPage />} />
              </Route>{" "}
            </Route>
          </Routes>
        </IsAuth>

        <IsGuest>
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/auth"}>
              <Route index path={"sign-in"} element={<SignInPage />} />
              <Route path={"sign-up"} element={<SignUpPage />} />
            </Route>
            <Route
              path={"*"}
              element={<Navigate to={"/auth/sign-in"} replace />}
            />
          </Routes>
        </IsGuest>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
