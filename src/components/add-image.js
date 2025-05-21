import React, { useEffect, useRef, useState } from 'react'
import ImageUploading from 'react-images-uploading';
import { Plus,XIcon,BriefcaseBusiness,Users, Trash2, File, Image, X, LucideRollerCoaster, RotateCcw, FolderPlusIcon, LayoutGridIcon, FolderCheck, FolderPlus, Check, FolderOpen, Ellipsis } from 'lucide-react'
import { useToast,toast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel,AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import {Breadcrumb,BreadcrumbEllipsis,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"
import db from '@/config/firestore';
import { collection,addDoc,onSnapshot,updateDoc,deleteDoc,getDoc,getDocs,doc} from "firebase/firestore";
import { CldUploadWidget,CldImage,getCldImageUrl } from 'next-cloudinary';
import Link from "next/link"

const imageCollectionRef = collection(db,'images')

const AddImage = () => {
     
     const [customDialog,setCustomDialog] =useState(false)
     const [newFolderState,setNewFolderState] = useState(false)
     const [newFolderValue,setNewFolderValue] = useState('')
     const [displayGrid,setDisplayGrid] = useState(false)
     const [info, setInfo] = useState();
     const [error, setError] = useState();
     const [selectedFiles,setSelectedFiles] = useState([])
     const [selectedFolders,setSelectedFolders] = useState([])
     const [breadCrumbsList,setBreadCrumbsList] = useState([{id:null,name:'All'}])
     const [currentFolder,setCurrentFolder] = useState([])
     const [selectedItems, setSelectedItems] = useState([]);
     
     const [files, setFiles] = useState([
          { id: 1, name: "baker 1.png",folderId:null,},
          { id: 2, name: "File 2.png",folderId:null },
          { id: 3, name: "File 3.png",folderId:null },
          { id: 4, name: "baker 2.png",folderId:null },
          { id: 5, name: "baker 3.png",folderId:null },
          { id: 6, name: "baker 4.png",folderId:null },
          { id: 7, name: "baker 5.png",folderId:null,},
          { id: 8, name: "baker 6.png",folderId:null,},
          { id: 9, name: "baker 7.png",folderId:null,},
     ]);
     
     const [folders, setFolders] = useState([
          { id: "folder1", name: "Folder 1",folderId:null,selected:false},
          { id: "folder2", name: "Folder 2",folderId:null,selected:false},
     ]);
     
     const moveFile = (fileId, folderId) => {
          console.log(`Moving file ${fileId} to folder ${folderId}`);
          setFiles((prevFiles) =>
               prevFiles.map((file) =>
               file.id === fileId ? (console.log(true),{ ...file, folderId:folderId}) : file
               )
          );
     };

     const moveFolder = (folderId ,parentId) => {
          console.log(`Moving file ${folderId} to folder ${parentId}`);
          setFolders((prev) =>
               prev.map((folder) =>
               folder.id === folderId ? (console.log(true),{ ...folder, folderId:parentId}) : folder
               )
          );
     };

     const addFolder = () => {
          setFolders(prev=>[...prev,{id:Date.now(),name:newFolderValue,folderId:breadCrumbsList[breadCrumbsList.length-1].id}])
          setNewFolderValue('')
          setNewFolderState(false)
     }

     const openFolder =(folder)=> {
          setBreadCrumbsList(prev=>[...prev,{id:folder.id,name:folder.name}])
     }

     function navigateBreadcrumbs(item,index) {
          setBreadCrumbsList(prev=>prev.slice(0,index+1))
     }

     const handleToggle = (id) => {
          selectedItems.includes(id)?
          setSelectedItems(prev=>prev.filter(item=>item!==id)):
          setSelectedItems((prev) => [...prev, id]);
     };
             
     
     
     async function handleSuccess(result, widget) {
          // addDoc(imageCollectionRef,{
          //      id: result?.info.public_id,
          //      folderId:null,
          //      name:'',
          //      storeId:'' ,
          //      imageUrl:result?.info.secure_url,
          // })
          console.log(result,result?.info)
          // setInfo(result?.info.map((resource,index)=>(
          //      { id: 1, name: "baker 1.png",folderId:null,}
          // )));
          setError(null);
          widget.close({
               quiet: true,
          });
     }
     
     function handleError(error, _widget) {
          setInfo(null);
          setError(error);
     }
     

     useEffect(()=>{
          const newfolder =  document.getElementById('newfolder')
          newFolderState?newfolder.focus():""
          setSelectedFiles(files.filter((item,index)=>item.selected))
          setSelectedFolders(folders.filter((item,index)=>item.selected))
          console.log(selectedFiles,selectedFolders)
     },[files,folders,newFolderState])   

     useEffect(()=>{  
         setCurrentFolder(breadCrumbsList[breadCrumbsList.length-1])
     },[breadCrumbsList])

  return (
     <DndProvider backend={HTML5Backend}>
     <div className=" my-2 md:flex-row flex-col gap-3 h-fit flex ">
          <div className={`inset-0 bg-black/60 flex justify-center items-center fixed ${customDialog?"z-[200]":"-z-10"}`}>
               <div  className="flex bg-white flex-col gap-0 overflow-hidden justify-between w-11/12 md:w-[75%] max-w-[90%] md:max-w-[75%] h-5/6 md:h-[75%] px-3 md:px-6 pb-2 pt-3 rounded-lg ">
                    <div><div className=' h-fit border-b p-1'>
                         <p className="p-1x float-right h-fit flex justify-end items-center" onClick={()=>setCustomDialog(false)}>
                              <Button className="h-fit right-1 shadow-none border-none p-1 m-0"><XIcon className='w-5 scale-125 h-5' /></Button>
                         </p>
                         <p className='md:mx-5 py-1 font-semibold text-xs text-start'>Media files</  p></div>
                    </div>
                    <Tabs defaultValue='files' className="flex md:flex-row flex-col w-full overflow-hidden flex-grow p-1px my-1 items-start gap-0">
                         <div className="flex md:flex-col md:items-center items-start justify-start w-fit md:w-[30%] bg-white h-fit md:h-full">
                              
                              {/* <CldUploadWidget uploadPreset='nexshelf_image' onError={handleError} onSuccess={handleSuccess}>
                                   {({open})=>{
                                        return <Button className='md:mb-6 rounded-2xl h-8 px-3 md:mt-8 ' onClick={()=>open()}><Plus className=""/>Upload </Button>
                                   }}
                              </CldUploadWidget> */}
                              {error && (
                                   toast({
                                        description: "Your message has not been sent.",
                                   })
                              )}
                              
                              <TabsList className={`inline-flex md:h-full p-3px md:min-w-max md:flex-col w-full justify-start min-w-max bg-white md:items-center mb-2 gap-2 rounded-[3px] md:py-2 `}>
                                   <Separator className='hidden md:block mb-data-[state=active]:shadow-none1'/>
                                   <TabsTrigger className='py-1 data-[state=active]:shadow-none md:w-full inline-flex gap-1 items-center px-4 text-black md:px-3 relative data-[state=active]:border-green-500 h-11 border-b-4 md:border-r-4 border-transparent rounded-none md:border-b-0 md:data-[state=active]:border-b-0 data-[state=active]:border-b-4 md:data-[state=active]:border-r-4 md:mt-2 bg-transparent data-[state=active]:bg-core_grey2' value="files"><File className="p-5px"/><span className='text-10px'>Files</span></TabsTrigger>
                                   <TabsTrigger className='py-1 data-[state=active]:shadow-none md:w-full inline-flex gap-1 items-center text-black px-4 relative data-[state=active]:border-green-500 h-11 border-b-4 md:border-r-4 border-transparent rounded-none md:border-b-0 md:data-[state=active]:border-b-0 data-[state=active]:border-b-4 md:data-[state=active]:border-r-4 md:mt-2 bg-transparent data-[state=active]:bg-core_grey2' value="trash"><Trash2 className="p-5px"/><span className='text-10px'>Trash</span></TabsTrigger>
                              </TabsList>
                         </div>   
                         <div className="flex flex-col md:border-l  border-t md:border-t-0 -top-1 md:top-0 w-full relative md:-left-1 overflow-hidden md:h-full h-full md:px-2">
                              <TabsContent value="files" className='mt-0 h-full overflow-hidden w-full md:px-1 py-1'>
                                        <div className='w-full h-full  md:gap-2 md:justify-end overflow-hidden justify-start flex md:flex-row flex-col'>
                                             <div className={`md:h-full w-full md:overflow-hidden overflow-scroll  rounded-lg px-1 flex flex-col justify-start`}>
                                                  <Input placeholder="Search product..." className="w-full rounded-lg mb-1 h-8"/>
                                                  <div className='md:flex-grow h-full flex md:overflow-hidden flex-col'>
                                                       <div className="flex items-center px-2 mt-[3px] justify-between">
                                                            <Breadcrumb>
                                                                 <BreadcrumbList className='flex gap-0 sm:gap-0 md:gap-0'>
                                                                      {breadCrumbsList.map((item,index)=>(
                                                                           <div key={index} onClick={()=>{navigateBreadcrumbs(item,index)}} className="inline-flex gap-[3px]">
                                                                                <BreadcrumbItem>
                                                                                     <Button variant='ghost' className='h-0 px-1'>{item.name}</Button>
                                                                                </BreadcrumbItem>
                                                                           {index!=breadCrumbsList.length-1? <BreadcrumbSeparator  />:""}
                                                                           </div>
                                                                      ))}
                                                                 </BreadcrumbList>
                                                            </Breadcrumb>
                                                       </div>
                                                       <div className="w-full justify-end inline-flex gap-3">
                                                            <div className="inline-flex gap-0 overflow-x-clip "><p data-open={newFolderState} className="inline-flex items-center transition-all -z-10 opacity-0 data-[open=true]:opacity-100 data-[open=true]:right-0 data-[open=true]:z-0 relative -right-3"><Input id='newfolder' onBlur={()=>{!newFolderValue?setNewFolderState(false):""}} className='h-5 rounded-e-none outline-transparent  ml-1 w-24 rounded-s-md' value={newFolderValue} onChange={({target})=>{setNewFolderValue(target.value)}}/><Button onClick={()=>{addFolder()}} size='icon' disabled={!newFolderValue} className='px-1 rounded-e-md rounded-s-none w-fit h-5'><Check className=''/></Button></p><Button onClick={()=>{setNewFolderState(!newFolderState)}} variant='icon' className='p-1 relative min-w-max'><FolderPlus data-open={newFolderState} className='relative transition-all scale-125 data-[open=true]:-z-10 data-[open=true]:opacity-0 opacity-100 z-0'/><FolderCheck data-open={newFolderState} className='absolute transition-all scale-125 data-[open=true]:z-0 -z-10 data-[open=true]:opacity-100 opacity-0'/></Button></div>
                                                            <Button onClick={()=>{setDisplayGrid(!displayGrid)}} variant='ghost'><LayoutGridIcon/></Button>
                                                       </div>
                                                       <p>Selected Items: {selectedItems&&selectedItems.length > 0 ? selectedItems.join(", ") : "None"}</p>

                                                       <div className="h-full overflow-y-scroll">
                                                            <div data-grid={displayGrid} className="grid data-[grid=true]:justify-items-start h-fit data-[grid=true]:gap-3  grid-cols-1 data-[grid=true]:lg:grid-cols-4 data-[grid=true]:md:grid-cols-3 data-[grid=true]:sm:grid-cols-2">

                                                                 {folders.filter(folder => folder.folderId === currentFolder.id).map(folder => (
                                                                      <Folder key={folder.id} folder={folder} children={{folders:folders.filter(item=>item.folderId==folder.id).length, files:files.filter(item=>item.folderId==folder.id).length}} click={()=>{openFolder(folder),console.log(folder.id)}} moveFile={moveFile} moveFolder={moveFolder} grid={displayGrid}/>
                                                                 ))}
                                                                 {files.filter(file => file.folderId === currentFolder.id).map(file => (
                                                                      <Files key={file.id} file={file} moveFile={moveFile} checked={selectedItems&&selectedItems.some(item=>item===file.id)} onCheck={(status)=>{handleToggle(file.id)}} grid={displayGrid}/>
                                                                 ))}
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="w-full md:w-[40%] md:overflow-y-scroll no_scroll md:border-l px-2 border-t md:border-t-0 md:h-full">
                                        </div>
                                   </div>
                              </TabsContent>
                              <TabsContent value="trash" className='mt-0 h-full w-full p-1'>
                                   <div className="mx-auto h-full w-full">
                                        <TrashBox />
                                   </div>
                              </TabsContent>
                         </div>
                    </Tabs>
                    <div className={'flex mx-1 border-t pt-1 flex-row h-fit space-y-0 items-center justify-end'}>
                         <p ><Button size='xs' className='w-fit text-white border h-7 px-4' type="submit">{'Add Image(s)'}</Button></p>
                    </div>
               </div>
          
          </div>
          <div className="w-full shadow bg-white rounded-lg justify-center items-center flex h-36 ">
               <div className='w-fit flex flex-col'>
                    
                         <Button variant='outline' onClick={()=>setCustomDialog(true)} className='shadow h-6 hover:bg-white'><Plus />Add media</Button>
                    
                    <p className="text-gray-400 mt-3">Accepts images & videos</p>
               </div>
          </div>
     </div>
     </DndProvider>
  )
}

export default AddImage






export const TrashBox = () => {
  return (
    <div className='w-full h-full  gap-2 md:justify-end justify-start flex md:flex-row flex-col'>
          <div className={`md:h-full w-full h-fit rounded-lg px-1 flex flex-col justify-start`}>
               <Input placeholder="Search product..." className="w-full rounded-lg mb-1 h-8"/>
               <FileDirectory />
          </div>
          <div className="w-full md:w-[40%] md:overflow-y-scroll no_scroll md:border-l px-2 border-t md:border-t-0 md:h-full">

          </div>
    </div>
  )
}







   
     const ItemTypes = {
          DOCUMENT: "file",
          FOLDER: "folder",
     };
   
     const Files = ({ file, moveFile,grid ,checked,onCheck }) => {
          const [{ isDragging }, drag] = useDrag(() => ({
               type: ItemTypes.DOCUMENT,
               item: { id: file.id,type: ItemTypes.DOCUMENT},
               collect: (monitor) => ({
                    isDragging: !!monitor.isDragging(),
               }),
          }));
          return (
               <div ref={drag} data-drag={isDragging} data-checked={checked} data-grid={grid} className={`border-b relative hover:bg-core_grey2/50 p-1 flex justify-between gap-2 items-center data-[grid=true]:inline-flex data-[grid=true]:flex-col data-[grid=true]:justify-start data-[grid=true]:gap-0 data-[grid=true]:border-none data-[grid=true]:w-fit data-[grid=true]:h-fit data-[drag=true]:border-b-2 data-[drag=true]:border-green-500 data-[drag=true]:opacity-60 data-[checked=true]:bg-core_grey2`} >
                    <p data-grid={grid} className="inline-flex w-fit items-center justify-start data-[grid=true]:justify-between data-[grid=true]:w-full">
                         <Checkbox data-grid={grid} checked={checked} onCheckedChange={(status)=>{onCheck(status)}} className={`text-white fill-white border`}/>
                         <Button  data-grid={grid} variant='ghost' className='p-1 hidden data-[grid=true]:inline hover:bg-gray-200 h-fit w-fit'><Trash2/></Button>
                    </p>
                    <div data-grid={grid} className={`inline-flex gap-2 data-[grid=true]:gap-0 items-center flex-grow justify-start data-[grid=true]:flex-col`}>
                         <File data-drag={isDragging} data-grid={grid} className={`data-[drag=true]:border-green-500 data-[grid=true]:w-12 data-[grid=true]:mt-2 data-[grid=true]:mx-3 data-[grid=true]:h-10`}/>
                         <p data-grid={grid}  className="flex items-start gap-0 flex-col">                             
                              <span data-grid={grid} className={`overflow-ellipsis`} >{file.name}</span>
                         </p>
                    </div>
                    <p data-grid={grid} className="inline-flex w-fit items-center justify-end data-[grid=true]:w-full data-[grid=true]:hidden">
                         <Button data-grid={grid} onClick={()=>{}} variant='icon' className={`p-1 relative min-w-max`}><Trash2  /></Button>
                    </p>
               </div>
          );
     };
   
     const Folder = ({ folder, moveFile,moveFolder,click,grid,checked,onCheck,children}) => {
          const ref = useRef(null)
          const [{isOver}, drop] = useDrop(() => ({
               accept:[ ItemTypes.DOCUMENT,ItemTypes.FOLDER,],
               drop: (item) =>{ 
                    if (item.type===ItemTypes.DOCUMENT){
                         moveFile(item.id, folder.id)
                    }else if(item.type===ItemTypes.FOLDER&&item.id!==folder.id){
                         moveFolder(item.id, folder.id)
                    }
               },
               collect: (monitor) => ({
                    isOver: !!monitor.isOver(),
               }),
          }));
          
          const [{ isDragging }, drag] = useDrag(() => ({
               type: ItemTypes.FOLDER,
               item: { id: folder.id,type: ItemTypes.FOLDER},
               collect: (monitor) => ({
                    isDragging: !!monitor.isDragging(),
               }),
          }));
          drag(drop(ref))
          // useEffect(()=>{             
          // })
          return (
          <div ref={ref} data-drag={isDragging} data-grid={grid} className={`border-b relative hover:bg-core_grey2/50 py-1 px-1 flex justify-between gap-2 items-center data-[grid=true]:inline-flex data-[grid=true]:flex-col data-[grid=true]:justify-start data-[grid=true]:gap-0 data-[grid=true]:border-none data-[grid=true]:w-fit  data-[grid=true]:h-fit data-[drag=true]:border-b-2 data-[drag=true]:border-green-500 data-[drag=true]:opacity-60`} >
               <p data-grid={grid} className="inline-flex w-fit items-center justify-start data-[grid=true]:w-full">
                    <Checkbox data-grid={grid} checked={checked} onCheckedChange={(status)=>{onCheck(status)}} className={`fill-white text-white border`}/>
               </p>
               <div data-grid={grid}  onClick={()=>{click()}} className={`inline-flex gap-2 items-center flex-grow justify-start data-[grid=true]:gap-0 data-[grid=true]:flex-col`}>
                    <FolderOpen data-drag={isDragging} data-grid={grid} className={`data-[drag=true]:border-green-500 data-[grid=true]:w-12 data-[grid=true]:mt-2 data-[grid=true]:mb-2 data-[grid=true]:mx-3 data-[grid=true]:h-10 `}/>
                    <p data-grid={grid}  className="flex items-start gap-0 flex-col">
                         <span data-grid={grid} className={`overflow-ellipsis`} >{folder.name}</span>
                         <span data-grid={grid} className={'text-gray-500 mt-[1px] text-8px data-[grid=true]:hidden'} >{children.files} files | {children.folders} folders</span>
                    </p>
               </div>
               <p data-grid={grid} className="inline-flex w-fit items-center justify-end data-[grid=true]:w-full data-[grid=true]:hidden">
                    <Button data-grid={grid}  onClick={()=>{}} variant='icon'  className={`p-1 relative min-w-max `}><Trash2  /></Button>
               </p>
          </div>
          );
     };
   

   



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