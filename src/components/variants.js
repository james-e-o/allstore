'use client'
import { useState,useEffect } from "react"
import { ChevronsDownUp, ChevronsUpDown, Dice6, Edit,Edit3, Plus,Trash2, X, XIcon } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { ColorPicker, useColor,Saturation,IColor, Hue, Alpha } from "react-color-palette";
import InputBox from "./input-box"
import "react-color-palette/css";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import SelectedVariantCombinationsTable, { DisplayVariant } from "./selected-variants"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox";

// let b =['h','i']
// b.s

export default function Variant ({sellingPrice,costPrice}){

     const [newOption,setNewOption]=useState(false)
     const [optionSets,setOptionSets]=useState([])
     const [allOptionsValues,setAllOptionsValues]=useState([])
     const [tableData,setTableData]=useState([])

     const [colorValues,setColorValues]=useState([])
     const [sizeValues,setSizeValues]=useState([])
     const [customVariants,setCustomVariants]=useState([])

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
         console.log(optionSets)
     },[optionSets])
     useEffect(()=>{
        
     },[customVariants,colorValues,sizeValues])
     
     return(
          <div  className="flex p-2 bg-core_grey2 mt-3 md:mt-5 flex-col md:p-6 rounded-xl w-full">
               <p className="  font-Voces font-semibold ">Variants</p>
               <div className="mt-3 overflow-clip rounded-lg bg-transparent shadow-sm">
                    {optionSets&&optionSets.map((set,index)=>(
                         <div key={index} className="px-3 items-center gap-3 bg-white flex border-b py-3">
                              <p className="px-2"><Dice6 /></p>
                              <div className="flex flex-col">
                                   <p className=" px-1">{set.name}</p>
                                   <div>
                                        {set.values.map((valueobj,_index)=>(
                                             <div className="inline-block" key={_index}>
                                                  <p className="py-0 mt-2 px-2 mr-2 rounded-2xl border-border border shadow gap-1 items-center inline-flex relative text-black  cursor-pointer">
                                                       <span className="ml-[2px] leading-tight mr-1">{valueobj.value}</span>
                                                       <button className="w-fit h-fit" >
                                                            <XIcon className="p-1"/>                                   
                                                       </button>
                                                  </p>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>
                    ))}
                    <div className={`grid transition-collapse ${newOption ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                         <div className="overflow-hidden w-full ">
                              <NewOption optionData={optionSets} fillOptions={(name,values)=>{setOptionSets(prev=>[...prev,{name:name,values:values}]),setTableData(prev=>[...prev,...values.map((item,index)=>({option:name,item:item.value,sp:sellingPrice,cp:costPrice,sku:`SKU-${index}`}))])}} setNewOption={()=>setNewOption(false)} newOption={newOption}/>
                         </div>
                    </div>
                    <div data-border={newOption} className="px-2 max-h-min items-center flex data-[border=true]:border-t bg-white py-1">
                         {optionSets.length<=0?<div className="">
                              <Button onClick={()=>{setNewOption(!newOption)}} variant='ghost' className='bg-white hover:bg-transparent '><Plus /> Add options like sizes, colors, material, country etc.</Button>
                         </div>:""}
                         {optionSets.length>0?<Button onClick={()=>{setNewOption(!newOption)}} variant='ghost' className='bg-white hover:bg-transparent'><Plus data-new={newOption} className="data-[new=true]:rotate-45 transition-transform"/> <span data-new={newOption} className="data-[new=true]:opacity-40">Add another option</span></Button>:""}
                    </div>

               </div>
               <div className={`grid mt-4 transition-collapse ${tableData.length>0 ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden w-full ">
                         <div className="flex w-full bg-white px-3 rounded-lg flex-col">
                                   <SelectedVariantCombinationsTable table_data={tableData}/>
                         </div> 
                    </div>
               </div>             
          </div>
     )
}


const NewOption =({setNewOption,newOption,fillOptions,optionData})=> {
     const [optionSets,setOptionSets]=useState(optionData)
     const [optionValues,setOptionValues]=useState([])
     const [optionName,setOptionName]=useState('')
     const [err,setErr]=useState('')
     const [focused,setFocused]=useState(optionValues.length)
     let err1 = 'Option name already exists'
     let err2 = 'Some option values are the same'

     useEffect(()=>{
          const optionTags = document.querySelectorAll('input[data-id="option-values"]')
          optionTags.forEach((item,index)=>{
               if (index==focused){item.focus()}
          })
     },[optionValues])
     useEffect(()=>{
          !newOption?(setOptionName(""),setOptionValues([])):""
     },[newOption])
     return(
          <div className=" bg-core_grey2 py-2 md:px-6 px-3 flex-col">
               <InputBox input_uppercase flexdir={'row'} value={optionName} change={({target})=>{setOptionName(target.value)}} label={'Option name'}/>
               <div className="mt-2 ml-8">
                    <p className="my-1">Option values</p>
                    {optionValues.map((item,index)=>(
                         <div key={index} className="mt-[6px]">
                              <InputBox id={'option-values'} value={item.value} focus={focused==index} change={({target})=>{setOptionValues(prev=>prev.map((_option,_i)=>(_option===item?{value:target.value}:_option)))}} icon={<X onClick={()=>{setOptionValues(optionValues.filter((_item,_i)=>_i!==index))}}/>} inputDir={'input-reverse'} fit key={index} shortInput outline error={!item.value} />
                         </div>
                    ))}
                    <p className="flex justify-between">                         
                         <Button variant='secondary' onClick={()=>{setOptionValues(prev=>[...prev,{value:""}]),setFocused(optionValues.length)}} size='sm' className='rounded-lg shadow-md text-black bg-white mt-1 hover:bg-white'><Plus /> Add Option value</Button>
                         <Button disabled={optionValues.filter(item=>item.value=="").length>0||!optionName||optionValues.length<=0} onClick={()=>{optionData.some(obj=>obj&&obj.name.toLowerCase()===optionName.toLowerCase())?setErr(err1):new Set(optionValues.map(item=>item.value.toLowerCase())).size!==optionValues.map(item=>item.value.toLowerCase()).length?setErr(err2):(fillOptions(optionName,optionValues),setNewOption())}} size='sm' className='rounded-lg shadow-md mt-1 px-5'>Done</Button>
                    </p>
                    {err?<p className="text-red-500 py-1">{err}</p>:""}
               </div>
          </div>
     )
}



const AddCustomProp =({Prop,_variant,edit})=> {
     const [type,setType] = useState(edit&&_variant.type?_variant.type:'')
     const [inputValue, setInputValue] = useState("");
     const [badges, setBadges] = useState(edit&&_variant.options?_variant.options:[]);
     const [error, setError] = useState('');


     const handleKeyPress = (e) => {
          if (e.key === "Enter" && inputValue.trim() !== "") {
               setBadges([...badges, inputValue.trim()]);
               setInputValue(""); // Clear input after adding
          }
     };

     function CreateOrUpdate(){
          !type?setError('type'):
          Prop(type.toUpperCase(),badges)
     }

     return (
       <div className="">
         <AlertDialogHeader><AlertDialogTitle className=' p-0'>
               <AlertDialogDescription className=' mb-3 font-semibold'>Custom variant</  AlertDialogDescription></AlertDialogTitle>
         </AlertDialogHeader>
         <div className="flex mt-2 flex-col">
               <div className="flex md:justify-between gap-1 flex-col md:flex-row items-start md:items-center">
                    <span className="text-sm ">Variant type:</span>
                    <div className="md:w-[70%] w-full">
                         <InputBox error={error=='type'} placeholder={'e.g, Material,Make or Weight'} value={type} input_uppercase change={(e)=>{setType(e.target.value)}} outline /> 
                    </div>
               </div>
               <div className="flex md:justify-between md:flex-row flex-col mt-5 items-start">
                    <span className="text-sm">Variant options:</span>
                    <div className=" border-b md:w-[70%] w-full border-core_contrast/70 py-1 px-0 md:px-1">
                         <div className="inline-flex flex-wrap gap-2">
                              {badges.map((badge, index) => (
                                   <div key={index} className="py-[1px] px-2 rounded-xl gap-1 items-center inline-flex bg-green-400 text-white  cursor-pointer">
                                        <span className="ml-[1px]">{badge}</span>
                                        <button onClick={()=>{setBadges(badges.filter((_, i) => i !== index))}}>
                                             <XIcon className="p-1"/>                                   
                                        </button>
                                   </div>
                              ))}
                         </div>
                         <div className="relative inline-block mb-2">
                              <input type="text" className=" rounded-sm p-[2px]  outline-none max-w-64" placeholder="Type option..." disabled={!type} value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} onKeyDown={handleKeyPress} style={{ width: `${Math.max(150, inputValue.length*8)}px `}}/>
                         </div>
                    </div>
               </div>
               <p className="italic md:text-end text-core_contrast/70 text-[10px]">use Enter key to add variant option</p>
         </div>
         <AlertDialogFooter className={'flex flex-row mt-4 justify-end'}>
           <AlertDialogCancel asChild><Button size='sm' onClick={CreateOrUpdate} variant='outline' disabled={badges.length<=0} className='w-fit text-white bg-black cursor-pointer px-4' type="submit">{edit?"Update":"Add"} custom variant</Button></AlertDialogCancel>
         </AlertDialogFooter>
       </div>
     )
   }
   
   const AddColorProp =({colorProp})=> {
     const [colorValue,setColorValue] = useState('')
     const [colorUrl,setColorUrl] = useState('')
     const [color, setColor] = useColor("darkturquoise");

     function convertToImg (pickedColor){
         const canvas = document.createElement('canvas')
         canvas.width = 18
         canvas.height = 18
         const context = canvas.getContext('2d')
         context.fillStyle = pickedColor
         context.fillRect(0,0,canvas.width,canvas.height)

         const canvasUrl = canvas.toDataURL(`${pickedColor}/png`)
         setColorUrl(canvasUrl)
         console.log(canvasUrl)
     }

     return (
       <form onSubmit={(e)=>{e.preventDefault(),colorProp(colorValue,colorUrl)}} className="w-full">
         <AlertDialogHeader><AlertDialogTitle className=' p-0'>
               <AlertDialogDescription className=''>Add color variant</  AlertDialogDescription></AlertDialogTitle>
         </AlertDialogHeader>
         <div className="flex justify-center mt-4 w-full items-start gap-2">
           <ColorPicker color={color} hideInput={["rgb", "hsv"]} height={100} onChange={setColor} onChangeComplete={(col)=>{setColorValue(col.hex),convertToImg(col.hex)}} />
         </div>
         <AlertDialogFooter className={'flex mx-1 flex-row mt-3 items-center justify-end'}>
           <AlertDialogCancel asChild><Button size='sm' disabled={!colorValue} className='w-fit text-core_contrast px-4' type="submit">Add color</Button></AlertDialogCancel>
         </AlertDialogFooter>
       </form>
     )
   }
   
   const AddSizeProp =({sizeProp})=> {
     const [sizes,setSizes ]=useState([ {size:'small',status:false}, {size:'medium',status:false}, {size:'large',status:false}, {size:'xlarge',status:false}, {size:'xxlarge',status:false}])
     const [sizeData,setSizeData] = useState([])
     useEffect(()=>{
          setSizeData(sizes.filter(size=>size.status===true))
     },[sizes])
     return (
       <form onSubmit={(e)=>{e.preventDefault(),sizeProp(sizeData)}} className="">
         <AlertDialogHeader><AlertDialogTitle className=' p-0'>
               <AlertDialogDescription className=''>Add size variant</  AlertDialogDescription></AlertDialogTitle>
         </AlertDialogHeader>
         <div className="flex flex-col gap-3">
               {sizes.map((item,index)=>(
                    <div key={index} className="flex gap-1 mx-2 items-center mt-3 space-x-2">
                         <Checkbox onCheckedChange={(val)=>{setSizes(prev=>prev.map((size,_index)=>(item === size?{...size,status:val}:size)))}} checked={item.status} id={item.size} />
                              <label htmlFor={item.size} className=" font-medium uppercase leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              <span className="-ml-1">{item.size}</span>
                         </label>
                    </div>
               ))}
         </div>
         <AlertDialogFooter className={'flex mx-1 flex-row mt-2 items-center justify-end'}>
           <AlertDialogCancel asChild><Button size='sm' disabled={sizeData.length<=0} className='w-fit text-core_contrast px-5' type="submit">Add sizes</Button></AlertDialogCancel>
         </AlertDialogFooter>
       </form>
     )
   }


   