'use client'
import { useState,useEffect,useContext } from "react"
import { ChevronsDownUp, ChevronsUpDown, Dice6, Edit,Edit3, GripVertical, Plus,Trash2, X, XIcon } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { ColorPicker, useColor,Saturation,IColor, Hue, Alpha } from "react-color-palette";
import InputBox from "./input-box"
import "react-color-palette/css";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import SelectedVariantCombinationsTable, { DisplayVariant } from "./selected-variants"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox";
import { newProductContext } from "./context-values"
import { items } from "./app-sidebar"


export default function Variant ({sellingPrice,costPrice}){

     const [optionBoard,setOptionBoard]=useState(false)
     
     const [allOptionsValues,setAllOptionsValues]=useState([])
     const [tableData,setTableData]=useState([])
     const [editHolder,setEditHolder] = useState({})
     const [editStatus,setEditStatus] = useState(false)

     const [colorValues,setColorValues]=useState([])
     const [sizeValues,setSizeValues]=useState([])
     const [customVariants,setCustomVariants]=useState([])

     const {newProduct,setNewProduct} = useContext(newProductContext)

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
     
     return(
          <div  className="flex p-2 bg-purple-50/70 border border-white/60 mt-3 md:mt-5 flex-col md:p-6 rounded-xl w-full">
               <p className="  font-Voces font-semibold ">Manage product variants on store</p>
               <div className="mt-3 overflow-clip rounded-lg bg-transparent shadow-sm">
                    {newProduct.optionsets&&newProduct.optionsets.map((set,index)=>(
                         <div key={index} className="p-2 items-center justify-between gap-1 bg-white flex border-b">
                              <p className="py-1 px-2"><GripVertical className="p-2px"/></p>
                              <div className="flex flex-col items-start flex-grow">
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
                              <div className="flex gap-1 items-center">
                                   <Button size='xs' variant='ghost' onClick={()=>{setEditHolder(set),setEditStatus(true),setOptionBoard(true),console.log(set)}} className="p-1"><Edit className="" /></Button>
                                   <Button size='xs' variant='ghost' onClick={()=>{setNewProduct(prev=>({...prev,optionsets:newProduct.optionsets.filter(item=>item.name!==set.name)}))}} className="p-1"><Trash2 className="" /></Button>
                              </div>
                         </div>
                    ))}
                    <div className={`grid transition-collapse ${optionBoard ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                         <div className="overflow-hidden w-full ">
                             <Option 
                             editStatus={editStatus} editProp={editHolder} 
                             optionData={newProduct.optionsets} 
                             fillOptions={(name,values)=>{setNewProduct(prev=>({...prev,optionsets:[...prev.optionsets,{name:name,values:values}]}))}} 
                             updateOptions={(name,values)=>{setNewProduct(prev=>({...prev,optionsets:newProduct.optionsets.map((item,index)=>(item.name===name?{name:name,values:values}:item))}))}}
                             setOptionBoard={()=>setOptionBoard(false)} optionBoard={optionBoard}/>
                         </div>
                    </div>
                    <div data-border={optionBoard} className="p-1 max-h-min items-center flex data-[border=true]:border-t bg-white">
                         {optionBoard?<Button onClick={()=>{setEditStatus(false),setEditHolder({}),setOptionBoard(false)}} size='sm' variant='ghost' className='bg- px-1 gap-1 hover:bg-transparent'><Plus data-new={optionBoard} className="data-[new=true]:rotate-45 transition-transform"/> <span data-new={optionBoard} className="">Close</span></Button>:
                          newProduct.optionsets.length<=0?<div className="">
                              <Button onClick={()=>{setEditStatus(false),setEditHolder({}),setOptionBoard(!optionBoard)}} size='sm' variant='ghost' className='bg-white px-1 gap-1 hover:bg-transparent '><Plus data-new={optionBoard} className="data-[new=true]:rotate-45 transition-transform"/> Add options like sizes, colors, material, country etc.</Button>
                         </div>:
                         newProduct.optionsets.length>0?<Button onClick={()=>{setEditStatus(false),setEditHolder({}),setOptionBoard(!optionBoard)}} size='sm' variant='ghost' className='bg- px-1 gap-1 hover:bg-transparent'><Plus data-new={optionBoard} className="data-[new=true]:rotate-45 transition-transform"/> <span data-new={optionBoard} className="data-[new=true]:opacity-40">Add another option</span></Button>:""}
                    </div>

               </div>
               <div className={`grid mt-4 transition-collapse ${newProduct.optionsets.length>0 ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden w-full ">
                         <div className="flex w-full bg-white px-3 rounded-lg flex-col">
                              <SelectedVariantCombinationsTable sellingPrice={sellingPrice} costPrice={costPrice} table_data={newProduct.optionsets}/>
                         </div> 
                    </div>
               </div>             
          </div>
     )
}


const Option =({setOptionBoard,optionBoard,fillOptions,updateOptions,optionData,editStatus,editProp})=> {
     const [optionValues,setOptionValues]=useState(editStatus?editProp.values:[])
     const [optionName,setOptionName]=useState(editStatus?editProp.name:"")
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
         if(!editStatus){setOptionName(""),setOptionValues([])}
         else {setOptionName(editProp&&editProp.name),setOptionValues(editProp&&editProp.values)}
     },[editStatus])
     useEffect(()=>{
        setErr('')
     },[optionBoard])
     return(
          <div className="py-2 md:px-6 px-3 flex-col">
               <InputBox readonly={editStatus} input_uppercase flexdir={'row'} value={optionName} change={({target})=>{setOptionName(target.value)}} label={'Option name'}/>
               <div className="mt-2 ml-8">
                    <p className="my-1">Option values</p>
                    {optionValues.map((item,index)=>(
                         <div key={index} className="mt-[6px]">
                              <InputBox id={'option-values'} value={item.value} focus={focused==index} change={({target})=>{setOptionValues(prev=>prev.map((_option,_i)=>(_option===item?{value:target.value}:_option)))}} icon={<X onClick={()=>{setOptionValues(optionValues.filter((_item,_i)=>_i!==index))}}/>} inputDir={'input-reverse'} fit key={index} shortInput outline error={!item.value} />
                         </div>
                    ))}
                    <p className="flex justify-between">                         
                         <Button variant='secondary' onClick={()=>{setOptionValues(prev=>[...prev,{value:""}]),setFocused(optionValues.length)}} size='xs' className='rounded-lg shadow-md text-black bg-white mt-1 hover:bg-white'><Plus /> Add Option value</Button>
                        { editStatus?<Button disabled={optionValues.filter(item=>item.value=="").length>0||!optionName||optionValues.length<=0} onClick={()=>{new Set(optionValues.map(item=>item.value.toLowerCase())).size!==optionValues.map(item=>item.value.toLowerCase()).length?setErr(err2):(updateOptions(optionName,optionValues),setOptionBoard(),setOptionName(""),setOptionValues([]))}} size='xs' className='rounded-lg shadow-md mt-1 px-5'>Update</Button>:
                         <Button disabled={optionValues.filter(item=>item.value=="").length>0||!optionName||optionValues.length<=0} onClick={()=>{optionData.some(obj=>obj&&obj.name.toLowerCase()===optionName.toLowerCase())?setErr(err1):new Set(optionValues.map(item=>item.value.toLowerCase())).size!==optionValues.map(item=>item.value.toLowerCase()).length?setErr(err2):(fillOptions(optionName,optionValues),setOptionBoard(),setOptionName(""),setOptionValues([]))}} size='xs' className='rounded-lg shadow-md mt-1 px-5'>Done</Button>}
                    </p>
                    {err?<p className="text-red-500 py-1">{err}</p>:""}
               </div>
          </div>
     )
}

