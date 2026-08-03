import { useParams } from "react-router"
import { useGetOrderDetails } from "../Hooks/order";
import type{ orderDetails, orderItem } from "../utils/Types";

const statusStyles: Record<string, string> = {
  pending: "bg-[#B2D8D8]/40 text-[#414848] border border-[#414848]/20",
  processing: "bg-[#416465]/15 text-[#416465] border border-[#416465]/30",
  shipped: "bg-[#416465]/25 text-[#131D21] border border-[#416465]/40",
  delivered: "bg-[#416465] text-white border border-[#416465]",
  cancelled: "bg-[#131D21]/10 text-[#131D21] border border-[#131D21]/30",
};
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" }).format(value);
 
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
 



const OrderDetails = () => {
  const {id}= useParams();
  const orderQuery = useGetOrderDetails(id as string);
  const order: orderDetails | undefined = orderQuery.data?.data;
 
  
  if (orderQuery.isLoading) {
    return (
      <div className="min-h-screen bg-[#B2D8D8]/20 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-md bg-[#414848]/10" />
          <div className="h-40 rounded-2xl bg-[#414848]/10" />
          <div className="h-64 rounded-2xl bg-[#414848]/10" />
        </div>
      </div>
    );
  }
 
  if (orderQuery.isError || !order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#B2D8D8]/20 px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#414848]/10 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#131D21]/5 text-[#131D21]">
            !
          </div>
          <h2 className="text-lg font-semibold text-[#131D21]">
            No Order Details
          </h2>
          <p className="mt-2 text-sm text-[#414848]">
            An Error Ocurred
          </p>
        </div>
      </div>
    );
  }
 
  const statusClass = statusStyles[order.status?.toLowerCase()] ?? statusStyles.pending;
 
  return (
    <div className="min-h-screen bg-[#B2D8D8]/20 px-4 py-8 sm:px-6 lg:px-10 my-12">
      <div className="mx-auto max-w-5xl space-y-6">
        
        <div className="flex flex-col gap-4 rounded-2xl bg-[#131D21] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-[#B2D8D8]"> Order Details</p>
            <h1 className="mt-1 text-xl font-bold sm:text-2xl">
              #{order.orderNumber}
            </h1>
            <p className="mt-1 text-xs text-[#B2D8D8]/80">
           Order Date: {formatDate(order.createdAt)}
            </p>
          </div>
          <span
            className={`w-fit rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${statusClass}`}
          >
            {order.status}
          </span>
        </div>
 
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
         
          <div className="space-y-6 lg:col-span-2">
            
            <div className="overflow-hidden rounded-2xl border border-[#414848]/10 bg-white shadow-sm">
              <div className="border-b border-[#414848]/10 px-5 py-4">
                <h2 className="font-semibold text-[#131D21]">Items</h2>
              </div>
 
              <div className="divide-y divide-[#414848]/10">
                {order.orderItems?.map((item : orderItem) => (
                  <div
                    key={item.product}
                    className="flex items-center gap-4 px-5 py-4"
                  >
                    <img
                      src={item?.image || "https://via.placeholder.com/64"}
                      alt={item?.title}
                      className="h-16 w-16 flex-shrink-0 rounded-lg object-cover ring-1 ring-[#414848]/10"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-[#131D21]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-[#414848]">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#416465]">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      <p className="text-xs text-[#414848]">
                        {formatCurrency(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Customer + shipping */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#414848]/10 bg-white p-5 shadow-sm">
                <h3 className="mb-3 font-semibold text-[#131D21]">Personal Info </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[#414848]">Fullname</dt>
                    <dd className="font-medium text-[#131D21]">{order.contactInfo?.fullname}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#414848]">Email</dt>
                    <dd className="font-medium text-[#131D21]">{order.contactInfo?.email}</dd>
                  </div>
                  {order.contactInfo?.phone && (
                    <div className="flex justify-between">
                      <dt className="text-[#414848]">Phone</dt>
                      <dd className="font-medium text-[#131D21]">{order.contactInfo?.phone}</dd>
                    </div>
                  )}
                </dl>
              </div>
 
              <div className="rounded-2xl border border-[#414848]/10 bg-white p-5 shadow-sm">
                <h3 className="mb-3 font-semibold text-[#131D21]"> Shipping Address</h3>
                <p className="text-sm leading-relaxed text-[#414848]">
                  {order.shippingAddress?.address}, {order.shippingAddress?.city}
                  {order.shippingAddress?.zipCode}
                  {order.shippingAddress?.state &&
                    `, ${order.shippingAddress.city}`}
                </p>
              </div>
            </div>
          </div>
 
          {/* Right column: summary */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#414848]/10 bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-semibold text-[#131D21]"> Order Summary</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[#414848]"> Total Price</dt>
                  <dd className="text-[#131D21]">{formatCurrency(order.totalPrice)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#414848]">Shipping</dt>
                  <dd className="text-[#131D21]">{formatCurrency(order.shippingPrice)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#414848]">Tax</dt>
                  <dd className="text-[#131D21]">{formatCurrency(order.taxPrice)}</dd>
                </div>
                <div className="my-1 border-t border-[#414848]/10" />
                <div className="flex justify-between text-base font-bold">
                  <dt className="text-[#131D21]">Total</dt>
                  <dd className="text-[#416465]">{formatCurrency(order.totalPrice + order.shippingPrice + order.taxPrice)}</dd>
                </div>
              </dl>
            </div>
 
            <div className="rounded-2xl border border-[#414848]/10 bg-white p-5 shadow-sm">
              <h3 className="mb-3 font-semibold text-[#131D21]">Payment</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#414848]"> Payment Method</span>
                <span className="font-medium capitalize text-[#131D21]">
                  {order.paymentMethod}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-[#414848]"> Payment Status</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    order.isPaid
                      ? "bg-[#416465]/15 text-[#416465]"
                      : "bg-[#131D21]/10 text-[#131D21]"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails
