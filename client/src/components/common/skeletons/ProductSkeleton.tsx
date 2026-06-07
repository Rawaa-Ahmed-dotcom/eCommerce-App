import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const ProductSkeleton = ({
  isSalePrice,
  colors,
}: {
  isSalePrice: boolean;
  colors: number;
}) => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-[5em] h-175">
      <div className="w-[50%] h-full rounded-lg">
        <Skeleton width="100%" height="100%" />
      </div>
      <div className="flex flex-col w-[50%]">
        <Skeleton width="70%" height="50px" />
        <div className="flex items-center justify-between mt-[1em] pb-[1em]">
          {isSalePrice ? (
            <>
              <Skeleton width="100px" height="40px" />
              <Skeleton width="100px" height="40px" />
            </>
          ) : (
            <Skeleton width="100px" height="40px" />
          )}
        </div>
        <Skeleton width="100%" height="4px" />
        <div className="my-[1.5em] w-full h-37.5">
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="flex flex-col gap-[1em]">
          <Skeleton width="70px" height="30px" />
          <div className="flex items-center gap-[1em]">
            {Array(colors)
            .fill(0)
            .map((_, index: number) => (
              <Skeleton
                key={index}
                width="40px"
                height="40px"
                borderRadius="50%"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[1em] mt-[1em]">
          <Skeleton width="70px" height="30px"/>
          
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
