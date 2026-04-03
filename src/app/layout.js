import "./globals.css";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import ChatBot from "./components/ChatBot";
import SmoothScroll from "./components/SmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const metadata = {
  title: "Joydev Halder | Frontend Developer",
  description: "Joydev Halder | Frontend Developer from kolkta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
        <ChatBot />
      </body>
    </html>
  );
}
