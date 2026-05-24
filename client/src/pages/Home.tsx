import HeroBanner from "../components/HeroBanner";
import { featuresMap } from "../utils/maps";
import { ScrollSection } from "../components/common/ScrollSection";
import { useGetAllCategories } from "../Hooks/Categories/useGetCategories";
import { Link } from "react-router";
import CategoryCard from "../components/common/CategoryCard";
import type { CategoryInterface } from "../utils/Types";
import Footer from "../components/common/Footer";

const Home = () => {
  const { categories, isLoading, isError, error } = useGetAllCategories();
  
  return (
    <div className="bg-[#F1FBFF]">
      <HeroBanner />
      <ScrollSection className="px-[1em] md:px-[2em] lg:px-[5em] py-[5em]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5em]">
          {featuresMap.map((f, index) => {
            return (
              <div
                className="px-[2em] md:px-[3em] lg:px-[5em] h-100 flex flex-col justify-center items-center border border-[#C0C8C7] bg-white rounded-xl"
                key={index}
              >
                <img src={f.img} className="w-6.25 object-cover mb-10" />
                <h3 className="text-[1.5em] font-medium text-[#131D21]">
                  {f.title}
                </h3>
                <p className="text-[#586062] text-[1em] font-normal mt-2.5 text-center leading-6.25">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </ScrollSection>
      <ScrollSection className="px-[1em] md:px-[2em] lg:px-[5em] py-[5em]">
        <div className="flex flex-col w-full gap-[3em] items-center">
          <div className="flex justify-between w-full md:items-end md:flex-row flex-col items-start">
            <div>
              <h3 className="text-[2em] font-semibold text-[#131D21] mb-1.5">
                Shop by Category
              </h3>
              <p className="text-[#586062] text-[1em] font-normal">
                Find exactly what you need to complete your daily routine.
              </p>
            </div>
            <Link
              to="/shop"
              className="text-[#416465] text-[0.875em] font-bold border-b-2 border-b-[#416465] pb-1 max-sm:mt-4"
            >
              View All Products
            </Link>
          </div>
          <div className="grid max-[400px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-[1.5em]">
            {categories?.data?.map((cat : CategoryInterface , index : number) => <CategoryCard cat = {cat} key = {index}/>)}
          </div>
        </div>
      </ScrollSection >
      <ScrollSection className=" py-[5em] bg-[#E4F0F4] px-[1em] md:px-[2em] lg:px-[5em] flex  items-center justify-center">
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-[#131D21] text-[3em] font-semibold text-center">Join the Community</h2>
            <p className="text-[#586062] text-[1.125em] font-normal font-[Inter] mt-[1.5em] text-center">Get early access to collections, ethical living tips, and community stories.</p>
            <div className="flex mt-[3em] gap-[0.5em] items-center max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:w-full">
              <input type="email" placeholder="Your email address" className="placeholder:text-[#6B7280] text-[#6B7280] bg-white border boder-[#C0C8C7] rounded-md w-[calc((100% - 8px) / 2)] px-[1.5em] py-[1em] focus:outline-none max-sm:w-full"/>
              <button className="w-[calc((100% - 8px) / 2)] bg-[#416465] text-white px-[5em] py-[1em] rounded-md font-bold font-[Inter] text-[1em] cursor-pointer transition-colors duration-300 hover:bg-[#415454] max-sm:w-full">Subscribe</button>
            </div>
        </div>
      </ScrollSection>
      <ScrollSection className="bg-white px-[1em] md:px-[2em] lg:px-[5em] py-[5em] w-full">
        <Footer/>
      </ScrollSection>
    </div>
  );
};

export default Home;
