import { Outlet } from "react-router"


const AuthLayout = () => {
  return (
    <main className="w-full min-h-screen flex! justify-center bg-[#F1FBFF] items-center">
        <Outlet/>
    </main>
  )
}

export default AuthLayout
