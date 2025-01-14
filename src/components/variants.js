'use client'
import { useState,useEffect } from "react"
import { Plus,Trash2, XIcon } from "lucide-react"
import InputBox from "./input-box"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { ColorPicker, useColor,Saturation,IColor, Hue, Alpha } from "react-color-palette";
import "react-color-palette/css";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox";


export default function Variant ({sellingPrice}){

     const [colorVariant,setColorVariant]=useState(true)
     const [sizeVariant,setSizeVariant]=useState(true)
     const [activeDialog, setActiveDialog]= useState() // Dialog content

     const [colorValues,setColorValues]=useState([
          {color:'black',price:sellingPrice},
          {color:'white',price:sellingPrice},
          {color:'#60a5fa',price:sellingPrice},
     ])
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
               {status:false,size:'small',price:sellingPrice},
               {status:false,size:'medium',price:sellingPrice},
               {status:false,size:'large',price:sellingPrice},
               {status:false,size:'xlarge',price:sellingPrice},
               {status:false,size:'xxlarge',price:sellingPrice},
          ])
     },[sizeVariant])

     return(
          <div className="flex mt-6 flex-col">
               <AlertDialog>
                    <AlertDialogContent  className="w-[75%] p-2 md:p-4 rounded-md sm:w-2/5 text-xs">
                         <p className="p-1 h-fit flex justify-end items-center">
                              <AlertDialogCancel className="h-fit right-1 shadow-none border-none p-1 m-0"><XIcon className='w-5 scale-125 h-5' /></AlertDialogCancel>
                         </p>
                         <div className="max-h-[70svh] overflow-y-scroll">
                         
                              {
                                   activeDialog === 'color'? <AddColorProp retailValue={sellingPrice} colorProp={(color,price)=>{setColorValues(prev=>[...prev,{color,price}])}}/>: 
                                   activeDialog === 'size'?<AddSizeProp toggle={(item,_status)=>{setSizeValues(prev=>prev.map((sizeValue,_index)=>(item == sizeValue.size?{...sizeValue,status:_status}:sizeValue))),console.log(item,_status,sizeValues)}} sizes={sizeValues}/> :
                                   activeDialog === 'custom'?<AddCustomProp retailValue={sellingPrice} customProp={(name,price)=>{setCustomVariants(prev=>prev.map((customVariant,index)=>(
                                        index == activeDialog.index?
                                        {...customVariant,values:[...customVariant.values,{name,price}]}:customVariant
                                   ))),console.log(activeDialog.index,customVariants)}}
                                   /> : ""
                                   
                              }
               
                         </div>
                    </AlertDialogContent>
     
                    <div className="flex flex-col">
                         <div className="flex bg-white flex-col p-5 rounded-lg">
                              <div className="flex  items-center mb-2 gap-5">
                                   <div className="inline-flex gap-2 items-center">                                   
                                        <span>Add color variants: </span>
                                        <AlertDialogTrigger asChild>   
                                             <button onClick={()=>{setActiveDialog('color')}} className="  disabled:opacity-35 rounded-md border-core_contrast/40">
                                                  <Plus className="border bg-black p-1  h-7 w-8 text-white rounded-sm"/>
                                             </button>                   
                                        </AlertDialogTrigger>
                                   </div>
                                   <div className="inline-flex gap-2 items-center">                                   
                                        <span>Add size variants: </span>
                                        <AlertDialogTrigger asChild>
                                             <button className="disabled:opacity-35 rounded-md border-core_contrast/40" onClick={()=>{setActiveDialog('size')}}>
                                                  <Plus className="border bg-black p-1  h-7 w-8 text-white rounded-sm"/>
                                             </button>                      
                                        </AlertDialogTrigger>
                                   </div>
                              </div>
                              <div className="flex flex-col mt-2 gap-0 items-start">
                                   <p className="text-xs ml-[1px] ">Add variant type:</p>
                                   <div className="flex justify-start gap-1 items-center">
                                        <AlertDialogTrigger asChild>                                            
                                             <button className="mt-1 disabled:opacity-35 rounded-md border-core_contrast/40" onClick={()=>{setActiveDialog('custom')}}>
                                                  <Plus className="border bg-black p-1  h-7 w-9 text-white rounded-sm inline-block"/>
                                             </button>
                                        </AlertDialogTrigger>
                                   </div>
                              </div>
                         </div>
                         <div className="flex flex-col mt-3 bg-white p-3 rounded-lg">
                              <p className="p-1">Variant combinations</p>
                              <Separator />
                         </div>
                         {/* {colorVariant?
                         <div className=" border-l mt-2 min-h-9 border-core_contrast/30 pl-3">
                              <div className="relative grid justify-items-start gap-1 grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] items-center">
                                   {colorValues&&colorValues.map((color,index)=>(
                                        <div key={index} className="border mr-2 rounded-md inline-flex w-fit border-black/40 justify-center h-fit items-center">
                                             <div className="ml-2"><InputBox change={(e)=>{setColorValues(prev=>prev.map((colorValue,_index)=>(_index === index?{...colorValue,price:e.target.value}:colorValue)))}} shortInput uppercase flexdir={'row'} width={'140px'} outline label={<button style={{backgroundColor:color.color}} className="w-[1.2rem] h-[1.2rem] border "></button>} ghost icon={'$'} value={color.price}/></div>
                                             <XIcon onClick={()=>{setColorValues(colorValues.filter((_Item)=>colorValues[index]!==_Item)),colorValues.length==1?setColorVariant(false):""}} className="p-1"/>
                                        </div>
                                   ))}
                                   <AlertDialogTrigger asChild>                      
                                        <Plus onClick={()=>{setActiveDialog({active:'color',index:null})}} className="border p-[2px] border-black/45 h-6 w-7 rounded-md inline-block"/>
                                   </AlertDialogTrigger>
                              </div>
                         </div>:""}

                         {sizeVariant?
                         <div className=" border-l mt-4 min-h-9 border-core_contrast/30 pl-3">
                              <div className="">
                                   <p className="capitalize inline-flex items-center h-7 mr-2"><span>size: </span></p>
                                   {sizeValues&&sizeValues.map((size,index)=>(
                                        size.status?
                                        <div key={index} className="border mr-2 mb-1 rounded-md inline-flex w-fit border-black/40 justify-center h-fit items-center">
                                             <div className="ml-2"><InputBox change={(e)=>{setSizeValues(prev=>prev.map((sizeValue,_index)=>(_index === index?{...sizeValue,price:e.target.value}:sizeValue)))}} uppercase flexdir={'row'} width={'140px'} outline label={size.size} shortInput ghost icon={'$'} value={size.price}/></div>
                                             <XIcon onClick={()=>{setSizeValues(prev=>prev.map((sizeValue,_index)=>((_index === index)?{...sizeValue,status:false}:sizeValue))),!!sizeValues.filter(item=>item.status==true)?setSizeVariant(false):""}}  className="p-1"/>
                                        </div>:""
                                   ))}
                                   <AlertDialogTrigger asChild>                      
                                        <Plus onClick={()=>{setActiveDialog({active:'size',index:null})}} className="border p-[2px]  border-black/45 h-6 w-7 rounded-md inline-block"/>
                                   </AlertDialogTrigger>
                              </div>
                         </div>:""}

                         {customVariants&&customVariants.map((customVariant,index)=>(
                         <div key={index} className=" border-l mt-4 min-h-9 border-core_contrast/30 pl-3">
                              <div className="">
                                   <p data-margin={!!customVariant.type} className="capitalize inline-flex items-center h-7 data-[margin=true]:mr-2"><span>{customVariant.type}</span></p>
                                   {customVariant.values&&customVariant.values.map((value,val_index)=>(<div key={val_index} className="border mr-2 mb-1 rounded-md inline-flex w-fit border-black/40 justify-center h-fit items-center">
                                        <div className="ml-2">
                                             <InputBox uppercase flexdir={'row'} width={'140px'} outline change={(e)=>{setCustomVariants(prev=>prev.map((_customVariant,_index)=>(_index == index?{..._customVariant,values:customVariant.values.map((_value,__index)=>(__index==val_index?{..._value,price:e.target.value}:_value))}:_customVariant)))}} label={value.name} shortInput ghost icon={'$'} value={value.price}/>
                                        </div>
                                        <XIcon onClick={()=>{setCustomVariants(prev=>prev.map((_customVariant,_index)=>(_index == index?{..._customVariant,values:_customVariant.values.filter((item)=> item!==value)}:_customVariant))),console.log(customVariants)}} className="p-1"/>
                                   </div>))}
                                   <AlertDialogTrigger asChild>                      
                                        <Plus onClick={()=>{setActiveDialog({active:'custom',index})}} className="border mb-[1px] p-1  border-black/45 h-[26px] w-7 rounded-md inline-block"/>
                                   </AlertDialogTrigger>
                              </div>
                              <Trash2 onClick={()=>{setCustomVariants(customVariants.filter((_variant)=>customVariants[index]!==_variant))}} className=" h-5 w-6 mt-1 rounded-md inline-block"/>
                         </div>
                         ))} */}
               
                    </div>
               </AlertDialog>
          </div>
     )
}

