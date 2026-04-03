import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";

import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
        <Header/>
            <main className="grow flex-1">
              <Outlet/>
            </main>
            <Footer/>
    </div>
  )
}

export default MainLayout
