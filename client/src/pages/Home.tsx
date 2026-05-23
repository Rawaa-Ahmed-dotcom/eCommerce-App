import HeroBanner from "../components/HeroBanner";
import { featuresMap } from "../utils/maps";
import { ScrollSection } from "../components/common/ScrollSection";
import { useGetAllCategories } from "../Hooks/Categories/useGetCategories";
import { Link } from "react-router";
import CategoryCard from "../components/common/CategoryCard";
import type { CategoryInterface } from "../utils/Types";

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
      </ScrollSection>
    </div>
  );
};

export default Home;
