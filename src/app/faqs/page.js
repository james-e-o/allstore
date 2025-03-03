'use client'
import { useState,useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store,XIcon } from "lucide-react";
import Image from "next/image"
import { menuX } from "../page";
// import profilePix from '../../public/profilepix2.jpg'
import Link from "next/link";

const Faqs = () => {
  const [dropState, setDropState] = useState(false)
    useEffect(()=>{
      document.onpointerdown = ({target}) => {
        if(dropState&&target.closest('div#drop-box'))return
        else if(dropState) {
          setDropState(!dropState)
        }
      }
    })
  return (
    <div  onScroll={(e)=>{dropState?setDropState(false):''}} className="relative h-full overflow-x-clip z-0 overflow-y-scroll">
      <div id='drop-box' className={dropState?'absolute bg-white border-b border-gray-600 font-Inter font-medium text-lg p-16  w-full top-0 z-30 pointer-events-auto right-0 h-[26rem] transition-[_opacity_150ms_ease-in-out_,_top_150ms_ease-in_]':"absolute font-Inter font-medium text-lg p-16 bg-white opacity-0 left-0 -top-1/2 w-full pointer-events-none -z-50 transition-[_opacity_100ms_ease-in-out_,_top_150ms_ease-in_]"}>
            <div className='flex relative justify-end'><XIcon onClick={()=>setDropState(false)} className="h-9 relative -top-10 -right-7 w-9 p-1"/></div>
            <Link href={'/pricing'} className="decoration-none text-primary"><p className='mb-2 mt-6'>Pricing</p></Link>
            <Link href={'/about'} className="decoration-none text-primary"><p className='mb-3 p-1'>About</p></Link>
            <Link href={'/faqs'} className="decoration-none text-primary"><p className='mb-3 p-1'>FAQs</p></Link>
            <Link href={'/login'} className="decoration-none mx-auto mt-4 text-primary"><Button size='sm' className="rounded-lg px-8 font-Montserrat relative flex justify-center items-center mt-5 py-6 text-base bg-gradient-to-r from-gradient1 to-gradient2"><span>Sign in</span>
            </Button></Link>
      </div>
      <header className=" pl-7 pr-5 backdrop-blur-md border-b items-center sticky top-0 flex justify-between md:px-10 ">
          <Link href={'/'}  className={"z-40 decoration-none font-bold text-black"}><h1 className="font-Madetommy py-3 md:text-2xl text-xl">nexShelf</h1></Link>
          <nav className="flex items-center h-max md:gap-9 gap-3">
            <div className=" gap-5 hidden md:flex">
              <Link href={'/pricing'} className="decoration-none active:bg-[#fafafa] text-xs text-primary pr-5 cursor-pointer py-1 hidden md:block border-r h-full"><p className=''>Pricing</p></Link>
              <Link href={'/about'} className="decoration-none active:bg-[#fafafa] text-xs text-primary pr-5 cursor-pointer py-1 hidden md:block border-r h-full"><p className=''>About</p></Link>
              <Link href={'/faqs'} className="decoration-none active:bg-[#fafafa] text-xs text-primary pr-5 cursor-pointer py-1 hidden md:block border-r h-full"><p className=''>FAQs</p></Link>
            </div>
              
            <Link href={'/login'} className="decoration-none md:hidden"><Button size='sm' variant='outline' className=' md:text-base border-core_polish md:px-4 md:py-4 decoration-none flex items-center justify-center text-black px-3 py-0'><span>Log in</span></Button></Link>
            <div className=" md:ml-3 md:pl-0 h-full pl-3 border-l">
              <Link href={'/login'} className="decoration-none hidden md:inline "><Button size='xs'  variant='outline' className=' md:text-sm h-7 border-core_polish/70 md:px-4 md:py-4 decoration-none flex items-center justify-center px-3 py-0'><span>Log in</span></Button></Link>
              <Button size='sm' variant='ghost' onClick={()=>setDropState(!dropState)} className='border-white md:hidden flex items-center justify-center border px-2 py-0'><span className="fill-black scale-125">{menuX}</span></Button>
            </div>
          </nav>
      </header>
      <main className="md:px-10 sm:px-8 lg:px-12 px-6 py-10">
              <div className="p-4">
                <h1 className="font-Clash text-5xl font-bold">FAQs.</h1>
                <p className="text-xs">Frequently asked questions</p>
              </div>
               {/* <div className="p-4 mb-3">
                    <p className="border-b p-2 font-semibold text-sm">Teams</p>
               </div>
               <div className="p-4 mb-3">
                    <p className="border-b p-2 font-semibold text-sm">Teams</p>
               </div> */}

          </main>
    </div>
  )
}

export default Faqs