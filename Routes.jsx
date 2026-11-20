import { Navigate, Route, Routes } from "react-router-dom";
import StoreLayout from "../StoreLayout.jsx";
import Storefront from "../Storefront.jsx";
import ProductsPage from "../ProductsPage.jsx";
import ProductDetailsPage from "../Product/ProductDetailsPage.jsx";
import CartPage from "../Cart/CartPage.jsx";
import ReservationsPage from "../Reservations/ReservationsPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<Storefront />} />
        <Route path="/shop" element={<ProductsPage view="all" />} />
        <Route path="/favorites" element={<ProductsPage view="favorites" />} />
        <Route path="/admin/products" element={<ProductsPage view="manage" />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
