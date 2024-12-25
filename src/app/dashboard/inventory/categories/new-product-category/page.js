'use client'
import { Button } from "@/components/ui/button";
import { MoveLeftIcon, Plus, Search,Check, ChevronsUpDown, ChevronUp, ChevronDown, Edit2, } from "lucide-react"
import { useState,useRef, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog,DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/config";
import { collection,addDoc,onSnapshot,updateDoc,deleteDoc,getDoc,getDocs } from "firebase/firestore";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link";

const categoryCollectionRef = collection(db,'categories')
 const AddCategory = ({changeInterface,categoryList}) => {

    const [slug,setSlug] = useState('')
    const [category,setCategory] = useState('')
    const [parent, setParent] = useState('')
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
  
    const errorRef = useRef('')
  
    function convertToSlug(input) {
      let newValue= input.toString().toLowerCase().replace(/['"]/g, '').trim().replace(/\band\b/g, '&').replace(/[^a-z0-9\&-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').replace(/&/g, 'and') 
      setSlug(newValue)
    }
    function capitalize(input) {
      let newValue= input.toString().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ').replace(/\bAnd\b/g, '&')
      setCategory(newValue)
    }
  
    function createCategory(e){
      e.preventDefault()
  
      if (category === ''){
        setError('name') 
      }else if(slug === ''){
        setError('slug')
      } 
      
      console.log(category,parent,slug,description)
      addDoc(categoryCollectionRef,{
        name:category,
        parent,
        slug,
        description
      }).then(doc=>{
        setCategory('');setDescription('');setSlug('');setParent(null)
        changeInterface()
      }).catch(error=>{
        console.log(error)
      })
      
    }
  
    return (
        <div className="bg-white flex flex-col h-full overflow-y-scroll flex-grow rounded-md p-4 mt-2">
            <div className="text-xs flex ">
                <Link href={'/dashboard/inventory/categories/'}><Button className='py-2 px-1' variant='ghost'>
                    <MoveLeftIcon className="w-4 h-4 mr-1"/>
                    <span className="text-gray-500 text-xs font-light">Product categories</span>
                </Button></Link>
            </div>
            <p className="font-semibold px-1 mt-3 text-sm">New product category</p>
            <div className="">
                <form id="category-form" onSubmit={createCategory}>
                    <div className='mt-3 relative'>
                        <label htmlFor="" className='relative ml-[2px] font-semibold text-gray-500 items-center flex justify-between text-xs mb-[1px]' >
                        <span> Category name</span> 
                        </label>
                        <input data-error={error==='name'} id='heading-text' value={category} onChange={({target})=>{capitalize(target.value),convertToSlug(target.value),error==='name'?setError(''):''}} className='category border data-[error=true]:border-red-500 rounded-md w-[14rem] text-sm outline-none p-[0.4rem]' type='text' />
                    </div>
        
                <div className='mt-2 font-Inter relative'>
                    <label htmlFor="" className='relative ml-1 font-semibold text-gray-500 items-center flex justify-between text-xs mb-[3px]' >
                    <span> Parent category</span> 
                    </label>
                    {/* <ComboboxDemo placeholder={'none'} value={parent} setValue={(val)=>setParent(val)}/> */}
                    <select value={parent} className="p-2 outline-none  text-xs border w-[14rem] rounded-md" onChange={({target})=>{setParent(target.value)}}>
                    
                    <option className="w-full border text-xs" value={''}>--Select parent</option>
                    {categoryList&&categoryList.map((doc,index) => (
                        <option key={doc.id} className="w-full border-none text-xs" value={doc.id}>{doc.name}</option>
                    ))}
                    </select>
        
                    <p className="text-gray-400 text-[0.69rem] leading-tight italic p-1 -mt-[1px] font-extralight">Select from categories already created.</p>
                </div>
                
                <div className='mt-2 font-Inter relative'>
                    <label htmlFor="" className='relative ml-1 font-semibold text-gray-500 items-center flex justify-between text-xs mb-[1px]' >
                    <span> Slug</span> 
                    </label>
                    <input id='heading-text' data-error={error==='slug'} onChange={({target})=>{convertToSlug(target.value),error==='slug'?setError(''):''}} value={slug} className='slug border data-[error=true]:border-red-500 rounded-md w-[14rem] text-sm outline-none p-[0.4rem]' type='text' />
                    <p className="text-gray-400 text-[0.69rem] leading-tight italic p-1 -mt-[1px] max-w-[14rem]  font-extralight">The 'slug' is the url friendly version of the name. it is usually all lowercase and contains only letters, numbers and hyphens.</p>
                </div>
        
                <div className='mt-2 font-Inter relative'>
                    <label htmlFor="" className='relative ml-1 font-semibold text-gray-500 items-center flex justify-between text-xs mb-[1px]' >
                    <span> Description</span> 
                    </label>
                    <textarea id='heading-text' value={description} onChange={(e)=>{setDescription(e.target.value)}} className='border rounded-md w-[14rem] text-sm outline-none p-[0.4rem]' rows={3}></textarea>
                </div>
                <div className="flex gap-3 max-w-[14rem]">
                    <Button className='mt-2 w-full border-none text-xs rounded-sm font-semibold' size='sm'>Create</Button>
                </div>
                </form>
            </div>
      </div>
    )
  }
  

  export default AddCategory