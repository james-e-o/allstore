'use client'
import { ComboboxDemo } from "@/components/searchfilter";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon, Plus, Search } from "lucide-react"
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Categories = () => {

    const [activeInterface, setActiveInterface] = useState('landing')
    return (
      <div className="bg-white flex flex-col h-full overflow-y-scroll flex-grow rounded-md p-1 mt-2">
        <TabsContent value="products" className='mt-1 p-1'>
            {
                activeInterface === 'landing'? <CategoryLanding changeInterface={()=>setActiveInterface('add category')}/>: 
                activeInterface === 'add category'?<AddCategory changeInterface={()=>setActiveInterface('landing')}/> : ""              
            }   
        </TabsContent>
        <TabsContent value="brand" className='mt-1 p-1'>
          <div className="mx-auto h-5 w-5 my-2 bg-red-500"></div>
        </TabsContent>
           
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
          <span className="text-gray-500 text-xs font-light">Product categories</span>
        </Button>
      </div>
      <p className="font-semibold px-2 mt-3 text-sm">Create product category</p>
      <div className="p-[0.4rem]">
        <div className='mt-3 font-Inter relative'>
          <label htmlFor="" className='relative ml-1 font-semibold text-gray-500 items-center flex justify-between text-xs mb-[1px]' >
            <span> Industry/Professional category</span> 
          </label>
          <ComboboxDemo addType />
          <p className="text-gray-400 text-[0.69rem] leading-normal italic -mt-1 p-1 font-extralight">Note: This is a predefined category for all products. It provides a more structured framework that guides product creators to add more product specific categories.</p>
        </div>
        <div className='mt-2 relative'>
          <label htmlFor="" className='relative ml-[2px] font-semibold text-gray-500 items-center flex justify-between text-xs mb-[1px]' >
            <span> Category name</span> 
          </label>
          <input id='heading-text' className='border rounded-md w-[14rem] text-sm outline-none p-[0.4rem]' type='text' />
          {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
          {/* <p className="text-gray-400 text-[0.69rem] leading-tight italic p-1 font-extralight">All categories</p> */}
        </div>
        <div className='mt-2 font-Inter relative'>
          <label htmlFor="" className='relative ml-1 font-semibold text-gray-500 items-center flex justify-between text-xs mb-[1px]' >
            <span> Choose parent category</span> 
          </label>
          <ComboboxDemo addType />
          <p className="text-gray-400 text-[0.69rem] leading-tight italic p-1 -mt-1 font-extralight">Select from categories already created.</p>
        </div>
        <div className='mt-2 font-Inter relative'>
          <label htmlFor="" className='relative ml-1 font-semibold text-gray-500 items-center flex justify-between text-xs mb-[1px]' >
            <span> Slug</span> 
          </label>
          <input id='heading-text' className='border rounded-md w-[14rem] text-sm outline-none p-[0.4rem]' type='text' />
          <p className="text-gray-400 text-[0.69rem] leading-tight italic p-1 -mt-1 font-extralight">The 'slug' is the url friendly version of the name. it is usually all lowercase and contains only letters, numbers and hyphens.</p>
        </div>
        <div className='mt-2 font-Inter relative'>
          <label htmlFor="" className='relative ml-1 font-semibold text-gray-500 items-center flex justify-between text-xs mb-[1px]' >
            <span> Description</span> 
          </label>
          <textarea id='heading-text' className='border rounded-md w-[14rem] text-sm outline-none p-[0.4rem]' rows={3}></textarea>
          {/* <p className="text-gray-400 text-[0.69rem] leading-tight italic p-1 -mt-1 font-extralight">The 'slug' is the url friendly version of the name. it is usually all lowercase and contains only letters, numbers and hyphens.</p> */}
        </div>
        <Button onClick={changeInterface} className='mt-2 text-xs font-semibold' size='sm'>Create</Button>
      </div>
    </div>
  )
}
