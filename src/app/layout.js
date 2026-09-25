import "./globals.css";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import ChatBot from "./components/ChatBot";
import SmoothScroll from "./components/SmoothScroll";
import CursorGlow from "./Layout/CursorGlow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const metadata = {
  title: "Joydev Halder | WordPress Developer · Custom Themes · Elementor · HTML Developer · Frontend (React / Next.js)",
  description: "Joydev Halder - WordPress Developer specializing in custom theme development, Elementor page building, semantic HTML development, and modern Frontend engineering with React & Next.js. LinkedIn: https://www.linkedin.com/in/joydev-halder/",
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
        <CursorGlow />
      </body>
    </html>
  );
}
