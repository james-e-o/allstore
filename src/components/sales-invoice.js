"use client"
import { useState,useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, ChevronDown, CircleMinus, CirclePlus, Columns3, Filter, MoreHorizontal } from "lucide-react"
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
    item:"test product",
    barcode:"kilimau",
    pInfo:""
}

// const tableArray =[tableFormat]

// const multiplied = Array.from({ length: 17 }).map(() => ({ ...tableFormat[0] }));

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
            cell: <EditableCell/> ,
            enableHiding: false,
          },
          {
            accessorKey: "barcode",
            header: ()=><div className="text-start capitalize w-14">barcode</div>,
            cell: ({ row }) => (<div className=" lowercase text-right w-14 "></div>)
          },
          {
            accessorKey: "pInfo",
            header: <div className="px-2 gap-3 text-right grid grid-cols-[5rem_3.2rem_3.2rem_3.2rem] ">
                <p className="flex justify-center items-center">Price</p>
                <p className="flex justify-center items-center">Quantity</p>
                <p className="flex justify-center items-center">Discount</p>
                <p className="flex justify-center items-center">Stock</p>
            </div>,
            cell: ({ row }) => (<div className="px-2 gap-3 text-right grid grid-cols-[5rem_3.2rem_3.2rem_3.2rem] ">
                <EditableCell />
                <EditableCell />
                <EditableCell />
                <div className=" lowercase text-center min-w-max ">K</div>
              </div>),
            // size:64,
          },
          // {
          //   accessorKey: "price",
          //   header: "Price",
          //   cell: <EditableCell s_1 width={'4rem'} />,
          //   size:64,
          // },
          // {
          //   accessorKey: "quantity",
          //   header: ()=><p className="inline-block max-w-min">Quantity</p>,
          //   cell: <EditableCell s_2 width={'3rem'} />,
          //   size:0,
          // },
          // {
          //   accessorKey: "discount",
          //   header:()=><div className="text-start">{"Discount"}</div>,
          //   cell: <EditableCell s_2 />,
          // },
          // {
          //      accessorKey: "stock bal.",
          //      header: ()=><div className="text-right capitalize w-fit">Stock</div>,
          //      cell: ({ row }) => (<div className=" lowercase text-start min-w-max ">{row.getValue("['stock bal.']")}</div>),
          //      size:25,
          // },
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
          // {
          //   id: "actions",
          //   enableHiding: false,
          //   size:30,
          //   cell: ({ row }) => {
          //     const payment = row.original
              
          //     return (
          //       <DropdownMenu className="text-right">
          //         <DropdownMenuTrigger asChild>
          //           <Button variant="ghost" className="h-7 text-right w-fit p-2">
          //             <span className="sr-only">Open menu</span>
          //             <MoreHorizontal />
          //           </Button>
          //         </DropdownMenuTrigger>
          //         <DropdownMenuContent align="end">
          //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
          //           <DropdownMenuItem
          //             onClick={() => navigator.clipboard.writeText(payment.id)}
          //             >
          //             Copy payment ID
          //           </DropdownMenuItem>
          //           <DropdownMenuSeparator />
          //           <DropdownMenuItem>View customer</DropdownMenuItem>
          //           <DropdownMenuItem>View payment details</DropdownMenuItem>
          //         </DropdownMenuContent>
          //       </DropdownMenu>
          //     )
          //   },
          // },
          {
            id: "add",
            enableHiding: false,
            header:<Button variant="ghost" onClick={()=>{addRow()}} className="h-7 invisible p-0 text-right w-fit"><CirclePlus className="w-fit"/></Button>,
            cell: ({row,table})=>{
              function addRow(){
                setData(prev => {
                  const newData = [...prev];
                  newData.splice(row.index + 1, 0, tableFormat); // Assuming you're adding a single object
                  return newData;
                 
                });
                console.log(row)
              }
              return <Button variant="ghost" onClick={()=>{addRow()}} className="h-7 p-0 text-right w-fit"><CirclePlus className="w-fit"/></Button>}
          },
          {
            id: "remove",
            enableHiding: false,
             header:<Button variant="ghost" onClick={()=>{addRow()}} className="h-7 mr-3 invisible p-0 text-right w-fit"><CirclePlus className="w-fit"/></Button>,
            size:20,
            cell: <Button variant="ghost" onClick={()=>{}} className="h-7 mr-3 flex justify-center items-center p-0 text-right w-fit"><CircleMinus  className="w-fit"/></Button>
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
       <div className="w-full h-full flex flex-col text-10px">
         <div className="flex items-center justify-between gap-2 py-1">
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
         <div className="rounded-md relative flex-grow flex flex-col justify-between overflow-hidden border md:border-none">
           <Table className={`w-full relative`}>
             <TableHeader className="">
               {table.getHeaderGroups().map((headerGroup) => (
                 <TableRow key={headerGroup.id}>
                   {headerGroup.headers.map((header) => {
                     return (
                       <TableHead data-value={header.id} 
                       className={`${header.id=='pInfo'?"flex w-fit ":header.id=='item'?"w-full ":""}`}
                         key={header.id}>
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
           </Table>
           <div className="flex-grow overflow-y-hidden">
           <Table  twrap={'h-full overflow-y-scroll bg-purple-200'}  className={`w-full scroll-m-[3px] relative`}>
             <TableBody className='rounded-md'>
              {/* <div className="overflow-y-scroll w-full bg-red-300"> */}
                
               {table.getRowModel().rows?.length ? (
                 table.getRowModel().rows.map((row) => (
                   <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}  className='bg-white overflow-clip  border-b-0 rounded-md mb-1' >
                     {row.getVisibleCells().map((cell,index) => (
                       <TableCell data-value={row.getVisibleCells().indexOf(cell)==index&&cell.id.split('_')[1]} 
                        className={`${cell.column.id=='pInfo'?"w-fit flex ":cell.column.id=='item'?"w-full":""} `}
                        key={cell.id} >  
                          {/* <p className='flex justify-center items-center w-4'> */}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          {/* </p>                        */}
                       </TableCell>
                     ))}
                   </TableRow>
                 ))
                ) : (
                  <TableRow>
                   <TableCell
                     colSpan={columns.length}
                     className="h-24 whitespace-nowrap text-center"
                     >
                     No Selected items.
                   </TableCell>
                 </TableRow>
               )}
             </TableBody>
           </Table>
          </div>
               
           <div className=" h-[13%] min-h-16 mt-1 bg-orange-200">
               wit
               <p className="p-5">hello</p>
           </div>
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

   const EditableCell =({row,column,table,getValue})=> {
    const initialValue = getValue
    const [value,setValue]=useState(initialValue)
    const updateData = () => table.options.meta?.updateState(row.index,column.id,value)
    return (
    
        <Input value={value} onBlur={updateData} className="w-full px-1 data-[s1=true]:max-w-20 data-[s2=true]:max-w-12 bg-blue-50 py-0 h-6" onChange={({target})=>{setValue(target.value),console.log(getValue)}} />

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