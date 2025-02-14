'use client'

import { NewProductData } from "@/components/context-values";

export default function AddProductLayout({ children }) {
  
  return ( 
    <NewProductData>
      <div className='flex flex-col pb-0 overflow-hidden flex-grow'>
          {children}
      </div>    
    </NewProductData>  
  );
}