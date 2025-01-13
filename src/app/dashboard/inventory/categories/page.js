'use client'
import Link from "next/link";
import {CategoryTable} from "@/components/getAllCategories";


const Categories = () => {

    return (
      <div className="bg-white flex flex-col h-full overflow-y-scroll flex-grow rounded-md mt-2">
        <header className="flex w-full justify-between items-center font-Inter ">
          <p className="font-bold text-sm px-0 py-1">Categories</p>
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



