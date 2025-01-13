
export default async function InventoryLayout({ children }) {

  return (   
      <div className='flex flex-col overflow-hidden flex-grow'>
          {children} 
      </div>    
  );
}