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

// TRADES
const TradesPage = lazy(() => import("@/pages/trades/trades/TradesPage"));
const CreateTradesPage = lazy(() =>
  import("@/pages/trades/trades/CreateTradesPage")
);
const UpdateTradesPage = lazy(() =>
  import("@/pages/trades/trades/UpdateTradesPage")
);
const TradeDetailPage = lazy(() =>
  import("@/pages/trades/trades/TradeDetailPage")
);
// const CreateStorageProductsPage = lazy(() =>
//   import("@/pages/storages/storage-products/CreateStorageProductsPage")
// );
// const UpdateStorageProductsPage = lazy(() =>
//   import("@/pages/storages/storage-products/UpdateStorageProductsPage")
// );
// const StorageProductDetailPage = lazy(() =>
//   import("@/pages/storages/storage-products/StorageProductDetailPage")
// );

// CLIENTS
const ClientsPage = lazy(() => import("@/pages/clients/clients/ClientsPage"));
const ClientDetailPage = lazy(() =>
  import("@/pages/clients/clients/ClientDetailPage")
);
const SpecialClientsPage = lazy(() =>
  import("@/pages/clients/special-clients/SpecialClientsPage")
);
const CreateClientsPage = lazy(() =>
  import("@/pages/clients/clients/CreateClientsPage")
);
const UpdateClientsPage = lazy(() =>
  import("@/pages/clients/clients/UpdateClientsPage")
);

// SERVICES
const ServicesPage = lazy(() => import("@/pages/admin/services/ServicesPage"));
const CreateServicesPage = lazy(() =>
  import("@/pages/admin/services/CreateServicesPage")
);
const UpdateServicesPage = lazy(() =>
  import("@/pages/admin/services/UpdateServicesPage")
);

// STORAGES
const StoragesPage = lazy(() =>
  import("@/pages/storages/storages/StoragesPage")
);
const CreateStoragesPage = lazy(() =>
  import("@/pages/storages/storages/CreateStoragesPage")
);
const UpdateStoragesPage = lazy(() =>
  import("@/pages/storages/storages/UpdateStoragesPage")
);

// STORAGE PRODUCTS
const StorageProductsPage = lazy(() =>
  import("@/pages/storages/storage-products/StorageProductsPage")
);
const CreateStorageProductsPage = lazy(() =>
  import("@/pages/storages/storage-products/CreateStorageProductsPage")
);
const UpdateStorageProductsPage = lazy(() =>
  import("@/pages/storages/storage-products/UpdateStorageProductsPage")
);
const StorageProductDetailPage = lazy(() =>
  import("@/pages/storages/storage-products/StorageProductDetailPage")
);

// STORAGE PRODUCTS OFF
const StorageProductsOffPage = lazy(() =>
  import("@/pages/storages/storage-products-off/StorageProductsOffPage")
);
const CreateStorageProductsOffPage = lazy(() =>
  import("@/pages/storages/storage-products-off/CreateStorageProductsOffPage")
);
const UpdateStorageProductsOffPage = lazy(() =>
  import("@/pages/storages/storage-products-off/UpdateStorageProductsOffPage")
);

