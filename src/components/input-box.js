const InputBox = ({label,id,placeholder,flexdir,type,width,margin,change,inputDir,blurr,value,note,textarea,grow,row,icon,readonly,error,outline,shortInput,ghost,mt,fit,uppercase,input_uppercase,font,l_font,input,mr})=>{
 
  return(
    <div data-dir={!!flexdir} data-fit={fit} data-error={error} data-mt={mt} data-mr={mr} data-grow={grow} data-short={shortInput} style={{width:`${width}`,margin:margin}} className={`relative w-full data-[error=true]:mb-1 data-[mt=true]:mt-2 data-[mr=true]:mr-3 text-ellipsis data-[grow=true]:flex-grow mt-0 data-[dir=true] data-[fit=true]:w-fit gap-0 inline-flex flex-col`}>
      {label?<label data-dir={!!flexdir} data-font={l_font} data-uppercase={uppercase} className="pl-2px data-[uppercase=true]:uppercase relative inline-flex items-center w-fit justify-start data-[font=base]:text-base data-[font=sm]:text-sm text-ellipsis md:min-w-max" htmlFor="">{label}</label>:""}
      <div className="flex-col">
        {textarea?
          <textarea data-error={error} value={value} data-ghost={ghost} placeholder={placeholder} onChange={(e)=>change(e)} className={`border shadow outline-none data-[error=true]:border-red-400 rounded-md data-[ghost=true]:border-none w-full p-2`} rows={row}></textarea>
          :
          <p data-dir={inputDir} data-fit={fit} data-ghost={ghost} data-short={shortInput} data-outline={outline} data-error={error} className="inline-flex shadow-sm items-center px-2 py-[7px] data-[fit=true]:w-fit data-[short=true]:py-1 data-[ghost=true]:border-none w-full data-[outline=true]:bg-transparent data-[outline=true]:border-black/35 bg-white data-[error=true]:outline-1 data-[error=true]:outline data-[error=true]:outline-red-400 data-[dir='input-reverse']:flex-row-reverse border rounded-lg justify-start">
            {icon&&<span className=" mr-1">{icon}</span>}
            <input data-id={id} data-error={error} onInput={(e)=>{input&&input(e)}} data-uppercase={input_uppercase} data-font={font} data-fit={fit} readOnly={readonly} className={`border-none px-1 outline-none bg-transparent data-[uppercase=true]:uppercase w-full data-[font=base]:text-base data-[font=sm]:text-sm`} onBlur={(e)=>blurr&&blurr(e)} onChange={(e)=>change&&change(e)} type={type} placeholder={placeholder} value={value}/>
          </p>
        }
        {error?<p className=" pl-1 -mt-1 text-[10px] text-red-400 italic">{error}</p>:""}
        {note?<p className=" pl-1 text-[10px] text-gray-400 italic">{note}</p>:""}
      </div>
    </div>
  )
}

export default InputBox