import { DataTableDemo } from "@/components/inventory-template"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"


const Inventory = () => {
    return (
      <div className="flex w-full flex-col pl-2 pr-1 pt-2 overflow-hidden h-full">
         <header className="bg-white rounded-md p-2 mb-1 flex w-full justify-between items-center font-Inter ">
            <p className="font-bold px-1">All stock</p>
            <nav className={`inline-grid w-fit mt-1 overflow-x-hidden gap-2 bg-blue-400-200 rounded-[3px] border-black py-2 h-fit grid-cols-1`}>
            <Link href={'inventory/add-product'}><button className='py-2 bg-core_polish px-3 relative border-transparent rounded-md data-[state=active]:shadow-none data-[state=active]:border-t text-xs font-semibold text-white' value="products">Add product</button></Link>
            </nav>
          </header>
        <Separator/>
        <div className="bg-white flex flex-col h-full overflow-y-scroll flex-grow rounded-md p-1 mt-2">
         <DataTableDemo/>
         {/* <DataTableDemo/> */}
        </div>
      </div>
    )
  }
  
  export default Inventory