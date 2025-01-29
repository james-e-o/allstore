import React, { useState } from 'react'
import ImageUploading from 'react-images-uploading';
import { Plus,XIcon,BriefcaseBusiness,Users, Trash2, File, Image, X, LucideRollerCoaster, RotateCcw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel,AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

const AddImage = () => {
     const [uploadState,setUploadState] =useState(false)
     

  return (
     <div className=" my-2 md:flex-row flex-col gap-3 h-fit flex ">
     <AlertDialog className='bg-blue-600/35'>
          <AlertDialogContent  className="flex flex-col gap-0 overflow-hidden justify-between w-11/12 md:w-[75%] max-w-[90%] md:max-w-[75%] h-4/6 md:h-4/6 px-3 md:px-6 pb-2 pt-3 rounded-lg ">
               <AlertDialogHeader><AlertDialogTitle className=' h-fit border-b p-1'>
                    <p className="p-1x float-right h-fit flex  justify-end items-center">
                         <AlertDialogCancel className="h-fit right-1 shadow-none border-none p-1 m-0"><XIcon className='w-5 scale-125 h-5' /></AlertDialogCancel>
                    </p>
                    <AlertDialogDescription className='md:mx-5 text-start'>Media files</  AlertDialogDescription></AlertDialogTitle>
               </AlertDialogHeader>
               <Tabs defaultValue='files' className="flex md:flex-row flex-col w-full flex-grow px-1px mt-2 items-start gap-0">
                    <div className="flex md:flex-col md:items-center items-start justify-start w-fit md:w-[22%] bg-white h-fit md:h-full">
                         <Button className='md:mb-6 rounded-2xl h-8 px-3 md:mt-8 md:px-5' onClick={()=>{setUploadState(true)}}><Plus className=""/>Upload media</Button>
                         
                         <TabsList className={`inline-flex p-3px md:min-w-max md:flex-col w-full justify-start min-w-max bg-white md:items-center mb-2 gap-2 rounded-[3px] md:py-2 `}>
                              <Separator className='hidden md:block mb-data-[state=active]:shadow-none1'/>
                              <TabsTrigger onClick={()=>{setUploadState(false)}} className='py-1 data-[state=active]:shadow-none md:w-full inline-flex gap-1 items-center px-4 text-black md:px-3 relative data-[state=active]:border-green-500 h-11 border-b-4 md:border-r-4 border-transparent rounded-none md:border-b-0 md:data-[state=active]:border-b-0 data-[state=active]:border-b-4 md:data-[state=active]:border-r-4 md:mt-2 bg-transparent data-[state=active]:bg-core_grey2' value="files"><File className="p-5px"/><span className='text-10px'>Files</span></TabsTrigger>
                              <TabsTrigger onClick={()=>{setUploadState(false)}} className='py-1 data-[state=active]:shadow-none md:w-full inline-flex gap-1 items-center text-black px-4 relative data-[state=active]:border-green-500 h-11 border-b-4 md:border-r-4 border-transparent rounded-none md:border-b-0 md:data-[state=active]:border-b-0 data-[state=active]:border-b-4 md:data-[state=active]:border-r-4 md:mt-2 bg-transparent data-[state=active]:bg-core_grey2' value="trash"><Trash2 className="p-5px"/><span className='text-10px'>Trash</span></TabsTrigger>
                         </TabsList>
                    </div>   
                    <div className="flex flex-col md:border-l border-t md:border-t-0 -top-1 md:top-0 w-full md:flex-grow relative md:-left-1 h-full md:px-2">
                         <TabsContent value="files" className='mt-0 h-full w-full md:px-1 py-1'>
                              <div className="mx-auto h-full w-full">
                                   {uploadState?
                                   <UploadMedia />
                                   :
                                   <Folders />
                                   }
                              </div>
                         </TabsContent>
                         <TabsContent value="trash" className='mt-0 h-full w-full p-1'>
                              <div className="mx-auto rder-2border-4 bg-green-800">

                              </div>
                         </TabsContent>
                    </div>
               </Tabs>
               <AlertDialogFooter className={'flex mx-1 border-t pt-1 flex-row mt-3 h-fit space-y-0 items-center justify-end'}>
                    <AlertDialogCancel asChild><Button size='xs'  className='w-fit text-core_contrast h-7 px-4' type="submit">Add color</Button></AlertDialogCancel>
               </AlertDialogFooter>
          </AlertDialogContent>
          <div className="w-full shadow bg-white rounded-lg justify-center items-center flex h-44 ">
               <div className='w-fit flex flex-col'>
                    <AlertDialogTrigger asChild>
                         <Button variant='outline' className='shadow h-8 hover:bg-white'><Plus />Add media</Button>
                    </AlertDialogTrigger>
                    <p className="text-gray-400 mt-3 text-xs">Accepts images & videos</p>
               </div>
          </div>
     </AlertDialog>
     </div>
  )
}

export default AddImage




export const UploadMedia = () => {
     const [images, setImages] = useState([]);
     const maxNumber = 30;

     const onChange = (imageList, addUpdateIndex) => {
          // data for submit
          console.log(imageList, addUpdateIndex);
          setImages(imageList);
     };
  return (
     <div className="h-full transition-colors w-full">
     <ImageUploading
       multiple
       value={images}
       onChange={onChange}
       maxNumber={maxNumber}
       dataURLKey="data_url"
     >
       {({
         imageList,
         onImageUpload,
         onImageRemoveAll,
         onImageUpdate,
         onImageRemove,
         isDragging,
         dragProps,
       }) => (
          <div className="w-full h-full gap-2 md:justify-end justify-start flex md:flex-row flex-col">
               <div className={`md:h-full w-full h-fit rounded-lg flex justify-center items-center border-2 ${isDragging?"border-green-500 border-dotted":"border-border border-solid"}`}  {...dragProps}>
                         <div className="flex items-center md:m-0 my-6 flex-col md:flex-row md:gap-3 gap-2">
                              <Button variant='secondary' size='xs' className={`px-4 border ${isDragging?"text-gray-400":"text-black"}`} onClick={onImageUpload}>Click to upload<Image/></Button>
                              <span  className='text-[11px] hidden md:inline'>or Drop here</span>
                         </div>
                    &nbsp;
               </div> 
               <div className="w-full md:w-[45%] md:overflow-y-scroll no_scroll md:border-l px-2 border-t md:border-t-0 md:h-full">
                    <div className="flex md:justify-stretch gap-1">
                         <Button size='xs' variant='ghost' className='text-green-500 transition-colors hover:bg-transparent hover:text-green-700 mb-2' onClick={onImageRemoveAll}>Upload all</Button>
                         <Button size='xs' variant='ghost' className='text-red-500 transition-colors hover:bg-transparent hover:text-red-700 mb-2' onClick={onImageRemoveAll}>Remove all</Button>
                    </div>
                    <div>
                         {imageList.map((image, index) => (
                              <div key={index} className="rounded-md w-24 mt-2 mr-2 overflow-clip shadow-sm inline-flex flex-col">
                                   <img src={image['data_url']} alt="" className='w-full h-28'/>
                                   <div className="flex items-center justify-end py-2px px-1 border-t gap-3">
                                        <Button variant='ghost' className='h-6 px-1 text-9px py-1px' onClick={() => onImageUpdate(index)}><RotateCcw className='p-1px' /></Button>
                                        <Button variant='ghost' className='h-6 px-1 text-9px py-31x' onClick={() => onImageRemove(index)}><X className='p-1px' /></Button>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
       )}
     </ImageUploading>
   </div>
  )
}


export const Folders = () => {
  return (
    <div className='w-full h-full  gap-2 md:justify-end justify-start flex md:flex-row flex-col'>
          <div className={`md:h-full w-full h-fit rounded-lg flex justify-center border-2`}>
               <Input placeholder="Search product..." className="w-full rounded-lg my-1 mx-3 h-8"/>
          </div>
          <div className="w-full md:w-[40%] md:overflow-y-scroll no_scroll md:border-l px-2 border-t md:border-t-0 md:h-full">

          </div>
    </div>
  )
}
