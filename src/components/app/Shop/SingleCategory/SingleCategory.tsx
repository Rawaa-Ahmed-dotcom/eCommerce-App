import React from 'react'
import { useGetCategoryProducts } from '../../../../hooks/Products'
import { useParams } from 'react-router';
import type { product } from '../../../../utils/products';
import SingleProduct from '../SingleProduct';
const SingleCategory = () => {
  const {category} = useParams();

  const {categoryProducts, error, isLoading} = useGetCategoryProducts(category);
 
  return (
   <>
      {isLoading && <div className='size-12 border-5 border-white border-b-0 rounded-[50%] inline-block animate-spin'></div>}
      {categoryProducts 
      &&
    <section className='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 '>
      {categoryProducts.map((product:product) => <SingleProduct product={product}/> )}
    </section>
        
     
      }
   
   </>
  )
}

export default SingleCategory
