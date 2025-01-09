'use client'
import { Edit, MoveLeftIcon, Plus, ScanBarcode, Trash, Trash2, XIcon } from "lucide-react"
import { Dialog,DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { ColorPicker, useColor,Saturation,IColor, Hue, Alpha } from "react-color-palette";
import "react-color-palette/css";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox";

const _VARIANT_TYPE = new Object()
const _VARIANT = new Object()

const AddProduct = () => {

    function Submit(e){
        e.preventDefault()
    }

    return (
      <div className="px-1 md:px-5 flex h-full flex-col text-sm">
        <div className="px-1 flex w-full justify-between items-center font-Inter ">
          <p className='font-bold'>Add product</p>
        </div> 
        <div className="text-xs justify-end flex ">
          <Link href={'/dashboard/inventory/categories/'}><Button className='py-[2px] px-3' variant='ghost'>
              <MoveLeftIcon className="w-4 h-4 mr-1"/>
              <span className="text-core_polish text-xs font-light">All stock</span>
          </Button></Link>
        </div>
        
        <form onSubmit={Submit} className="flex flex-col flex-grow overflow-y-scroll" action="">          
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
  const [activeDialog, setActiveDialog]= useState({}) // Dialog content
  

  //DATA
  const [retailPrice,setRetailPrice]=useState(0)
  const [colorValues,setColorValues]=useState([])
  const [sizeValues,setSizeValues]=useState([])
  const [customVariants,setCustomVariants]=useState([])
  const [holder,setHolder]=useState('')

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
      {status:false,size:'small',price:retailPrice},
      {status:false,size:'medium',price:retailPrice},
      {status:false,size:'large',price:retailPrice},
      {status:false,size:'xlarge',price:retailPrice},
      {status:false,size:'xxlarge',price:retailPrice},
    ])
  },[sizeVariant])
  useEffect(()=>{
    setColorValues([
      {color:'black',price:retailPrice},
      {color:'white',price:retailPrice},
      {color:'#60a5fa',price:retailPrice},
      {color:'red',price:retailPrice},
    ])
  },[colorVariant])
 

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
            <InputBox width={'180px'} label={'Price'} change={(e)=>{setRetailPrice(e.target.value),generalPriceChange(e)}} flexdir={'row'}  type={'number'} mt icon={'$'}/>
            <div className='flex mt-1 w-full items-center'>
              <p data-variant={toggleVariant} className="inline-block text-gray-500 data-[variant=true]:text-core_contrast text-[11px] mr-3">Enable price variants</p>
              <div className="inline-block">
                  <Switch disabled={!retailPrice} className='data-[state=unchecked]:bg-core_contrast/40' checked={toggleVariant} onCheckedChange={()=>setToggleVariant(!toggleVariant)} />
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



export const InputBox = ({label,placeholder,error,flexdir,type,width,margin,change,blurr,value,note,textarea,grow,row,icon,readonly,outline,shortInput,ghost,mt,fit,uppercase})=>{
  return(
    <div data-dir={!!flexdir} data-fit={fit} data-mt={mt} data-grow={grow} data-short={shortInput} style={{width:`${width}`,flexDirection:flexdir,margin:margin}} className={`relative w-full data-[mt=true]:mt-2 data-[grow=true]:flex-grow mt-0 data-[dir=true]:items-center data-[fit=true]:w-fit gap-1 flex flex-col`}>
      <label data-dir={!!flexdir} data-uppercase={uppercase} className="pl-1 data-[dir=true]:pl-0 data-[uppercase=true]:uppercase relative w-fit inline-flex items-center justify-start md:min-w-max text-xs" htmlFor="">{label}</label>
      <div className="flex-col w-full">
        {textarea?
          <textarea data-error={error} value={value} placeholder={placeholder} onChange={(e)=>change(e)} className={`border data-[error=true]:border-red-400 rounded-md w-full p-2`} rows={row}></textarea>
          :
          <p data-error={error} data-dir={flexdir} data-fit={fit} data-ghost={ghost} data-short={shortInput} data-outline={!!outline} className="inline-flex items-center px-2 py-[6px] data-[fit=true]:w-fit data-[short=true]:py-1 data-[ghost=true]:border-none w-full bg-white border-border data-[error=true]:border-red-400 data-[dir='input-reverse']:flex-row-reverse data-[outline=true]:border-black/35 data-[outline=true]:bg-transparent  border rounded-md justify-start">
            {icon&&<span className="text-xs mr-1">{icon}</span>}
            <input data-error={error} data-fit={fit} readOnly={readonly} className={`border-none text-xs outline-none w-full bg-transparent data-[fit=true]:w-fit `} onBlur={(e)=>blurr&&blurr(e)} onChange={(e)=>change(e)} type={type} placeholder={placeholder} value={value}/>
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