// SUPPPLIERS
const SuppliersPage = lazy(() =>
  import("@/pages/storages/suppliers/SuppliersPage")
);
const SupplierDetailPage = lazy(() =>
  import("@/pages/storages/suppliers/SupplierDetailPage")
);
const CreateSuppliersPage = lazy(() =>
  import("@/pages/storages/suppliers/CreateSuppliersPage")
);
const UpdateSuppliersPage = lazy(() =>
  import("@/pages/storages/suppliers/UpdateSuppliersPage")
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
const ProductCategoryDetailPage = lazy(() =>
  import("@/pages/products/product-categories/ProductCategoryDetailPage")
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

//Finance transactions
const FinanceTransactionsPage = lazy(() =>
  import("@/pages/finance/finance-transactions/FinanceTransactionsPage")
);
const CreateFinanceTransactionsPage = lazy(() =>
  import("@/pages/finance/finance-transactions/CreateFinanceTransactionsPage")
);
const UpdateFinanceTransactionsPage = lazy(() =>
  import("@/pages/finance/finance-transactions/UpdateFinanceTransactionsPage")
);

//Finance outcomes
const FinanceOutcomesPage = lazy(() =>
  import("@/pages/finance/finance-outcome/FinanceOutcomesPage")
);
const CreateFinanceOutcomesPage = lazy(() =>
  import("@/pages/finance/finance-outcome/CreateFinanceOutcomesPage")
);
const UpdateFinanceOutcomesPage = lazy(() =>
  import("@/pages/finance/finance-outcome/UpdateFinanceOutcomesPage")
);
// const CreateFinanceTransactionsPage = lazy(() =>
//   import("@/pages/finance/finance-transactions/CreateFinanceTransactionsPage")
// );
// const UpdateFinanceTransactionsPage = lazy(() =>
//   import("@/pages/finance/finance-transactions/UpdateFinanceTransactionsPage")
// );

// Settings
const DeleteBasketPage = lazy(() =>
  import("@/pages/settings/delete-basket/DeleteBasketPage")
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

                <Route path="services">
                  <Route index element={<ServicesPage />} />
                  <Route path={`create`} element={<CreateServicesPage />} />
                  <Route
                    path={`update/:id/`}
                    element={<UpdateServicesPage />}
                  />
                </Route>

                <Route path={"*"} element={<NotFoundPage />} />
              </Route>

              <Route path="trades">
                <Route index element={<Navigate to="trades" />} />

                <Route path="trades">
                  <Route index element={<TradesPage />} />
                  <Route path={`:id`} element={<TradeDetailPage />} />
                  {/* <Route path={`create`} element={<CreateTradesPage />} /> */}
                  <Route path={`update/:id/`} element={<UpdateTradesPage />} />
                </Route>

                <Route path={`trade-create`} element={<CreateTradesPage />} />

                <Route path="special-trades" element={<SpecialClientsPage />} />

                <Route path={"*"} element={<NotFoundPage />} />
              </Route>

              <Route path="clients">
                <Route index element={<Navigate to="clients" />} />

                <Route path="clients">
                  <Route index element={<ClientsPage />} />
                  <Route path={`:id`} element={<ClientDetailPage />} />
                  <Route path={`create`} element={<CreateClientsPage />} />
                  <Route path={`update/:id/`} element={<UpdateClientsPage />} />
                </Route>

                <Route
                  path="special-clients"
                  element={<SpecialClientsPage />}
                />

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
                  <Route path={`:id`} element={<ProductCategoryDetailPage />} />
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

              <Route path="storages">
                <Route index element={<Navigate to="storages" />} />

                <Route path="storages">
                  <Route index element={<StoragesPage />} />
                  <Route path={`create`} element={<CreateStoragesPage />} />
                  <Route
                    path={`update/:id/`}
                    element={<UpdateStoragesPage />}
                  />
                </Route>

                <Route path="storage-products">
                  <Route index element={<StorageProductsPage />} />
                  <Route
                    path={`create`}
                    element={<CreateStorageProductsPage />}
                  />
                  <Route
                    path={`update/:id`}
                    element={<UpdateStorageProductsPage />}
                  />
                  <Route path={`:id`} element={<StorageProductDetailPage />} />
                </Route>

                <Route path="storage-products-off">
                  <Route index element={<StorageProductsOffPage />} />
                  <Route
                    path={`create`}
                    element={<CreateStorageProductsOffPage />}
                  />
                  <Route
                    path={`update/:id`}
                    element={<UpdateStorageProductsOffPage />}
                  />
                </Route>

                <Route path="suppliers">
                  <Route index element={<SuppliersPage />} />
                  <Route path={`:id`} element={<SupplierDetailPage />} />
                  <Route path={`create`} element={<CreateSuppliersPage />} />
                  <Route
                    path={`update/:id/`}
                    element={<UpdateSuppliersPage />}
                  />
                </Route>

                <Route path={"*"} element={<NotFoundPage />} />
              </Route>

              <Route path="finance">
                <Route index element={<Navigate to="finance-outcomes" />} />

                <Route path="finance-outcomes">
                  <Route index element={<FinanceOutcomesPage />} />
                  <Route
                    path={`create`}
                    element={<CreateFinanceOutcomesPage />}
                  />
                  <Route
                    path={`update/:id/`}
                    element={<UpdateFinanceOutcomesPage />}
                  />
                </Route>

                <Route path="finance-transactions">
                  <Route index element={<FinanceTransactionsPage />} />
                  <Route
                    path={`create`}
                    element={<CreateFinanceTransactionsPage />}
                  />
                  <Route
                    path={`update/:id/`}
                    element={<UpdateFinanceTransactionsPage />}
                  />
                </Route>
              </Route>

              <Route path="settings">
                <Route index element={<Navigate to="delete-basket" />} />

                <Route path={`delete-basket`} element={<DeleteBasketPage />} />
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
