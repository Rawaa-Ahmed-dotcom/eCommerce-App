import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderCardSkeleton = ({ count }: { count: number }) => {
  const arr = Array.from({ length: count });
  return (
    <>
      {arr.map((_,index) => (
        <div key = {index}className="bg-white border border-[#C0C8C7] p-6 rounded-xl">
          <div className="flex justify-between items-start pb-6 border-b border-b-[#C0C8C7] mb-6">
            <div className="flex flex-col gap-2 w-24">
              <Skeleton width={80} height={12} />
              <Skeleton width={96} height={14} />
            </div>
            <Skeleton width={64} height={24} borderRadius={12} />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton width={56} height={16} />
            <Skeleton width={64} height={16} />
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderCardSkeleton;
