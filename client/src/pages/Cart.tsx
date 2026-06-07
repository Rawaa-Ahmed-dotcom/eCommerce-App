import { Link } from "react-router";
import { ScrollSection } from "../components/common/ScrollSection";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { OctagonMinus, Trash } from "lucide-react";
import type { cartItem } from "../utils/Types";
import { deleteItem, updateQuantity } from "../store/features/cartSlice";
import { Plus, Minus } from "lucide-react";

const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cartState);
  const dispatch = useAppDispatch();
  console.log(cartItems);
  return (
    <ScrollSection>
      <main className="px-[1em] w-full md:px-[2em] lg:px-[5em] my-[5em] py-[5em] flex! flex-col gap-[3em] items-start justify-start bg-[#F1FBFF]">
        {cartItems.length > 0 ? (
          <>
            <div className="flex flex-col gap-2 mb-[3em]">
              <h2 className="font-semibold text-[2em] text-[#131D21] tracking-[-0.32px] capitalize">
                your cart
              </h2>
              <p className="text-[#414848] font-[Inter] font-normal text-[1em]">
                You have {cartItems.length} items in your cart. Review and
                checkout below.
              </p>
            </div>
            <div className="flex md:flex-row flex-col gap-[3em] w-full">
              <div className="flex gap-[1.5em] w-[50%] flex-col h-120 overflow-y-auto">
                {cartItems.map((item: cartItem, index: number) => {
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 flex gap-[1.5em] border border-[#C0C8C7] w-full"
                    >
                      <div className="w-32.5 rounded-lg">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="flex flex-col gap-[1.5em] flex-1">
                        <div className="flex items-center justify-between w-full">
                          <Link
                            to={`/productDetails/${item.slug}`}
                            className="font-medium text-[1.5em] text-[#131D21] "
                          >
                            {item.title}
                          </Link>
                          <Trash
                            className="cursor-pointer"
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
                            <h3 className="text-[#414848] font-[Inter] font-medium text-[0.875em] uppercase">
                              Color
                            </h3>
                            <span
                              className="inline-block w-8 h-8 rounded-full pointer-events-none"
                              style={{ background: `${item.color}` }}
                            ></span>
                          </div>
                          <div className="flex flex-col gap-[0.5em]">
                            <h4 className="font-[Inter] text-[0.875em] font-medium uppercase text-[#414848] tracking-[0.7px] leading-[16.8px]">
                              size
                            </h4>
                            <span className=" bg-[rgba(178,216,216,0.5)] text-[#131D21] font-semibold pointer-events-none border-2 border-[#416465] w-8 h-8 rounded-full flex items-center justify-center">
                              {item.size}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="border border-[#C0C8C7] rounded-lg py-2.75 w-[8em] px-[0.75em] flex items-center justify-around">
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
                            <span className="text-[#131D21] font-[Inter] font-bold text-[1em]">
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
                          <span className="text-[#131D21] font-medium text-[1.5em]">EGP {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col items-center gap-[0.5em] ">
            <OctagonMinus color="#416465" size={50} />
            <h2 className="text-2xl font-semibold text-[#131D21]">
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
