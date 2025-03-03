"use client"
import { useState,useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, ChevronDown, CirclePlus, Columns3, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {ColumnDef,ColumnFiltersState,SortingState,VisibilityState,flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import InputBox from "./input-box"


// const SalesInvoice = () => {
//   return (
//     <div>SalesInvoice</div>
//   )
// }

// export default SalesInvoice

export const DisplayVariant =({string})=> {
  let data = string.toString()
  let splitcolor =  data.startsWith('#')&&data.split('/')[0]
  let stringArray = data.split('/')
  stringArray.shift()
  let otherStrings = stringArray.join("/")
  
  if (data.startsWith('#')){
  return (
        <p className="inline-flex items-center" >
            <button  style={{backgroundColor:splitcolor}} className="w-4 shadow-sm  h-4 border "></button>
            <span>/{otherStrings}</span>
        </p>
  )} else return (
        <p className="inline-flex items-center" >{string}</p>
  )
}

const tableFormat = {
     barcode:"",
     item:"",
     price:"",
     quantity:"",
     discount:"",
     'stock bal.':"",
}

export default function SslesInvoiceData ({}) {
      const [data,setData]=useState([tableFormat])
      const [sorting, setSorting] = useState([])
      const [columnFilters, setColumnFilters] = useState([])
      const [columnVisibility, setColumnVisibility] = useState({})
      const [rowSelection, setRowSelection] = useState({})
      const [isMobile, setIsMobile] = useState(false);
      const [isClient, setIsClient] = useState(false);
      const [responsive, setResponsive] = useState('price');
   
   
     
      const columns = [

          {
            id: "select",
            header: ({ table }) => (
              <Checkbox
                className='scale-90'
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
              />
            ),
            cell: ({ row }) => (<Checkbox className='scale-90' checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)}/>),
            enableSorting: false,
            enableHiding: false,
            size:25,
          },
          {
            accessorKey: "item",
            header:()=><div className="text-start">{"Items"}</div>,
            cell: <EditableCell minWidth={'150px'} />,
            enableHiding: false,
          },
          {
            accessorKey: "barcode",
            header: ()=><div className="text-start capitalize w-fit">barcode</div>,
            cell: ({ row }) => (<div className=" lowercase text-right min-w-max ">{row.getValue("barcode")}</div>)
          },
          {
            accessorKey: "price",
            header: "Price",
            cell: <EditableCell width={'70px'} />,
          },
          {
            accessorKey: "quantity",
            header: "Quantity",
            cell: <EditableCell width={'50px'} />,
          },
          {
            accessorKey: "discount",
            header:()=><div className="text-start">{"Discount"}</div>,
            cell: <EditableCell width={'70px'} />,
          },
          {
               accessorKey: "stock bal.",
               header: ()=><div className="text-right capitalize w-fit">Stock</div>,
               cell: ({ row }) => (<div className=" lowercase text-start min-w-max ">{row.getValue("['stock bal.']")}</div>),
               size:25,
          },
          {
            id: "responsive",
            header:({table,column})=>{
      
              return (<DropdownMenu>
                <DropdownMenuTrigger className='flex flex-row justify-end'  asChild>
                  <Button variant="outline" className="ml-auto h-7 px-2 min-w-10 capitalize">
                    {responsive==='stock bal.'?'bal.':responsive} <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) =>  (column.getCanHide()&&column.id!='responsive'&&column.id!=responsive))
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) =>{setResponsive(column.id)
                            // column.toggleVisibility(!!value)
                        }}>
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>)
            },
            cell: ({row,column,table}) => {

              const id = responsive
              
              return (<div className="lowercase flex flex-row justify-end">
                {
                  responsive==='price'?<ResponsiveEditableCell row={row} responsive={id} column={column} table={table} getValue={row.getValue(id)} /> : 
                  responsive==='quantity'?<ResponsiveEditableCell row={row} responsive={id} column={column} table={table} getValue={row.getValue(id)} /> : 
                  responsive==='discount'?<ResponsiveEditableCell row={row} responsive={id} column={column} table={table} getValue={row.getValue(id)} /> : 
                  row.getValue(responsive)
                }
              </div>)},
          },
          {
            id: "actions",
            enableHiding: false,
            size:30,
            cell: ({ row }) => {
              const payment = row.original
              
              return (
                <DropdownMenu className="text-right">
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-7 text-right w-fit p-2">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(payment.id)}
                      >
                      Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View customer</DropdownMenuItem>
                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
          {
            id: "add",
            enableHiding: false,
            size:26,
            cell: <Button variant="ghost" onClick={()=>{}} className="h-7 p-0 text-right w-fit"><CirclePlus className="w-fit"/></Button>
          },
      ]
     
     
    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
      meta : {
        updateState : (rowIndex, columnId, value)=>{
          setData(prev=>prev.map((row,index)=>(
            index===rowIndex?{...row,[columnId]:value}:row
          )))
        }
      }
    })
   
    
       // Detect screen size
       useEffect(() => {
         const handleResize = () => {
           setIsMobile(window.innerWidth < 860); // Mobile breakpoint at 768px
         };
     
         handleResize(); // Check initial size
         window.addEventListener('resize', handleResize); // Listen for resize events
         
        //  setData(table_data.flatMap(option=>option.values).map((item,index)=>({item:item.value,sp:sellingPrice,cp:costPrice,sku:`SKU-${index}`})))
        //  console.log(table_data.flatMap(option=>option.values).map((item,index)=>({item:item.value,sp:sellingPrice,cp:costPrice,sku:`SKU-${index}`})))
         return () => window.removeEventListener('resize', handleResize);

       }, [data])
   
       useEffect(()=>{
         table.getAllColumns().filter(columns => columns.getCanHide()).forEach(column =>{
         
           if (isMobile && column.id!=='responsive'){
             column.toggleVisibility(false)
           }else  if (!isMobile && column.id=='responsive')
           {column.toggleVisibility(false)}
           else {column.toggleVisibility(true)}
   
         })
         setIsClient(true)
       },[isMobile])

       useEffect(()=>{
         console.log(data)
       },[data])
       
     if(isClient)
     return (
       <div className="w-full text-10px">
         <div className="flex items-center  justify-between gap-2 py-1">
           <Input placeholder="Search option..." value={(table.getColumn("item")?.getFilterValue()) ?? ""}
             onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)} className="max-w-sm h-7 text-10px"
           />
           <div className="flex items-center gap-2">
             <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button variant="outline" className="ml-auto h-7 px-2">
                 {!isMobile?'Filter':''} <Filter />
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                 {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
                     return (
                       <DropdownMenuCheckboxItem
                         key={column.id}
                         className="capitalize"
                         checked={column.getIsVisible()}
                         onCheckedChange={(value) =>
                           column.toggleVisibility(!!value)
                         }
                       >
                         {column.id}
                       </DropdownMenuCheckboxItem>
                     )
                   })}
               </DropdownMenuContent>
             </DropdownMenu>
            {!isMobile? <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button variant="outline" className="ml-auto h-7 px-2">
                 {!isMobile?'Columns':''} <Columns3 />
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                 {table.getAllColumns().filter((column) => column.getCanHide()&&column.id!='responsive').map((column) => {
                     return (
                       <DropdownMenuCheckboxItem
                         key={column.id}
                         className="capitalize"
                         checked={column.getIsVisible()}
                         onCheckedChange={(value) =>
                           column.toggleVisibility(!!value)
                         }
                       >
                         {column.id}
                       </DropdownMenuCheckboxItem>
                     )
                   })}
               </DropdownMenuContent>
             </DropdownMenu>:""}
           </div>
         </div>
         <div className="rounded-md border md:border-none">
           <Table className={` md: w-full`}>
             <TableHeader>
               {table.getHeaderGroups().map((headerGroup) => (
                 <TableRow key={headerGroup.id}>
                   {headerGroup.headers.map((header) => {
                     return (
                       <TableHead data-value={header.id}   key={header.id}>
                         {header.isPlaceholder
                           ? null
                           : flexRender(
                               header.column.columnDef.header,
                               header.getContext()
                             )}
                       </TableHead>
                     )
                   })}
                 </TableRow>
               ))}
             </TableHeader>
             <TableBody className='rounded-md overflow-clip'>
               {table.getRowModel().rows?.length ? (
                 table.getRowModel().rows.map((row) => (
                   <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}  className='bg-white overflow-clip table-auto border-b-0 rounded-md mb-1' >
                     {row.getVisibleCells().map((cell,index) => (
                       <TableCell data-value={row.getVisibleCells().indexOf(cell)==index&&cell.id.split('_')[1]}  key={cell.id} >  
                          <p className='flex'>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </p>                       
                       </TableCell>
                     ))}
                   </TableRow>
                 ))
               ) : (
                 <TableRow>
                   <TableCell
                     colSpan={columns.length}
                     className="h-24 text-center"
                   >
                     No Selected items.
                   </TableCell>
                 </TableRow>
               )}
             </TableBody>
           </Table>
         </div>
         {/* <div className="flex items-center justify-end space-x-2 py-4">
           <div className="flex-1 text-muted-foreground">
             {table.getFilteredSelectedRowModel().rows.length} of{" "}
             {table.getFilteredRowModel().rows.length} row(s) selected.
           </div>
           <div className="space-x-2">
             <Button
               variant="outline"
               size="sm"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
             >
               Previous
             </Button>
             <Button
               variant="outline"
               size="sm"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
             >
               Next
             </Button>
           </div>
         </div> */}
       </div>
     )
   }
  //  ₦₦₦₦₦

   const EditableCell =({getValue,row,column,table,width,minWidth})=> {
    const initialValue = getValue
    const [value,setValue]=useState(initialValue)
    const updateData = () => table.options.meta?.updateState(row.index,column.id,value)
    return (
         <Input style={{width:width?width:"",minWidth:minWidth}} value={value} onBlur={updateData} className=" flex-grow  h-6" onChange={({target})=>{setValue(target.value)}} />
    )
  }

  const ResponsiveEditableCell =({getValue,row,column,table,responsive})=> {
    const initialValue = getValue
    const [value,setValue]=useState(initialValue)
    const updateSP = () => table.options.meta?.updateState(row.index,responsive,value)

    return (
      <div className="">
        <Input value={value} onBlur={updateSP} className=" h-6" onChange={({target})=>{setValue(target.value)}} />
      </div>
    )
  }