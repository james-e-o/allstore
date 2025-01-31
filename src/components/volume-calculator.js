'use client'
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import InputBox from "./input-box"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Dialog,DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { ChevronsUpDown } from 'lucide-react'


const VolumeCalculator =({sp})=> {

     const measurements = [
          {measurement:'unit',units:[{name:'unit',value:1,short:"unit"}]},
          {measurement:'weight',units:[{name:'kilograms',value:1,short:"kg"},{name:'grams',value:1000,short:"g"},{name:'milligrams',value:1000000,short:"mg"}]},
          {measurement:'volume',units:[{name:'litres',value:5,short:"l"},{name:'centilitres',value:100,short:"cl"},{name:'millilitres',value:1000,short:"ml"}]},
          {measurement:'length',units:[{name:'metres',value:1,short:"m"},{name:'centimetres',value:100,short:"cm"},{name:'inches',value:39.4,short:"in"},{name:'millimetres',value:1000,short:"ml"}]}
     ]
     const [measurementFilter,setMeasurementFilter]=useState([])
     
     const [activeMeasurement,setActiveMeasurement]=useState(measurements[0])
     const [totalQuantity,setTotalQuantity] = useState(0)
     const [baseUnits,setBaseUnits] = useState(0)
     const [totalQuantityMeasurement,setTotalQuantityMeasurement] = useState({type:activeMeasurement.units[0].short,value:activeMeasurement.units[0].value})
     const [baseUnitMeasurement,setBaseUnitMeasurement] = useState(totalQuantityMeasurement)
     const [output,setOutput] = useState(0)

     function computePiecePrice(){
          let unit_measurement = totalQuantityMeasurement.value/baseUnitMeasurement.value
          if (!totalQuantity){
               return 0
          } else if(!baseUnits){
               return 0
          } else
          setOutput(sp * ( (baseUnits)/totalQuantity ) * unit_measurement)
     }

     useEffect(()=>{
          setTotalQuantityMeasurement({type:activeMeasurement.units[0].short,value:activeMeasurement.units[0].value})
          setBaseUnitMeasurement({type:activeMeasurement.units[0].short,value:activeMeasurement.units[0].value})
     },[activeMeasurement])

     useEffect(()=>{
          computePiecePrice()
     },[totalQuantity,baseUnits,totalQuantityMeasurement,baseUnitMeasurement,sp])
   
     return (
          <div className="  flex w-full shadow-sm mb-2 border rounded-lg bg-white mt-1 p-4 flex-col">
               <Dialog>
                    <div className="grid gap-2 flex-col grid-cols-[_repeat(auto-fit,minmax(200px,_0.8fr))_]">
                         <div className='inline-flex gap-1 items-end'>
                              <InputBox shortInput width={'90px'} change={(e)=>{setTotalQuantity(new Number(e.target.value))}}  value={totalQuantity?totalQuantity:""} type={'number'} label={'Total product units'} /> 
                              <DropdownMenu>
                                   <DropdownMenuTrigger asChild>
                                        <Button variant='ghost' className='min-w-9 h-6'>{activeMeasurement.measurement}<ChevronsUpDown className='p-1px'/></Button>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent align="end">
                                        <DropdownMenuSeparator />
                                        {measurements.map((option,index)=>(
                                             <DropdownMenuItem key={index} onClick={(e) =>{setActiveMeasurement(option)}} >
                                                  {option.measurement}
                                             </DropdownMenuItem>
                                        ))}
                                   </DropdownMenuContent>
                              </DropdownMenu>
                              <DropdownMenu>
                                   <DropdownMenuTrigger asChild>
                                        <Button variant='ghost' className='min-w-9 h-6'>{totalQuantityMeasurement.type}<ChevronsUpDown className='p-1px'/></Button>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent align="end">
                                        <DropdownMenuSeparator />
                                        {activeMeasurement.units.map((unit,index)=>(
                                             <DropdownMenuItem key={index} onClick={(e) =>{setTotalQuantityMeasurement({type:unit.short,value:unit.value}),setBaseUnitMeasurement({type:unit.short,value:unit.value})}} >
                                                  {unit.name}
                                             </DropdownMenuItem>
                                        ))}
                                   </DropdownMenuContent>
                              </DropdownMenu>    
                         </div>  
                         <div className='inline-flex gap-1 items-end'>
                              <InputBox width={'90px'} change={(e)=>{setBaseUnits(new Number(e.target.value))}} shortInput value={baseUnits?baseUnits:""} type={'number'} label={'Minimum product unit(s)'} /> 
                              <DropdownMenu>
                                   <DropdownMenuTrigger asChild>
                                        <Button variant='ghost' className='min-w-9 h-6'>{baseUnitMeasurement.type}<ChevronsUpDown className='p-1px'/></Button>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent align="end">
                                        <DropdownMenuSeparator />
                                        {activeMeasurement.units.map((unit,index)=>(
                                             <DropdownMenuItem key={index} onClick={(e) =>{setBaseUnitMeasurement({type:unit.short,value:unit.value})}} >
                                                  {unit.name}
                                             </DropdownMenuItem>
                                        ))}
                                   </DropdownMenuContent>
                              </DropdownMenu>    
                         </div>  
                    </div>
                    <div className="py-1">
                         {sp? <p className="ml-4 text-xs mt-1">{`$${output} per ${baseUnitMeasurement.type}`}</p>:""}
                    </div>
               </Dialog>
          </div>
     )
}

export default VolumeCalculator

     
