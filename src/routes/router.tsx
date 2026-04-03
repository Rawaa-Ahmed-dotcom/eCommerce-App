import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Shop from "../pages/Shop/Shop";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Error from "../pages/Error";
import AllProducts from "../components/app/Shop/AllProducts/AllProducts";
import SingleCategory from "../components/app/Shop/SingleCategory/SingleCategory";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement : <Error/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
        children : [
          {
            index : true,
            path : "allproducts",
            element : <AllProducts />
          },
          {
            path : ":category",
            element : <SingleCategory/>,
            loader : ({params}) => {
              if(typeof params.category !== "string" || !/^[a-z]+$/.test(params.category)) {
                throw new Response("Bad Request",{
                  statusText : "Category not found",
                  status : 400
                })
              }
            }
          }
        ]
      },

      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />
  }
]);
