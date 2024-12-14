import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";


export default function CategoriesLayout({ children }) {
  
  return (   
    <div className='flex flex-col pl-2 pr-1 pt-2 overflow-hidden h-full'>
          <header className="bg-white rounded-md p-2 font-Inter ">
            <p className="font-bold">Categories</p>
          </header>
          {children}
    </div>    
  );
}