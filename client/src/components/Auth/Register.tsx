const Register = () => {
  return (
    <section className="bg-[rgba(255,255,255,1)] rounded-xl p-20 w-[50%] flex flex-col gap-[1.5em] shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <h2 className="font-semibold text-[2em] tracking-[-0.32px] text-[#131D21]">Register Now!</h2>
      <form className="flex flex-col gap-[1.5em]">
        <div className="flex flex-col gap-1.25">
            <label htmlFor = "username" className="uppercase text-[#414848] font-[Inter] font-medium text-[14px] tracking-[0.7px]">username</label>
            <input type="text" id="username" className="bg-white border border-[#C0C8C7] rounded-lg px-[1em] py-[0.8125em] text-[#6B7280] font-normal text-[1em] font-[Inter] placeholder:text-[#6B7280] placeholder:font-normal placeholder:text-[1em] placeholder:font-[Inter]  focus:outline-none"/>
        </div>
        <div className="flex flex-col gap-1.25">
            <label htmlFor = "email" className="uppercase text-[#414848] font-[Inter] font-medium text-[14px] tracking-[0.7px]">Email</label>
            <input type="email" id="email" className="bg-white border border-[#C0C8C7] rounded-lg px-[1em] py-[0.8125em] text-[#6B7280] font-normal text-[1em] font-[Inter] placeholder:text-[#6B7280] placeholder:font-normal placeholder:text-[1em] placeholder:font-[Inter]  focus:outline-none"/>
        </div>
         <div className="flex flex-col gap-1.25">
            <label htmlFor = "password" className="uppercase text-[#414848] font-[Inter] font-medium text-[14px] tracking-[0.7px]">password</label>
            <input type="password" id="password" className="bg-white border border-[#C0C8C7] rounded-lg px-[1em] py-[0.8125em] text-[#6B7280] font-normal text-[1em] font-[Inter] placeholder:text-[#6B7280] placeholder:font-normal placeholder:text-[1em] placeholder:font-[Inter]  focus:outline-none"/>
        </div>
        <div className="flex items-center justify-center">
            <button className="bg-[#B2D8D8] rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] flex items-center justify-center w-[50%] py-[1em] text-[#3C5F60] font-[Inter] font-semibold text-[1em] tracking-[0.16px] capitalize cursor-pointer transition duration-300 hover:bg-[#87a4a4]">register</button>
        </div>
      </form>
    </section>
  );
};

export default Register;
