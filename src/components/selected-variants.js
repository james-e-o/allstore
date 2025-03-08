"use client"
import { useState,useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, ChevronDown, Columns3, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {ColumnDef,ColumnFiltersState,SortingState,VisibilityState,flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import InputBox from "./input-box"

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

function combineArrays(arrays, prefix = '', result = []) {

  arrays = arrays.filter(array=>array.length>0)

  if (arrays.length === 0) {
  // Base case: Add the combination to the result
  result.push(prefix.slice(1)); // Remove the leading slash
  return result;
  }

  const [firstArray, ...restArrays] = arrays; // Destructure the arrays
  for (const element of firstArray) {
  combineArrays(restArrays, `${prefix}| ${element.value} `, result); // Recursive call
  }

  return result;
}

export default function SelectedVariantitemsTable({table_data,sellingPrice,costPrice}) {
      const [data,setData]=useState(table_data)
      const [sorting, setSorting] = useState([])
      const [columnFilters, setColumnFilters] = useState([])
      const [columnVisibility, setColumnVisibility] = useState({})
      const [rowSelection, setRowSelection] = useState({})
      const [isMobile, setIsMobile] = useState(false);
      const [isClient, setIsClient] = useState(false);
      const [responsive, setResponsive] = useState('sp');
   
   
     
      const columns = [

          {
            accessorKey: "item",
            header:()=><div className="text-center">{isMobile ?"Values":"Option values"}</div>,
            cell: ({ row }) => (<div className="uppercase px-2 gap-7 md:min-w-44 min-w-32 flex justify-start ">
                <Checkbox className='scale-90' checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)}/>
                <div className="flex-grow flex justify-start">
                  <DisplayVariant string={row.getValue("item")} />
                </div>
              </div>),
            enableHiding: false,
          },
          {
            accessorKey: "sp",
            header: "Selling price",
            cell: EditableCell,
          },
          {
            accessorKey: "cp",
            header: "Cost price",
            cell: EditableCell,
          },
          {
            accessorKey: "sku",
            header: ()=><div className="text-right w-fit">SKU</div>,
            cell: ({ row }) => (<div className=" lowercase text-right min-w-max ">{row.getValue("sku")}</div>)
          },
          {
            id: "responsive",
            header:({table,column})=>{
      
              return (<DropdownMenu>
                <DropdownMenuTrigger className='flex flex-row justify-end'  asChild>
                  <Button variant="outline" className="ml-auto px-2 min-w-10 capitalize">
                    {responsive==='cp'?'cost pr.':responsive==='sp'?'selling pr.':responsive} <ChevronDown />
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
                  responsive==='cp'?<ResponsiveEditableCell row={row} responsive={id} column={column} table={table} getValue={row.getValue(id)} /> : 
                  responsive==='sp'?<ResponsiveEditableCell row={row} responsive={id} column={column} table={table} getValue={row.getValue(id)} /> : 
                  row.getValue(responsive)
                }
              </div>)},
            
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

      function combineVariants(){
        let arrays = table_data.map((item,index)=>([...item.values]))
              
        const combinedArray = combineArrays(arrays).map(item=>item.startsWith('|')?item.slice(1):item);
        console.log(combinedArray);
        setData(combinedArray.map((item,index)=>({item:item,sp:sellingPrice,cp:costPrice,sku:`SKU-${index}`})))
      }
   
    
       // Detect screen size
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768); // Mobile breakpoint at 768px
        };
    
        handleResize(); // Check initial size
        window.addEventListener('resize', handleResize); // Listen for resize events
        
        combineVariants()

        return () => window.removeEventListener('resize', handleResize);

       }, [table_data])
   
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
         <div className="flex items-center  justify-between gap-2 pb-1 pt-4">
           <p className="text-start px-7 font-semibold">Variant combinations</p>
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
         <div className="rounded-md border md:border-none shadow-inner shadow-white">
           <Table className={` md: w-full overflow-x-scroll`}>
              <TableHeader>
               {table.getHeaderGroups().map((headerGroup) => (
                 <TableRow key={headerGroup.id}>
                   {headerGroup.headers.map((header) => {
                     return (
                       <TableHead data-value={header.id} className={`${header.id=='item'?"z-30 bg-white sticky left-0":""}`}  key={header.id}>
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
               {table.getRowModel().rows?.length ? (
                 table.getRowModel().rows.map((row) => (
                   <TableRow
                     key={row.id}
                     data-state={row.getIsSelected() && "selected"}
                   >
                     {row.getVisibleCells().map((cell,index) => (
                       <TableCell 
                         data-value={row.getVisibleCells().indexOf(cell)==index&&cell.id.split('_')[1]}  
                         className={`${cell.column.id=='item'?"z-30 bg-white shadow-xl sticky left-0":""}`}
                         key={cell.id}
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
                     No Selected items.
                   </TableCell>
                 </TableRow>
               )}
             </TableBody>
           </Table>
         </div>
         <div className="flex items-center justify-end space-x-2 py-4">
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
         </div>
       </div>
     )
   }
  //  ₦₦₦₦₦

   const EditableCell =({getValue,row,column,table})=> {
    const initialValue = getValue
    const [value,setValue]=useState(initialValue)
    const updateData = () => table.options.meta?.updateState(row.index,column.id,value)
    return (
         <Input value={value} onBlur={updateData} className=" md:  min-w-40 h-6" onChange={({target})=>{setValue(target.value)}} />
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