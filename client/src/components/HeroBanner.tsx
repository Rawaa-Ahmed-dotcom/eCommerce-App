

const HeroBanner = () => {
  return (
   <section data-aos="fade-down" data-aos-duration="1000" data-aos-delay="200">
     <div className="relative w-full h-[46em] flex justify-start pl-[1em] md:pl-[3em] lg:pl-[5em] items-center">
        <img src = "/heroBanner.webp"className="absolute inset-0 w-full h-full object-cover object-[center_top_30%] z-0"/>
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="flex flex-col z-11">
            <h1 className="text-white font-semibold text-[3em] capitalize !mb-0">Discover Your Next Essential.</h1>
            <p className="text-[#EAF5FA] mt-[10px] text-[1.125em] font-normal mb-[2.5em]">Minimalist. Ethical. Curated. The New VESTRY Collection is Here.</p>
            <button className="text-[#3C5F60] text-[1em] font-bold w-fit bg-[#B2D8D8] py-[1.5em] px-[5em] rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] cursor-pointer transition-colors duration-300 hover:bg-[#728d8d]">Shop New Arrivals</button>
        </div>
    </div>
   </section>
  )
}

export default HeroBanner