// const VariantCombinations =()=> {
//      return (
          
//      )
// }


export const EshopVariants =({Prop})=> {
     const [displayTypes,setDisplayTypes] = useState(['image swatch','dropdown','radio button','button','color swatch','text'])
     const [options,setOptions] = useState(Prop)
     const [selectedTypes,setSelectedTypes] = useState([])
     useEffect(()=>{
          let previousSelections = Object.fromEntries(selectedTypes&&selectedTypes.map(selection=>[selection.name,selection.display]))
          // setSelectedTypes(prev=>Prop.map((item,index)=>(prev&& prev[index]?prev[index]:{name:item.name,display:''})))
          setSelectedTypes(prev=>Prop.map((item,index)=>({name:item.name,display:previousSelections[item.name]??""})))
          console.log(selectedTypes)
          setOptions(Prop)
      },[Prop])
     return (
          <div className="mt-2">
               {options&&options.map((set,index)=>(
               <div key={index} className="flex flex-col">
                    <div className="w-full shadow-sm bg-white rounded-sm mt-1 p-2 gap-1 justify-between items-center flex  ">
                         <p className="px-3 uppercase">{set.name}</p>
                         <p className="px-2 text-black/70 uppercase">{set.values.length}{` Option(s)`}</p>
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                   <Button variant='outline' className='min-w-9 border-gray-300 border h-6'>{selectedTypes[index].display?selectedTypes[index].display:'choose display type'}<ChevronsUpDown className='p-1px'/></Button>
                                   {/* <Button variant='outline' onClick={()=>{console.log(selectedTypes[index])}} className='min-w-9 border-gray-300 border h-6'>{'hello'}<ChevronsUpDown className='p-1px'/></Button> */}
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                   <DropdownMenuItem  onClick={()=>{setSelectedTypes(prev=>prev&&prev.map((item,index)=>(item.name===set.name?{name:set.name,display:''}:item)))}}>none</DropdownMenuItem>
                                   {displayTypes.map((display,index)=>(
                                        <DropdownMenuItem onClick={()=>{setSelectedTypes(prev=>prev.map((item,_index)=>(item.name===set.name?{...item,display:display}:item)))}} className='' key={index} >
                                             {display} 
                                        </DropdownMenuItem>
                                   ))}
                              </DropdownMenuContent>
                         </DropdownMenu>
                    </div>
                    <div className={`grid transition-collapse ${selectedTypes[index].display ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                         <div className="overflow-hidden w-full">           
                              <ImageSwatch/>
                         </div>
                    </div>
               </div>
               ))}
               
          </div>
     )
}



const ImageSwatch = ()=> {
     return(
          <div className="flex py-2 items-center">
               <p className="py-1 px-1"><GripVertical className="p-2px"/></p>
               <figure className="rounded-md md:mr-3 mr-2 border shadow bg-white h-14 w-14 "></figure>
               <InputBox shortInput label={'value'} fit/>
          </div>
     )
}
const DropDown = ()=> {
     return(
          <div className="flex py-2 items-center">
               <p className="py-1 px-1"><GripVertical className="p-2px"/></p>
               <InputBox shortInput label={'value'} fit/>       
               <InputBox shortInput fit/>   
          </div>
     )
}


// const AddCustomProp =({Prop,_variant,edit})=> {
//      const [type,setType] = useState(edit&&_variant.type?_variant.type:'')
//      const [inputValue, setInputValue] = useState("");
//      const [badges, setBadges] = useState(edit&&_variant.options?_variant.options:[]);
//      const [error, setError] = useState('');


//      const handleKeyPress = (e) => {
//           if (e.key === "Enter" && inputValue.trim() !== "") {
//                setBadges([...badges, inputValue.trim()]);
//                setInputValue(""); // Clear input after adding
//           }
//      };

//      function CreateOrUpdate(){
//           !type?setError('type'):
//           Prop(type.toUpperCase(),badges)
//      }

//      return (
//        <div className="">
//          <AlertDialogHeader><AlertDialogTitle className=' p-0'>
//                <AlertDialogDescription className=' mb-3 font-semibold'>Custom variant</  AlertDialogDescription></AlertDialogTitle>
//          </AlertDialogHeader>
//          <div className="flex mt-2 flex-col">
//                <div className="flex md:justify-between gap-1 flex-col md:flex-row items-start md:items-center">
//                     <span className="text-sm ">Variant type:</span>
//                     <div className="md:w-[70%] w-full">
//                          <InputBox error={error=='type'} placeholder={'e.g, Material,Make or Weight'} value={type} input_uppercase change={(e)=>{setType(e.target.value)}} outline /> 
//                     </div>
//                </div>
//                <div className="flex md:justify-between md:flex-row flex-col mt-5 items-start">
//                     <span className="text-sm">Variant options:</span>
//                     <div className=" border-b md:w-[70%] w-full border-core_contrast/70 py-1 px-0 md:px-1">
//                          <div className="inline-flex flex-wrap gap-2">
//                               {badges.map((badge, index) => (
//                                    <div key={index} className="py-[1px] px-2 rounded-xl gap-1 items-center inline-flex bg-green-400 text-white  cursor-pointer">
//                                         <span className="ml-[1px]">{badge}</span>
//                                         <button onClick={()=>{setBadges(badges.filter((_, i) => i !== index))}}>
//                                              <XIcon className="p-1"/>                                   
//                                         </button>
//                                    </div>
//                               ))}
//                          </div>
//                          <div className="relative inline-block mb-2">
//                               <input type="text" className=" rounded-sm p-[2px]  outline-none max-w-64" placeholder="Type option..." disabled={!type} value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} onKeyDown={handleKeyPress} style={{ width: `${Math.max(150, inputValue.length*8)}px `}}/>
//                          </div>
//                     </div>
//                </div>
//                <p className="italic md:text-end text-core_contrast/70 text-[10px]">use Enter key to add variant option</p>
//          </div>
//          <AlertDialogFooter className={'flex flex-row mt-4 justify-end'}>
//            <AlertDialogCancel asChild><Button size='sm' onClick={CreateOrUpdate} variant='outline' disabled={badges.length<=0} className='w-fit text-white bg-black cursor-pointer px-4' type="submit">{edit?"Update":"Add"} custom variant</Button></AlertDialogCancel>
//          </AlertDialogFooter>
//        </div>
//      )
//    }
// // 