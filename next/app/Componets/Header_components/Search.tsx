'use client'
import {Input} from "@heroui/react";
import apiService from "@/app/services/apiService";
import { useState,useEffect } from "react";
import useSearch from "../hooks/useSearch";
/*
Компонент поиска товара на сайте
*/
export const SearchIcon = (props?: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default function Search_input(){
    const stateSearch=useSearch()
    const [query,setQuery]=useState('')
    useEffect(() => {
    if (!query.length) {
      stateSearch.close()
      return
    }
    const controller = new AbortController()
    const timeout = setTimeout(async () => {
      try {
        const res = await apiService.getSearch(
          `/search?search=${query}`,
          controller.signal
        )

        stateSearch.setItems(res.results)
        stateSearch.setNext(res.next)
        stateSearch.setPrevious(res.previous)

      } catch (err: any) {
        if (err.name === 'AbortError') return
        console.error(err)
      }
    }, 300)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

    useEffect(()=>{
      if(!stateSearch.isOpen) setQuery('')
    },[stateSearch.isOpen])
    return(
    <Input
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-sm",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "cursor-text!",
            "rounded-full"
          ],
        }}
        onChange={(e)=>{setQuery(e.target.value);stateSearch.open()}}
        onClick={(e)=>{e.stopPropagation()}}
        value={query}
        placeholder="Поиск по каталогу"
        radius="lg"
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0" />
        }
      />
    )
}
