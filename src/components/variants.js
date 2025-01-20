'use client'
import { useState,useEffect } from "react"
import { Edit,Edit3, Plus,Trash2, XIcon } from "lucide-react"
import InputBox from "./input-box"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { ColorPicker, useColor,Saturation,IColor, Hue, Alpha } from "react-color-palette";
import "react-color-palette/css";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import SelectedVariantCombinationsTable, { DisplayVariant } from "./selected-variants"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox";

// let b =['h','i']
// b.s

export default function Variant ({sellingPrice,costPrice}){

     const [colorVariant,setColorVariant]=useState(true)
     const [sizeVariant,setSizeVariant]=useState(true)
     const [activeDialog, setActiveDialog]= useState() // Dialog content

     const [colorValues,setColorValues]=useState([])
     const [sizeValues,setSizeValues]=useState([])
     const [customVariants,setCustomVariants]=useState([])
     const [editHolder,setEditHolder]=useState({})
     const [combinations,setCombinations]=useState([])
     const [selectedCombinations,setSelectedCombinations]=useState([])

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

     function combineArrays(arrays, prefix = '', result = []) {

          arrays = arrays.filter(array=>array.length>0)

          if (arrays.length === 0) {
            // Base case: Add the combination to the result
            result.push(prefix.slice(1)); // Remove the leading slash
            return result;
          }
        
          const [firstArray, ...restArrays] = arrays; // Destructure the arrays
          for (const element of firstArray) {
            combineArrays(restArrays, `${prefix}/${element}`, result); // Recursive call
          }
        
          return result;
     }

     function combineVariants(){
          let colors = colorValues?colorValues.map(col=>(col.color)):[' ']
          let sizes = sizeValues?sizeValues.map(size=>(size.size)):[' ']
          let customArray = customVariants?customVariants.map((_item,_i)=>(
               _item.options
          )):[' ']
          let arrays = [colors,sizes,...customArray]
                
          const combinedArray = combineArrays(arrays);
          setCombinations(combinedArray.map((item,_index)=>({variant:item,status:false})))
          console.log(combinedArray);
     }

     function createSelection(){
          setSelectedCombinations(combinations.filter((item)=>item.status===true).map((_item,_index)=>({
               combination:_item.variant,
               sp:sellingPrice,
               cp:costPrice,
               sku:`SKU-${_index}`
          })))
          
     }

     useEffect(()=>{
          console.log(selectedCombinations)
     },[selectedCombinations])
     useEffect(()=>{
          combineVariants()
     },[customVariants,colorValues,sizeValues])
     
     return(
          <div className="flex mt-6 flex-col">
               <AlertDialog>
                    <AlertDialogContent  className=" w-[80%] md:w-[40%]  p-3 md:p-6 rounded-lg text-xs">
                         <p className="p-1 h-fit flex -mb-8 relative -top-3 justify-end items-center">
                              <AlertDialogCancel className="h-fit right-1 shadow-none border-none p-1 m-0"><XIcon className='w-5 scale-125 h-5' /></AlertDialogCancel>
                         </p>
                         <div className="max-h-[70svh] overflow-y-scroll">
                         
                              {
                                   activeDialog === 'color'? <AddColorProp colorProp={(color,url)=>{setColorValues(prev=>[...prev,{color}])}}/>: 
                                   activeDialog === 'size'?<AddSizeProp sizeProp={(val)=>{setSizeValues(val)}}/> :
                                   activeDialog === 'edit-variations'?<EditVariantCombinations log={createSelection} changed={(val,index)=>{setCombinations(prev=>prev.map((variant,_index)=>(_index === index?{...variant,status:val}:variant)))}} combinations={combinations}/> :
                                   activeDialog === 'custom'?<AddCustomProp Prop={(type,badges)=>{setCustomVariants(prev=>[...prev,{type,options:badges}])}}/> :
                                   activeDialog === 'edit-custom'?<AddCustomProp edit={true} _variant={editHolder} Prop={(type,badges)=>{setCustomVariants(prev=>prev.map((_variant,_i)=>(_variant===editHolder?{type,options:badges}:_variant))),setEditHolder({})}}/> :
                                    ""     
                              }
               
                         </div>
                    </AlertDialogContent>
     
                    <div className="flex flex-col">
                         <div className="flex bg-white flex-col p-5 rounded-lg">
                              <div className="flex flex-col items-start gap-2 mb-2">
                                   <div className="flex flex-col md:flex-row gap-1 md:items-center items-start">                                   
                                        <p className="text-xs mr-1 inline-block">Color(s): </p>                                       
                                        <div className="inline-flex items-center text-xs">
                                             {colorValues&&colorValues.map((color,index)=>(
                                                  <p key={index} className="inline-flex items-center mr-4 gap-[2px]">
                                                       <button  style={{backgroundColor:color.color}} className="w-[1.2rem] shadow-sm  h-[1.2rem] border "></button>
                                                       <XIcon onClick={()=>{setColorValues(colorValues.filter((_Item)=>colorValues[index]!==_Item))}} className="p-1"/>
                                                  </p>
                                             ))}
                                             <AlertDialogTrigger asChild>                                            
                                                  <button className="mt-1 disabled:opacity-35 shadow" onClick={()=>{setActiveDialog('color')}}>
                                                       <Plus className="border bg-black relative -top-[1px] rounded-lg p-1  h-6 w-9 text-white inline-block"/>
                                                  </button>
                                             </AlertDialogTrigger>                                       
                                        </div>
                                   </div>                                                              
                                   
                                   <div className="flex gap-1 flex-col md:flex-row md:items-center">                                   
                                        <p className="text-xs mr-1 inline-block">Size(s): </p>
                                        <div className="inline-flex items-center text-xs">
                                             {sizeValues&&sizeValues.map((size,index)=>(
                                                  <p key={index} className="inline-flex items-center mr-4 gap-[2px]">
                                                       <span className="uppercase">{size.size}</span>
                                                       <XIcon onClick={()=>{setSizeValues(sizeValues.filter((_Item)=>sizeValues[index]!==_Item))}} className="p-1"/>
                                                  </p>
                                             ))} 
                                             <AlertDialogTrigger asChild>                                            
                                                  <button className="mt-1 disabled:opacity-35 shadow" onClick={()=>{setActiveDialog('size')}}>
                                                       <Plus className="border bg-black relative -top-[1px] rounded-lg p-1  h-6 w-9 text-white inline-block"/>
                                                  </button>
                                             </AlertDialogTrigger>                                      
                                        </div>
                                   </div>                                                                      
                              </div>
                              <div className="flex flex-col gap-1 items-start ">
                                   <p className="text-xs mr-1 inline-block">Custom variants:</p>
                                   <div className="flex flex-col justify-start gap-1">
                                        <div className="">
                                             {customVariants&&customVariants.map((customVariant,index)=>(
                                                  <div key={index} className="flex gap-2 justify-start items-center">
                                                       <p className=" flex gap-2">
                                                            <button>
                                                                 <Trash2 onClick={()=>{setCustomVariants(prev=>prev.filter((_variant)=>customVariants[index]!==_variant))}} className="p-[2px] h-5 w-6 mt-1 rounded-md inline-block"/>
                                                            </button>
                                                            <AlertDialogTrigger asChild>                              
                                                                 <button>
                                                                      <Edit onClick={()=>{setEditHolder(customVariant),setActiveDialog('edit-custom')}} className="p-[2px] h-5 w-6 mt-1 rounded-md inline-block"/>
                                                                 </button>
                                                            </AlertDialogTrigger>
                                                       </p>
                                                       <div className="mr-3 inline-block gap-2 items-center h-fit border-core_contrast/30">
                                                            <p className="inline-block mr-2 mt-2">{customVariant.type} :</p>
                                                            {customVariant.options.map((option,_index)=>(
                                                                 <p key={_index} className="py-0 mt-2 px-2 mr-2 rounded-2xl border-border border shadow gap-1 items-center inline-flex relative text-black text-xs cursor-pointer">
                                                                      <span className="ml-[2px] leading-tight mr-1">{option}</span>
                                                                      <button className="w-fit h-fit" onClick={()=>{setCustomVariants(prev=>prev.map((_variant,_i)=>(_i===index?{..._variant,options:_variant.options.filter(item=>item!==option)}:_variant)))}}>
                                                                           <XIcon className="p-1"/>                                   
                                                                      </button>
                                                                 </p>
                                                            ))}
                                                       </div>
                                                  </div>
                                             ))}
                                        </div>
                                        <AlertDialogTrigger asChild>                                            
                                             <button className="mt-1 w-fit disabled:opacity-35 shadow" onClick={()=>{setActiveDialog('custom')}}>
                                                  <Plus className="border bg-black rounded-lg p-1  h-6 w-9 text-white inline-block"/>
                                             </button>
                                        </AlertDialogTrigger>
                                   </div>
                              </div>
                              <p className="flex mt-1 justify-end">
                                   <AlertDialogTrigger asChild>
                                        <Button size={'sm'} onClick={()=>{setActiveDialog('edit-variations')}} variant='secondary' className='py-1 px-2 relative shadow border-transparent text-black rounded-md bg-secondary' value="products"><span className="">Choose combinations</span><Edit3/></Button>
                                   </AlertDialogTrigger>
                              </p>
                         </div>
                         <div className={`grid transition-collapse ${!selectedCombinations.length<=0 ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                              <div className="overflow-hidden w-full">           
                                   <div className="flex w-full flex-col mt-3 bg-white p-3 rounded-lg">
                                        <div className="flex mb-1 items-center justify-between">
                                             <p className="p-1 relative top-[2px]">Variant combinations</p>
                                             
                                        </div>
                                        <Separator />
                                        <div className="flex w-full flex-col">
                                             <SelectedVariantCombinationsTable table_data={selectedCombinations}/>
                                        </div>
                                   </div>              
                              </div>
                         </div>
                    </div>
               </AlertDialog>
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
         <AlertDialogHeader><AlertDialogTitle className='text-xs p-0'>
               <AlertDialogDescription className='text-xs mb-3 font-semibold'>Custom variant</  AlertDialogDescription></AlertDialogTitle>
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
                                   <div key={index} className="py-[1px] px-2 rounded-xl gap-1 items-center inline-flex bg-green-400 text-white text-xs cursor-pointer">
                                        <span className="ml-[1px]">{badge}</span>
                                        <button onClick={()=>{setBadges(badges.filter((_, i) => i !== index))}}>
                                             <XIcon className="p-1"/>                                   
                                        </button>
                                   </div>
                              ))}
                         </div>
                         <div className="relative inline-block mb-2">
                              <input type="text" className=" rounded-sm p-[2px] text-xs outline-none max-w-64" placeholder="Type option..." disabled={!type} value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} onKeyDown={handleKeyPress} style={{ width: `${Math.max(150, inputValue.length*8)}px `}}/>
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
         <AlertDialogHeader><AlertDialogTitle className='text-xs p-0'>
               <AlertDialogDescription className='text-xs'>Add color variant</  AlertDialogDescription></AlertDialogTitle>
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
         <AlertDialogHeader><AlertDialogTitle className='text-xs p-0'>
               <AlertDialogDescription className='text-xs'>Add size variant</  AlertDialogDescription></AlertDialogTitle>
         </AlertDialogHeader>
         <div className="flex flex-col gap-3">
               {sizes.map((item,index)=>(
                    <div key={index} className="flex gap-1 mx-2 items-center mt-3 space-x-2">
                         <Checkbox onCheckedChange={(val)=>{setSizes(prev=>prev.map((size,_index)=>(item === size?{...size,status:val}:size)))}} checked={item.status} id={item.size} />
                              <label htmlFor={item.size} className="text-xs font-medium uppercase leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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

   const EditVariantCombinations = ({combinations,changed,log}) => {

     
    
     return (
          <div className="">
               <AlertDialogHeader><AlertDialogTitle className='text-xs p-0'>
                         <AlertDialogDescription className='text-xs'>Choose variations</  AlertDialogDescription></AlertDialogTitle>
               </AlertDialogHeader>
               <div className=" flex flex-col mt-4 items-start gap-3">
                    {combinations.map((item,i)=>(
                         <div key={i} className="flex w-full flex-col ">
                              <div className="grid w-full mb-1 grid-cols-[_1fr_5fr] gap-2">
                                   <p className="w-fit justify-items-start">
                                        <Checkbox
                                             className=''
                                             checked={item.status}
                                             onCheckedChange={(value) => changed(value,i)}
                                        />
                                   </p>
                                   <div className="uppercase inline-flex text-xs">
                                        <DisplayVariant string={item.variant} />
                                   </div>
                              </div>
                              <Separator />
                         </div>
                    ))}
               </div>
               <AlertDialogFooter className={'flex  mx-1 flex-row mt-2 items-center justify-end'}>
                    <AlertDialogCancel asChild><Button size='sm' onClick={()=>{log()}} className='w-fit text-core_contrast px-3' type="submit">Done</Button></AlertDialogCancel>
               </AlertDialogFooter>
          </div>
     )
   }

   const VariantCombinationsTable = () => {
     return (
          <div className="grid grid-cols-5">


          </div>
     )
   }


   