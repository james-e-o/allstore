'use client'
import { useState,useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {ColumnDef,ColumnFiltersState,SortingState,VisibilityState,flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import { Dialog,DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Plus, Columns3, ListCollapse,Edit2,LayoutGrid } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { collection,addDoc,onSnapshot} from "firebase/firestore";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { db } from "@/firebase/config";
import Link from "next/link";


const Categories = () => {

    return (
      <div className="bg-white flex flex-col h-full overflow-y-scroll flex-grow rounded-md mt-2">
        <header className="flex w-full justify-between items-center font-Inter ">
          <p className="font-bold text-sm px-0 py-1">Categories</p>
          <nav className={`inline-flex justify-end w-fit overflow-x-hidden gap-4 bg-blue-400-200 rounded-[3px] border-black py-2 h-fit`}>
                  <Link href={'/dashboard/inventory/categories/'}><button className='p-2 relative border-transparent rounded text-xs data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-secondary data-[state=active]:bg-slate-800' value="products">Products</button></Link>
                  <Link href={'/dashboard/inventory/categories/brands'}><button className='p-2 relative border-transparent rounded text-xs data-[state=active]:shadow-none data-[state=active]:border-t data-[state=active]:text-white bg-secondary data-[state=active]:bg-slate-800' value="brand">Brands</button></Link>
          </nav>
        </header>
        <Dialog>
          <DialogContent className="w-5/6 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              Hello Buzz
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
          <div className="">
              <CategoryTable />           
          </div>
        </Dialog>
      </div>
    )
  }
  
  export default Categories



export function CategoryTable() {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [responsive, setResponsive] = useState('amount');
  const [data, setData] = useState([])


  
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
      const categoryCollectionRef = collection(db,'categories')
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Mobile breakpoint at 768px
      };
      const loadData = onSnapshot(categoryCollectionRef,(snapshot)=>{
        const loaded = snapshot.docs.map(doc=>({
          id:doc.id,
          ...doc.data()
        }))
        setData(loaded)
      })
  
      handleResize(); // Check initial size
      window.addEventListener('resize', handleResize); // Listen for resize events
  
      return () => {loadData(),window.removeEventListener('resize', handleResize)};
    }, [])

    useEffect(()=>{
      table.getAllColumns().filter(columns => columns.getCanHide()).forEach(column =>{
      
        if (isMobile && column.id!=='responsive'){
          column.toggleVisibility(false)
        }else  if (!isMobile && column.id=='responsive')
        {column.toggleVisibility(false)}
        else {column.toggleVisibility(true)}

      })
      setIsClient(true)
    },[])
    
  if(isClient)
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 py-4">
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
      <div className="rounded-md border md:border-none">
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
      </div>
    </div>
  )
}
