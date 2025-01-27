import React from 'react'
import { Plus,XIcon,BriefcaseBusiness,Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel,AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const AddImage = () => {
  return (
     <div className=" my-2 md:flex-row flex-col gap-3 h-fit flex ">
     <AlertDialog className='bg-blue-600/35'>
          <AlertDialogContent  className="flex flex-col overflow-hidden justify-between w-[70%] max-w-[85%] md:max-w-[70%] h-4/6 md:h-4/6 px-3 md:px-6 pb-2 pt-3 rounded-lg ">
               <AlertDialogHeader><AlertDialogTitle className=' h-fit -mb-8 border-b p-1'>
                    <p className="p-1x float-right h-fit flex  justify-end items-center">
                         <AlertDialogCancel className="h-fit right-1 shadow-none border-none p-1 m-0"><XIcon className='w-5 scale-125 h-5' /></AlertDialogCancel>
                    </p>
                    <AlertDialogDescription className='mx-5'>Media files</  AlertDialogDescription></AlertDialogTitle>
               </AlertDialogHeader>
               <Tabs className="flex flex-col w-full flex-grow px-1px mt-5 items-start gap-2">
                    <div className="flex md:flex-col md:items-center items-start justify-start w-fit bg-white h-full">
                         <TabsList className={`flex md:flex-col justify-start min-w-max bg-white py-2 md:px-4 mb-2 gap-2 rounded-[3px] border-r md:py-2 `}>
                              <TabsTrigger className='py-1 shadow-sm md:min-w-32 max-w-min inline-flex gap-1 items-center text-black px-5 relative border-transparent rounded-xl border border-core_grey1 bg-transparent data-[state=active]:bg-core_grey2' value="grad 1"><Plus className="p-5px"/><span className='text-10px'>Upload</span></TabsTrigger>
                              <TabsTrigger className='py-1 shadow-sm md:min-w-32 max-w-min inline-flex gap-1 items-center text-black px-5 relative border-transparent rounded-xl border border-core_grey1 bg-transparent data-[state=active]:bg-core_grey2' value="grad 2"><BriefcaseBusiness className="p-5px"/><span className='text-10px'>Files</span></TabsTrigger>
                         </TabsList>
                    </div>  
               </Tabs>
               <AlertDialogFooter className={'flex mx-1 flex-row mt-3 h-fit space-y-0 items-center justify-end'}>
                    <AlertDialogCancel asChild><Button size='xs'  className='w-fit text-core_contrast h-7 px-4' type="submit">Add color</Button></AlertDialogCancel>
               </AlertDialogFooter>
          </AlertDialogContent>
          <div className="w-full shadow bg-white rounded-lg justify-center items-center flex h-36 ">
               <div className='w-fit flex flex-col'>
                    <AlertDialogTrigger asChild>
                         <Button variant='outline' className='shadow h-6 hover:bg-white'><Plus />Add media</Button>
                    </AlertDialogTrigger>
                    <p className="text-gray-400 mt-2 text-9px">Accepts images & videos</p>
               </div>
          </div>
     </AlertDialog>
     </div>
  )
}

export default AddImage