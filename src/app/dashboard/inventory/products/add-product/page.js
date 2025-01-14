'use client'
import { useEffect, useState } from "react"
import { Edit, MoveLeftIcon, Plus, ScanBarcode, Trash2, XIcon } from "lucide-react"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import InputBox from "@/components/input-box";
import VolumeCalculator from "@/components/volume-calculator";
import WholesaleDiscount from "@/components/wholesale-discount";
import Variant from "@/components/variants"

const _VARIANT_TYPE = new Object()
const _VARIANT = new Object()

const AddProduct = () => {

    function Submit(e){
        e.preventDefault()
    }

    return (
      <div className="px-1 md:px-5 flex h-full w-full overflow-x-hidden flex-col text-sm">
        <div className="px-1 flex w-full justify-between items-center font-Inter ">
          <p className='font-bold'>Add product</p>
        </div> 
        <div className="text-xs justify-end flex border-b">
          <Link href={'/dashboard/inventory/products'}><Button className='py-[2px] mb-1 px-3' variant='ghost'>
              <MoveLeftIcon className="w-4 h-4 mr-1"/>
              <span className="text-core_polish text-xs font-light">All products</span>
          </Button></Link>
        </div>
        
        <form onSubmit={Submit} className="flex flex-col flex-grow w-full overflow-x-clip overflow-y-scroll" action="">          
          <section className="flex flex-col">
            <p className=" text-[11px] pl-[2px] mb-2">Product information</p>
            <div className="flex flex-col md:flex-row md:justify-between gap-3">
              <div className="flex md:w-4/6 w-full flex-col">
                <div className="p-2 bg-core_grey2/60 flex-col md:pt-4 md:px-5 md:pb-5 rounded-lg w-full">
                  <p className=" text-sm font-Voces font-semibold ">Product details</p>
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
                </div>

                <div className="p-2 bg-core_grey2/60 mt-3 md:mt-5 flex-col md:p-5 rounded-lg w-full">
                  <p className=" text-sm font-Voces font-semibold ">Pricing</p>
                  <Pricing />
                </div>
              </div>
              <div className="flex md:w-[31%] w-full bg-core_grey2 rounded-lg h-fit p-2 md:p-3 flex-col">
                <p className=" text-xs p-1  mb-1">Product categorization</p>
                <div className="">
                  <InputBox placeholder={''} label={'Product category'} />
                </div>
              </div>
            </div>
          </section>

          <Separator className='my-1' />
          <p className=" text-[11px] mb-1">Store information</p>
          <section className="flex flex-col md:flex-row gap-3">
            <div className="flex md:w-4/6 w-full p-2 md:p-3 bg-core_grey2 rounded-lg flex-col">
              <p className=" text-[11px] text-gray-500 mt-2">Created by {'user id'}</p>
              <div className="flex flex-col md:flex-row md:gap-4 md:items-center">                
                <InputBox label={'Bulk quantity:'} type={'number'} mt fit flexdir={'row'} inputDir={'input-reverse'} icon={<span className="text-[10px]">units</span>}/>               
                <InputBox label={'Reorder quantity:'} type={'number'} mt fit flexdir={'row'} inputDir={'input-reverse'} icon={<span className="text-[10px]">units</span>}/>            
              </div>
            </div>

          </section>

          <Separator className='my-1' />
          <section className="flex flex-col">
            <p className=" text-[11px] mb-1">Eshop information</p>
            <div className="flex flex-col md:flex-row md:justify-between gap-3">
              <div className="flex md:w-4/6 w-full flex-col">

                <div className="p-2 bg-core_grey2/60 flex-col md:pt-4 md:px-5 md:pb-5 mt-3 rounded-lg w-full">
                  <p className=" text-sm font-Voces font-semibold ">Add image</p>
                  <div className="w-full mx-3 bg-blue-300 rounded-lg h-9 "></div>
                </div>

              </div>
            </div>
          </section>
        </form>
      </div>
    )
  }
  
  export default AddProduct


  
