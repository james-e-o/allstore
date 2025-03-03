import { useEffect, useState,createContext } from "react";
import { newProductData } from "@/app/dashboard/inventory/products/add-product/page";

export const headerValueContext = createContext()
export const newProductContext = createContext()
export const storeDataContext = createContext()

const HeaderValue = ({children}) => {
     const [headerContext, setHeaderContext] = useState('Dashboard')
     function ResetHeadValue(new_value){
          setHeaderContext(new_value)
     }

     return (
          <headerValueContext.Provider value={{headerContext,ResetHeadValue}}>
               {children}
          </headerValueContext.Provider>  
     )
}

export default HeaderValue


export const NewProductData = ({children}) => {
     const [newProduct, setNewProduct] = useState(newProductData)

     useEffect(()=>{
          console.log(newProduct)
     },[newProduct])
     return (
          <newProductContext.Provider value={{newProduct,setNewProduct}}>
               {children}
          </newProductContext.Provider>  
     )
}



export const StoreData = ({children}) => {
     const [data, setData] = useState({})

     useEffect(()=>{
          console.log(newProduct)
     },[newProduct])
     return (
          <storeDataContext.Provider value={{newProduct,setNewProduct}}>
               {children}
          </storeDataContext.Provider>  
     )
}
