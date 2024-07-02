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

//Product
const ProductsPage = lazy(() =>
  import("@/pages/products/products/ProductsPage")
);
const CreateProductsPage = lazy(() =>
  import("@/pages/products/products/CreateProductsPage")
);
const UpdateProductsPage = lazy(() =>
  import("@/pages/products/products/UpdateProductsPage")
);

//Product category
const ProductCategoriesPage = lazy(() =>
  import("@/pages/products/product-categories/ProductCategoriesPage")
);
const CreateProductCategoryPage = lazy(() =>
  import("@/pages/products/product-categories/CreateProductCategoryPage")
);
const UpdateProductCategoryPage = lazy(() =>
  import("@/pages/products/product-categories/UpdateProductCategoryPage")
);

//Product format
const ProductFormatsPage = lazy(() =>
  import("@/pages/products/product-formats/ProductFormatsPage")
);
const CreateProductFormatsPage = lazy(() =>
  import("@/pages/products/product-formats/CreateProductFormatsPage")
);
const UpdateProductFormatsPage = lazy(() =>
  import("@/pages/products/product-formats/UpdateProductFormatsPage")
);

// Not found page
const NotFoundPage = lazy(() => import("@/pages/admin/not-found/NotFoundPage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSpinner />}>
        <IsAuth>
          <Routes>
            <Route path={"/"} element={<Layout />}>
              <Route index element={<Navigate to="admin" />} />
              <Route path="admin">
                <Route index element={<Navigate to="dashboard" />} />
                <Route path={"dashboard"} element={<DashboardPage />} />
                <Route path={"*"} element={<NotFoundPage />} />
              </Route>
              <Route path="products">
                <Route index element={<Navigate to="products" />} />
                <Route path="products">
                  <Route index element={<ProductsPage />} />
                  <Route path={`create`} element={<CreateProductsPage />} />
                  <Route
                    path={`update/:id/`}
                    element={<UpdateProductsPage />}
                  />
                </Route>

                <Route path="formats">
                  <Route index element={<ProductFormatsPage />} />
                  <Route
                    path={`create`}
                    element={<CreateProductFormatsPage />}
                  />
                  <Route
                    path={`update/:id/`}
                    element={<UpdateProductFormatsPage />}
                  />
                </Route>

                <Route path="category">
                  <Route index element={<ProductCategoriesPage />} />
                  <Route
                    path={`create`}
                    element={<CreateProductCategoryPage />}
                  />
                  <Route
                    path={`update/:id/`}
                    element={<UpdateProductCategoryPage />}
                  />
                </Route>
              </Route>
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
