'use client'
import { ComboboxDemo } from "@/components/searchfilter";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon, Plus, Search } from "lucide-react"
import { useState } from "react";
import { Switch } from "@/components/ui/switch";


const Categories = () => {

    const [activeInterface, setActiveInterface] = useState('landing')
    return (
      <div className="bg-white flex flex-col h-full overflow-y-scroll flex-grow rounded-md p-1 mt-2">
            {
                activeInterface === 'landing'? <CategoryLanding changeInterface={()=>setActiveInterface('add category')}/>: 
                activeInterface === 'add category'?<AddCategory changeInterface={()=>setActiveInterface('landing')}/> : ""              
            }    
      </div>
    )
  }
  
  export default Categories


const CategoryLanding = ({changeInterface}) => {
  return (
    <div>
      <div className="font-medium mt-1 text-sm flex gap-3 items-center justify-between">
        <p className="inline-flex w-fit text-xs border p-[0.36rem] rounded-sm items-center justify-start">
          <Search className="text-[10px] w-5 h-5"/>
          <input type="text" className="w-[80%] ml-2 border-none outline-none"/>
        </p>
        <Button onClick={changeInterface} className='px-2 text-xs font-semibold' size='sm'><Plus className="w-4 h-4"/>Add category</Button>
      </div>
    </div>
  )
}

const AddCategory = ({changeInterface}) => {
  const [shared,setShared] = useState(false)
  return (
    <div className="">
      <div className="text-xs flex ">
        <Button onClick={changeInterface} className='p-2' variant='ghost'>
          <MoveLeftIcon className="w-4 h-4 mr-1"/>
          <span className="text-gray-500 text-xs font-light">All categories</span>
        </Button>
      </div>
      <p className="font-semibold px-2 mt-4 text-base">Create new category</p>
      <div className="p-2">
        <div className='mt-2 font-Inter relative'>
          <label htmlFor="" className='relative ml-1 font-medium items-center flex justify-between text-sm mb-[1px]' >
            <span> Select product type</span> 
          </label>
          <ComboboxDemo addType />
          <p className="text-gray-400 text-[0.69rem] p-1 font-extralight">Product type will be the default parent category for the category you're about to create. It is generally classified by nature of the products to guide creators.</p>
        </div>
        <div className='mt-3 relative'>
          <label htmlFor="" className='relative ml-[2px] font-medium items-center flex justify-between text-sm mb-[1px]' >
            <span> Category name</span> 
          </label>
          <input id='heading-text' className='border rounded w-[14rem] text-sm outline-none p-2' type='text' />
          {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
          <p className="text-gray-400 text-[0.69rem] font-light ml-2">All categories</p>
        </div>
        <div className='mt-2 font-Inter relative'>
          <label htmlFor="" className='relative ml-1 font-medium items-center flex justify-between text-sm mb-[1px]' >
            <span> choose parent category</span> 
          </label>
          <div className='flex mx-3 my-2 justify-between items-center'>
            <p className="inline-block text-xs">enable shared parents</p>
            <div className="relative top-1 ">
                <Switch checked={shared} onCheckedChange={()=>setShared(!shared)} />
            </div>
          </div>
          <ComboboxDemo addType />
          <p className="text-gray-400 text-[0.69rem] p-1 font-extralight">Product type will be the default parent category for the category you're about to create. It is generally classified by nature of the products to guide creators.</p>
        </div>
      </div>
    </div>
  )
}
