'use client'
import { useContext } from "react"
import { headerValue } from "../layout"

const Purchases = () => {
  
  return (
    <headerValue.Provider value={'Purchases'}>
      <div>
          Purchases
      </div>
    </headerValue.Provider>
  )
}
  
  export default Purchases