
const InputBox = ({label,placeholder,error,flexdir,type,width,margin,change,inputDir,blurr,value,note,textarea,grow,row,icon,readonly,outline,shortInput,ghost,mt,fit,uppercase,font,l_font})=>{
  return(
    <div data-dir={!!flexdir} data-fit={fit} data-mt={mt} data-grow={grow} data-short={shortInput} style={{width:`${width}`,flexDirection:flexdir,margin:margin}} className={`relative w-full data-[mt=true]:mt-2 text-ellipsis data-[grow=true]:flex-grow mt-0 data-[dir=true]:items-center data-[fit=true]:w-fit gap-1 flex flex-col`}>
      <label data-dir={!!flexdir} data-font={l_font} data-uppercase={uppercase} className="pl-1 data-[dir=true]:pl-0 data-[uppercase=true]:uppercase relative inline-flex items-center w-fit justify-start data-[font=base]:text-base data-[font=sm]:text-sm text-ellipsis md:min-w-max text-xs" htmlFor="">{label}</label>
      <div className="flex-col w-full">
        {textarea?
          <textarea data-error={error} value={value} placeholder={placeholder} onChange={(e)=>change(e)} className={`border data-[error=true]:border-red-400 rounded-md w-full p-2`} rows={row}></textarea>
          :
          <p data-error={error} data-dir={inputDir} data-fit={fit} data-ghost={ghost} data-short={shortInput} data-outline={!!outline} className="inline-flex items-center px-2 py-[7px] data-[fit=true]:w-fit data-[short=true]:py-1 data-[ghost=true]:border-none w-full bg-white border-black/15 data-[error=true]:border-red-400 data-[dir='input-reverse']:flex-row-reverse data-[outline=true]:border-black/35 data-[outline=true]:bg-transparent  border rounded-md justify-start">
            {icon&&<span className="text-xs mr-1">{icon}</span>}
            <input data-error={error} data-font={font} data-fit={fit} readOnly={readonly} className={`border-none px-1 text-xs outline-none w-full bg-transparent data-[fit=true]:w-fit data-[font=base]:text-base data-[font=sm]:text-sm`} onBlur={(e)=>blurr&&blurr(e)} onChange={(e)=>change&&change(e)} type={type} placeholder={placeholder} value={value}/>
          </p>
        }
        {error?<p className=" pl-1 -mt-1 text-[10px] text-red-400 italic">{error}</p>:""}
        {note?<p className=" pl-1 text-[10px] text-gray-400 italic">{note}</p>:""}
      </div>
    </div>
  )
}

export default InputBox