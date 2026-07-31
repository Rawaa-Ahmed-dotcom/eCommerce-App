import { Link } from "react-router";
import { ScrollSection } from "../components/common/ScrollSection";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { OctagonMinus, Trash, Plus, Minus } from "lucide-react";
import type { cartItem } from "../utils/Types";
import { deleteItem, updateQuantity } from "../store/features/cartSlice";

const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cartState);
  const dispatch = useAppDispatch();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const numberOfItems = cartItems.reduce(
    (acc, item) => item.quantity * 1 + acc,
    0,
  );
  const shipping = 5;
  const taxes = 1.5;

  return (
    <ScrollSection>
      <main className="px-[1em] w-full md:px-[2em] lg:px-[5em] my-[2em] md:my-[5em] py-[2em] md:py-[5em] flex! flex-col gap-[2em] md:gap-[3em] items-start justify-start bg-[#F1FBFF]">
        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-col gap-2 mb-[1em] md:mb-[3em]">
              <h2 className="font-semibold text-xl sm:text-2xl md:text-[2em] text-[#131D21] tracking-[-0.32px] capitalize">
                your cart
              </h2>
              <p className="text-[#414848] font-[Inter] font-normal text-sm sm:text-base md:text-[1em]">
                You have {numberOfItems} items in your cart. Review and
                checkout below.
              </p>
            </div>

            <div className="flex md:flex-row flex-col gap-[2em] md:gap-[3em] w-full">
              {/* Cart items list */}
              <div className="flex gap-[1em] md:gap-[1.5em] w-full md:w-[60%] flex-col max-h-[32em] md:h-120 overflow-y-auto pr-1">
                {cartItems.map((item: cartItem, index: number) => {
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 sm:p-5 md:p-6 flex gap-3 sm:gap-4 md:gap-[1.5em] border border-[#C0C8C7] w-full"
                    >
                      <div className="w-20 sm:w-28 md:w-32.5 rounded-lg shrink-0 self-start">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full rounded-lg object-cover"
                        />
                      </div>

                      <div className="flex flex-col gap-3 md:gap-[1.5em] flex-1 min-w-0">
                        <div className="flex items-start sm:items-center justify-between gap-2 w-full">
                          <Link
                            to={`/productDetails/${item.slug}`}
                            className="font-medium text-base sm:text-lg md:text-[1.5em] text-[#131D21] line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <Trash
                            className="cursor-pointer shrink-0"
                            size={20}
                            color="#982a2a"
                            onClick={() =>
                              dispatch(
                                deleteItem({
                                  slug: item.slug,
                                  color: item.color,
                                  size: item.size,
                                }),
                              )
                            }
                          />
                        </div>

                        <div className="flex flex-row gap-[1em]">
                          <div className="flex flex-col gap-[0.5em]">
                            <h3 className="text-[#414848] font-[Inter] font-medium text-xs sm:text-[0.875em] uppercase">
                              Color
                            </h3>
                            <span
                              className="inline-block w-6 h-6 sm:w-8 sm:h-8 rounded-full pointer-events-none"
                              style={{ background: `${item.color}` }}
                            ></span>
                          </div>
                          <div className="flex flex-col gap-[0.5em]">
                            <h4 className="font-[Inter] text-xs sm:text-[0.875em] font-medium uppercase text-[#414848] tracking-[0.7px] leading-[16.8px]">
                              size
                            </h4>
                            <span className="bg-[rgba(178,216,216,0.5)] text-[#131D21] font-semibold pointer-events-none border-2 border-[#416465] w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-base">
                              {item.size}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="border border-[#C0C8C7] rounded-lg py-2 sm:py-2.75 w-[7em] sm:w-[8em] px-[0.5em] sm:px-[0.75em] flex items-center justify-around shrink-0">
                            <button
                              className="cursor-pointer"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    slug: item.slug,
                                    type: "decrement",
                                    color: item.color,
                                    size: item.size,
                                  }),
                                )
                              }
                            >
                              <Minus
                                size={16}
                                color={`${item.quantity === 1 ? "#797a7a" : "#131D21"}`}
                              />
                            </button>
                            <span className="text-[#131D21] font-[Inter] font-bold text-sm sm:text-[1em]">
                              {item.quantity}
                            </span>
                            <button
                              className="cursor-pointer"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    slug: item.slug,
                                    type: "increment",
                                    color: item.color,
                                    size: item.size,
                                  }),
                                )
                              }
                            >
                              <Plus size={16} color="#131D21" />
                            </button>
                          </div>
                          <span className="text-[#131D21] font-medium text-base sm:text-lg md:text-[1.5em]">
                            EGP {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order summary */}
              <div className="p-5 sm:p-6 border border-[#C0C8C7] rounded-xl bg-[#EAF5FA] w-full md:w-[40%] flex flex-col gap-5 md:gap-6 md:sticky md:top-6 self-start">
                <h2 className="text-[#131D21] text-xl sm:text-2xl font-medium capitalize">
                  order summary
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="capitalize text-[#414848] font-[Inter] font-normal text-sm sm:text-[16px]">
                      subtotal
                    </span>
                    <span className="capitalize text-[#414848] font-[Inter] font-normal text-sm sm:text-[16px]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="capitalize text-[#414848] font-[Inter] font-normal text-sm sm:text-[16px]">
                      shipping
                    </span>
                    <span className="capitalize text-[#414848] font-[Inter] font-normal text-sm sm:text-[16px]">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-b-[#C0C8C7] pb-3">
                    <span className="capitalize text-[#414848] font-[Inter] font-normal text-sm sm:text-[16px]">
                      taxes
                    </span>
                    <span className="capitalize text-[#414848] font-[Inter] font-normal text-sm sm:text-[16px]">
                      ${taxes.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#131D21] font-[Inter] font-bold text-sm sm:text-[16px]">
                      Total
                    </span>
                    <span className="font-[Inter] font-bold text-xl sm:text-2xl text-[#416465]">
                      ${(subtotal + shipping + taxes).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    to="/checkout"
                    className="bg-[#416465]!
                  rounded-lg font-[Inter] font-bold text-sm sm:text-[16px]
                   text-white w-full sm:w-[70%] md:w-[60%] flex items-center justify-center py-3.5 sm:py-4
                   cursor-pointer text-center"
                  >
                    PROCEED TO CHECKOUT
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col items-center gap-[0.5em] py-[3em]">
            <OctagonMinus color="#416465" size={50} />
            <h2 className="text-xl sm:text-2xl font-semibold text-[#131D21] text-center">
              Your cart is empty
            </h2>
            <Link
              to="/shop"
              className="transition duration-300 hover:underline text-[#414848]"
            >
              Add products
            </Link>
          </div>
        )}
      </main>
    </ScrollSection>
  );
};

export default Cart;