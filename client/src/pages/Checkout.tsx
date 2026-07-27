import { useForm } from "react-hook-form";
import type { checkoutForm, orderItem } from "../utils/Types";
import FormRow from "../components/common/form/FormRow";
import { CreditCard, Van } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useCreateOrder } from "../Hooks/order";
import { clearCart } from "../store/features/cartSlice";
import {ClipLoader} from "react-spinners"

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<checkoutForm>();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cartState);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  
  const subTotal = cartItems.reduce(
    (acc, item) => item.price * item.quantity + acc,
    0,
  );
  const tax = subTotal * 0.14;
  const token = localStorage.getItem("accessToken");
  const validatedOrderItems: orderItem[] = cartItems.map((item) => ({
    product: item.slug,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    price: item.price,
  }));
  console.log(validatedOrderItems);
  const orderMutation = useCreateOrder(token as string);
  const submit = (data: checkoutForm) => {
    orderMutation.mutate({
      orderItems: validatedOrderItems as unknown as [orderItem],
      personalInfo: data,
    });
    localStorage.setItem("cartItems" , JSON.stringify([]));
    dispatch(clearCart());
    
  };
  return (
    <form
      className="p-30  bg-[#F1FBFF] w-full grid! md:grid-cols-3  grid-cols-1 md:gap-20"
      onSubmit={handleSubmit(submit)}
    >
      <div className="flex flex-col gap-20 col-span-2">
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B2D8D8] text-[#3C5F60] font-[Inter] font-bold text-[16px]">
              1
            </span>
            <h2 className="text-[#131D21] font-medium text-2xl">
              Contact Information
            </h2>
          </div>
          <div className="flex flex-col gap-6 w-full bg-[#EAF5FA] rounded-xl p-6">
            <FormRow
              register={register}
              fieldName="contactInfo.fullname"
              errors={errors}
              label="full name"
              placeholder="john doe"
            />
            <div className="flex items-center gap-6 w-full">
              <FormRow
                register={register}
                fieldName="contactInfo.email"
                errors={errors}
                label="email"
                customClass="w-[50%]"
                placeholder="john@example.com"
              />
              <FormRow
                register={register}
                fieldName="contactInfo.phone"
                errors={errors}
                label="phone number"
                customClass="w-[50%]"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B2D8D8] text-[#3C5F60] font-[Inter] font-bold text-[16px]">
              2
            </span>
            <h2 className="text-[#131D21] font-medium text-2xl">
              Shipping Address
            </h2>
          </div>
          <div className="flex flex-col gap-6 w-full bg-[#EAF5FA] rounded-xl p-6">
            <FormRow
              register={register}
              fieldName="shippingAddress.address"
              errors={errors}
              label="Street Address"
              placeholder="123 Minimalist Way"
            />
            <div className="flex items-center gap-6 w-full">
              <FormRow
                register={register}
                fieldName="shippingAddress.city"
                errors={errors}
                label="city"
                customClass="w-[calc((100% - 48px) / 3)]"
                placeholder="San Francisco"
              />
              <FormRow
                register={register}
                fieldName="shippingAddress.state"
                errors={errors}
                label="state"
                customClass="w-[calc((100% - 48px) / 3)]"
                placeholder="CA"
              />
              <FormRow
                register={register}
                fieldName="shippingAddress.zipCode"
                errors={errors}
                label="zip code"
                customClass="w-[calc((100% - 48px) / 3)]"
                placeholder="94103"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 items-center">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B2D8D8] text-[#3C5F60] font-[Inter] font-bold text-[16px]">
              3
            </span>
            <h2 className="text-[#131D21] font-medium text-2xl">
              Payment Method
            </h2>
          </div>
          <div className="flex flex-col gap-6 w-full bg-[#EAF5FA] rounded-xl p-6">
            <div className="flex items-center gap-6 w-full pb-6 border-b border-b-[#C0C8C7] mb-6">
              <div className="w-[50%]">
                <input
                  type="radio"
                  className="sr-only peer"
                  id="card"
                  {...register("paymentMethod")}
                  value="card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label
                  htmlFor="card"
                  className="bg-[rgba(65,100,101,0.05)] rounded-xl cursor-pointer transition duration-300 border-2 border-[#C0C8C7] flex flex-col items-center gap-2.5 peer-checked:border-[#416465] py-6"
                >
                  <CreditCard color="#586062" />
                  <h3 className="text-[#131D21] font-[Inter] font-medium text-[14px]">
                    Card
                  </h3>
                </label>
              </div>
              <div className="w-[50%]">
                <input
                  type="radio"
                  className="sr-only peer"
                  id="ccd"
                  value="ccd"
                  {...register("paymentMethod")}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label
                  htmlFor="ccd"
                  className="bg-[rgba(65,100,101,0.05)] rounded-xl cursor-pointer transition duration-300 border-2 border-[#C0C8C7] flex flex-col items-center gap-2.5 peer-checked:border-[#416465] py-6"
                >
                  <Van color="#586062" />
                  <h3 className="text-[#131D21] font-[Inter] font-medium text-[14px]">
                    Cash On Delivery
                  </h3>
                </label>
              </div>
            </div>
            {paymentMethod === "card" && (
              <div className="flex flex-col gap-6">
                <FormRow
                  register={register}
                  fieldName="cardInfo.cardNumber"
                  errors={errors}
                  label="card number"
                  placeholder="0000 0000 0000 0000"
                />
                <div className="flex gap-6 items-center">
                  <FormRow
                    register={register}
                    fieldName="cardInfo.expiryDate"
                    errors={errors}
                    label="expiry date"
                    placeholder="MM / YY"
                    customClass="w-[50%]"
                  />
                  <FormRow
                    register={register}
                    fieldName="cardInfo.ccv"
                    errors={errors}
                    label="ccv"
                    placeholder="123"
                    customClass="w-[50%]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <aside className="col-span-1 border border-[#C0C8C7] rounded-lg flex flex-col h-fit">
        <div className="p-6 bg-[#D9E4E9]">
          <h2 className="text-[#131D21] font-medium text-2xl capitalize">
            order summary
          </h2>
        </div>
        <div className="bg-white overflow-y-auto p-6 flex flex-col gap-6">
          {cartItems.map((item, index) => (
            <div className="flex gap-6" key={index}>
              <div className="w-20 h-20 rounded-xl overflow-hidden">
                <img src={item.image} className="max-w-full " />
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="font-bold font-[Inter] text-[16px] text-[#131D21] leading-6">
                  {item.title}
                </h3>
                <div className="flex items-center flex-wrap gap-3.5">
                  <div className="flex items-center gap-0.5">
                    <span className="text-[#414848] font-[Inter] font-medium text-[14px] capitalize">
                      qty:
                    </span>
                    <span>{item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[#414848] font-[Inter] font-medium text-[14px] capitalize">
                      size:
                    </span>
                    <span>{item.size}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-7 bg-[#D9E4E9] p-6 border-b border-b-[#C0C8C7]">
          <div className="flex items-center justify-between">
            <span className="text-[#414848] font-[Inter] font-medium text-[14px]">
              Subtotal
            </span>
            <span className="text-[#414848] font-[Inter] font-nomral text-[16px]">
              ${subTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#414848] font-[Inter] font-medium text-[14px]">
              Estimated Tax
            </span>
            <span className="text-[#414848] font-[Inter] font-nomral text-[16px]">
              ${tax.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between p-6">
          <h3 className="text-[#131D21] font-bold text-[24px]">Total</h3>
          <span className="text-[#131D21] font-extrabold text-[24px]">
            ${(tax + subTotal).toFixed(2)}
          </span>
        </div>
        <div className="p-6 flex items-center justify-center">
          <button 
            className={`${orderMutation.isPending ? "bg-[#839494]" : "bg-[#416465] hover:bg-[#375b5d] text-white"} 
            flex items-center justify-center py-2.5 w-full
            font-bold text-[24px] rounded-lg cursor-pointer
            transition duration-300 `}
          >
            {orderMutation.isPending ? <ClipLoader size="18" color="white"/> : "Place Order"} 
          </button>
        </div>
      </aside>
    </form>
  );
};

export default Checkout;
