'use client'
import { useState } from "react";
import { BriefcaseBusiness, SendHorizonal, UserPlusIcon, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar,  AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import DefaultUser from '../../../../public/dummy.jpg'
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import InputBox from "@/components/input-box";
import CollapseBox from "@/components/collapse-box";



const Staff = () => {
  const [activeInterface,setActiveInterface]=useState('all')
  const [enableRequired,setEnableRequired]=useState(false)
    return (
      <div>
        <div className="w-full flex px-0 md:px-2 gap-2">
          <TabsList className={`inline-grid w-fit mb-2 overflow-x-hidden gap-4 bg-blue-400-200 rounded-[3px] border-black md:py-2 h-fit grid-cols-2`}>
            <TabsTrigger onClick={()=>{setActiveInterface('all')}} className='py-1 inline-flex gap-1 items-center text-xs text-black px-5 relative border-transparent rounded-2xl border border-core_grey1 shadow bg-transparent data-[state=active]:bg-core_grey2' value="grad 1"><Users className="p-1"/><span>All staff</span></TabsTrigger>
            <TabsTrigger onClick={()=>{setActiveInterface('all')}} className='py-1 inline-flex gap-1 items-center text-xs text-black px-5 relative border-transparent rounded-2xl border border-core_grey1 shadow bg-transparent data-[state=active]:bg-core_grey2' value="grad 2"><BriefcaseBusiness className="p-1"/><span>Roles</span></TabsTrigger>
            {/* <TabsTrigger className='py-1 text-black px-2 relative border-transparent rounded-md shadow data-[state=active]:text-white bg-core_grey2 data-[state=active]:bg-core_polish' value="grad 3">Ai models</TabsTrigger> */}
          </TabsList>
        </div> 
        <Separator/>
        <TabsContent value="grad 1" className='mt-1 p-1'>
          {
          activeInterface==='all'?
          <>
              <div className="px-3 py-1 mb-1">
                <Button onClick={()=>{setActiveInterface('new')}} className='text-xs'>Add staff<UserPlusIcon className="" /></Button>
              </div>
              <div className="w-full p-2">
                <Link href='staff/new'>
                  <Card className='inline-block w-[45%] md:w-fit cursor-pointer'>
                    <CardHeader className='p-2 rounded-md'>
                      <CardDescription className='text-[9px] px-1 py-0 w-fit rounded-sm bg-core_grey2'>role</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <figure className="flex md:min-w-28 my-4 justify-center">
                        <Avatar className='items-center shadow-sm inline-flex rounded-full w-14 h-14 justify-center'>
                            <Image src={DefaultUser} className=" w-full " alt="@storeprobuilder"/>
                            {/* <AvatarFallback>JO</AvatarFallback> */}
                        </Avatar>
                      </figure>
                      <div className="flex items-center flex-col">
                        <p className="text-xs font-semibold">Staff full name</p>
                        <p className="text-xs italic font-semibold text-core_contrast/50">Staff ID</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
              <div className="mx-auto h-5 w-5 my-2 bg-red-200"></div>
          </>:
          activeInterface==='new'?
          <div className="w-full flex items-center justify-center">
            <div className="p-10 md:mx-0 mx-2 mt-16 border rounded-lg shadow">
              <p className="p-2 text-xs mb-3 text-center font-light">Add staff</p>            
                <div className="flex flex-col font-extralight gap-3">
                  <InputBox  label={'Staff email'} />
                  <CollapseBox scale subject={'Admin mode'} xxs state={enableRequired} setState={()=>setEnableRequired(!enableRequired)}>
                    <p className="text-[10px] max-w-64 leading-tight italic text-core_contrast/50">This will disable the <span className="text-red-400">required</span> check for required fields. except name</p>
                  </CollapseBox>
                  <Button className='mt-2'><SendHorizonal/> Send onboarding form</Button>
                </div>             
            </div>
          </div> : ""
          }
        </TabsContent>
        
        <TabsContent value="grad 2" className='mt-1 p-1'>
          <div className="mx-auto h-5 w-5 my-2 bg-red-500"></div>
        </TabsContent>
      </div>
    )
  }
  
  export default Staff