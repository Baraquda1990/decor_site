'use client'
import {ToastProvider} from "@heroui/toast";
import {HeroUIProvider} from '@heroui/react'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider className="flex flex-col flex-1">
      <ToastProvider />
      {children}
    </HeroUIProvider>
  )
}