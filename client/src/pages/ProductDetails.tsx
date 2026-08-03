import { NavLink, useParams } from "react-router";
import { useGetSingleProduct } from "../Hooks/products";
import { ScrollSection } from "../components/common/ScrollSection";
import { type cartItem, type imageInterface, type ProductInterface, type variants } from "../utils/Types";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, Check } from "lucide-react";
import { activeClassBreadcrumb } from "../utils/CustomClasses";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/features/cartSlice";
import ProductSkeleton from "../components/common/skeletons/ProductSkeleton";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [activeImage, setActiveImage] = useState<imageInterface>();
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeSize, setActiveSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const { slug } = useParams();
  const productQuery = useGetSingleProduct(slug as string);
  const dispatch = useAppDispatch();
  const product : ProductInterface = productQuery?.data;
  const primaryImage = product?.images?.find(
    (img: imageInterface) => img.isPrimary === true
  );

  const colors = [
    ...new Set<string>(
      product?.variants?.map((v: variants) => v.color) || []
    ),
  ];

  const GetTargetImage = (color: string) => {
    setActiveColor(color);
    setActiveSize("");    
    setQuantity(1); 

    const targetImage = product?.images?.find(
      (img: imageInterface) => img.color === color
    );
    setActiveImage(targetImage);
  };

  const availableSizesFor = product?.variants
    ?.filter((v: variants) => v.color === activeColor)
    ?.map((v: variants) => v.size);

  const selectedVariant = product?.variants?.find(
    (v: variants) => v.color === activeColor && v.size === activeSize
  );

  const currentStock = selectedVariant
    ? selectedVariant.stock
    : product?.variants?.reduce(
        (acc: number, v: variants) => acc + (v.stock || 0),
        0
      ) ?? 0;

  const currentPrice = product?.salePrice ?? product?.price;

  const newItem: cartItem = {
    slug: slug as string,
    title: product?.title || "",
    image: activeImage?.url || primaryImage?.url || "",
    price: currentPrice,
    color: activeColor,
    size: activeSize,
    quantity,
  };

  const handleAddToCart = (item: cartItem) => {
    dispatch(addToCart(item));
    toast.success(`${item.title} Added To Cart`, { position: "top-right" });
  };

  return (
    <ScrollSection>
      <main className="px-[1em] md:px-[2em] lg:px-[5em] my-[2em] md:my-[5em] py-[2em] md:py-[5em] w-full flex flex-col justify-start items-start gap-[1.5em]">
        {/* Breadcrumb */}
        <div className="flex items-end gap-[0.5em] flex-wrap text-sm sm:text-base">
          <NavLink
            to="/shop"
            className={({ isActive }) => activeClassBreadcrumb(isActive)}
          >
            Shop
          </NavLink>
          <span> {">"}</span>
          <NavLink
            to="#"
            className={({ isActive }) => activeClassBreadcrumb(isActive)}
          >
            {product?.title}
          </NavLink>
        </div>

        {productQuery.isLoading ? (
          <ProductSkeleton
            isSalePrice={product?.salePrice !== null}
            colors={colors.length}
          />
        ) : (
          <div className="flex gap-[2em] md:gap-[5em] flex-col md:flex-row w-full">
            <div className="w-full md:w-[50%] h-[20em] sm:h-[26em] md:h-175 shrink-0">
              <img
                src={activeImage?.url || primaryImage?.url}
                className="max-w-full w-full object-contain rounded-lg h-full"
                alt={activeImage?.alt || product?.title}
              />
            </div>

            <div className="w-full md:w-[50%] flex flex-col">
              <h3 className="font-semibold text-2xl sm:text-3xl md:text-[2em] text-[#131D21] leading-8 tracking-tight mb-1">
                {product?.title}
              </h3>

              <div className="flex items-center gap-3 flex-wrap justify-between mt-[1em] pb-[1.5em] border-b border-b-[#C0C8C7] mb-[1.5em]">
                {product?.salePrice ? (
                  <>
                    <span className="text-[#416465] text-xl sm:text-2xl md:text-[1.5em] font-medium">
                      {product?.currency} {product?.salePrice}
                    </span>
                    <span className="text-[#586062] text-xl sm:text-2xl md:text-[1.5em] font-medium line-through">
                      {product?.currency} {product?.price}
                    </span>
                  </>
                ) : (
                  <span className="text-[#416465] text-xl sm:text-2xl md:text-[1.5em] font-medium">
                    {product?.currency} {product?.price}
                  </span>
                )}
              </div>

              <p className="font-[Inter] text-sm sm:text-base md:text-[1em] font-normal leading-6 md:leading-7 tracking-[0.16px] text-[#414848] mb-6">
                {product?.description}
              </p>

              <div className="flex flex-col gap-3">
                <h4 className="text-[#414848] font-[Inter] font-medium text-xs sm:text-[0.875em] uppercase">
                  Color
                </h4>
                <div className="flex items-center gap-[0.625em] flex-wrap">
                  {colors?.map((color: string) => {
                    const isSelected = activeColor === color;
                    return (
                      <button
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full inline-flex items-center justify-center cursor-pointer transition duration-300 hover:scale-[1.05] relative z-10 shrink-0 ${
                          isSelected ? "ring-2 ring-offset-2 ring-[#416465]" : ""
                        }`}
                        style={{ background: color }}
                        key={color}
                        onClick={() => GetTargetImage(color)}
                      >
                        {isSelected && (
                          <Check
                            size={16}
                            className={
                              color.toLowerCase() === "#ffffff" ||
                              color.toLowerCase() === "white"
                                ? "text-black"
                                : "text-white"
                            }
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence>
                {activeColor && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex flex-col gap-3 mt-[1.43em]"
                  >
                    <h4 className="font-[Inter] text-xs sm:text-[0.875em] font-medium uppercase text-[#414848] tracking-[0.7px] leading-[16.8px] mb-3">
                      size
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      {availableSizesFor?.map((s: string) => (
                        <button
                          className={`px-6 sm:px-8 md:px-11 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base text-[#131D21] cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                            activeSize === s
                              ? "border-2 border-[#416465] bg-[rgba(178,216,216,0.5)] font-semibold"
                              : "border border-[#C0C8C7]"
                          }`}
                          key={s}
                          onClick={() => {
                            setActiveSize(s);
                            setQuantity(1); 
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-[0.8125em] mt-6">
                <div className="flex items-center gap-3">
                  <h4 className="text-[#414848] font-[Inter] font-medium text-xs sm:text-[0.875em] uppercase tracking-[0.7px] leading-[16.8px]">
                    quantity
                  </h4>
                  {activeSize && (
                    <span className="text-xs text-gray-500 font-[Inter]">
                      ({currentStock} items in stock)
                    </span>
                  )}
                </div>

                <div className="border border-[#C0C8C7] rounded-lg py-2.5 sm:py-2.75 w-[7em] sm:w-[8em] px-[0.75em] flex items-center justify-around">
                  <button
                    type="button"
                    className="cursor-pointer disabled:opacity-40"
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                    }
                    disabled={quantity <= 1}
                  >
                    <Minus
                      size={16}
                      color={quantity === 1 ? "#797a7a" : "#131D21"}
                    />
                  </button>
                  <span className="text-[#131D21] font-[Inter] font-bold text-sm sm:text-[1em]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="cursor-pointer disabled:opacity-40"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    disabled={quantity >= currentStock} 
                  >
                    <Plus
                      size={16}
                      color={quantity >= currentStock ? "#797a7a" : "#131D21"}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-[3em] w-full flex items-center justify-start">
                <button
                  className="py-[0.9em] sm:py-[1em] flex items-center justify-center bg-[#B2D8D8]
                  rounded-lg capitalize w-full sm:w-[70%] md:w-[50%] cursor-pointer transition duration-300
                  hover:bg-[#85a2a2] text-[#3C5F60] font-bold font-[Inter] text-sm sm:text-[1em]
                  disabled:bg-[#878a8a] disabled:text-[#515353] disabled:pointer-events-none"
                  disabled={
                    activeColor === "" ||
                    activeSize === "" ||
                    currentStock <= 0
                  }
                  onClick={() => handleAddToCart(newItem)}
                >
                  {currentStock <= 0 ? "Out of stock" : "add to cart"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </ScrollSection>
  );
};

export default ProductDetails;