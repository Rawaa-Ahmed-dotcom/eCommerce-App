import Header from "../../components/common/Header/Header";
import styled from "./style.module.css";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <main className= {styled.container}>
       <section className={styled.wrapper}>
            <Header/>
            <Outlet/>
       </section>
    </main>
  )
}

export default MainLayout
