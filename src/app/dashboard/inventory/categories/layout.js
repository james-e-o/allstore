import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function CategoriesLayout({ children }) {
  
  return (   
    <Tabs defaultValue="products" className='flex flex-col pl-2 pr-1 pt-2 overflow-hidden h-full'>
          <header className="bg-white rounded-md p-2 font-Inter ">
            <p className="font-bold px-1">Categories</p>
            <TabsList className={`inline-grid w-fit mt-1 overflow-x-hidden gap-3 bg-blue-400-200 rounded-[3px] border-black py-2 h-fit grid-cols-3`}>
                    <TabsTrigger className='py-1 px-2 relative border-transparent rounded data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-slate-200 data-[state=active]:bg-slate-800' value="products">Products</TabsTrigger>
                    <TabsTrigger className='py-1 px-2 relative border-transparent rounded data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-slate-200 data-[state=active]:bg-slate-800' value="brand">Brand</TabsTrigger>
            </TabsList>
          </header>
          {children}
    </Tabs>    
  );
}
