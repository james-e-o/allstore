import CategoryProvider from "@/components/getAllCategories";

export default async function InventoryLayout({ children }) {

  return ( 
    <CategoryProvider>     
      <div className='flex flex-col overflow-hidden flex-grow'>
          {children} 
      </div>    
    </CategoryProvider>  
  );
}