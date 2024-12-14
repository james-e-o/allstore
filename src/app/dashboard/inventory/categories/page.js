'use client'
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react"
import { useState } from "react";

const Categories = () => {

    const [activeInterface, setActiveInterface] = useState('landing')
    return (
      <div className="bg-white flex flex-col h-full overflow-y-scroll flex-grow rounded-md p-1 mt-2">
            {
                activeInterface === 'landing'? <CategoryLanding changeInterface={()=>setActiveInterface('add category')}/>: 
                activeInterface === 'add category'?<AddCategory /> : ""              
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
          <Search className="text-[10px]"/>
          <input type="text" className="w-[80%] ml-2 border-none outline-none"/>
        </p>
        <Button onClick={changeInterface} className='px-2 text-xs font-semibold' size='sm'><Plus/>Add category</Button>
      </div>
    </div>
  )
}

const AddCategory = () => {
  return (
    <div>page</div>
  )
}
