import { Plus } from 'lucide-react'
import React from 'react'

const AddImage = () => {
  return (
     <div className="w-full mt-2 md:flex-row flex-col gap-3 h-fit flex ">
          <div className="w-full shadow bg-white rounded-lg h-52 "></div>
          <div className="w-full rounded-lg h-56 ">
               <div className="shadow cursor-pointer hover:scale-95 transition-transform bg-white flex items-center justify-center rounded-md p-2 h-16 w-16"><Plus className='p-1' /></div>
          </div>
     </div>
  )
}

export default AddImage