'use client'
import { Button } from "@/components/ui/button";
import { MoveLeftIcon } from "lucide-react"
import { useState,useRef, useEffect } from "react";
import { Dialog,DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { InputBox } from "../../add-product/page";
import { db } from "@/firebase/config";
import { collection,addDoc,onSnapshot,updateDoc,deleteDoc,getDoc,getDocs, snapshotEqual } from "firebase/firestore";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { redirect } from "next/navigation";

const categoryCollectionRef = collection(db,'categories')

const AddCategory = () => {
    const [categoryList,setCategoryList] = useState([])
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
        redirect('/dashboard/inventory/categories')
      }).catch(error=>{
        console.log(error)
      })    
    }

    useEffect(()=>{
       getDoc(categoryCollectionRef).then((snapshot) => {
          let data =[]
          snapshot.docs.forEach((doc)=>{
            data.push({              
              ...doc.data(),
              id:doc.id
            })
          })
          setCategoryList(data)
          console.log(data)
       })
    },[category,parent])
  
    return (
        <div className="bg-white flex flex-col h-full overflow-y-scroll flex-grow rounded-md">
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
            <div className="p-2 flex w-full justify-between items-center font-Inter ">
              <p className='px-0 py-1 font-bold'>Add category</p>
            </div>
            <div className="text-xs justify-end my-1 flex ">
                <Link href={'/dashboard/inventory/categories/'}><Button className='p-2' variant='ghost'>
                    <MoveLeftIcon className="w-4 h-4 mr-1"/>
                    <span className="text-gray-500 text-xs font-light">All categories</span>
                </Button></Link>
            </div>
            <Separator />
            <div className="">
                <form id="category-form" onSubmit={createCategory}>
                    <InputBox placeholder={'category name...'} label={'Category name'} change={({target})=>{capitalize(target.value),convertToSlug(target.value)}} error={error==='name'} value={category}/>

                    <DialogTrigger asChild>
                      <InputBox placeholder={'select parent category...'} label={'Parent category'} change={({target})=>{}} readonly={true} value={parent}/>
                    </DialogTrigger>

                    <InputBox placeholder={'slug...'} label={'Slug'} change={({target})=>{capitalize(target.value),convertToSlug(target.value)}} error={error==='slug'} value={slug} note={`The 'slug' is the url friendly version of the name. it is usually all lowercase and contains only letters, numbers and hyphens`}/>

                    <InputBox placeholder={'description...'} textarea={true} row={3} label={'Description'} change={(e)=>{setDescription(e.target.value)}} error={error==='description'} value={description} note={`details about this category`}/>
                
                    <div className="flex gap-3 ">
                        <Button className='mt-2 w-full border-none text-xs rounded-md bg-core_polish font-semibold'>Create</Button>
                    </div>
                </form>
            </div>
            </Dialog>
      </div>
    )
  }
  

  export default AddCategory