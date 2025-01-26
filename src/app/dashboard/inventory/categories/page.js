'use client'
import { useEffect,useContext } from "react"
import Link from "next/link";
import CategoryTable from "@/components/getAllCategories";
import { headerValueContext } from "@/components/head-value";

const Categories = () => {
     const {headerContext,ResetHeadValue} = useContext(headerValueContext)
      useEffect(()=>{
          ResetHeadValue('Category')
      })
    return (
      <div className="bg-white flex flex-col h-full overflow-y-scroll flex-grow rounded-md mt-2">
        <header className="flex w-full justify-between items-center font-Inter ">
          <p className="font-bold px-1">All Categories</p>
          <nav className={`inline-flex justify-end w-fit overflow-x-hidden gap-4 bg-blue-400-200 rounded-[3px] border-black py-2 h-fit`}>
                  <Link href={'/dashboard/inventory/categories/'}><button className='p-2 relative border-transparent rounded text-xs data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-secondary data-[state=active]:bg-slate-800' value="products">Products</button></Link>
                  <Link href={'/dashboard/inventory/categories/brands'}><button className='p-2 relative border-transparent rounded text-xs data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-secondary data-[state=active]:bg-slate-800' value="brand">Brands</button></Link>
          </nav>
        </header> 
        <div className="">
            <CategoryTable />           
        </div>
  
      </div>
    )
  }
  
  export default Categories



