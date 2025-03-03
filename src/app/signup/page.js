'use client'
import { Button } from "@/components/ui/button"
import { Indiv,google,x } from "../signin/page"
import InputBox from "@/components/input-box"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff,LogIn,MoveLeft,MoveRight, Quote, Rocket, TriangleAlert } from "lucide-react"
import auth from "@/config/firebaseAuth"
import db from "@/config/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection,addDoc,onSnapshot,updateDoc,deleteDoc,doc } from "firebase/firestore"
// import Storeconcept from '../../../public/dalle.png'


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
    <div className='h-svh flex font-Inter border-b backdrop-blur-md flex-col'>
      <header className="md:px-10 pl-7 pr-5 border-b justify-start flex">
      <Link href={'/'}  className={"z-40 decoration-none font-bold text-black"}><h1 className="font-Madetommy py-3 md:text-2xl text-xl">nexShelf</h1></Link>   
      </header>
      <div className="flex w-full flex-grow">

     
      <div className="px-5 pb-1 md:w-4/12 pt-10 flex bg-[#fafafa] md:shadow-md md:border-r flex-col justify-start  items-center flex-grow">
        <p className=" pb-0 px-5 text-center text-base relative font-semibold ">Get Started!</p>

        <div className='rounded-md relative w-10/12 p-1 mt-4'>
            <div className="w-full h-fit relative overflow-hidden ">
              <div data-carousel={carousel} className="w-[200%] flex rounded-md data-[carousel=true]:right-full h-full right-0  duration-200 transition-[right_160ms_ease-in-out] relative ">
                <div className=" overflow-hidden rounded-md flex-col justify-start p-6 flex w-1/2 h-full">
                  <p className="inline-block text-gray-500 my-2 error-[variant=true]:text-core_contrast mr-3">Business information</p>
                  <InputBox shortInput value={storeName} input={()=>{setError({item:'',message:''})}} change={({target})=>{setStoreName(target.value)}} error={error.item==='storename'&&error.message} mt l_font={'xs'} label={'Store/Company name'}/>
                  <div className="mt-2">
                    <InputBox shortInput value={businessMail} input={()=>{setError({item:'',message:''})}} change={({target})=>{setBusinessMail(target.value)}} error={error.item==='businessmail'&&error.message} l_font={'xs'} label={'Business mail'}/>
                  </div>
                  <p className="mt-7 flex justify-end">
                    <Button size='xs' variant='outline' onClick={()=>{setCarousel(true)}} className='py-1 border rounded-lg h-6 float-right px-3'>
                      <MoveRight className="w-4 h-4 mr-1"/>
                      <span className=" font-light">Next</span>
                    </Button>
                  </p>
                </div>
                <div className="p-6 flex-col justify-start rounded-md flex w-1/2 h-full">
                    <p className="inline-block text-gray-500 my-2 error-[variant=true]:text-core_contrast mr-3">Your information</p>
                  <div className="mt-2">
                    <InputBox shortInput value={userName} input={()=>{setError({item:'',message:''})}} change={({target})=>{setUserName(target.value)}} placeholder={'Admin1'} error={error.item==='username'&&error.message} l_font={'xs'} label={'Username'}/>
                  </div>
                  <div className="mt-2">
                    <InputBox shortInput value={email} input={()=>{setError({item:'',message:''})}} change={({target})=>{setEmail(target.value)}} placeholder={'yourmail@whatmail.com'} error={error.item==='email'&&error.message} l_font={'xs'} label={'Email'}/>
                  </div>
                  <div className="mt-1">  
                    <InputBox shortInput label={' '} value={password} input={()=>{setError({item:'',message:''})}} change={({target})=>{setPassword(target.value)}} l_font={'xs'} icon={true} error ={error.item==='password'&&error.message} type={'password'} placeholder={"Password"}/> 
                  </div>
                  <div className="mt-1">  
                    <InputBox shortInput label={' '} value={passwordValidate} input={()=>{setError({item:'',message:''})}} change={({target})=>{setPasswordValidate(target.value)}} l_font={'xs'} icon={true} error ={error.item==='passwordvalidate'&&error.message} type={'password'} placeholder={"re-enter Password"}/>
                  </div>
                  <p className="mt-3 flex justify-end">
                    <Button size='xs' variant='outline' onClick={()=>{setCarousel(false)}} className='py-1 rounded-lg h-6  border float-right px-3'>
                      <MoveLeft className="w-4 h-4 mr-1"/>
                      <span className=" font-light">Prev</span>
                    </Button>
                  </p>
                
                  <Button size='sm' onClick={Submit} className='py-1 mt-5 rounded-md h-7  border  px-3'>
                    <Rocket className="w-4 h-4 mr-1"/>
                    <span className=" font-light">Launch</span>
                  </Button>
                  
                </div>
              </div>
            </div>
        </div>
         
         <div className="flex justify-center"></div> <Link href={'/signin'}><Button variant='ghost' className="hover:bg-transparent bg-yellow-400 opacity-80 hover:opacity-100"><LogIn/><TriangleAlert/> <span className="text-red">Site under construuction, take a tour</span></Button></Link>

        <footer className="flex flex-grow pb-6 scale-105 items-end justify-center">
          <Link href={'/signin'}><Button variant='ghost' className="hover:bg-transparent opacity-80 hover:opacity-100"><LogIn/>Sign in</Button></Link>
        </footer>




      </div>
        <div className={`hidden w-8/12 md:flex items-center opacity-90 bg-center bg-cover bg-no-repeat bg-signup justify-center`}>
          {/* <p className="text-core_contrast/60"><Quote className="invertY w-12 h-12"/> </p>
          <p className="text-core_contrast/60 font-MontserratAl font-bold text-[5rem]">Store concept</p> */}
        </div>
      </div>
    </div>
  )
}

export default SignUp