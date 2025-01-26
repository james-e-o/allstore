
import { Tabs } from "@/components/ui/tabs"



export default function CategoriesLayout({ children }) {
  
  return (   
    <Tabs defaultValue="products" className='flex w-full flex-col md:px-5 px-2 overflow-hidden flex-grow'>
          {children}
    </Tabs>    
  );
}
