import type { Metadata } from "next";
import "./globals.css";
import {Providers} from "./providers";
import Header from "./Componets/Header";
import Footer from "./Componets/Footer";
import NavMobile from "./Componets/NavMobile";
import CatalogMenu from "./Componets/Catalog_componets/CatalogMenu";
import CatalogSubMenu from "./Componets/Catalog_componets/CatalogSubMenu";
import CatalogDrawer from "./Componets/Catalog_componets/CatalogDrawerForMobile";
import NavModalForMobile from "./Componets/NavModalForMobile";
import ModalAuthSignIn from "./Componets/AuthSignIn_components/ModalAuthSignIn";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header/>
            {children}
            <CatalogMenu/>
            <CatalogSubMenu/>
            <NavMobile/>
            <CatalogDrawer/>
            <NavModalForMobile/>
            <ModalAuthSignIn/>
        </Providers>
        <Footer/>

      </body>
    </html>
  );
}
