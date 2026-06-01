import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
const CardSkeleton = ({
  cardsCount = 3
}: {
  cardsCount: number
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.5em] w-full">
      {Array(cardsCount)
        .fill(0)
        .map((_, index: number) => {
          return (
            <div key={index} className="bg-white shadow-sm min-h-100">
              <div className="w-full h-[50%]">
                <Skeleton width="100%" height="100%"/>
              </div>
              <div className="p-[1.5em] flex flex-col gap-[0.5em]">
                <Skeleton width="100%" height={20} />
                <Skeleton width="100%" height={20} />
                <div className="flex items-center justify-between">
                  <Skeleton width={50} height={20} />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CardSkeleton;
