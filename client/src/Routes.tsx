import { createBrowserRouter } from "react-router";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import FallbackError from "./components/feedback/FallbackError";
import Cart from "./pages/Cart";

export const routes = createBrowserRouter([
    {
        path : "/",
        element : <MainLayout/>,
        errorElement : <FallbackError/>,
        children : [
            {index : true ,  element : <Home/>},
            {path : "shop" , element : <Shop/>},
            {path : "productDetails/:slug" , element : <ProductDetails/>},
            {path : "cart",element : <Cart/>}
        ]
    }
])