// onClick={()=>{setCustomVariants(prev=>[...prev,{type:holder.toLowerCase(),values:[]}]),setHolder("")}}

const AddCustomProp =({retailValue,customProp})=> {
     const [name,setName] = useState('')
     const [price,setPrice] = useState(retailValue)
     return (
       <form onSubmit={(e)=>{e.preventDefault(),customProp(name,price)}} className="">
         <AlertDialogHeader>
          <AlertDialogTitle className='text-xs p-0'></AlertDialogTitle>
           <AlertDialogDescription className='text-xs ml-[2px]'>
             Add custom variant
           </AlertDialogDescription>
         </AlertDialogHeader>
         <div className="flex justify-between items-center"><span className="text-sm">variant name:</span>
           <InputBox width={'70%'} change={(e)=>{setName(e.target.value)}} mt outline /> 
         </div>
         <div className="flex justify-between items-center"><span className="text-sm">price: </span>
           <InputBox width={'70%'} icon={'$'} change={(e)=>{setPrice(e.target.value)}} value={price} mt outline label={''}/> 
         </div>
         <AlertDialogFooter className={'flex flex-row mt-2 justify-end'}>
           <AlertDialogCancel asChild><Button size='sm' disabled={!name} className='w-fit px-5' type="submit">Add</Button></AlertDialogCancel>
         </AlertDialogFooter>
       </form>
     )
   }
   
   const AddColorProp =({colorProp,retailValue})=> {
     const [colorValue,setColorValue] = useState('')
     const [price,setPrice] = useState(retailValue)
     const [color, setColor] = useColor("salmon");
     return (
       <form onSubmit={(e)=>{e.preventDefault(),colorProp(colorValue,price)}} className="">
         <AlertDialogHeader>
           <AlertDialogTitle className='text-xs p-0'></AlertDialogTitle>
           <AlertDialogDescription className='text-xs'>
             Add color variant
           </AlertDialogDescription>
         </AlertDialogHeader>
         <div className="flex justify-center items-start gap-2">
           <ColorPicker color={color} hideInput={["rgb", "hsv"]} height={100} onChange={setColor} onChangeComplete={(col)=>setColorValue(col.hex)} />
         </div>
         <div className="mx-1">
           <InputBox flexdir={'row'} icon={'$'} change={(e)=>{setPrice(e.target.value)}} value={price} mt outline label={'Price: '}/> 
         </div>
         <AlertDialogFooter className={'flex mx-1 flex-row mt-2 items-center justify-end'}>
           <AlertDialogCancel asChild><Button size='sm' disabled={!colorValue} className='w-fit px-5' type="submit">Add</Button></AlertDialogCancel>
         </AlertDialogFooter>
       </form>
     )
   }
   
   const AddSizeProp =({toggle,sizes})=> {
     const __sizes = ['small','medium','large','xlarge','xxlarge']
     const [sizeData,setSizeData] = useState([])
     return (
       <div className="">
         <AlertDialogHeader>
          <AlertDialogTitle className='text-xs p-0'></AlertDialogTitle>
           <AlertDialogDescription className='text-xs'>
             Toggle size variants
           </AlertDialogDescription>
         </AlertDialogHeader>
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