import { NavLink, useParams } from "react-router";
import { useGetSingleProduct } from "../Hooks/products";
import { ScrollSection } from "../components/common/ScrollSection";
import { type cartItem, type imageInterface, type variants } from "../utils/Types";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { activeClassBreadcrumb } from "../utils/CustomClasses";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/features/cartSlice";
import  ProductSkeleton from "../components/common/skeletons/ProductSkeleton";

const ProductDetails = () => {
  const [activeImage, setActiveImage] = useState<imageInterface>();
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeSize, setActiveSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const { slug } = useParams();
  const productQuery = useGetSingleProduct(slug as string);
  const dispatch = useAppDispatch();
  const {cartItems} = useAppSelector(state => state.cartState);
  console.log(cartItems);

  const primaryImage = productQuery.data?.images.find(
    (img: imageInterface) => img.isPrimary === true,
  );
  const colors = [
    ...new Set(productQuery?.data?.variants.map((v: variants) => v.color)),
  ];
  const GetTargetImage = (color: string) => {
    setActiveColor(color);
    const targetImage = productQuery?.data?.images.find(
      (img: imageInterface) => img.color == color,
    );
    setActiveImage(targetImage);
  };

  const availableSizesFor = productQuery?.data?.variants
    .filter((v: variants) => v.color === activeColor)
    .map((v: variants) => v.size);
  const newItem : cartItem = {
    slug : slug  as string,
    title : productQuery.data?.title,
    image : activeImage?.url || primaryImage?.url,
    price : productQuery.data?.price ,
    color : activeColor,
    size : activeSize,
    quantity

  };
  console.log(newItem);
  return (
    <ScrollSection>
      <main className="px-[1em] md:px-[2em] lg:px-[5em] my-[5em] py-[5em] w-full flex! flex-col justify-start items-start gap-[1.5em]! ">
        <div className="flex items-end gap-[0.5em]">
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
            {productQuery.data?.title}
          </NavLink>
        </div>
        {productQuery.isLoading 
        ? 
        <ProductSkeleton isSalePrice = {productQuery?.data?.salePrice !== null} colors={colors.length}/>
        :
        <div className="flex gap-[5em] flex-col md:flex-row h-175 w-full">
          <div className="w-[50%] h-full">
            <img
              src={activeImage?.url || primaryImage?.url}
              className="max-w-full object-cover rounded-lg h-full"
              alt={activeImage?.alt}
            />
          </div>
          <div className="w-[50%] flex flex-col ">
            <h3 className="font-semibold text-[2em] text-[#131D21] leading-8 tracking-tight mb-1">
              {productQuery.data?.title}
            </h3>
            <div className="flex items-center justify-between mt-[1em] pb-[1.5em] border-b border-b-[#C0C8C7] mb-[1.5em]">
              {productQuery?.data?.salePrice ? (
                <>
                  <span className="text-[#416465] text-[1.5em] font-medium ">
                    {productQuery?.data?.currency}
                    {productQuery?.data?.salePrice}
                  </span>
                  <span className="text-[#586062] text-[1.5em] font-medium line-through">
                    {productQuery?.data?.currency}
                    {productQuery?.data?.price}
                  </span>
                </>
              ) : (
                <span className="text-[#416465] text-[1.5em] font-medium ">
                  {productQuery?.data?.currency}
                  {productQuery?.data?.price}
                </span>
              )}
            </div>
            <p className="font-[Inter] text-[1em] font-normal leading-7 tracking-[0.16px] text-[#414848] mb-6">
              {productQuery?.data?.description}
            </p>
            <div className="flex flex-col gap-3">
              <h4 className="text-[#414848] font-[Inter] font-medium text-[0.875em] uppercase">
                Color
              </h4>
              <div className="flex items-center gap-[0.625em]">
                {colors?.map((color: string) => {
                  return (
                    <button
                      className=" w-10 h-10 rounded-[50%] inline-block cursor-pointer transition duration-300 hover:scale-[1.03]  relative z-10"
                      style={{ background: color }}
                      key={color}
                      onClick={() => GetTargetImage(color)}
                    ></button>
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
                  <h4 className="font-[Inter] text-[0.875em] font-medium uppercase text-[#414848] tracking-[0.7px] leading-[16.8px] mb-3">
                    size
                  </h4>
                  <div className="flex items-center gap-1 ">
                    {availableSizesFor?.map((s: string) => (
                      <button
                        className={`px-11 py-3 rounded-lg  text-[#131D21] cursor-pointer transition-colors duration-200 hover:scale-[1.02]  ${activeSize === s ? "border-2 border-[#416465] bg-[rgba(178,216,216,0.5)] scale-[1.02]" : "border border-[#C0C8C7]"}`}
                        key={s}
                        onClick={() => setActiveSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex flex-col gap-[0.8125em] mt-6">
              <h4 className="text-[#414848] font-[Inter] font-medium text-[0.875em] uppercase tracking-[0.7px] leading-[16.8px]">
                quantity
              </h4>
              <div className="border border-[#C0C8C7] rounded-lg py-2.75 w-[8em] px-[0.75em] flex items-center justify-around">
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                >
                  <Minus
                    size={16}
                    color={`${quantity === 1 ? "#797a7a" : "#131D21"}`}
                  />
                </button>
                <span className="text-[#131D21] font-[Inter] font-bold text-[1em]">
                  {quantity}
                </span>
                <button
                  className="cursor-pointer"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Plus size={16} color="#131D21" />
                </button>
              </div>
            </div>
            <div className="mt-[3em] w-full flex items-center justify-start">
              <button
                className=" py-[1em] flex items-center justify-center bg-[#B2D8D8] 
                rounded-lg capitalize! w-[50%] cursor-pointer transition duration-300 
                hover:bg-[#85a2a2] text-[#3C5F60] font-bold font-[Inter] text-[1em]
                disabled:bg-[#878a8a] disabled:text-[#515353] disabled:pointer-events-none"
                disabled = {activeColor === "" || activeSize === "" || productQuery.data?.stock <= 0}
                onClick={() => dispatch(addToCart(newItem))}
              >
                {productQuery.data?.stock <= 0 ? "Out of stock" : "add to cart"}
              </button>
            </div>
          </div>
        </div>
        }
      </main>
    </ScrollSection>
  );
};

export default ProductDetails;

/*

*/
