import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/dashboard-header";
import Link from "next/link";

export default function SalesLayout({ children }) {
  
  return (   
    <section className='flex flex-col overflow-hidden flex-grow'>
      <DashboardHeader section={'Sales'} size={'sm'}/>   
        <div className='mt-2 mx-1  bg-purple-50/70 border flex border-white/60 gap-4 w-fit'>
          <Button variant='ghost' value='history'>All Sales</Button>
          <Link href={'/dashboard/sales/sales-invoice'}><Button variant='ghost' value='invoice'>Sales Invoice</Button></Link>
          <Button variant='ghost' value='proforma'>Proforma Invoice</Button>
          <Button variant='ghost' value='returns'>Sales Returns</Button>
          <Button variant='ghost' value='delivery'>Delivery Note</Button>
        </div>
      {children}
    </section>    
  );
}