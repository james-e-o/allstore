'use client'
import {  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Indiv,google,x } from "../login/page"
import { InputBox } from "../dashboard/inventory/products/add-product/page"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const SignUp = () => {

  const [data, setData] = useState()

  return (
    <div className='h-full flex font-Inter flex-col'>
      <header className="px-5 pt-5 pb-3 justify-start flex">
      <Link href={'/'}  className={"z-40 decoration-none font-bold text-black"}><h1 className="font-Madetommy md:text-3xl text-2xl">nexShelf</h1></Link>    
      </header>
      <p className="pt-4 pb-0 px-5 text-center text-base ">Get Started!</p>
      <div className="px-5 py-1 flex flex-col justify-start flex-grow">

        <Card className='border bg-core_grey2/25 border-white shadow-md'>
          <CardContent className="space-y-2 p-5">
            <form method='post' >
              <p className="inline-block text-gray-500 mt-4 data-[variant=true]:text-core_contrast text-[11px] mr-3">Business information</p>
              <InputBox  error={data && data.emailError} mt l_font={'sm'} font={'base'} label={'Store/Company name'}/>
              <div className="mt-1">
                <InputBox  error={data && data.emailError} l_font={'sm'} font={'base'} label={'Business mail'}/>
              </div>
              <p className="inline-block text-gray-500 mt-4 data-[variant=true]:text-core_contrast text-[11px] mr-3">Your information</p>
              <div className="mt-2">
                <InputBox placeholder={'Admin1'} error={data && data.emailError} l_font={'sm'} font={'base'} label={'Name'}/>
              </div>
              <div className="mt-1">
                <InputBox placeholder={'yourmail@whatmail.com'} error={data && data.emailError} l_font={'sm'} font={'base'} label={'Email'}/>
              </div>

              <Indiv icon={true} error ={data && (data.passwordError || data.passwordError2)} type={'password'} altType={'text'} name={"password"} placehold={"Password"}/> 
              <Indiv icon={true} error ={data && (data.passwordError || data.passwordError2)} type={'password'} altType={'text'} name={"password"} placehold={"re-enter Password"}/>
                 
              <Button className="text-sm mt-4 font-semibold w-full p rounded-md" >Launch store</Button>  
              <p className="w-full pl-1 mt-1"><Link className="text-gray-400 text-[0.73rem] decoration-none" href={'/signin'}>already have a store?  <span className="text-gray-900 text-xs">Login</span></Link></p>              
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignUp