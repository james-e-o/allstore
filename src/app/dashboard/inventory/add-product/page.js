'use client'
import { Edit, MoveLeftIcon, Plus, ScanBarcode, Trash, XIcon } from "lucide-react"
import { Dialog,DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import Link from "next/link"

const AddProduct = () => {
    return (
      <div className="px-2 md:px-5 text-sm">
        <div className="px-1 flex w-full justify-between items-center font-Inter ">
          <p className='font-bold'>Add product</p>
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
              {/* data inputs */}
              <div className="flex flex-col md:flex-row md:gap-2 md:items-center">                
                <InputBox margin={'8px 0px 0px'} label={'Brand:'} mt flexdir={'row'} placeholder={'Brand...'} />               
                <div className="flex gap-2 items-center w-full flex-grow">
                  <InputBox placeholder={'Barcode...'} label={'Barcode:'} mt flexdir={'row'}/>
                  <Button variant="outline" className="mt-2 h-full bg-white text-right w-fit p-2">
                    <ScanBarcode />
                  </Button>
                </div>              
              </div>
              <InputBox flexdir={'row'} mt placeholder={'Product name...'} label={'Product name:'} />
              <Variant />
                          
      
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


  
export const Variant =({})=>{
  //UI
  const [toggleVariant,setToggleVariant]=useState(false)
  const [colorVariant,setColorVariant]=useState(true)
  const [sizeVariant,setSizeVariant]=useState(true)

  //DATA
  const [colorValues,setColorValues]=useState([])
  const [sizeValues,setSizeValues]=useState([])
  const [customVariants,setCustomVariants]=useState(['color','size'])


  let holder="";
  useEffect(()=>{
    setSizeValues([
      {index:1,name:'small',price:"1000.00"},
      {index:2,name:'medium',price:"2000.00"},
      {index:3,name:'large',price:"3000.00"},
      {index:4,name:'xlarge',price:"4000.00"},
      {index:5,name:'xxlarge',price:"5000.00"},
    ])
  },[sizeVariant])

  return(
    <div className="">
      <Dialog>
        <DialogContent className="w-5/6 p-2 rounded-md sm:w-3/6 text-xs">
          <DialogHeader>
            <DialogTitle className='text-xs'></DialogTitle>
            <DialogDescription className='text-xs'>
              {/* Select parent categories with checkboxes. */}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[70svh] overflow-y-scroll">
              hello tester
          </div>
          <DialogFooter className={'flex flex-row justify-end'}>
            <DialogClose asChild><Button size='sm' className='w-fit' type="submit">Done</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
        <div className="flex gap-1 max-h-min items-start flex-col w-full flex-grow">
            <InputBox width={'180px'} label={'Price'} flexdir={'row'} mt icon={'$'}/>
            <div className='flex mt-1 w-full items-center'>
              <p data-variant={toggleVariant} className="inline-block text-gray-500 data-[variant=true]:text-core_contrast text-[11px] mr-3">Enable price variants</p>
              <div className="inline-block">
                  <Switch checked={toggleVariant} onCheckedChange={()=>setToggleVariant(!toggleVariant)} />
              </div>
            </div>
        </div>
        <div className={`grid transition-collapse ${toggleVariant ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden text-xs">
            <div className="flex-col rounded-md mt-2 p-2 border border-core_contrast/30">
              <div className="flex flex-col md:flex-row w-full md:gap-4 gap-[2px]">
                <InputBox width={'185px'} icon={'$'} shortInput label={'Retail:'} flexdir={'row'} mt outline/>
                <InputBox width={'185px'} shortInput label={'Wholesale discount:'} flexdir={'row'} mt outline/>
              </div>
              <div className="flex mt-4 ml-[2px] flex-col">
                <div className="flex ml-[1px] mb-2 gap-3">
                  <p className="inline-flex items-center"><span>color: </span><Switch className='scale-75 rounded' checked={colorVariant} onCheckedChange={()=>setColorVariant(!colorVariant)} /></p>
                  <p className="inline-flex items-center"><span>size: </span><Switch className='scale-75 rounded' checked={sizeVariant} onCheckedChange={()=>setSizeVariant(!sizeVariant)} /></p>
                </div>
                {colorVariant?<div className=" border-l mt-2 min-h-10 border-core_contrast/30 pl-3">
                    <p className="capitalize inline-block mr-2">color: </p>
                    <div className="border rounded-md inline-flex w-fit border-black/35 justify-center h-fit items-center">
                      <div className="ml-2"><InputBox shortInput uppercase flexdir={'row'} width={'135px'} outline label={<button className="w-5 h-5 absolute border-none bg-blue-400"></button>} ghost icon={'$'} value={'1000.00'}/></div>
                      <XIcon className="p-1"/>
                    </div>
                    <DialogTrigger asChild>                      
                      <Plus className="border p-[2px] mt-[6px] ml-2 border-black/35 h-7 w-7 rounded-md inline-block"/>
                    </DialogTrigger>
                </div>:""}

                {sizeVariant?<div className=" border-l mt-3 border-core_contrast/30 pl-3">
                  <div className="">
                    <p className="capitalize inline-block mr-2">size: </p>
                    {sizeValues&&sizeValues.map((size,index)=>(
                      <div key={index} className="border mr-2 mt-1 rounded-md inline-flex w-fit border-black/35 justify-center h-fit items-center">
                        <div className="ml-2"><InputBox uppercase flexdir={'row'} width={'135px'} outline label={size.name} shortInput ghost icon={'$'} value={size.price}/></div>
                       <XIcon onClick={()=>{setSizeValues(sizeValues.filter((sizeItem)=>sizeValues[index]!==sizeItem)),console.log(sizeValues[index])}} className="p-1"/>
                      </div>
                    ))}
                    <DialogTrigger asChild>                      
                      <Plus className="border p-[2px] mt-1 border-black/35 h-7 w-7 rounded-md inline-block"/>
                    </DialogTrigger>
                  </div>
                </div>:""}

                <div className="flex flex-col mt-4 gap-0 items-start">
                  <p className="text-[11px] ">Add variant type:</p>
                  <div className="flex items-center">
                    <InputBox flexdir={'input-reverse'} shortInput change={(e)=>{holder=e.target.value}} outline icon={<Plus disabled={holder==""} onClick={()=>{setVariants(prev=>[...prev,{type:holder.toLowerCase(),values:[]}])}} className="border bg-core_polish p-[3px] ml-2 border-black/35 h-6 w-6 relative left-2 text-white rounded-sm inline-block"/>}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}



export const InputBox = ({label,placeholder,error,flexdir,type,width,margin,change,value,note,textarea,grow,row,icon,readonly,outline,shortInput,ghost,mt,fit,uppercase})=>{
  return(
    <div data-dir={!!flexdir} data-fit={fit} data-mt={mt} data-grow={grow} data-short={shortInput} style={{width:`${width}`,flexDirection:flexdir,margin:margin}} className={`relative data-[short=true]:h-7 w-full data-[mt=true]:mt-2 data-[grow=true]:flex-grow mt-0 data-[dir=true]:items-center overflow-clip data-[fit=true]:w-fit gap-1 flex flex-col`}>
      <label data-dir={!!flexdir} data-uppercase={uppercase} className="pl-1 data-[dir=true]:pl-0 data-[uppercase=true]:uppercase relative w-fit inline-flex items-center justify-start md:min-w-max text-xs" htmlFor="">{label}</label>
      <div className="flex-col w-full">
        {textarea?
          <textarea data-error={error} value={value} placeholder={placeholder} onChange={(e)=>change(e)} className={`border data-[error=true]:border-red-400 rounded-md w-full p-2`} rows={row}></textarea>
          :
          <p data-error={error} data-dir={flexdir} data-fit={fit} data-ghost={ghost} data-short={shortInput} data-outline={!!outline} className="inline-flex items-center px-2 py-[6px] data-[fit=true]:w-fit data-[short=true]:py-1 data-[ghost=true]:border-none w-full bg-white border-border data-[error=true]:border-red-400 data-[dir='input-reverse']:flex-row-reverse data-[outline=true]:border-black/35 data-[outline=true]:bg-transparent  border rounded-md justify-start">
            {icon&&<span className="text-xs mr-1">{icon}</span>}
            <input data-error={error} data-fit={fit} readOnly={readonly} className={`border-none text-xs outline-none w-full bg-transparent data-[fit=true]:w-fit `} onChange={(e)=>change(e)} type={type} placeholder={placeholder} value={value}/>
          </p>
        }
        {error?<p className=" pl-1 -mt-1 text-[10px] text-red-400 italic">{error}</p>:""}
        {note?<p className=" pl-1 text-[10px] text-gray-400 italic">{note}</p>:""}
      </div>
    </div>
  )
}