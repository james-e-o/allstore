'use client'
import { useEffect, useState } from "react"
import { Dialog,DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react"
import InputBox from "./input-box";

const VolumeCalculator =({sp})=> {

     const measurements = [
          {measurement:'pieces',units:[{name:'piece',value:1,short:"pcs"}]},
          {measurement:'weight',units:[{name:'kilograms',value:1,short:"kg"},{name:'grams',value:1000,short:"g"},{name:'milligrams',value:1000000,short:"mg"}]},
          {measurement:'volume',units:[{name:'litres',value:5,short:"l"},{name:'centilitres',value:100,short:"cl"},{name:'millilitres',value:1000,short:"ml"}]},
          {measurement:'length',units:[{name:'metres',value:1,short:"m"},{name:'centimetres',value:100,short:"cm"},{name:'inches',value:39.4,short:"in"},{name:'millimetres',value:1000,short:"ml"}]}
     ]
     const [measurementFilter,setMeasurementFilter]=useState([])
     
     const [activeDialog,setActiveDialog]=useState('')
     const [totalQuantity,setTotalQuantity] = useState(0)
     const [baseUnits,setBaseUnits] = useState(0)
     const [totalQuantityMeasurement,setTotalQuantityMeasurement] = useState({type:measurements[0].units[0].short,value:measurements[0].units[0].value})
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
          computePiecePrice()
     },[totalQuantity,baseUnits,totalQuantityMeasurement,baseUnitMeasurement,sp])
   
     return (
          <div className=" flex flex-col">
               <Dialog>
                    <DialogContent className={'md:w-fit w-[80%] rounded-lg'}>
                         {
                         activeDialog === 'total-units'?
                              <div className="flex-col mt-4 gap-3 flex">
                                   <DialogHeader>
                                        <DialogTitle className='text-xs p-0'></DialogTitle>
                                             <DialogDescription className='text-xs'>
                                                  Select unit of measurement
                                             </DialogDescription>
                                   </DialogHeader>
                                   {measurements.map((measurement,i)=>(
                                        <div key={i} className="flex text-sm mt-1 justify-between gap-2 md:gap-4 items-center">
                                             <p className="p-1 font-semibold">{measurement.measurement}:</p>
                                             <div className="flex gap-2">
                                                  {measurement.units&&measurement.units.map((type,_i)=>(
                                                       <p key={_i} className="">
                                                            <DialogClose  asChild>
                                                                 <button variant="outline" onClick={()=>{setTotalQuantityMeasurement({type:type.short,value:type.value}),setMeasurementFilter(measurement.units),setBaseUnitMeasurement({type:type.short,value:type.value})}} className="ml-auto px-2 lowercase rounded-md border-black/20 border py-[6px] bg-white min-w-8 flex justify-center text-xs ">
                                                                 <span className="">{type.short}</span>
                                                                 </button> 
                                                            </DialogClose>
                                                       </p>
                                                  ))}
                                             </div>
                                        </div>
                                   ))}                    
                              </div>
                         :
                         activeDialog === 'base-units'?
                         <div  className="flex gap-2 flex-col mt-4">
                              <DialogHeader>
                                        <DialogTitle className='text-xs p-0'></DialogTitle>
                                             <DialogDescription className='text-xs'>
                                                  Select base unit of measurement
                                             </DialogDescription>
                                   </DialogHeader>
                                   <div className="flex gap-5">

                                   {measurementFilter&&measurementFilter.map((unit,i)=>(
                                        <p key={i} className="mt-4">
                                             <DialogClose  asChild>
                                                  <button variant="outline" onClick={()=>{setBaseUnitMeasurement({type:unit.short,value:unit.value})}} className="ml-auto px-2 lowercase rounded-md border-black/20 border py-[6px] bg-white min-w-8 flex justify-center text-sm ">
                                                  <span className="">{unit.short}</span>
                                                  </button> 
                                             </DialogClose>
                                        </p>
                                   ))}
                                   </div>

                         </div>
                         : ""
                         
                         }
                    </DialogContent>
                    <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
                         <div className="mt-2 flex w-fit justify-start h-fit items-end">
                              <InputBox width={'130px'} change={(e)=>{setTotalQuantity(new Number(e.target.value))}} value={totalQuantity?totalQuantity:""} type={'number'} label={'Total product units'} />           
                              <p className="h-full w-fit flex-col flex justify-end">
                                   <DialogTrigger asChild>
                                        <button variant="outline" onClick={()=>{setActiveDialog('total-units')}} className="ml-auto px-2 rounded-md border py-[7px] bg-white w-fit flex items-center gap-1 md:text-xs uppercase">
                                             <span>{totalQuantityMeasurement.type}</span> <ChevronDown className="h-4 w-4"/>
                                        </button>       
                                   </DialogTrigger>
                              </p>                                   
                         </div>
                         <div className="mt-2 flex w-fit  justify-start h-fit items-end">
                              <InputBox width={'130px'} change={(e)=>{setBaseUnits(new Number(e.target.value))}} value={baseUnits?baseUnits:""} type={'number'} label={'Minimum product unit(s)'} />           
                              <p className="h-full w-fit flex-col flex justify-end">
                                   <DialogTrigger asChild> 
                                        <button variant="outline" onClick={()=>{setActiveDialog('base-units')}} className="ml-auto px-2 rounded-md border py-[7px] bg-white w-fit flex items-center gap-1 md:text-xs uppercase">
                                             <span>{baseUnitMeasurement.type}</span> <ChevronDown className="h-4 w-4"/>
                                        </button>       
                                   </DialogTrigger>
                              </p>                                  
                         </div>
                    </div>
                    <div className="py-1">
                         {sp? <p className="ml-4 text-sm mt-1">{`$${output} per ${baseUnitMeasurement.type}`}</p>:""}
                    </div>
               </Dialog>
          </div>
     )
}

export default VolumeCalculator
