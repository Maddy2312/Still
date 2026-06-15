import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/seller/CreateProduct.jsx";
import Dashboard from "../features/products/pages/seller/Dashboard.jsx";
import ProductDetails from "../features/products/pages/seller/ProductDetails.jsx";
import Home from "../features/products/pages/user/Home.jsx";
import ProductDetailById from "../features/products/pages/user/ProductDetailById.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <ProductDetailById />
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },{
    path: "/seller",
    children: [
      {
        path: "/seller/create-product",
        element: <CreateProduct />
      },
      {
        path: "/seller/dashboard",
        element: <Dashboard />
      },
      {
        path: "/seller/product/:id",
        element: <ProductDetails />
      }
    ]
  }
]);