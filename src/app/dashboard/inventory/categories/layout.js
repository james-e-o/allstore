import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";




export default function CategoriesLayout({ children }) {
  
  return (   
    <Tabs defaultValue="products" className='flex w-full flex-col md:p-5 p-2 overflow-hidden flex-grow'>
          {children}
    </Tabs>    
  );
}
