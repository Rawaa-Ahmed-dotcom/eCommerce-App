import { createBrowserRouter } from "react-router";
import MainLayout from "./Layouts/MainLayout";
import Home from "./pages/Home";

export const routes = createBrowserRouter([
    {
        path : "/",
        element : <MainLayout/>,
        children : [
            {index : true ,  element : <Home/>}
        ]
    }
])