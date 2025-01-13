'use client'
import { Button } from "@/components/ui/button";
import { MoveLeftIcon, Plus, Search,Check, ChevronsUpDown, ChevronUp, ChevronDown, Edit2, } from "lucide-react"
import { useState,useRef, useEffect } from "react";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Dialog,DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
// import { cn } from "@/lib/utils"
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
// import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
import db from "@/config/firestore";
import { collection,addDoc, } from "firebase/firestore";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area"

const categoryCollectionRef = collection(db,'categories')
 const Brands = ({changeInterface,categoryList}) => {

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
  
    function createBrand(e){
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
        <div className="bg-white flex flex-col h-full overflow-y-scroll flex-grow rounded-md p-1 mt-2">
            Brands
        </div>
    )
  }
  

  export default Brands