export const Pricing =({})=>{
  //UI
  const [toggleVariant,setToggleVariant]=useState(false)
  const [piecePrice,setPiecePrice]=useState(false)
  const [bulkDiscount,setBulkDiscount]=useState(false)

  //DATA
  const [costPrice,setCostPrice]=useState(0)
  const [wholesaleDiscount,setWholesaleDiscount]=useState(0)
  const [margin,setMargin]=useState('50')
  const [profit,setProfit]=useState('')
  const [sellingPrice,setSellingPrice]=useState('')

  function computeCostPriceMargin(){
    const computedMargin = margin/100
    const computedProfit = computedMargin*costPrice
    setProfit(computedProfit)
    computeSellingPrice(computedProfit)
  }

  function computeSellingPrice(value){
    let _SP = value + costPrice
    setSellingPrice(_SP)
  }

  
  useEffect(()=>{
   computeCostPriceMargin()
  },[costPrice,margin])
 

  return(
    <div className="">
        <div className="flex gap-1 max-h-min items-start flex-col w-full flex-grow">
          <div className="">
            <div className="inline-block mr-5 md:mr-7">
              <InputBox width={'192px'} label={'Unit cost price'} value={costPrice?costPrice:""} change={(e)=>{setCostPrice(new Number(e.target.value))}} flexdir={'row'}  type={'number'} mt icon={'$'}/>
            </div>
            <div className="inline-flex  mt-1  items-center mr-7">
              <InputBox width={'120px'} label={'Margin'} inputDir={'input-reverse'}  change={(e)=>{setMargin(new Number(e.target.value))}} flexdir={'row'} value={margin} type={'number'} icon={'%'}/>
            </div>

            <div className="inline-block mt-1" >
              <InputBox width={'180px'} label={'Profit'} value={profit?profit:""} change={(e)=>{setProfit(new Number(e.target.value)),computeSellingPrice(new Number(e.target.value)),e.target.value==""?computeSellingPrice(costPrice*(margin/100)):""}} flexdir={'row'}  type={'number'} mt icon={'$'}/>
            </div>           
          </div>
          <div className=" mt-1">
            <InputBox fit label={'Unit selling price'} value={sellingPrice?sellingPrice:""} change={(e)=>{new Number(e.target.value)}} flexdir={'row'}  type={'number'} mt icon={'$'}/>
          </div>
            
          <div className='flex mt-2 w-full items-center'>
            <p data-variant={bulkDiscount} className="inline-block text-gray-500 data-[variant=true]:text-core_contrast text-[11px] mr-3">Wholesale discount</p>
            <Switch disabled={!sellingPrice} className='data-[state=unchecked]:bg-core_contrast/40' checked={bulkDiscount} onCheckedChange={()=>setBulkDiscount(!bulkDiscount)} />
          </div>
          <div className={`grid transition-collapse ${bulkDiscount ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden w-full text-xs">           
              <WholesaleDiscount output={wholesaleDiscount} setOutput={(val)=>{setWholesaleDiscount(val)}} sellingPrice={sellingPrice}/>
            </div>
          </div>

          <div className='flex mt-2 w-full items-center'>
            <p data-variant={piecePrice} className="inline-block text-gray-500 data-[variant=true]:text-core_contrast text-[11px] mr-3">Sell in measurable quantity/pieces</p>
            <Switch disabled={!costPrice} className='data-[state=unchecked]:bg-core_contrast/40' checked={piecePrice} onCheckedChange={()=>setPiecePrice(!piecePrice)} />
          </div>
          <div className={`grid transition-collapse ${piecePrice ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden w-full text-xs">
              <VolumeCalculator sp={sellingPrice}/>
            </div>
          </div>

          <div className='flex mt-2 w-full items-center'>
            <p data-variant={toggleVariant} className="inline-block text-gray-500 data-[variant=true]:text-core_contrast text-[11px] mr-3">Manage product variants</p>
            <Switch disabled={!costPrice} className='data-[state=unchecked]:bg-core_contrast/40' checked={toggleVariant} onCheckedChange={()=>setToggleVariant(!toggleVariant)} />
          </div>
        </div>

        <div className={`grid transition-collapse ${toggleVariant ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden text-xs">
            <Variant sellingPrice={sellingPrice}/>
          </div>
        </div>
    </div>
  )
}






