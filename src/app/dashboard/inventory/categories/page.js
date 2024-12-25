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



const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

// let categoryData = []

const categoryCollectionRef = collection(db,'categories')

const Categories = () => {
    const [categoryList,setCategoryList] = useState([])
    const [activeInterface, setActiveInterface] = useState('landing')

    categoryCollectionRef&&onSnapshot(categoryCollectionRef,(snapshot)=>{
        setCategoryList(
          snapshot.docs.map(doc=>({
          id:doc.id,
          ...doc.data()
        }))
      )
    })

    return (
      <div className="bg-white flex flex-col h-full overflow-y-scroll flex-grow rounded-md p-1 mt-2">
        <Dialog>
          <DialogContent className="w-5/6 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        <TabsContent value="products" className='mt-1'>
            {
                activeInterface === 'landing'? <CategoryLanding categoryList={categoryList} changeInterface={()=>setActiveInterface('add category')}/>: 
                activeInterface === 'add category'?<AddCategory categoryList={categoryList} changeInterface={()=>setActiveInterface('landing')}/> : ""              
            }   
        </TabsContent>
        <TabsContent value="brand" className='mt-1'>
          <div className="mx-auto h-5 w-5 my-2 bg-red-500"></div>
        </TabsContent>
        </Dialog>
      </div>
    )
  }
  
  export default Categories


const CategoryLanding = ({changeInterface,categoryList}) => {

  const [search , setSearch]=useState('')
  const [searchFilter,setSearchFilter] = useState()
  
  useEffect(()=>{
    setSearchFilter(categoryList.filter(item=>item.name.toLowerCase().includes(search.toLowerCase())))
  },[search])

  return (
    <div className="p-2">
      <div className="font-medium mt-1 text-sm flex gap-3 items-center justify-between">
        <p className="inline-flex w-fit text-xs border p-[0.36rem] rounded-sm items-center justify-start">
          <Search className="text-[10px] w-5 h-5"/>
          <input type="text" onChange={({target})=>{setSearch(target.value)}} placeholder="search category..." className="w-[80%] ml-2 border-none outline-none"/>
        </p>
        <Link href={'categories/new-product-category'}><Button className='px-2 text-xs font-semibold' size='sm'><Plus className="w-4 h-4"/>Add category</Button></Link>
      </div>
      <div className="mt-2">
        <p className="text-gray-500 mt-4 text-xs font-light"></p>

          {search!=''&&searchFilter!=''?searchFilter.map((item,index)=>(
            <CategoryItem key={item.id} Category={item.name}/>
          )): search!=''&&searchFilter==''? <div className="p-4 text-sm text-center">Category not found</div>:categoryList.map((item,index)=>(
            <CategoryItem key={item.id} Category={item.name}/>
          ))}
          

      </div>
    </div>
  )
}

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
    <div className="p-3">
      <div className="text-xs flex ">
        <Button onClick={changeInterface} className='py-2 px-1' variant='ghost'>
          <MoveLeftIcon className="w-4 h-4 mr-1"/>
          <span className="text-gray-500 text-xs font-light">Product categories</span>
        </Button>
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




function ComboboxDemo({addType,placeholder,value,setValue}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[14rem] bg-white justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[14rem] p-0">
        <Command>
          <CommandInput className='p-1' placeholder="Search framework..." />
          <CommandList className=' max-h-36 overflow-y-scroll'>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {addType?<DialogTrigger asChild><Button className="bg-slate-500" size='sm'><Plus className="mr-1"/>{addType}</Button></DialogTrigger>:''}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const CategoryItem =({Category})=>{
  const [dropState, setDropState] = useState(false)

  return(
    <div className="mb-1">
      <div className="px-0 py-1 mb-1 flex justify-between items-center">
        <p className="text-base leading-tight font-medium">{Category}</p>
        <div className="  flex gap-3 justify-end items-center">
          <Button variant='outline' className='border px-3 py-[0.15rem] rounded-sm'>45</Button>
          <Button variant='secondary' className='px-3 py-[0.15rem] rounded-sm text-xs font-semibold' size='sm'><Edit2 className="w-4 h-4"/></Button>
          <Button variant='ghost' className='p-0' onClick={()=>{setDropState(!dropState)}}>{dropState?<ChevronUp className="w-4 h-4"/>:<ChevronDown className="w-4 h-4" />}</Button>
        </div>
      </div>
      <Separator />
    </div>
  )
}