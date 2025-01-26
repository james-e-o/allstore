import { useEffect, useState,createContext } from "react";

export const headerValueContext = createContext()

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