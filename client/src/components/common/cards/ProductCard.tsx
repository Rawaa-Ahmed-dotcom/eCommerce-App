import { Link } from "react-router";
import { type ProductInterface, type imageInterface } from "../../../utils/Types";

const ProductCard = ({ product }: { product: ProductInterface }) => {
  const thumbnailImg = product.images.find(
    (img: imageInterface) => img.isPrimary === true,
  );

  return (
    <Link
      className="group w-full h-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      to={`/productDetails/${product.slug}`}
    >
      <div className="w-full aspect-square bg-[#F7FAFA] flex items-center justify-center overflow-hidden">
        <img
          src={thumbnailImg?.url}
          alt={product.title}
          className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4 sm:p-5 md:p-[1.5em] flex flex-col gap-2 md:gap-[0.5em] flex-1">
        <h3 className="text-base sm:text-lg md:text-[1.5em] leading-snug md:leading-7 font-medium text-[#131D21] line-clamp-2">
          {product.title}
        </h3>
        <h4 className="text-[#586062] font-[Inter] text-xs md:text-[0.6875em] font-normal tracking-wide">
          {product.brand}
        </h4>
        <div className="flex items-center justify-between gap-2 flex-wrap mt-auto">
          {product.salePrice ? (
            <span className="text-[#586062] text-sm md:text-[1em] font-medium line-through">
              {product.currency} {product.price}
            </span>
          ) : (
            <span className="text-[#416465] text-sm md:text-[1em] font-medium">
              {product.currency} {product.price}
            </span>
          )}
          {product.salePrice && (
            <span className="text-[#416465] text-sm md:text-[1em] font-semibold">
              {product.currency} {product.salePrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;