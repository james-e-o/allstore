'use client'
import {  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const Login = () => {

  const [data, setData] = useState()

  return (
    <div className='h-full flex font-Inter flex-col'>
      <header className="p-5 justify-start flex">
        <Link href={'/'}  className="decoration-none text-primary"><h1 className="font-Madetommy text-2xl">adFeed</h1></Link>  
      </header>
      <p className="pt-8 pb-0 px-5 text-center text-base font-semibold">Welcome back!</p>
      <div className="px-5 py-1 flex flex-col justify-start flex-grow">

        <Card className='border-none shadow-none'>
          <CardContent className="space-y-2 p-4">
            <form method='post' >
              <Indiv  error ={data && data.emailError} type={'text'} name={"email"} placehold={"Email"} />
              <Indiv icon={true} error ={data && (data.passwordError || data.passwordError2)} type={'password'} altType={'text'} name={"password"} placehold={"Password"}/> 
              <div className='w-full mb-5 flex justify-between mt-[0.27rem]'> 
                <p className="text-[0.73rem] px-1 flex items-center gap-1">
                  <input type="checkbox" className="border-black text-blue-400 border outline-2" name="remember" id="remember" />
                  <label htmlFor="remember" className="text-gray-500">Remember me</label>
                </p>
                <Link className='text-gray-500 text-[0.73rem]' href={'/makeup'}>forgot details?<span></span></Link>
              </div>    
              <Link href={'/ads'}  className="decoration-none text-primary"><Button className="text-sm font-semibold w-full p rounded-[0.2rem]" >Sign in(view)</Button></Link>
              <p className="w-full pl-1 mt-1"><Link className="text-gray-400 text-[0.73rem] decoration-none" href={'/signup'}>not signed?  <span className="text-gray-900 text-xs">  Create account</span></Link></p>
              <div className="items-center mt-5 relative w-full px-2 after:absolute after:border-b after:w-2/5 after:right-0 after:border-gray-400 after:my-0 before:absolute before:border-b before:w-2/5 before:left-0 before:border-gray-400 before:my-0 flex justify-center"><span className="text-gray-500 relative -top-[2px] text-xs">or</span></div>
              <Button className="text-sm mt-4 font-medium w-full text-gray-500 border-gray-400 rounded-[0.2rem]" variant='outline' >continue with {google}</Button> 
              <Button className="text-sm mt-4 font-medium w-full text-gray-500 border-gray-400 rounded-[0.2rem]" variant='outline' >continue with {x}</Button> 
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login



export const Indiv = ({name, value, placehold, type, error, icon, altType}) => {
  const [inputFocus, setInputFocus] = useState(false)
  const [hide, setHide] =useState(true)
  return (
    <div id='inputdiv' className={inputFocus?"mt-3 w-full z-0 bg-transparent py-1 px-2 h-fit border-gray-400 relative border rounded-[0.2rem] ":"mt-3 w-full z-0 bg-transparent py-1 px-2 h-fit border-gray-300 relative border rounded-[0.2rem]"}>
      <p aria-disabled className={inputFocus?"bg-white inline-block rounded ml-1 absolute text-gray-500 text-[0.65rem] transition-all -top-2 px-1 py-0 -z-[1]":"bg-white inline-block rounded ml-1 absolute text-gray-500 text-sm transition-all top-3 px-1 py-0 -z-[1]"}>{placehold}</p>
      {/* {icon && inputFocus?<div className="left-[88%] top-2 absolute inline-block z-20" onClick={()=>setHide(!hide)}>{hide?<Eye className='w-4 h-4'/>:<EyeOff className='w-4 h-4'/>}</div>:""} */}
      <input className="border-none outline-none bg-transparent h-9 top-[0.54rem] w-full z-20 pl-1" name={name} onInput={(e)=>{e.preventDefault(),value}} onFocus={(e)=>{e.preventDefault(); setInputFocus(true)}} onBlur={(e)=>{ if (e.target.value.length===0) {setInputFocus(false); if(!hide)setHide(!hide)} else {setInputFocus(true)}}} type={!hide?altType:type}/>
      <p className='absolute text-red-500 font-extralight italic top-8 text-[0.65rem]'>{error}</p>
    </div>
  )
}


export const google = <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="17px" height="17px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>

export const x = <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="22px" height="22px"><path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"/></svg>