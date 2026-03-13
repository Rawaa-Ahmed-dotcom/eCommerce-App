import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import styled from "./style.module.css";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <main className= {styled.container}>
       <section className={styled.wrapper}>
            <Header/>
            <Outlet/>
            <Footer/>
       </section>
    </main>
  )
}

export default MainLayout
