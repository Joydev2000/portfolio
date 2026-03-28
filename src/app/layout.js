import "./globals.css";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";

export const metadata = {
  title: "Joydev Halder | Frontend Developer",
  description: "Joydev Halder | Frontend Developer from kolkta",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        <Footer/>
        
        </body>
    </html>
  );
}
