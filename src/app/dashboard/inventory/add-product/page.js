import { Separator } from "@/components/ui/separator"

const AddProduct = () => {
    return (
      <div className="p-5 text-sm">
        <div className="p-1 flex gap-2">
          <p className='p-1 font-bold'>Add product</p>
        </div> 
        <Separator/>
        <section className="p-1">
          <p className="font-bold text-xs">Store information</p>
          <div className="p-1">
            <div className=' mt-2 ml-1 relative'>
              <label htmlFor="" className='relative ml-[2px] items-center flex justify-between text-sm mb-1' >
                <span>Heading</span> 
              </label>
              <input id='heading-text' className='' type='text' />
              {/* <p className="absolute pl-1 text-[10px] text-red-400 italic">error secttion</p> */}
            </div>
          </div>
        </section>
      </div>
    )
  }
  
  export default AddProduct