import type { Metadata } from "next";
import "./globals.css";
import {Providers} from "./providers";
import Header from "./Componets/Header";
import Footer from "./Componets/Footer";
import NavMobile from "./Componets/NavMobile";
import Catalog from "./Componets/Catalog_componets/Catalog";
import NavModalForMobile from "./Componets/NavModalForMobile";
import ModalAuthSignIn from "./Componets/AuthSignIn_components/ModalAuthSignIn";
import SearchModal from "./Componets/Header_components/SearchModal";
import { getUserId } from "./lib/actions";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId=getUserId()
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header/>
            {children}
            <Catalog/>
            <NavMobile/>
            <NavModalForMobile/>
            <ModalAuthSignIn/>
            <SearchModal/>
        </Providers>
        <Footer/>
        
      </body>
    </html>
  );
}
