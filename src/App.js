import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import PageNotFound from "./pages/PageNotFound";
import Protected from "./features/auth/components/Protected";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchCartByUserIdAsync } from "./features/cart/cartSlice";
import { fetchUserInfoByIdAsync } from "./features/user/userSlice";
import LogoutPage from "./pages/LogoutPage";
import {
  fetchOrdersByUserIdAsync,
  selectOrders,
} from "./features/order/orderSlice";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHomePage from "./pages/AdminHomePage";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/AdminOrderDetailsPage";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHomePage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/productdetails/:id",
    element: (
      <Protected>
        <ProductDetailsPage />
      </Protected>
    ),
  },
  {
    path: "/admin/productdetails/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailsPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/orderSuccess/:id",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <LogoutPage />
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrdersPage />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "/admin/addproduct",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/editproduct/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orderdetails/:id",
    element: (
      <ProtectedAdmin>
        <AdminOrderDetailsPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  if (loggedInUser) {
    dispatch(fetchCartByUserIdAsync(loggedInUser?.id));
    dispatch(fetchUserInfoByIdAsync(loggedInUser?.id));
    dispatch(fetchOrdersByUserIdAsync(loggedInUser?.id));
  }
  return (
    <>
      <AlertProvider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </AlertProvider>
    </>
  );
}

export default App;
