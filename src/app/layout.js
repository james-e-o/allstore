
import "./globals.css";

export const metadata = {
  title: "nexShelf",
  description: "Store management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-Geist text-[10px] font-medium h-svh overflow-hidden w-screen`}>
         
          {children}

      </body>
    </html>
  );
}


// mukta
// lato