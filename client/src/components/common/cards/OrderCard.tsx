import { NavLink } from "react-router";
import { ArrowRight } from "lucide-react";
import type { orderDetails } from "../../../utils/Types";

const OrderCard = ({ order } : {order : orderDetails}) => {
  
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC", 

  });
  const createdAtDate = formatter.format(new Date(order.createdAt));
  console.log(order)
  return (
    <div className="bg-white border border-[#C0C8C7] p-6 rounded-xl">
      <div className="flex justify-between items-start pb-6 border-b border-b-[#C0C8C7] mb-6">
        <div>
          <h3 className="text-[#416465] font-[Inter] font-bold text-[12px] uppercase mb-2">
            order#{order.orderNumber}
          </h3>
          <span className="font-[Inter] font-normal text-[14px] text-[#414848] capitalize">
            {createdAtDate}
          </span>
        </div>

        <span className="flex! items-center justify-center bg-[#B2D8D8] px-3 py-1  rounded-xl font-[Inter] font-bold text-[11px] text-[#3C5F60] uppercase">
          status
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[#131D21] font-normal text-[18px]">${(order.totalPrice + order.shippingPrice + order.taxPrice).toFixed(2)}</span>
        <NavLink
          to={`/order-details/${order._id}`}
          className="flex items-center gap-1 transition-transform duration-300 hover:-translate-y-0.5 group"
        >
          <span className="text-[#416465] font-[Inter] font-bold text-[13px] uppercase border-b border-transparent group-hover:border-[#416465] transition-colors duration-300 pb-0.5">
            Details
          </span>
          <ArrowRight size={16} color="#416465" />
        </NavLink>
      </div>
    </div>
  );
};

export default OrderCard;
