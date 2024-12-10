import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store } from "lucide-react";
import Image from "next/image"

import profilePix from '../../public/profilepix2.jpg'
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-sm">
      <header className="py-4 px-8 items-center flex justify-between">
        <div>
          <h1 className="font-bold font-Madetommy text-2xl">nexShelf</h1>
        </div>
        <nav className="flex gap-3">
          <Link href={'/login'}><Button variant='outline' className='font-medium text-sm' > Login</Button></Link>
          <Link href={'/signup'}><Button className='font-medium text-sm'  >Get Started</Button></Link>
        </nav>
      </header>
      <Separator/>
      <main className="min-h-[80vh] flex flex-col items-center justify-center">
        <div >
          <p className="text-gray-700 max-w-[50vw] font-Clash text-center font-bold text-6xl">Manage your store with ease.</p>
        </div>
        <div className=" text-center text-lg mt-5 max-w-[50vw] font-light ">nexShelf gives you the complete control you need with <span className="font-semibold">effortless product management, categorization and pricing. </span></div>
        <Button className='mt-9 py-2 text-base px-20'><Store/> Get Started</Button>
      </main>
      <Separator/>
      <footer className="p-5">
        <div className="px-7 grid grid-cols-3">
          <div className="p-3 flex flex-col ">
            <p className="font-Madetommy p-1 text-lg font-semibold text-black">nexShelf</p>
            <p className="text-sm p-1 font-extralight">Simplify your ecommerce with nexShelf.</p>
            <p className="p-1">Copyright &copy; {new Date().getFullYear()} - All rights reserved.</p>
          </div>
        </div>
        <div className="flex items-center px-7 mb-7 gap-1 mt-4">
          <Avatar className='flex items-center justify-center'>
            <Image src={profilePix} className="" alt="@storeprobuilder"/>
            {/* <AvatarFallback>JO</AvatarFallback> */}
          </Avatar>
          <p className="ml-2 text-base font-thin">Hello There &#128075;&#127997; I'm <span className="font-semibold text-[slateblue]">James,</span> builder of Storepro. You can view my work on </p>
        </div>
      </footer>
    </div>
  );
}
