'use client'
import {  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent  } from "@/components/ui/card"
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Indiv,google,x } from "../login/page"
import InputBox from "@/components/input-box"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff,MoveLeft,MoveRight } from "lucide-react"
import auth from "@/config/firebaseAuth"
import db from "@/config/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection,addDoc,onSnapshot,updateDoc,deleteDoc,doc } from "firebase/firestore"

const SignUp = () => {
  const validEmail = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const [carousel,setCarousel]=useState(false)
  const staffCollectionRef = collection(db,'staff')
  const storeCollectionRef = collection(db,'store')

  const [storeName, setStoreName] = useState('')
  const [businessMail, setBusinessMail] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordValidate, setPasswordValidate] = useState('')
  const [error, setError] = useState({item:'',message:''})

  function Submit(e){
    e.preventDefault()
    if (!storeName){setError({item:'storename',message:'required'}); return}
    else if(!businessMail||!businessMail.match(validEmail)){setError({item:'businessmail',message:'valid email address required'}); return}
    else if(!userName){setError({item:'username',message:'required'}); return}
    else if(!email||!email.match(validEmail)){setError({item:'email',message:'valid email address required'}); return}
    else if(!password){setError({item:'password',message:'required'}); return}
    else if(passwordValidate !== password){setError({item:'passwordvalidate',message:'does not match password'}); return}

    console.log(businessMail,password,email)
    createUserWithEmailAndPassword(auth,email,password).then(cred=>{
      return addDoc(storeCollectionRef,{
        storename:storeName,
        businessmail:businessMail,
        staff:[],
      })
    }).then(storeData=>{
      return addDoc(staffCollectionRef,{
        store:storeData.id,
        username:userName,
        email:email,
        role:'Admin-1',
      }).then(staffData=>{
        let storeRef = doc(db,'store',storeData.id)
        updateDoc(storeRef,{
          staff:[staffData.id]
        })
      })
    }).then(()=>{
      setBusinessMail(''); setStoreName(''); setUserName(''); setEmail('');setPassword(''); setPasswordValidate('')
    })

  }

  return (
    <div className='h-svh flex font-Inter flex-col'>
      <header className="px-5 py-5 justify-start flex">
      <Link href={'/'}  className={"z-40 decoration-none font-bold text-black"}><h1 className="font-Madetommy text-xl">nexShelf</h1></Link>    
      </header>
      <div className="px-5 py-1 flex flex-col justify-center  items-center border-t flex-grow">
        <p className=" pb-0 px-5 text-center text-base relative -top-6 font-semibold ">Get Started!</p>

        {/* <Card className='border bg-core_grey2/25 border-white shadow-md'>
          <CardContent className="space-y-2 py-3 px-5">
            <form method='post' onSubmit={Submit}>
              <p className="inline-block text-gray-500 mt-2 error-[variant=true]:text-core_contrast mr-3">Business information</p>
              <InputBox value={storeName} input={()=>{setError({item:'',message:''})}} change={({target})=>{setStoreName(target.value)}} error={error.item==='storename'&&error.message} mt l_font={'sm'} font={'base'} label={'Store/Company name'}/>
              <div className="mt-1">
                <InputBox value={businessMail} input={()=>{setError({item:'',message:''})}} change={({target})=>{setBusinessMail(target.value)}} error={error.item==='businessmail'&&error.message} l_font={'sm'} font={'base'} label={'Business mail'}/>
              </div>
              <p className="inline-block text-gray-500 mt-4 error-[variant=true]:text-core_contrast mr-3">Your information</p>
              <div className="mt-2">
                <InputBox value={userName} input={()=>{setError({item:'',message:''})}} change={({target})=>{setUserName(target.value)}} placeholder={'Admin1'} error={error.item==='username'&&error.message} l_font={'sm'} font={'base'} label={'Username'}/>
              </div>
              <div className="mt-1">
                <InputBox value={email} input={()=>{setError({item:'',message:''})}} change={({target})=>{setEmail(target.value)}} placeholder={'yourmail@whatmail.com'} error={error.item==='email'&&error.message} l_font={'sm'} font={'base'} label={'Email'}/>
              </div>

              <Indiv value={password} input={()=>{setError({item:'',message:''})}} change={({target})=>{setPassword(target.value)}} icon={true} error ={error.item==='password'&&error.message} type={'password'} altType={'text'} name={"password"} placehold={"Password"}/> 
              <Indiv value={passwordValidate} input={()=>{setError({item:'',message:''})}} change={({target})=>{setPasswordValidate(target.value)}} icon={true} error ={error.item==='passwordvalidate'&&error.message} type={'password'} altType={'text'} name={"password"} placehold={"re-enter Password"}/>
                 
              <Button className="text-sm mt-4 font-semibold w-full rounded-md" >Launch store</Button>  
              <p className="w-full pl-1 mt-1"><Link className="text-gray-400 text-[0.73rem] decoration-none" href={'/signin'}>already have a store?  <span className="text-gray-900 text-xs">Login</span></Link></p>              
            </form>
          </CardContent>
        </Card> */}


        <div className='rounded-md relative -top-6 w-10/12 sm:w-[60%] p-1 md:w-[27rem] mt-6'>
            <div className="w-full relative overflow-hidden min-h-max ">
              <div data-carousel={carousel} className="w-[200%] rounded-md data-[carousel=true]:right-full right-0 transition-[right_160ms_ease-in-out] relative ">
                <div className="bg-green-500 rounded-md inline-flex w-1/2 h-72"></div>
                <div className="bg-orange-500 rounded-md inline-flex w-1/2 h-72"></div>
              </div>
            </div>

            <div className="flex w-full justify-between">
              <Button size='sm' onClick={()=>{setCarousel(false)}} className='py-1 border float-right px-3'>
                  <MoveLeft className="w-4 h-4 mr-1"/>
                  <span className=" font-light">Prev</span>
              </Button>
              <Button size='sm' onClick={()=>{setCarousel(true)}} className='py-1 border float-right px-3'>
                  <MoveRight className="w-4 h-4 mr-1"/>
                  <span className=" font-light">Next</span>
              </Button>
            </div>
        </div>




      </div>
    </div>
  )
}

export default SignUp