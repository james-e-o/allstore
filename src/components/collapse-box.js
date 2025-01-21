import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const CollapseBox = ({children,disabled,subject}) => {
     const [state,setState] = useState(false)
     return (
          <div className="w-full">
               <div className='flex mt-2 w-full items-center'>
                    <p data-state={state} className="inline-block font-semibold text-gray-500 data-[state=true]:text-black text-xs mr-3">{subject}</p>
                    <Switch disabled={disabled} className='data-[state=unchecked]:bg-core_contrast/40 shadow' checked={state} onCheckedChange={()=>setState(!state)} />
               </div>
               <div className={`grid transition-collapse ${state ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden w-full text-xs">
                         {children}
                    </div>
               </div>
          </div>
     )
}

export default CollapseBox