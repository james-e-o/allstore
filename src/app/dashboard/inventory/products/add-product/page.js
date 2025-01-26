'use client'
import { useEffect, useState,useContext } from "react"
import { Edit, MoveLeftIcon, Plus, ScanBarcode, Trash2, XIcon } from "lucide-react"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import InputBox from "@/components/input-box";
import VolumeCalculator from "@/components/volume-calculator";
import WholesaleDiscount from "@/components/wholesale-discount";
import Variant from "@/components/variants"
import AddImage from "@/components/add-image"
import CollapseBox from "@/components/collapse-box"
import { headerValueContext } from "@/components/head-value";
import db from "@/config/firestore";
import { collection,addDoc,onSnapshot,updateDoc,deleteDoc,getDoc,getDocs,doc} from "firebase/firestore";
import { buildCategoryTree,CheckboxTree } from "../../categories/new-product-category/page"

const categoryCollectionRef = collection(db,'categories')

const AddProduct = () => {
    const [categoryList,setCategoryList] = useState([])
    const categoryTree = buildCategoryTree(categoryList);
    const {headerContext,ResetHeadValue} = useContext(headerValueContext)

    // DATA
    const [category,setCategory] = useState('')
    
    
    function Submit(e){
      e.preventDefault()
    }

    useEffect(()=>{
        ResetHeadValue('Products')
        getDocs(categoryCollectionRef).then((snapshot) => {
            let data =[]
            snapshot.docs.forEach((doc)=>{
              data.push({              
                ...doc.data(),
                id:doc.id
              })
            })
            setCategoryList(data)
            console.log(data)
          }).catch(error=>{
          console.log(error)
        })
    },[])
    
    return (
      <div className="px-1 md:px-3 py-1 flex h-full  w-full overflow-x-hidden flex-col">
        <div className="flex w-full justify-end gap-3 mt-[5px] items-center">
          <p className='font-bold pb-1px'>Add product</p>
          <Link href={'/dashboard/inventory/products'}><Button size='sm ' className='py-3px border px-3' variant='ghost'>
              <MoveLeftIcon className="w-4 h-4 mr-1"/>
              <span className="text-core_polish font-light">All products</span>
          </Button></Link>
        </div> 
              
        <form onSubmit={Submit} className="flex flex-col flex-grow w-full no_scroll overflow-x-clip overflow-y-scroll" action="">          
          <section className="flex flex-col">
            <p className=" text-9px pl-[2px] mb-[2px]">Product information</p>
            <div className="flex flex-col md:flex-row md:justify-between gap-3">
              <div className="flex md:w-4/6 w-full flex-col">
                <div className="p-2 bg-core_grey2 flex-col md:pt-5 md:px-6 md:pb-5 rounded-xl w-full">
                  <p className=" font-Voces font-semibold ">Product details</p>
                  <InputBox flexdir={'row'} mt placeholder={'Product name...'} label={'Product name:'} />
                  <div className="flex flex-col mt-1 md:flex-row md:gap-2 md:items-center">                
                    <InputBox margin={'8px 0px 0px'} label={'Brand:'} mt flexdir={'row'} placeholder={'Brand...'} />               
                    <div className="flex gap-2 items-center w-full flex-grow">
                      <InputBox placeholder={'Barcode...'} label={'Barcode:'} mt flexdir={'row'}/>
                      <Button variant="outline" className="mt-2 h-full bg-white text-right w-fit p-2">
                        <ScanBarcode />
                      </Button>

                    </div>              
                  </div>
                  <div className="my-1">
                    <p className="inline-block mr-3">Dimensions</p>
                    <InputBox fit mt mr label={'W:'} flexdir={'row'}/>
                    <InputBox fit mt mr label={'H:'} flexdir={'row'}/>
                    <InputBox fit mt mr label={'L:'} flexdir={'row'}/>
                  </div>
                  <InputBox fit mt label={'Weight or Volume:'} flexdir={'row'}/>
                </div>
               
                <Pricing />
               
              </div>

              <div className="flex md:w-[31%] w-full flex-col">
                <div className="w-full rounded-xl bg-core_grey2 p-2 md:p-3">
                  <p className=" p-1  mb-1">Product categorization</p>
                  <div className="">
                  {categoryList&& <CheckboxTree handleCheckboxChange={(id)=>{setCategory(id)}} checked={category} categories={categoryTree}/>}
                  </div>
                </div>
                <p className=" text-9px my-1">Store information</p>
                <div className="flex w-full p-2 md:p-3 bg-core_grey2 rounded-xl flex-col">
                  <p className=" text-[11px] text-gray-500 mt-2">Created by {'user id'}</p>
                  <div className="flex flex-col md:gap-4 md:items-center">                
                    <InputBox label={'Bulk quantity:'} type={'number'} mt fit flexdir={'row'} inputDir={'input-reverse'} icon={<span className="text-[10px]">units</span>}/>               
                    <InputBox label={'Reorder quantity:'} type={'number'} mt fit flexdir={'row'} inputDir={'input-reverse'} icon={<span className="text-[10px]">units</span>}/>            
                  </div>
                </div>

              </div>
            </div>
          </section>

          <section className="flex flex-col">
            {/* <Separator className='mt-1' /> */}
            <p className=" text-9px my-1">E-Shop information</p>
            <div className="flex flex-col md:flex-row md:justify-between gap-3">
              <div className="flex md:w-4/6 w-full flex-col">

                <div className="p-2 bg-core_grey2 flex-col md:pt-4 md:px-5 md:pb-5 rounded-xl w-full">
                  <p className=" font-Voces font-semibold ">Add image</p>
                  <AddImage />
                  <div className="bg-white shadow rounded-lg p-4 md:px-5">
                    <p className="  mb-1">Description</p>              
                    <InputBox textarea mt row={4}/>                
                  </div>
                </div>

              </div>
              <div className="flex md:w-[31%] w-full bg-core_grey2 rounded-xl h-fit p-2 md:p-4 flex-col">
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
        </form>
      </div>
    )
  }
  
  export default AddProduct


  
