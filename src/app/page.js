'use client'
import { useState,useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store,XIcon } from "lucide-react";
import Image from "next/image"

import profilePix from '../../public/profilepix2.jpg'
import Link from "next/link";

export default function Home() {
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
    <div onScroll={(e)=>{dropState?setDropState(false):''}} className="relative h-full overflow-x-clip z-0 overflow-y-scroll">
      <div id='drop-box' className={dropState?'absolute bg-white border-b border-gray-600 font-Inter font-medium text-lg p-16  w-full top-0 z-30 pointer-events-auto right-0 h-[26rem] transition-[_opacity_150ms_ease-in-out_,_top_150ms_ease-in_]':"absolute font-Inter font-medium text-lg p-16 bg-white opacity-0 left-0 -top-1/2 w-full pointer-events-none -z-50 transition-[_opacity_100ms_ease-in-out_,_top_150ms_ease-in_]"}>
            <div className='flex relative justify-end'><XIcon onClick={()=>setDropState(false)} className="h-9 relative -top-10 -right-7 w-9 p-1"/></div>
            <Link href={'/#'} className="decoration-none text-primary"><p className='mb-2 mt-6'>Pricing</p></Link>
            <Link href={'/#'} className="decoration-none text-primary"><p className='mb-3 p-1'>About</p></Link>
            <Link href={'/#'} className="decoration-none text-primary"><p className='mb-3 p-1'>FAQs</p></Link>
            <Link href={'/signin'} className="decoration-none mx-auto mt-4 text-primary"><Button size='sm' className="rounded-lg px-8 font-Montserrat relative flex justify-center items-center mt-5 py-6 text-base bg-gradient-to-r from-gradient1 to-gradient2"><span>Sign in</span>
            </Button></Link>
      </div>
      <header className="py-4 px-8 items-center flex justify-between md:px-10 md:pt-7 md:pb-5">
          <Link href={'/'}  className={"z-40 decoration-none font-bold text-black"}><h1 className="font-Madetommy md:text-3xl text-2xl">nexShelf</h1></Link>
          <nav className="flex gap-3">
            <Link href={'/signin'} className="decoration-none"><Button size='sm' variant='outline' className=' md:text-base border-core_polish md:px-4 md:py-4 decoration-none flex items-center justify-center text-black px-3 py-0'><span>Log in</span></Button></Link>
            <Button size='sm' onClick={()=>setDropState(!dropState)} className='border-white flex items-center justify-center border px-2 py-0'><span className="fill-white">{menu}</span></Button>
          </nav>
      </header>
      <Separator/>
      <main className="min-h-[75svh] flex flex-col px-10 items-center justify-center">
        <div >
          <p className="text-4xl text-center font-bold text-core_contrast font-Clash md:text-6xl">Manage your store with ease.</p>
        </div>
        <div className=" text-center text-lg mt-5 font-light ">nexShelf gives you the complete control you need with <span className="font-semibold">effortless product management, categorization and pricing. </span></div>
      
        <Link href={'signup'} className="decoration-none mx-auto"><Button className="md:text-lg bg-core_polish text-base mt-10 px-10 md:px-20 py-5" ><Store/>Open Store</Button></Link>
      </main>
      <Separator/>
      <footer className="p-5 text-sm">
        <div className="px-0 md:px-7 md:grid-cols-3 grid grid-cols-1">
          <div className="p-3 flex flex-col ">
            <p className="font-Madetommy p-1 text-lg font-semibold text-black">nexShelf</p>
            <p className="text-sm px-1 font-extralight">Simplify your commerce with nexShelf.</p>
            <p className="p-1">Copyright &copy; {new Date().getFullYear()} - All rights reserved.</p>
          </div>
        </div>
        <div className="flex items-center md:px-7 mb-3 md:mb-7 gap-1 mt-4">
          <Avatar className='flex items-center justify-center'>
            <Image src={profilePix} className="" alt="@storeprobuilder"/>
            {/* <AvatarFallback>JO</AvatarFallback> */}
          </Avatar>
          <p className="ml-2 font-thin">Hello There &#128075;&#127997; I'm <span className="font-semibold text-[slateblue]">James,</span> builder of nexShelf. You can view my work on <a className="underline text-[slateblue]" href="https://profile-beige-one.vercel.app/">profile</a></p>
        </div>
      </footer>
    </div>
  );
}

export const menu = <svg data-name="Layer 1" className="w-5 h-5" id="Layer_1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M21.86,18.73H9.18a2,2,0,0,1,0-4H21.86a2,2,0,0,1,0,4Z"/><path d="M54.82,18.73H34.88a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/><path d="M54.82,34H9.18a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/><path d="M54.82,49.27H30.07a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/></svg>
