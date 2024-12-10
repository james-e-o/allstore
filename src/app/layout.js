import localFont from "next/font/local";
import "./globals.css";

// const geistSans = localFont({
//   src: "./components/fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./components/fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "nexShelf",
  description: "Store management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-Inter `}
      >
        {children}
      </body>
    </html>
  );
}