export const Pricing =({})=>{
  //UI
  const [toggleVariant,setToggleVariant]=useState(false)
  const [piecePrice,setPiecePrice]=useState(false)
  const [bulkDiscount,setBulkDiscount]=useState(false)

  //DATA
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
      <div className="p-2 bg-core_grey2 mt-3 md:mt-5 flex-col md:p-6 rounded-xl w-full">
          <p className=" font-Voces font-semibold ">Pricing</p>
          <div className="flex gap-1 max-h-min items-start flex-col w-full flex-grow">
            <div className="grid gap-1 items-center w-full grid-cols-[_repeat(auto-fit,minmax(200px,_0.8fr))_]">
              <div className="inline-block">
                <InputBox width={'195px'} label={'Unit cost price'} value={costPrice?costPrice:""} change={(e)=>{setCostPrice(new Number(e.target.value))}} flexdir={'row'}  type={'number'} mt icon={'$'}/>
              </div>
              <div className="inline-flex  items-center">
                <InputBox width={'120px'} label={'Margin'} mt inputDir={'input-reverse'}  change={(e)=>{setMargin(new Number(e.target.value))}} flexdir={'row'} value={margin} type={'number'} icon={'%'}/>
              </div>

              <div className="inline-block" >
                <InputBox width={'180px'} label={'Profit'}  value={profit?profit:""} change={(e)=>{setProfit(new Number(e.target.value)),computeSellingPrice(new Number(e.target.value)),e.target.value==""?computeSellingPrice(costPrice*(margin/100)):""}} flexdir={'row'}  type={'number'} mt icon={'$'}/>
              </div>           
            </div>
            <div className=" mt-1">
              <InputBox fit label={'Unit selling price'} value={sellingPrice?sellingPrice:""} change={(e)=>{new Number(e.target.value)}} flexdir={'row'}  type={'number'} mt icon={'$'}/>
            </div>
              
            <div className='flex mt-2 w-full items-center'>
              <p data-variant={bulkDiscount} className="inline-block text-gray-500 data-[variant=true]:text-core_contrast text-[11px] mr-3">Wholesale discount</p>
              <Switch disabled={!sellingPrice} className='data-[state=unchecked]:bg-core_contrast/40 scale-75 shadow' checked={bulkDiscount} onCheckedChange={()=>setBulkDiscount(!bulkDiscount)} />
            </div>
            <div className={`grid transition-collapse ${bulkDiscount ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden w-full">           
                <WholesaleDiscount output={wholesaleDiscount} setOutput={(val)=>{setWholesaleDiscount(val)}} sellingPrice={sellingPrice}/>
              </div>
            </div>

            <div className='flex mt-2 w-full items-center'>
              <p data-variant={piecePrice} className="inline-block text-gray-500 data-[variant=true]:text-core_contrast text-[11px] mr-3">Sell in measurable quantity/pieces</p>
              <Switch disabled={!costPrice} className='data-[state=unchecked]:bg-core_contrast/40 scale-75 shadow' checked={piecePrice} onCheckedChange={()=>setPiecePrice(!piecePrice)} />
            </div>
            <div className={`grid transition-collapse ${piecePrice ? " grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
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






