import TableTemplate from "@/components/table-template"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"


const Inventory = () => {
    return (
      <div className="p-5 text-[0.8125rem]">
        <div className="p-1 flex gap-2">
          <p className='p-1 font-bold'>All stock</p>
        </div> 
        <Separator/>
        <TableTemplate/>
      </div>
    )
  }
  
  export default Inventory