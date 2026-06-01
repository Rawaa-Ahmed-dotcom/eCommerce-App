import { Link } from "react-router";
import { type ProductInterface } from "../../../utils/Types";
import { type imageInterface } from "../../../utils/Types";
const ProductCard = ({ product }: { product: ProductInterface }) => {
  const thumbnailImg = product.images.find(
    (img: imageInterface) => img.isPrimary === true,
  );
  return (
    <Link className="bg-white w-[calc((100% - 3em) / 3)] h-120 shadow-md rounded-lg overflow-hidden transition duration-300 hover:scale-[1.05]" to={`/productDetails/${product.slug}`}>
      <div className="w-full h-[60%]">
        <img
          src={thumbnailImg?.url}
          alt={product.title}
          className="w-full object-cover h-full"
        />
      </div>
      <div className="p-[1.5em] flex flex-col gap-[0.5em]">
        <h3 className="text-[1.5em] leading-7 font-medium text-[#131D21]">
          {product.title}
        </h3>
        <h4 className="text-[#586062] font-[Inter] text-[0.6875em] font-normal tracking-wide">
          {product.brand}
        </h4>
        <div className="flex items-center justify-between">
          {product.salePrice ? (
            <span className="text-[#416465] text-[1em] font-medium line-through">
              {product.currency } {product.price}
            </span>
          ) : (
            <span className="text-[#416465] text-[1em] font-medium">
              {product.currency}
              {product.price}
            </span>
          )}
          {product.salePrice && (
            <span className="text-[#416465] text-[1em] font-medium">
              {product.currency}
              {product.salePrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
