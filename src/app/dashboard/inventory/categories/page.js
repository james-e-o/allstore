'use client'
import { Button } from "@/components/ui/button";
import { MoveLeftIcon, Plus, Search } from "lucide-react"
import { useState } from "react";

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
  return (
    <div className="">
      <div className="text-xs flex ">
        <Button onClick={changeInterface} className='p-2' variant='ghost'>
          <MoveLeftIcon className="w-4 h-4 mr-1"/>
          <span className="text-gray-500 text-xs font-light">All categories</span>
        </Button>
      </div>
      <p className="font-medium px-2 mt-4 text-sm">Create category</p>
      <div className="p-2">
        <div className='mt-1 relative'>
          <label htmlFor="" className='relative ml-[2px] items-center flex justify-between text-xs mb-[1px]' >
            <span> Select product type</span> 
          </label>
          <input id='heading-text' className='border p-1 rounded-sm' type='text' />
          {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
        </div>
      </div>
    </div>
  )
}
