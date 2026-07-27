import { createBrowserRouter } from "react-router";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import FallbackError from "./components/feedback/FallbackError";
import Cart from "./pages/Cart";
import Register from "./components/Auth/Register";
import AuthLayout from "./Layouts/AuthLayout";
import Login from "./components/Auth/Login";
import { AuthProtect } from "./protectedRoutes/AuthProtect";
import AdminLayout from "./Layouts/AdminLayout";
import { IsAdminProtect } from "./protectedRoutes/IsAdminProtect";
import AdminOverview from "./pages/AdminOverview";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import Checkout from "./pages/Checkout";
import ProfilePage from "./pages/Profile.tsx";
import ProfileSettings from "./pages/ProfileSettings";
import OrdersHistory from "./pages/OrdersHistory";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <FallbackError />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "productDetails/:slug", element: <ProductDetails /> },
      {
        path: "cart",
        element: (
          <AuthProtect>
            <Cart />
          </AuthProtect>
        ),
      },
      {
        path : "checkout",
        element : (
          <AuthProtect>
            <Checkout/>
          </AuthProtect>
        )
      },
      {
        path : "profile",
        element : <ProfilePage/>,
        children : [
          {index : true , element : <ProfileSettings/>},
          {path : "ordershistory" , element : <OrdersHistory/>}
        ]
      }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <IsAdminProtect>
        <AdminLayout />
      </IsAdminProtect>
    ),
    children : [
      {index : true , element : <AdminOverview/>},
      {path : "products"  , element : <AdminProducts/>},
      {path : "orders" , element : <AdminOrders/>},
      {path : "users" , element : <AdminUsers/>}
    ]
  },
]);
