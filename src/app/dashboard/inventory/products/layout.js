export default function ProductsLayout({ children }) {
  
     return (   
       <div className='flex flex-col pb-2 overflow-hidden flex-grow'>
           {children}
       </div>    
     );
   }