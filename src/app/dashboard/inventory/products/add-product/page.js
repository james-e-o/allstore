'use client'
import { useEffect, useState,useContext } from "react"
import { Edit, MoveLeftIcon, Plus, ScanBarcode, Trash2, XIcon,Check, CornerDownRight, CornerDownLeft, Eraser, Loader2, Indent, Bold, Italic, Strikethrough, Save, Import } from "lucide-react"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {  Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import InputBox from "@/components/input-box";
import VolumeCalculator from "@/components/volume-calculator";
import WholesaleDiscount from "@/components/wholesale-discount";
import Variant, { EshopVariants } from "@/components/variants"
import AddImage from "@/components/add-image"
import CollapseBox from "@/components/collapse-box"
import { headerValueContext,newProductContext } from "@/components/context-values";
import db from "@/config/firestore";
import { collection,addDoc,onSnapshot,updateDoc,deleteDoc,getDoc,getDocs,doc} from "firebase/firestore";
import { buildCategoryTree } from "../../categories/new-product-category/page"
import WeightSelection from "@/components/weight-selector"
import Tiptap from "@/components/tiptap-editor"
import DashboardHeader from "@/components/dashboard-header"

import React from 'react'

export const newProductData =  {
  productName:"",
  brand:"",
  barcode:"",
  dimension:{L:"",W:"",H:""},
  weight:``,
  category:``,
  costPrice:``,
  sellingPrice:``,
  margin:50,
  profit:``,
  optionsets:[],
  
}


const categoryCollectionRef = collection(db,'categories')

const AddProduct = () => {
    // UI
    const {headerContext,ResetHeadValue} = useContext(headerValueContext)
    const [editSEO,setEditSEO]=useState(false)

    // DATA
    const {newProduct,setNewProduct} = useContext(newProductContext)
    const [optionSets,setOptionSets]=useState([])
    const [description,setDescription] = useState('')
    const [seoData,setSeoData]=useState([])
    
    function Submit(e){
      e.preventDefault()
    }

    useEffect(()=>{
        ResetHeadValue('Products')
    },[])
    
    return (
      <div className="px-1 md:pl-3 md:pr-0 flex h-full  w-full overflow-x-hidden flex-col">
        <DashboardHeader section={'Add product'} size={'xs'}/>
        <div className="flex w-full justify-end gap-3 my-2 items-center">
          <div className="flex items-center gap-2">
            <Link href={'/dashboard/inventory/products'}><Button size='sm ' className='py-3px bg-white shadow border px-3' variant='ghost'>
                <MoveLeftIcon className="w-4 h-4 mr-1"/>
                <span className="text-core_polish font-light">All products</span>
            </Button></Link>
            <Button size='sm ' className='py-3px bg-white shadow border px-3' variant='ghost'>
                <Import className="w-4 h-4 mr-1"/>
                <span className="text-core_polish font-light">import</span>
            </Button>
            <Button size='sm ' className='py-3px border px-3'>
                <Save className="w-4 h-4 mr-1"/>
                <span className=" font-light">save</span>
            </Button>
          </div>
        </div> 
              
        <form onSubmit={Submit} className="flex flex-col flex-grow w-full no_scroll overflow-x-clip overflow-y-scroll" action="">          
          <section className="flex flex-col">
            <p className=" text-9px pl-2px">Product information</p>
            <div className="flex flex-col md:flex-row md:justify-between gap-2">
              <div className="flex md:w-4/6 w-full flex-col">
                <div className="p-2 bg-blue-50 border border-white/60 flex-col md:pt-5 md:px-6 md:pb-5 rounded-xl w-full">
                  <p className=" font-Voces pl-2px mb-1 font-semibold ">Product details</p>
                  <InputBox flexdir={'row'} mt value={newProduct.productName} change={({target})=>{setNewProduct(prev=>({...prev,productName:target.value}))}} placeholder={'Product name...'} label={'Product name:'} />
                  <div className="flex flex-col mt-1 md:flex-row md:gap-2 md:items-center">                
                    <InputBox margin={'8px 0px 0px'} label={'Brand:'} mt value={newProduct.brand} change={({target})=>{setNewProduct(prev=>({...prev,brand:target.value}))}} flexdir={'row'} placeholder={'Brand...'} />               
                    <div className="flex gap-2 items-end w-full flex-grow">
                      <InputBox placeholder={'Barcode...'} label={'Barcode:'} mt value={newProduct.barcode} change={({target})=>{setNewProduct(prev=>({...prev,barcode:target.value}))}} flexdir={'row'}/>
                      <Button variant="outline" className="mt-2 h-full bg-white text-right w-fit p-2">
                        <ScanBarcode />
                      </Button>

                    </div>              
                  </div>
                  <div className="mt-2">
                    <p className="block mr-3">Dimensions</p>
                    <div className="">
                      <InputBox width={'70px'} mr type={'number'} value={newProduct.dimension.L} change={({target})=>{setNewProduct(prev=>({...prev,dimension:{...prev.dimension,L:target.value}}))}} shortInput mt label={'L:'} flexdir={'row'}/>
                      <InputBox width={'70px'} mr type={'number'} value={newProduct.dimension.W} change={({target})=>{setNewProduct(prev=>({...prev,dimension:{...prev.dimension,W:target.value}}))}} shortInput mt label={'W:'} flexdir={'row'}/>
                      <InputBox width={'70px'} mr type={'number'} value={newProduct.dimension.H} change={({target})=>{setNewProduct(prev=>({...prev,dimension:{...prev.dimension,H:target.value}}))}} shortInput mt label={'H:'} flexdir={'row'}/>
                    </div>
                  </div>
                  <WeightSelection />
                </div>
               
                <Pricing optionSets={optionSets} setOptionSets={(name,values)=>{setOptionSets(prev=>[...prev,{name:name,values:values}])}}/>
               
              </div>

              <div className="flex md:w-[32%] w-full flex-col">
                <div className="w-full rounded-xl bg-blue-50 border border-white/60 p-2 md:px-3 md:py-5">
                  <p className=" font-Voces pl-2px mb-1 font-semibold "> Select product category</p>
                    <Categories/>
                </div>
                <p className=" text-9px mt-2 mb-1">Store information</p>
                <div className="flex w-full p-2 md:p-3 bg-blue-50 border border-white/60 rounded-xl flex-col">
                  <p className=" text-gray-500 text-9px mb-1 mt-2">Created by: {'staff007'}</p>
                  <div className="flex flex-col gap-1 md:items-start">                
                    <InputBox shortInput label={'Reorder quantity'} type={'number'} mt fit flexdir={'row'} inputDir={'input-reverse'} icon={<span className="text-[10px]">units</span>}/>            
                    <InputBox shortInput label={'SKU'} fit flexdir={'row'} mt inputDir={'input-reverse'}/>            
                    <InputBox shortInput label={'Shelf No.'} type={'number'} mt fit flexdir={'row'} inputDir={'input-reverse'} icon={<span className="text-[10px]"></span>}/>               
                  </div>
                </div>

              </div>
            </div>
          </section>

          <section className="flex mt-1 flex-col">
            {/* <Separator className='mt-1' /> */}
            <p className=" text-9px mt-2 mb-1">E-Shop information</p>
            <div className="flex flex-col md:flex-row md:justify-between gap-3">
              <div className="flex md:w-4/6 w-full flex-col">

                <div className="p-2 bg-blue-50 border border-white/60 flex-col md:pt-4 md:px-5 md:pb-5 rounded-xl w-full">
                  <p className=" font-Voces font-semibold ">Product description</p>
                  <Tiptap />
                  <p className="mt-4 font-Voces font-semibold ">Media</p>
                  <AddImage />
                </div>

                <div className="p-2 mt-4 bg-blue-50 border border-white/60 flex-col md:pt-4 md:px-5 md:pb-5 rounded-xl w-full">
                  <p className="  font-Voces font-semibold ">Manage product variants on E-Shop</p>
                    <EshopVariants Prop={newProduct.optionsets}/>
                </div>

                <div className="p-2 mt-4 bg-blue-50 border border-white/60 flex-col md:pt-4 md:px-5 md:pb-5 rounded-xl w-full">
                  <Button onClick={()=>{setEditSEO(true)}}  variant='ghost' size='xs' className='p-0 h-fit float-right'>Edit</Button>
                  <p className="  font-Voces font-semibold ">Search engine optimization</p>
                  <div className={`grid transition-collapse ${editSEO ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden w-full">           
                        <InputBox mt label={'Page title'} />
                        <InputBox mt label={'Meta description'} textarea row={4} ghost />
                        <InputBox mt label={'URL'} />
                      </div>
                  </div>
                </div>

              </div>
              <div className="flex md:w-[32%] w-full bg-blue-50 border border-white/60 rounded-xl h-fit p-2 md:px-3 flex-col">
                <CollapseBox subject={"Warranty"}>
                  <div className="h-fit mt-1">
                    <InputBox textarea row={4} ghost />
                  </div>
                </CollapseBox>
                <div className="mt-3">
                  <p className="inline-block font-semibold mr-3">Return policy</p>
                  <div className="h-fit mt-1">
                    <InputBox textarea row={4} ghost />
                  </div>
                </div>
              </div>

            </div>
          </section>
          <div className="p-2 mt-3 bg-blue-50 border border-white/60 justify-end md:pt-4 md:px-5 md:pb-4 rounded-xl w-full">
            <Button size='sm ' className='py-1 text-xs border float-right px-3'>
                <Save className="w-4 h-4 mr-1"/>
                <span className=" font-light">save</span>
            </Button>
          </div>
        </form>
      </div>
    )
  }
  
  export default AddProduct


  
export const Pricing =({optionSets,setOptionSets})=>{
  //UI
  const [toggleVariant,setToggleVariant]=useState(false)
  const [piecePrice,setPiecePrice]=useState(false)
  const [bulkDiscount,setBulkDiscount]=useState(false)

  //DATA
  const {newProduct,setNewProduct} = useContext(newProductContext)
  const [costPrice,setCostPrice]=useState(0)
  const [wholesaleDiscount,setWholesaleDiscount]=useState(0)
  const [margin,setMargin]=useState('50')
  const [profit,setProfit]=useState('')
  const [sellingPrice,setSellingPrice]=useState(0)


  function computeCostPriceMargin(){
    const computedMargin = margin/100
    const computedProfit = computedMargin*costPrice
    setProfit(computedProfit)
    computeSellingPrice(computedProfit)
  }

  function computeSellingPrice(value){
    let _SP = value + costPrice
    setSellingPrice(new Number(_SP).toFixed())
  }

  
  useEffect(()=>{
   computeCostPriceMargin()
  },[costPrice,margin])
 

  return(
    <div className="">
      <div className="p-2 bg-blue-50 border border-white/60 mt-3 md:mt-5 flex-col md:p-6 rounded-xl w-full">
          <p className=" font-Voces font-semibold ">Pricing</p>
          <div className="flex gap-1 max-h-min items-start flex-col w-full flex-grow">
            <div className="grid gap-1 items-center w-full grid-cols-[_repeat(auto-fit,minmax(200px,_0.8fr))_]">
              <div className="inline-block">
                <InputBox width={'195px'} label={'Unit cost price'} value={newProduct.costPrice?newProduct.costPrice:""} change={(e)=>{setNewProduct(prev=>({...prev,costPrice:new Number(e.target.value)}))}} flexdir={'row'}  type={'number'} mt icon={'$'}/>
              </div>
              <div className="inline-flex  items-center">
                <InputBox width={'120px'} label={'Margin'} mt inputDir={'input-reverse'}  change={(e)=>{setNewProduct(prev=>({...prev,margin:new Number(e.target.value)}))}} flexdir={'row'} value={newProduct.margin} type={'number'} icon={'%'}/>
              </div>

              <div className="inline-block" >
                <InputBox width={'180px'} label={'Profit'}  value={newProduct.profit?newProduct.profit:""} change={(e)=>{setNewProduct(prev=>({...prev,profit:new Number(e.target.value)})),computeSellingPrice(new Number(e.target.value)),e.target.value==""?computeSellingPrice(costPrice*(margin/100)):""}} flexdir={'row'}  type={'number'} mt icon={'$'}/>
              </div>           
            </div>
            <div className=" mt-1">
              <InputBox fit label={'Unit selling price'} value={sellingPrice?sellingPrice:""} change={(e)=>{new Number(e.target.value)}} flexdir={'row'}  type={'number'} mt icon={'$'}/>
            </div>
              
            <div className='flex mt-2 w-full items-center'>
              <p data-variant={bulkDiscount} className="inline-block text-gray-500 pl-2px data-[variant=true]:text-core_contrast mr-3">Wholesale discount</p>
              <Switch disabled={!sellingPrice} className='data-[state=unchecked]:bg-core_contrast/40 scale-75 shadow' checked={bulkDiscount} onCheckedChange={()=>setBulkDiscount(!bulkDiscount)} />
            </div>
            <div className={`grid transition-collapse ${bulkDiscount ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden w-full">           
                <WholesaleDiscount output={wholesaleDiscount} setOutput={(val)=>{setWholesaleDiscount(val)}} sellingPrice={sellingPrice}/>
              </div>
            </div>

            <div className='flex mt-2 w-full items-center'>
              <p data-variant={piecePrice} className="inline-block text-gray-500 pl-2px data-[variant=true]:text-core_contrast mr-3">Sell in measurable quantity/pieces</p>
              <Switch disabled={!costPrice} className='data-[state=unchecked]:bg-core_contrast/40 scale-75 shadow' checked={piecePrice} onCheckedChange={()=>setPiecePrice(!piecePrice)} />
            </div>
            <div className={`grid w-full transition-collapse ${piecePrice ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden w-full">
                <VolumeCalculator sp={sellingPrice}/>
              </div>
            </div>
          </div>
      </div>

      <Variant costPrice={costPrice.toString()} sellingPrice={sellingPrice.toString()}/>
    </div>
  )
}



const Categories =({})=>{
  const [categoryList,setCategoryList] = useState([])
  const [isLoading,setIsLoading]=useState(true)
  const [category,setCategory] = useState('')
  const {newProduct,setNewProduct} = useContext(newProductContext)
  
  const categoryTree = buildCategoryTree(categoryList);

  useEffect(()=>{
      getDocs(categoryCollectionRef).then((snapshot) => {
          setIsLoading(true)
          let data =[]
          snapshot.docs.forEach((doc)=>{
            data.push({              
              ...doc.data(),
              id:doc.id
            })
          })
          setCategoryList(data)
          setIsLoading(false)
          console.log(data)
        }).catch(error=>{
          setIsLoading(false)
        console.log(error)
      })
  },[])

  return (
    <div className="mt-2">
      {categoryList.length? <CheckboxTree categoryList={categoryList} handleCheckboxChange={(id)=>{setNewProduct(prev=>({...prev,category:id})),console.log(id)}} checked={newProduct.category} categories={categoryTree}/>:
      <p className="h-12 flex justify-center items-center text-center">{isLoading?"Loading...":" No results."}</p> }
      <p className="h-fit gap-3 flex justify-start items-center text-center">
        <Button onClick={()=>{setCategory('')}} variant='ghost' size={'xs'} className='mt-1  hover:bg-core_contrast/15 bg-core_contrast/10'><Eraser className="p-2px"/></Button>
        <Button onClick={()=>{setCategory('')}} variant='ghost' size={'xs'} className='mt-1  hover:bg-core_contrast/15 bg-core_contrast/10'><Plus className="p-2px"/>Add category</Button>
      </p>
    </div>
  )
}


const CheckboxTree = ({categoryList, categories,handleCheckboxChange,checked }) => {
  const [newCategoryName,setNewCategoryName] = useState('')
  const [slug,setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [parent, setParent] = useState('')
  const [uploading,setUploading] = useState(false)

  function convertToSlug(input) {
    let newValue= input.toString().toLowerCase().replace(/['"]/g, '').trim().replace(/\band\b/g, '&').replace(/[^a-z0-9\&-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').replace(/&/g, 'and') 
    setSlug(newValue)
  }
  function capitalize(input) {
    let newValue= input.toString().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ').replace(/\bAnd\b/g, '&')
    setNewCategoryName(newValue)
  }

  function categorySetup(data){
    capitalize(data)
    convertToSlug(data)
  }

  function createCategory(parentId){
    setParent(parentId)
    if (newCategoryName === ''){
      return
     } else if(slug === ''){
       return
     }
     setUploading(true)
     addDoc(categoryCollectionRef,{
      name:newCategoryName,
      parent:parentId,
      slug:slug,
      description,
      subcategories:[]
    }).then(newdoc=>{
      categoryList.forEach(category=>{
        if(category.id == parent){
          getDoc(doc(db,'categories',parent)).then(parentDoc =>{
            updateDoc(doc(db,'categories',parent),{
              subcategories:[...parentDoc.data().subcategories,newdoc.id]
            })
          })
        }
      })
      setNewCategoryName('');setDescription('');setSlug('');setParent();  setUploading(false)
    }).catch(error=>{
      console.log(error)
      setUploading(false)
    })    
  }

  function blurOut (){
    console.log(newCategoryName,slug)
    // setNewCategoryName('')
    // setSlug('')
  }
  
  const renderCategories = (categories, level = 0) => {
    return categories.map((category) => (
      <div key={category.id} style={{ marginLeft: `${level + 19}px` }}>
          <label className="my-[2px] inline-flex items-center">
            <input
              type="checkbox"
              checked={checked==category.id}
              onChange={() => handleCheckboxChange(category.id)}
            />
            <span className="mx-2">{category.name}</span>
            <DropInput blur={()=>blurOut()} loading={uploading} createCategory={()=>{createCategory(category.id)}} newCategory={newCategoryName} setNewCategory={(value)=>{categorySetup(value)}}/>
          </label>
        {category.children && renderCategories(category.children, level + 1)}
      </div>
    ));
  };
  
  return <div className="-ml-4">{renderCategories(categories)}</div>;
}

const DropInput =({newCategory,setNewCategory,blur,createCategory,loading})=> {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='xs' className='rounded-sm hover:bg-gray-300 py-1 h-4 w-3 px-3'><Plus className=""/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
          <p className="inline-flex items-center"><input  placeholder="Add subcategory..." className='h-5 rounded-e-none outline-transparent focus-visible:outline-none ml-1 w-24 rounded-s-md' value={newCategory} onBlur={()=>{blur()}} onChange={({target})=>{setNewCategory(target.value)}}/><Button size='icon' onClick={()=>{createCategory()}} disabled={!newCategory} className='px-1 rounded-e-md rounded-s-none w-fit h-5'>{loading?<Loader2 className="animate-spin" />:<Check className=''/>}</Button></p>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}