'use client'
import { Edit, MoveLeftIcon, Plus, ScanBarcode, Trash2, XIcon } from "lucide-react"
import { Dialog,DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ColorPicker, useColor,Saturation,IColor, Hue, Alpha } from "react-color-palette";
import "react-color-palette/css";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import Link from "next/link"
import VolumeCalculator from "@/components/volume-calculator";
import { Checkbox } from "@/components/ui/checkbox";

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
                  <Variant />
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


  
export const Variant =({})=>{
  //UI
  const [toggleVariant,setToggleVariant]=useState(false)
  const [piecePrice,setPiecePrice]=useState(false)
  const [colorVariant,setColorVariant]=useState(true)
  const [sizeVariant,setSizeVariant]=useState(true)
  const [activeDialog, setActiveDialog]= useState({}) // Dialog content
  

  //DATA
  const [costPrice,setCostPrice]=useState(0)
  const [marginIsPercent,setMarginIsPercent]=useState(true)
  const [margin,setMargin]=useState('50')
  const [profit,setProfit]=useState('')
  const [sellingPrice,setSellingPrice]=useState('')
  const [bulkDiscountIsPercent,setBulkDiscountIsPercent]=useState(true)
  const [bulkDiscount,setBulkDiscount]=useState('')
  const [colorValues,setColorValues]=useState([
    {color:'black',price:sellingPrice},
    {color:'white',price:sellingPrice},
    {color:'#60a5fa',price:sellingPrice},
  ])
  const [sizeValues,setSizeValues]=useState([])
  const [customVariants,setCustomVariants]=useState([])
  const [holder,setHolder]=useState('')

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

  function generalPriceChange(e){
    setCustomVariants(prev=>prev.map((_customVariant,_index)=>(
      {..._customVariant,values:_customVariant.values.map((_value,__index)=>({..._value,price:e.target.value}))}
    )))
    setColorValues(prev=>prev.map((_colorValue,_index)=>(
      {..._colorValue,price:e.target.value}
    )))
    setSizeValues(prev=>prev.map((_sizeValue,_index)=>(
      {..._sizeValue,price:e.target.value}
    )))
  }

  useEffect(()=>{
    setSizeValues([
      {status:false,size:'small',price:sellingPrice},
      {status:false,size:'medium',price:sellingPrice},
      {status:false,size:'large',price:sellingPrice},
      {status:false,size:'xlarge',price:sellingPrice},
      {status:false,size:'xxlarge',price:sellingPrice},
    ])
  },[sizeVariant])
  useEffect(()=>{
   computeCostPriceMargin()

  },[costPrice,margin])
 

  return(
    <div className="">
      <Dialog>
        <DialogContent className="w-[75%] p-2 md:p-4 rounded-md sm:w-2/5 text-xs">
          <div className="max-h-[70svh] overflow-y-scroll">
             
            {
                activeDialog.active === 'color'? <AddColorProp retailValue={retailPrice} colorProp={(color,price)=>{setColorValues(prev=>[...prev,{color,price}])}}/>: 
                activeDialog.active === 'size'?<AddSizeProp toggle={(item,_status)=>{setSizeValues(prev=>prev.map((sizeValue,_index)=>(item == sizeValue.size?{...sizeValue,status:_status}:sizeValue))),console.log(item,_status,sizeValues)}} sizes={sizeValues}/> :
                activeDialog.active === 'custom'?<AddCustomProp retailValue={retailPrice} customProp={(name,price)=>{setCustomVariants(prev=>prev.map((customVariant,index)=>(
                    index == activeDialog.index?
                    {...customVariant,values:[...customVariant.values,{name,price}]}:customVariant
                  ))),console.log(activeDialog.index,customVariants)}}
                /> : ""
              
            }

          </div>
        </DialogContent>
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
          <div className="mt-2 flex w-fit justify-start h-fit items-center">
            <div className=""><InputBox width={'180px'} flexdir={'row'} label={'Bulk discount'} /></div>
            <TogglePercentage status={bulkDiscountIsPercent} setState={(val)=>{setBulkDiscountIsPercent(val)}}/>
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
            <p data-variant={toggleVariant} className="inline-block text-gray-500 data-[variant=true]:text-core_contrast text-[11px] mr-3">Enable price variants</p>
            <Switch disabled={!costPrice} className='data-[state=unchecked]:bg-core_contrast/40' checked={toggleVariant} onCheckedChange={()=>setToggleVariant(!toggleVariant)} />
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
                <div className="flex items-center ml-[1px] mb-2 gap-5">
                  <p className="inline-flex items-center"><span>color: </span><Switch className='scale-[0.85] rounded ml-3' checked={colorVariant} onCheckedChange={()=>setColorVariant(!colorVariant)} /></p>
                  <p className="inline-flex items-center"><span>size: </span><Switch className='scale-[0.85] rounded ml-3' checked={sizeVariant} onCheckedChange={()=>setSizeVariant(!sizeVariant)} /></p>
                </div>
                {colorVariant?<div className=" border-l mt-2 min-h-9 border-core_contrast/30 pl-3">
                  <div className="relative grid justify-items-start gap-1 grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] items-center">
                    {/* <p className="capitalize inline-flex justify-self-start items-center w-fit h-7 mr-2"><span>color: </span></p> */}
                    {colorValues&&colorValues.map((color,index)=>(
                      <div key={index} className="border mr-2 rounded-md inline-flex w-fit border-black/40 justify-center h-fit items-center">
                       <div className="ml-2"><InputBox change={(e)=>{setColorValues(prev=>prev.map((colorValue,_index)=>(_index === index?{...colorValue,price:e.target.value}:colorValue)))}} shortInput uppercase flexdir={'row'} width={'140px'} outline label={<button style={{backgroundColor:color.color}} className="w-[1.2rem] h-[1.2rem] border "></button>} ghost icon={'$'} value={color.price}/></div>
                       <XIcon onClick={()=>{setColorValues(colorValues.filter((_Item)=>colorValues[index]!==_Item)),colorValues.length==1?setColorVariant(false):""}} className="p-1"/>
                      </div>
                    ))}
                    <DialogTrigger asChild>                      
                      <Plus onClick={()=>{setActiveDialog({active:'color',index:null})}} className="border p-[2px] border-black/45 h-6 w-7 rounded-md inline-block"/>
                    </DialogTrigger>
                  </div>
                </div>:""}

                {sizeVariant?<div className=" border-l mt-4 min-h-9 border-core_contrast/30 pl-3">
                  <div className="">
                    <p className="capitalize inline-flex items-center h-7 mr-2"><span>size: </span></p>
                    {sizeValues&&sizeValues.map((size,index)=>(
                        size.status?
                      <div key={index} className="border mr-2 mb-1 rounded-md inline-flex w-fit border-black/40 justify-center h-fit items-center">
                        <div className="ml-2"><InputBox change={(e)=>{setSizeValues(prev=>prev.map((sizeValue,_index)=>(_index === index?{...sizeValue,price:e.target.value}:sizeValue)))}} uppercase flexdir={'row'} width={'140px'} outline label={size.size} shortInput ghost icon={'$'} value={size.price}/></div>
                       <XIcon onClick={()=>{setSizeValues(prev=>prev.map((sizeValue,_index)=>((_index === index)?{...sizeValue,status:false}:sizeValue))),!!sizeValues.filter(item=>item.status==true)?setSizeVariant(false):""}}  className="p-1"/>
                      </div>:""
                    ))}
                    <DialogTrigger asChild>                      
                      <Plus onClick={()=>{setActiveDialog({active:'size',index:null})}} className="border p-[2px]  border-black/45 h-6 w-7 rounded-md inline-block"/>
                    </DialogTrigger>
                  </div>
                </div>:""}

                {customVariants&&customVariants.map((customVariant,index)=>(
                  <div key={index} className=" border-l mt-4 min-h-9 border-core_contrast/30 pl-3">
                    <div className="">
                      <p data-margin={!!customVariant.type} className="capitalize inline-flex items-center h-7 data-[margin=true]:mr-2"><span>{customVariant.type}</span></p>
                      {customVariant.values&&customVariant.values.map((value,val_index)=>(
                        <div key={val_index} className="border mr-2 mb-1 rounded-md inline-flex w-fit border-black/40 justify-center h-fit items-center">
                          <div className="ml-2"><InputBox uppercase flexdir={'row'} width={'140px'} outline change={(e)=>{setCustomVariants(prev=>prev.map((_customVariant,_index)=>(_index == index?{..._customVariant,values:customVariant.values.map((_value,__index)=>(__index==val_index?{..._value,price:e.target.value}:_value))}:_customVariant
                        )))}} label={value.name} shortInput ghost icon={'$'} value={value.price}/></div>
                        <XIcon onClick={()=>{setCustomVariants(prev=>prev.map((_customVariant,_index)=>(
                          _index == index?
                          {..._customVariant,values:_customVariant.values.filter((item)=> item!==value)}:_customVariant
                        ))),console.log(customVariants)}} className="p-1"/>
                        </div>
                      ))}
                      <DialogTrigger asChild>                      
                        <Plus onClick={()=>{setActiveDialog({active:'custom',index})}} className="border mb-[1px] p-1  border-black/45 h-[26px] w-7 rounded-md inline-block"/>
                      </DialogTrigger>
                    </div>
                    <Trash2 onClick={()=>{setCustomVariants(customVariants.filter((_variant)=>customVariants[index]!==_variant))}} className=" h-5 w-6 mt-1 rounded-md inline-block"/>
                  </div>
                ))}
                
                <div className="flex flex-col mt-4 gap-0 items-start">
                  <p className="text-[11px] ">Add variant type:</p>
                  <div className="flex justify-start gap-1 items-center">
                    <InputBox value={holder} change={(e)=>{setHolder(e.target.value)}} outline/>
                    <button className="mt-1 disabled:opacity-35 rounded-md border-core_contrast/40" disabled={!holder} onClick={()=>{setCustomVariants(prev=>[...prev,{type:holder.toLowerCase(),values:[]}]),setHolder("")}}>
                      <Plus className="border bg-black p-1  h-7 w-8 text-white rounded-sm inline-block"/>
                    </button>
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



export const InputBox = ({label,placeholder,error,flexdir,type,width,margin,change,inputDir,blurr,value,note,textarea,grow,row,icon,readonly,outline,shortInput,ghost,mt,fit,uppercase,font,l_font})=>{
  return(
    <div data-dir={!!flexdir} data-fit={fit} data-mt={mt} data-grow={grow} data-short={shortInput} style={{width:`${width}`,flexDirection:flexdir,margin:margin}} className={`relative w-full data-[mt=true]:mt-2 text-ellipsis data-[grow=true]:flex-grow mt-0 data-[dir=true]:items-center data-[fit=true]:w-fit gap-1 flex flex-col`}>
      <label data-dir={!!flexdir} data-font={l_font} data-uppercase={uppercase} className="pl-1 data-[dir=true]:pl-0 data-[uppercase=true]:uppercase relative inline-flex items-center w-fit justify-start data-[font=base]:text-base data-[font=sm]:text-sm text-ellipsis md:min-w-max text-xs" htmlFor="">{label}</label>
      <div className="flex-col w-full">
        {textarea?
          <textarea data-error={error} value={value} placeholder={placeholder} onChange={(e)=>change(e)} className={`border data-[error=true]:border-red-400 rounded-md w-full p-2`} rows={row}></textarea>
          :
          <p data-error={error} data-dir={inputDir} data-fit={fit} data-ghost={ghost} data-short={shortInput} data-outline={!!outline} className="inline-flex items-center px-2 py-[7px] data-[fit=true]:w-fit data-[short=true]:py-1 data-[ghost=true]:border-none w-full bg-white border-black/15 data-[error=true]:border-red-400 data-[dir='input-reverse']:flex-row-reverse data-[outline=true]:border-black/35 data-[outline=true]:bg-transparent  border rounded-md justify-start">
            {icon&&<span className="text-xs mr-1">{icon}</span>}
            <input data-error={error} data-font={font} data-fit={fit} readOnly={readonly} className={`border-none px-1 text-xs outline-none w-full bg-transparent data-[fit=true]:w-fit data-[font=base]:text-base data-[font=sm]:text-sm`} onBlur={(e)=>blurr&&blurr(e)} onChange={(e)=>change&&change(e)} type={type} placeholder={placeholder} value={value}/>
          </p>
        }
        {error?<p className=" pl-1 -mt-1 text-[10px] text-red-400 italic">{error}</p>:""}
        {note?<p className=" pl-1 text-[10px] text-gray-400 italic">{note}</p>:""}
      </div>
    </div>
  )
}

const AddCustomProp =({retailValue,customProp})=> {
  const [name,setName] = useState('')
  const [price,setPrice] = useState(retailValue)
  return (
    <form onSubmit={(e)=>{e.preventDefault(),customProp(name,price)}} className="">
      <DialogHeader>
        <DialogTitle className='text-xs p-0'></DialogTitle>
        <DialogDescription className='text-xs ml-[2px]'>
          Add custom variant
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-between items-center"><span className="text-sm">variant name:</span>
        <InputBox width={'70%'} change={(e)=>{setName(e.target.value)}} mt outline /> 
      </div>
      <div className="flex justify-between items-center"><span className="text-sm">price: </span>
        <InputBox width={'70%'} icon={'$'} change={(e)=>{setPrice(e.target.value)}} value={price} mt outline label={''}/> 
      </div>
      <DialogFooter className={'flex flex-row mt-2 justify-end'}>
        <DialogClose asChild><Button size='sm' disabled={!name} className='w-fit px-5' type="submit">Add</Button></DialogClose>
      </DialogFooter>
    </form>
  )
}

const AddColorProp =({colorProp,retailValue})=> {
  const [colorValue,setColorValue] = useState('')
  const [price,setPrice] = useState(retailValue)
  const [color, setColor] = useColor("salmon");
  return (
    <form onSubmit={(e)=>{e.preventDefault(),colorProp(colorValue,price)}} className="">
      <DialogHeader>
        <DialogTitle className='text-xs p-0'></DialogTitle>
        <DialogDescription className='text-xs'>
          Add color variant
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-center items-start gap-2">
        <ColorPicker color={color} hideInput={["rgb", "hsv"]} height={100} onChange={setColor} onChangeComplete={(col)=>setColorValue(col.hex)} />
      </div>
      <div className="mx-1">
        <InputBox flexdir={'row'} icon={'$'} change={(e)=>{setPrice(e.target.value)}} value={price} mt outline label={'Price: '}/> 
      </div>
      <DialogFooter className={'flex mx-1 flex-row mt-2 items-center justify-end'}>
        <DialogClose asChild><Button size='sm' disabled={!colorValue} className='w-fit px-5' type="submit">Add</Button></DialogClose>
      </DialogFooter>
    </form>
  )
}

const AddSizeProp =({toggle,sizes})=> {
  const __sizes = ['small','medium','large','xlarge','xxlarge']
  const [sizeData,setSizeData] = useState([])
  return (
    <div className="">
      <DialogHeader>
        <DialogTitle className='text-xs p-0'></DialogTitle>
        <DialogDescription className='text-xs'>
          Toggle size variants
        </DialogDescription>
      </DialogHeader>
      {sizes.map((item,index)=>(
        <div key={index} className="flex gap-1 mx-2 items-center mt-3 mb-1 space-x-2">
          <Checkbox onCheckedChange={(val)=>{toggle(item.size,val)}} checked={sizes.status} id={item.size} />
          <label
            htmlFor={item.size}
            className="text-xs font-medium uppercase leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <span className="-ml-1">{item.size}</span>
          </label>
        </div>
      ))}
    </div>
  )
}


const TogglePercentage =({status,setState})=> {
  return (
    <div className="inline-flex ml-1 gap-[1px]">
      <button data-state={status} size='xs' className='text-sm data-[state=false]:bg-black data-[state=false]:text-white rounded border border-black/40 px-3 py-1' onClick={()=>{setState(false)}}>{`$`}</button>
      <button data-state={status} size='xs' className='text-sm data-[state=true]:bg-black data-[state=true]:text-white rounded border border-black/40 px-3 py-1' onClick={()=>{setState(true)}}>{`%`}</button>
    </div>
  )
}