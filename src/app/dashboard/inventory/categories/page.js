'use client'
import { Button } from "@/components/ui/button";
import { MoveLeftIcon, Plus, Search,Check, ChevronsUpDown, ChevronUp, ChevronDown, Edit2, } from "lucide-react"
import { useState,useRef, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog,DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/config";
import { collection,addDoc,onSnapshot} from "firebase/firestore";
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
    const [search , setSearch]=useState('')
    const [searchFilter,setSearchFilter] = useState()

    
    useEffect(()=>{
      setSearchFilter(categoryList.filter(item=>item.name.toLowerCase().includes(search.toLowerCase())))
    },[search])
    useEffect(()=>{
      categoryCollectionRef&&onSnapshot(categoryCollectionRef,(snapshot)=>{
          setCategoryList(
            snapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
          }))
        )
      },(error)=>{
        throw new Error('Cannot retrieve data, chech your internet connection',error.message)
      })
    },[])

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
              Hello Buzz
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
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
                )): search!=''&&searchFilter==''? <div className="p-4 text-xs text-center">Category not found</div>:categoryList.map((item,index)=>(
                  <CategoryItem key={item.id} Category={item.name}/>
                ))}
                

            </div>
          </div>
        </Dialog>
      </div>
    )
  }
  
  export default Categories



const CategoryItem =({Category})=>{
  const [dropState, setDropState] = useState(false)

  return(
    <div className="mb-1">
      <div className="px-0 py-1 mb-1 flex justify-between items-center">
        <p className="text-xs leading-tight font-medium">{Category}</p>
        <div className="  flex gap-3 justify-end items-center">
          <Button variant='outline' className='border text-xs px-3 py-0 rounded-sm'>45</Button>
          <Button variant='secondary' className='px-3 py-0 rounded-sm text-xs font-semibold' size='sm'><Edit2 className="w-4 h-4"/></Button>
          <Button variant='ghost' className='p-0' onClick={()=>{setDropState(!dropState)}}>{dropState?<ChevronUp className="w-4 h-4"/>:<ChevronDown className="w-4 h-4" />}</Button>
        </div>
      </div>
      <Separator />
    </div>
  )
}