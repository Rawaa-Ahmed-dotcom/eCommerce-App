import React from "react";
import { ShoppingBag } from "lucide-react";
import RegisterForm from "../components/forms/RegisterForm/RegisterForm";
const Register = () => {
  return (
    <main className="flex! items-center justify-center w-full min-h-screen  ">
      <div className="flex rounded-[1em] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] w-[80%]">
        <div className="bg-[var(--color-primary)] p-[3em] w-[50%]">
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
        <RegisterForm/>
      </div>
    </main>
  );
};

export default Register;
