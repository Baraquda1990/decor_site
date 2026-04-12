'use client'
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import useNavModalForMobile from "../Componets/hooks/useNavModalForMobile"
import { useEffect} from "react"
import useCatalogDrawler from "./hooks/useCatalogDrawer";
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
/*
Модальное окно мобильной версии сайта для перехода по страницам сайта
*/
export default function NavModalForMobile() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const stateNavModalForMobile=useNavModalForMobile()
  const stateCatalogDrawer=useCatalogDrawler()

  useEffect(()=>{
    if(stateNavModalForMobile.isOpen) onOpen()
  },[stateNavModalForMobile.isOpen])

  useEffect(()=>{
    if(isOpen) stateNavModalForMobile.open()
      else stateNavModalForMobile.close()
  },[isOpen])
  return (
    <>
      <Drawer placement="left" size="full" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} className="">
        <DrawerContent className="bg-[#aeca73]">
          {(onClose) => (
            <>
              <DrawerBody className="p-0">
                <div className="flex flex-col h-full">
                    <nav className="px-8 py-6 flex-1">
                        <ul className="space-y-4">
                            <li>
                                <button className={`flex items-center justify-between w-full text-white ${onest.className} font-bold text-base uppercase`} onClick={()=>{onClose(); stateCatalogDrawer.open()}}>
                                    <span>Каталог</span>
                                    <svg data-v-b78234a2="" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-b78234a2="" d="M1 1L7 7L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </button>
                            </li>
                            <li>
                                <Link className={`flex items-center justify-between text-white ${onest.className} font-bold text-base uppercase`} href="/gallery" onClick={onClose}>
                                    <span>Галерея</span>
                                    <svg data-v-b78234a2="" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-b78234a2="" d="M1 1L7 7L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </Link>
                            </li>
                            <li>
                                <Link className={`flex items-center justify-between text-white ${onest.className} font-bold text-base uppercase`} href="/contacts" onClick={onClose}>
                                    <span>Контакты</span>
                                    <svg data-v-b78234a2="" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-b78234a2="" d="M1 1L7 7L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="px-8 py-4 flex items-center gap-4">
                        <Link className="text-white hover:opacity-80" href="https://t.me/rentalbees">
                            <svg data-v-b78234a2="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-b78234a2="" d="M18.5 2L9 11.5M18.5 2L12.5 18L9 11.5M18.5 2L1.5 8L9 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </Link>
                        <Link className="text-white hover:opacity-80" href="https://wa.me/79852719381">
                            <svg data-v-b78234a2="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-b78234a2="" d="M17.05 2.95A9.95 9.95 0 0 0 10 0C4.48 0 0 4.48 0 10c0 1.76.46 3.45 1.32 4.95L0 20l5.23-1.37A9.94 9.94 0 0 0 10 20c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.95-7.05zM10 18.33c-1.49 0-2.95-.4-4.23-1.15l-.3-.18-3.12.82.83-3.04-.2-.31A8.26 8.26 0 0 1 1.67 10c0-4.6 3.74-8.33 8.33-8.33 2.23 0 4.32.87 5.89 2.44a8.27 8.27 0 0 1 2.44 5.89c0 4.6-3.74 8.33-8.33 8.33zm4.57-6.24c-.25-.12-1.47-.73-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.16-.48-.29z" fill="white"></path></svg>
                        </Link>
                        <Link className="text-white hover:opacity-80" href="https://instagram.com/rentalbees">
                            <svg data-v-b78234a2="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect data-v-b78234a2="" x="1" y="1" width="18" height="18" rx="5" stroke="white" strokeWidth="2"></rect><circle data-v-b78234a2="" cx="10" cy="10" r="4" stroke="white" strokeWidth="2"></circle><circle data-v-b78234a2="" cx="15.5" cy="4.5" r="1.5" fill="white"></circle></svg>
                        </Link>
                    </div>
                    <div className="px-8 py-4 bg-[#f0f5e6] w-full">
                        <p className={`text-[#5B5C5E] text-sm ${onest.className} font-medium mb-1`}>служба поддержки</p>
                        <Link className={`text-[#5B5C5E] text-base ${onest.className} font-medium hover:text-[#aeca73] transition-colors`} href="tel:+79852719381"> +7 985 271-93-81 </Link>
                    </div>
                </div>
              </DrawerBody>
              <DrawerFooter className="p-0">

              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

