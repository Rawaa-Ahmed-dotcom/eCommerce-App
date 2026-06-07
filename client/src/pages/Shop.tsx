import { useState } from "react";
import { useGetAllCategories } from "../Hooks/Categories/useGetCategories";
import type { CategoryInterface } from "../utils/Types";
import Select from "react-select";
import { options } from "../utils/SelectMenu";
import { customStyles, Menu } from "../utils/SelectMenu.tsx";

import ProductCard from "../components/common/cards/ProductCard.tsx";
import { type ProductInterface } from "../utils/Types";
import { ArrowRight } from "lucide-react";
import { handlePages } from "../utils/helpers";

import { useGetAllProducts } from "../Hooks/products.ts";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import {
  setCategory,
  setPrice,
  setPage,
  sortBy,
  resetFilters,
} from "../store/features/productSlice.ts";
import CardSkeleton from "../components/common/skeletons/CardSkeleton.tsx";
import { ScrollSection } from "../components/common/ScrollSection.tsx";
import EmptyState from "../components/feedback/EmptyState.tsx";

const Shop = () => {
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const { categories } = useGetAllCategories();
  const productsfilters = useAppSelector((state) => state.productFilters);
  const dispatch = useAppDispatch();
  const productsQuery = useGetAllProducts(productsfilters);
  const limit: number = 2;
  const numberOfPages: number = Math.ceil(
    (productsQuery.data?.totalProducts || 0) / limit,
  );

  const handlePrice = () => {
    dispatch(
      setPrice({
        min: minPrice as number,
        max: maxPrice as number,
      }),
    );
  };
  console.log(productsfilters);
  const handleResetFilters = () => {
    dispatch(resetFilters());
    setMinPrice("");
    setMaxPrice("");
  };
  return (
    <div className="relative">
      <ScrollSection>
        <main className="w-full flex! gap-[5em] flex-col md:flex-row  bg-[#F1FBFF] min-h-200 px-[1em] md:px-[2em] lg:px-[5em] my-[5em] py-[5em]">
          <div className="hidden md:w-[25%] md:flex flex-col gap-[5em] items-start shrink-0">
            <div>
              <h3 className="uppercase text-[#414848] text-[0.875em] font-medium mb-[1.5em] font-[Inter] tracking-wide">
                categories
              </h3>
              <ul className="flex flex-col gap-[0.5em]">
                {categories?.data?.map((category: CategoryInterface) => (
                  <li className="flex items-center gap-3" key={category.slug}>
                    <input
                      type="radio"
                      id={category.slug}
                      className="peer sr-only"
                      name="category"
                      value={category.slug}
                      checked={productsfilters.category === category._id}
                      onChange={() => dispatch(setCategory(category._id))}
                    />
                    <label
                      htmlFor={category.slug}
                      className="relative bg-white border border-[#C0C8C7] w-5 h-5 rounded-sm flex items-center justify-center cursor-pointer transition-colors duration-300 peer-checked:border-[#416465] peer-checked:[&>span]:scale-100"
                    >
                      <span className="w-3 h-3 bg-[#416465] rounded-sm transform scale-0 transition-transform duration-300" />
                    </label>
                    <label
                      className="text-[#131D21] text-[1em] font-normal capitalize cursor-pointer"
                      htmlFor={category.slug}
                    >
                      {category.title}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <h3 className="uppercase text-[var(--color-secondary-dark-gray)] mb-[1.5em] font-medium text-[0.875em] font-[Inter] tracking-wide">
                price range
              </h3>
              <div className="flex items-center gap-[0.5em]">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value as number)}
                  className="bg-white border border-[#C0C8C7] text-sm rounded-lg p-1 focus:outline-none w-[30%] caret-[#aeb6b5]"
                />
                <span className="text-[#416465] font-semibold">To</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value as number)}
                  className="bg-white border border-[#C0C8C7] text-sm rounded-lg p-1 focus:outline-none w-[30%] caret-[#aeb6b5]"
                />
                <button
                  className="bg-[#416465] rounded-lg p-2 text-white font-semibold cursor-pointer transition duration-300 hover:bg-[#5c7375]"
                  onClick={handlePrice}
                >
                  GO
                </button>
              </div>
            </div>
          </div>

          <section className="w-full md:w-[75%] flex flex-col gap-[3em]">
            <div className="flex justify-end items-center">
              <div className="flex gap-[0.75em] items-center">
                <span className="font-[Inter] font-medium text-[0.875em] text-[#586062]">
                  Sort by:
                </span>
                <div className="relative flex items-center gap-[1em]">
                  <Select
                    options={options}
                    styles={customStyles}
                    components={{ Menu }}
                    onChange={(e) => dispatch(sortBy(e.value))}
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              {productsQuery.isLoading ? (
                <CardSkeleton cardsCount={limit} />
              ) : productsQuery.isError ? (
                <h2 className="text-[1.5em] font-[Inter] text-center text-red-600">
                  <span>{productsQuery.error?.message}</span>
                </h2>
              ) : (
                <div className="flex flex-col gap-[3em] w-full">
                  {productsQuery.data.data.length > 0 ? (
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3em] transition-opacity duration-200 
                    ${productsQuery.isFetching ? "opacity-60 pointer-events-none" : "opacity-100"}`}
                    >
                      {productsQuery.data?.data?.map(
                        (product: ProductInterface) => (
                          <ProductCard product={product} key={product._id} />
                        ),
                      )}
                    </div>
                  ) : (
                    <EmptyState handleResetFilters={handleResetFilters} />
                  )}

                  {productsQuery.data.data.length > 0 && numberOfPages > 1 && (
                    <div className="flex items-center justify-center gap-[0.5em]">
                      <button
                        disabled={
                          productsfilters.page === 1 || productsQuery.isFetching
                        }
                        className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-10 h-10 rounded-lg text-[#131D21] flex items-center justify-center transform rotate-180"
                        onClick={() =>
                          dispatch(
                            setPage(Math.max(productsfilters.page - 1, 1)),
                          )
                        }
                      >
                        <ArrowRight />
                      </button>

                      {handlePages(
                        numberOfPages,
                        productsfilters.page as number,
                        dispatch,
                      )}

                      <button
                        disabled={
                          productsfilters.page === numberOfPages ||
                          productsQuery.isPlaceholderData ||
                          productsQuery.isFetching
                        }
                        className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-10 h-10 rounded-lg text-[#131D21] flex items-center justify-center"
                        onClick={() =>
                          dispatch(
                            setPage(
                              Math.min(productsfilters.page + 1, numberOfPages),
                            ),
                          )
                        }
                      >
                        <ArrowRight />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
      </ScrollSection>
    </div>
  );
};

export default Shop;
