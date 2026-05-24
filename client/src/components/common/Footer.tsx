const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col items-center md:items-start justify-between w-full">
      <div className="flex flex-col md:items-start md:w-fit w-full items-center md:mb-0 mb-[2em]">
        <h2 className="uppercase text-[#131D21] font-bold text-[1.5em] text-center">
          vestry
        </h2>
        <p className="text-[#586062] fonr-normal text-[1em] font-[Inter] mt-[0.625em] text-center">
          © 2024 VESTRY. Minimalist. Ethical. Curated.
        </p>
      </div>

      <ul className="flex items-center gap-[1.5em] text-[#414848] text-[1em] font-normal md:flex-nowrap flex-wrap ">
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Terms of Service</a>
        </li>
        <li>
          <a href="#">Shipping & Returns</a>
        </li>
        <li>
          <a href="#">FAQ</a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
