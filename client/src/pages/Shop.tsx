import { useEffect, useState } from "react";
import { useGetAllCategories } from "../Hooks/Categories/useGetCategories";
import type { CategoryInterface } from "../utils/Types";
import Select from "react-select";
import { Menu } from "../utils/SelectMenu";
import { options, customStyles } from "../utils/SelectMenu.constants.ts";

import ProductCard from "../components/common/cards/ProductCard.tsx";
import { type ProductInterface } from "../utils/Types";
import { ArrowRight, SlidersHorizontal, X } from "lucide-react";
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
import { useSearchParams } from "react-router";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      dispatch(setCategory(category));
    }
  }, [dispatch, searchParams]);

  const { categories } = useGetAllCategories();
  const productsfilters = useAppSelector((state) => state.productFilters);
  const productsQuery = useGetAllProducts(productsfilters);
  const limit: number = 2;
  const numberOfPages: number = Math.ceil(
    (productsQuery.data?.filteredProductsCount || 0) / limit,
  );

  const handlePrice = () => {
    dispatch(
      setPrice({
        min: minPrice as number,
        max: maxPrice as number,
      }),
    );
    setShowMobileFilters(false);
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setMinPrice("");
    setMaxPrice("");
    setSearchParams("");
  };

  const FiltersContent = (
    <>
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
                className="relative bg-white border border-[#C0C8C7] w-5 h-5 rounded-sm flex items-center justify-center cursor-pointer transition-colors duration-300 peer-checked:border-[#416465] peer-checked:[&>span]:scale-100 shrink-0"
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
        <div className="flex items-center gap-[0.5em] flex-wrap">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value as unknown as number)}
            placeholder="Min"
            className="bg-white border border-[#C0C8C7] text-sm rounded-lg p-2 focus:outline-none w-[calc(35%-0.5em)] sm:w-[30%] caret-[#aeb6b5] min-w-0"
          />
          <span className="text-[#416465] font-semibold shrink-0">To</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value as unknown as number)}
            placeholder="Max"
            className="bg-white border border-[#C0C8C7] text-sm rounded-lg p-2 focus:outline-none w-[calc(35%-0.5em)] sm:w-[30%] caret-[#aeb6b5] min-w-0"
          />
          <button
            className="bg-[#416465] rounded-lg p-2 text-white font-semibold cursor-pointer transition duration-300 hover:bg-[#5c7375] shrink-0"
            onClick={handlePrice}
          >
            GO
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="relative">
      <ScrollSection>
        <main className="w-full flex! gap-[2em] md:gap-[5em] flex-col md:flex-row bg-[#F1FBFF] min-h-fit px-[1em] md:px-[2em] lg:px-[5em] my-[2em] md:my-[5em] py-[2em] md:py-[5em]">
          <div className="flex md:hidden items-center justify-between">
            <button
              onClick={() => setShowMobileFilters((prev) => !prev)}
              className="flex items-center gap-2 bg-white border border-[#C0C8C7] rounded-lg px-4 py-2 text-[#131D21] font-medium text-sm"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          <div
            className={`
              ${showMobileFilters ? "flex" : "hidden"} md:flex
              flex-col gap-[2em] md:gap-[5em] items-start shrink-0
              w-full md:w-[25%]
              bg-white md:bg-transparent
              rounded-xl md:rounded-none
              border md:border-none border-[#C0C8C7]
              p-[1em] md:p-0
              relative
            `}
          >
            <button
              onClick={() => setShowMobileFilters(false)}
              className="md:hidden absolute top-3 right-3 text-[#586062]"
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
            {FiltersContent}
          </div>

          <section className="w-full md:w-[75%] flex flex-col gap-[2em] md:gap-[3em]">
            <div className="flex flex-wrap justify-end items-center gap-2">
              <div className="flex gap-[0.75em] items-center">
                <span className="font-[Inter] font-medium text-[0.875em] text-[#586062] whitespace-nowrap">
                  Sort by:
                </span>
                <div className="relative flex items-center gap-[1em] min-w-35">
                  <Select
                    options={options}
                    styles={customStyles}
                    components={{ Menu }}
                    onChange={(e) => dispatch(sortBy(e?.value as string))}
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              {productsQuery.isLoading ? (
                <CardSkeleton cardsCount={limit} />
              ) : productsQuery.isError ? (
                <h2 className="text-[1.25em] md:text-[1.5em] font-[Inter] text-center text-red-600">
                  <span>{productsQuery.error?.message}</span>
                </h2>
              ) : (
                <div className="flex flex-col gap-[3em] w-full">
                  {productsQuery.data.data.length > 0 ? (
                    <div
                      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5em] md:gap-[3em] transition-opacity duration-200
                    ${productsQuery.isFetching ? "opacity-60 pointer-events-none" : "opacity-100"}`}
                    >
                      {productsQuery.data?.data?.map(
                        (product: ProductInterface) => (
                          <ProductCard product={product} key={product._id} />
                        ),
                      )}
                    </div>
                  ) : (
                    <EmptyState
                      handleResetFilters={handleResetFilters}
                      text="No Available Products"
                    />
                  )}

                  {productsQuery?.data?.filteredProductsCount > 0 &&
                    numberOfPages > 1 && (
                      <div className="flex items-center justify-center gap-[0.5em] flex-wrap">
                        <button
                          disabled={
                            productsfilters.page === 1 ||
                            productsQuery.isFetching
                          }
                          className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-9 h-9 md:w-10 md:h-10 rounded-lg text-[#131D21] flex items-center justify-center transform rotate-180"
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
                          className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-9 h-9 md:w-10 md:h-10 rounded-lg text-[#131D21] flex items-center justify-center"
                          onClick={() =>
                            dispatch(
                              setPage(
                                Math.min(
                                  productsfilters.page + 1,
                                  numberOfPages,
                                ),
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