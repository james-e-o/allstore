'use client'
import { useState,useEffect, Suspense } from "react";
import db from "@/config/firestore";
import { collection,onSnapshot ,getDocs } from "firebase/firestore";
import {ColumnDef,ColumnFiltersState,SortingState,VisibilityState,flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import { Dialog,DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Plus, Columns3, ListCollapse,Edit2,LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Link from "next/link";

//       useEffect(()=>{
//          
//        },[])



export default function CategoryTable(){

     const [sorting, setSorting] = useState([])
     const [columnFilters, setColumnFilters] = useState([])
     const [columnVisibility, setColumnVisibility] = useState({})
     const [rowSelection, setRowSelection] = useState({})
     const [isMobile, setIsMobile] = useState(false);
     const [isClient, setIsClient] = useState(false);
     const [data, setData] = useState([])
     const [isLoading,setIsLoading]=useState(true)

   
   
     
     const columns = [
   
       {
         accessorKey: "name",
         header: "Category",
         cell: ({ row }) => (
           <div className="capitalize">{row.getValue("name")}</div>
         ),
         enableHiding: false,
       },
   
      {
         id: "subcategory",
         header: ()=> {
           return(
             <Button variant="ghost" className="ml-auto rounded-lg text-xs md:text-[0.8175rem] px-2">
             {!isMobile?'Sub category':''} <ListCollapse />
             </Button>
           )
         },
         cell: ({ row }) => <Button variant='outline' className='border text-xs px-3 py-0 rounded-sm'>45</Button>,
       },
      {
         id: "products",
         header: ()=>{
           return ( <Button variant="ghost" className="ml-auto rounded-lg text-xs md:text-[0.8175rem] px-2">
           {!isMobile?'Products':''} <LayoutGrid />
           </Button>)
         },
         cell: ({ row }) => <Button variant='outline' className='border text-xs px-3 py-0 rounded-sm'>45</Button>,
       },
     
      
       {
         id: "actions",
         enableHiding: false,
         size:40,
         cell: ({ row }) => {
           const payment = row.original
           
           return (
   
             <DropdownMenu className="text-right">
               <DropdownMenuTrigger asChild>
                 <Button variant="secondary" className="h-7 text-right rounded-lg w-fit p-2">
                   <Edit2 />
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
     })
   
       // Detect screen size
       useEffect(() => {
          setIsMobile(window.innerWidth <= 768)
          window.onresize = () => {
               setIsMobile(window.innerWidth <= 768)
          }

          const categoryCollectionRef = collection(db,'categories')
    
          const loadData = async () => {
               const Snapshot = await  getDocs(categoryCollectionRef)
               setData(Snapshot.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
               })))
          }
                     
          loadData().then((data)=>{
               setIsLoading(false)
          }).catch(error=>{
               setIsLoading(false)
          })

          table.getAllColumns().filter(columns => columns.getCanHide()).forEach(column =>{     
               if (isMobile && column.id!=='responsive'){
               column.toggleVisibility(false)
               }else  if (!isMobile && column.id=='responsive')
               {column.toggleVisibility(false)}
               else {column.toggleVisibility(true)}
          })
          setIsClient(true)
          console.log(data)
       }, [])
       
     if(isClient)
     return (
       <div className="w-full">
         <div className="flex items-center justify-between px-2 md:px-3 gap-2 py-4">
           <Input placeholder="Search product..." value={(table.getColumn("name")?.getFilterValue()) ?? ""}
             onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)} className="max-w-sm"
           />
           <div className="flex items-center gap-2">
            {!isMobile? <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button variant="outline" className="ml-auto px-2">
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
             <Link href={'categories/new-product-category'}><Button className='px-2 text-xs bg-core_polish font-semibold' size='sm'><Plus className="w-4 h-4"/>Add category</Button></Link>
           </div>
         </div>
         <div className="rounded-md border md:border-none px-2 md:px-3">
           <Table className={`text-xs md:text-[0.8175rem] w-full`}>
             <TableHeader>
               {table.getHeaderGroups().map((headerGroup) => (
                 <TableRow key={headerGroup.id}>
                   {headerGroup.headers.map((header) => {
                     return (
                       <TableHead data-value={header.id} 
                         className={`w-fit data-[value=products]:text-center data-[value=subcategory]:text-center`} key={header.id}>
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
             <TableBody>
             <Suspense fallback={"loading..."}>
                    {data&&table.getRowModel().rows?.length ? (
                   table.getRowModel().rows.map((row) => (
                    <TableRow
                         key={row.id}
                         data-state={row.getIsSelected() && "selected"}
                    >
                         {row.getVisibleCells().map((cell,index) => (
                         <TableCell 
                              data-value={row.getVisibleCells().indexOf(cell)==index&&cell.id.split('_')[1]}  
                              className={`w-fit data-[value=products]:text-center data-[value=subcategory]:text-center`} key={cell.id}
                              >
                              {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                              )}
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
                        {isLoading?"Loading...":" No results."}
                    </TableCell>
                    </TableRow>
                    )}
               </Suspense>
               
             </TableBody>
           </Table>
         </div>
         {data&&table.getRowModel().rows?<div className="flex items-center justify-end px-2 md:px-3 space-x-2 py-4">
           <div className="flex-1 text-sm text-muted-foreground">
             {data&&table.getFilteredSelectedRowModel().rows.length} of{" "}
             {data&&table.getFilteredRowModel().rows.length} row(s) selected.
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
         </div>:""}
       </div>
     )
   }
   