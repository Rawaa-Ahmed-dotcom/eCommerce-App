import { ShoppingBag } from "lucide-react";
import RegisterForm from "../components/forms/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <main className="md:flex! md:items-center md:justify-center w-full min-h-screen">
      <div className="flex rounded-none md:rounded-[1em] overflow-hidden md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] md:w-[85%] lg:w-[75%] xl:w-[65%] w-full max-md:min-h-screen">
        {/* Left navy panel - hidden below md */}
        <div className="bg-[var(--color-primary)] p-[2.4em] w-[50%] max-md:hidden flex flex-col justify-center">
          <div className="icon w-[3.5em] h-[3.5em] bg-white/5 flex items-center justify-center rounded-[0.75em] mb-[2em]">
            <ShoppingBag color="white" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-[2.25em] text-white ">
              Elevate Your Personal Style
            </h2>
            <p className="text-[#DBEAFE] text-[1.125em] font-normal mt-[1em] leading-7">
              Join our exclusive fashion community and get access to early
              drops, personalized recommendations, and member-only rewards.
            </p>
          </div>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
};

export default Register;
