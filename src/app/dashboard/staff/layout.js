
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StaffLayout({ children }) {
  
  return (   
    <Tabs defaultValue="grad 1" className='flex w-full flex-col pl-2 pr-1 pt-2 overflow-hidden h-full'>
      
      {children}
    </Tabs>   
  );
}