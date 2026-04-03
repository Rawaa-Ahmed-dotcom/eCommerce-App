import React from 'react'
import {type product } from '../../../utils/products'
import { Plus } from 'lucide-react'
const SingleProduct = ({product} : {product : product}) => {
  return (
    <div className='flex flex-col hover:bg-blend-multiply'>
      <div className='mb-4 w-full h-[70%] rounded-[0.5em] overflow-hidden group relative '>
        <img src = {product.img} className=' w-full  h-full' alt = {product.title}/>
        {/* Overlay */}
        <div className='bg-[#F1F4F9]/50 absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-end p-4'>
          <button className='bg-[var(--color-primary)] rounded-[4px] w-full text-white uppercase! cursor-pointer text-[14px] font-bold  flex items-center justify-center gap-1 py-3'><Plus size={16}/>Quick add</button>
        </div>
      </div>
       <div className='flex flex-col gap-1.5'>
         <div className='flex items-center justify-between'>
            <span className='text-[#44474E] text-[0.875em] uppercase'>{product.cat_prefix}</span>
            <span className='text-[var(--color-primary)] text-[1em] font-bold'>${product.price}</span>
         </div>
         <h3 className='text-[1.125em] text-[#181C20]'>{product.title}</h3>
       </div>
    </div>
  )
}

export default SingleProduct
