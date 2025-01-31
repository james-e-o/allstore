import React, { useState } from 'react'
import InputBox from "./input-box"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown } from 'lucide-react'

const WeightSelection = () => {
     const weightMeasurement = [{name:'kilograms',value:1,short:"kg"},{name:'grams',value:1000,short:"g"},{name:'milligrams',value:1000000,short:"mg"}]
     const [selected,setSelected]=useState(weightMeasurement[0])
     const [weightValue,setWeightValue] = useState ('')
     return (
          <div>
               <div className='inline-flex mt-2 gap-0 items-end'>
                    <InputBox width={'90px'} change={(e)=>{setWeightValue(e.target.value)}} shortInput value={weightValue} type={'number'} label={'Weight'} /> 
                    <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                              <Button variant='outline' className=' px-2 h-6'>{selected.short}<ChevronsUpDown className='px-1px'/></Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end">
                              <DropdownMenuSeparator />
                              {weightMeasurement.map((unit,index)=>(
                                   <DropdownMenuItem key={index} onClick={(e) =>{setSelected(unit)}} >
                                        {unit.name}
                                   </DropdownMenuItem>
                              ))}
                         </DropdownMenuContent>
                    </DropdownMenu>    
               </div>  
          </div>
     )
}

export default WeightSelection