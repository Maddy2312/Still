import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import CreateProduct from "../features/products/pages/seller/CreateProduct.jsx";
import Dashboard from "../features/products/pages/seller/Dashboard.jsx";
import ProductDetails from "../features/products/pages/seller/ProductDetails.jsx";
import Home from "../features/products/pages/user/Home.jsx";
import ProductDetailById from "../features/products/pages/user/ProductDetailById.jsx";
import Protected from "../features/products/pages/Protected/Protected.jsx";
import Cart from "../features/cart/pages/Cart.jsx";

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
    path: "/cart",
    element: <Cart />
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
        element: <Protected userRole="seller"><CreateProduct /></Protected>
      },
      {
        path: "/seller/dashboard",
        element: <Protected userRole="seller"><Dashboard /></Protected>
      },
      {
        path: "/seller/product/:id",
        element: <Protected userRole="seller"><ProductDetails /></Protected>
      }
    ]
  }
]);