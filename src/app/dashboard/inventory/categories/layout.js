import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
// import { db } from "@/firebase/config";
// import { collection,addDoc,onSnapshot,updateDoc,deleteDoc,getDoc,getDocs } from "firebase/firestore";



export default function CategoriesLayout({ children }) {
  
  return (   
    <Tabs defaultValue="products" className='flex w-full flex-col pl-2 pr-1 pt-2 overflow-hidden h-full'>
          <header className="bg-white rounded-md p-2 flex w-full justify-between items-center font-Inter ">
            <p className="font-bold px-1">Categories</p>
            <nav className={`inline-grid w-fit mt-1 overflow-x-hidden gap-2 bg-blue-400-200 rounded-[3px] border-black py-2 h-fit grid-cols-2`}>
                    <Link href={'/dashboard/categories/products'}><button className='py-1 px-2 relative border-transparent rounded-md data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-secondary data-[state=active]:bg-slate-800' value="products">Products</button></Link>
                    <Link href={'/dashboard/categories/brands'}><button className='py-1 px-2 relative border-transparent rounded-md data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-secondary data-[state=active]:bg-slate-800' value="brand">Brands</button></Link>
            </nav>
          </header>
          {children}
    </Tabs>    
  );
}
