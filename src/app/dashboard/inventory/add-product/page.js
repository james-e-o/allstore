'use client'
import { MoveLeftIcon, ScanBarcode } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const AddProduct = () => {
    return (
      <div className="p-5 text-sm">
        <div className="p-2 flex w-full justify-between items-center font-Inter ">
          <p className='px-0 py-1 font-bold'>Add product</p>
        </div> 
        <div className="text-xs justify-end flex ">
          <Link href={'/dashboard/inventory/categories/'}><Button className='py-[2px] px-3' variant='ghost'>
              <MoveLeftIcon className="w-4 h-4 mr-1"/>
              <span className="text-core_polish text-xs font-light">All stock</span>
          </Button></Link>
        </div>
        
        <form action="">          
          <Separator className='my-1' />
          <p className=" text-xs mb-1">product information</p>
          <section className="flex flex-col md:flex-row gap-3">
            <div className="flex md:w-4/6 w-full p-2 md:p-3 bg-core_grey2 rounded-lg flex-col">
              <div className="flex flex-col md:flex-row md:gap-2 md:items-center">
                <InputBox placeholder={'Brand...'} label={'Brand'} />
                <InputBox placeholder={'Barcode...'} label={'Barcode'} />
                <div className="h-full flex flex-col md:justify-end">
                  <Button variant="outline" className="h-10 bg-white   text-right w-fit p-2">
                    {/* <span className="sr-only">Open menu</span> */}
                    <ScanBarcode />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex md:w-2/6 w-full bg-core_grey2 rounded-lg p-2 md:p-3 flex-col">
              <p className=" text-xs p-1  mb-1">Product categorization</p>
              <div className="">
                <InputBox placeholder={''} label={'Product category'} />
              </div>
            </div>
          </section>
        </form>
      </div>
    )
  }
  
  export default AddProduct



export const InputBox = ({label,placeholder,error,type,width,change,value,note,textarea,row,readonly})=>{
  return(
    <div style={{width:`${width}rem`}} className={`mt-2 relative flex-grow flex flex-col`}>
      <label className="pl-[2px]" htmlFor="">{label}</label>
      {textarea?
        <textarea data-error={error} value={value} placeholder={placeholder} onChange={(e)=>change(e)} className={`border data-[error=true]:border-red-400 rounded-md w-full p-2`} rows={row}></textarea>
        :
      <input data-error={error} readOnly={readonly} className={`border data-[error=true]:border-red-400 w-full rounded-md p-2`} onChange={(e)=>change(e)} type={type} placeholder={placeholder} value={value}/>}
      {error?<p className=" pl-1 -mt-1 text-[10px] text-red-400 italic">{error}</p>:""}
      {note?<p className=" pl-1 text-[10px] text-core_grey1 italic">{note}</p>:""}
    </div>
  )
}