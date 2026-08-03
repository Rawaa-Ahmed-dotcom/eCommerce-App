import { useState } from "react";
import { clearFilter, setStatus } from "../store/features/orderSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import OrderStatusRadio from "../components/common/Radios/OrderStatusRadio";
import { useGetUserOrders, useStatusCounts } from "../Hooks/order";
import EmptyState from "../components/feedback/EmptyState";
import OrderCard from "../components/common/cards/OrderCard";
import ErrorState from "../components/feedback/ErrorState";
import OrderCardSkeleton from "../components/common/skeletons/OrderSkeleton";
import { SlidersHorizontal, X } from "lucide-react";
import type {  orderDetails } from "../utils/Types";

const OrdersHistory = () => {
  const { status } = useAppSelector((state) => state.ordersFilter);
  const dispatch = useAppDispatch();
  const statusCountsQuery = useStatusCounts();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    data: filteredOrders,
    isLoading,
    isError,
    error,
  } = useGetUserOrders(status);

  const handleResetFilters = () => {
    dispatch(clearFilter());
  };

  const handleStatusChange = (v: string) => {
    dispatch(setStatus(v));
    setShowMobileFilters(false);
  };

  const FiltersContent = (
    <>
      <OrderStatusRadio
        id="all"
        name="status"
        value=""
        label="All Orders"
        count={statusCountsQuery?.data?.All}
        currentStatus={status}
        onChange={handleStatusChange}
      />
      <OrderStatusRadio
        id="delivered"
        name="status"
        value="Delivered"
        label="Delivered"
        count={statusCountsQuery?.data?.Delivered}
        currentStatus={status}
        onChange={handleStatusChange}
      />
      <OrderStatusRadio
        id="pending"
        name="status"
        value="Pending"
        label="Pending"
        count={statusCountsQuery?.data?.Pending}
        currentStatus={status}
        onChange={handleStatusChange}
      />
      <OrderStatusRadio
        id="shipped"
        name="status"
        value="Shipped"
        label="Shipped"
        count={statusCountsQuery?.data?.Shipped}
        currentStatus={status}
        onChange={handleStatusChange}
      />
      <OrderStatusRadio
        id="cancelled"
        name="status"
        value="Cancelled"
        label="Cancelled"
        count={statusCountsQuery?.data?.Cancelled}
        currentStatus={status}
        onChange={handleStatusChange}
      />
    </>
  );

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-6 p-3 sm:p-4 md:p-6">
      <div className="flex lg:hidden items-center justify-between">
        <button
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className="flex items-center gap-2 bg-white border border-[#C0C8C7] rounded-lg px-4 py-2 text-[#131D21] font-medium text-sm"
        >
          <SlidersHorizontal size={16} />
          Quick Filters
        </button>
      </div>

      {showMobileFilters && (
        <div
          onClick={() => setShowMobileFilters(false)}
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
        />
      )}

      <div
        className={`
          ${showMobileFilters ? "flex z-20" : "hidden"} lg:flex
          flex-col border border-[#C0C8C7] bg-white rounded-xl p-4 sm:p-6 lg:col-span-1 relative
        `}
      >
        <button
          onClick={() => setShowMobileFilters(false)}
          className="lg:hidden absolute top-3 right-3 text-[#586062]"
          aria-label="Close filters"
        >
          <X size={18} />
        </button>
        <h3 className="text-[#414848] uppercase font-[Inter] font-medium text-xs sm:text-[14px] mb-4 sm:mb-6">
          quick filters
        </h3>
        {FiltersContent}
      </div>

      <div className="lg:col-span-4 w-full">
        {isError ? (
          <ErrorState message={(error as Error)?.message || "An error occurred"} />
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-3.5">
            <OrderCardSkeleton count={6} />
          </div>
        ) : !filteredOrders?.data || filteredOrders.data.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full py-10">
            <EmptyState
              handleResetFilters={handleResetFilters}
              text="No Match Orders"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-3.5">
            {filteredOrders.data.map((order : orderDetails) => (
              <OrderCard order={order} key={order._id } />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersHistory;