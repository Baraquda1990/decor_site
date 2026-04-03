'use client'
import { useEffect } from "react"
import useCatalogMenu from "../hooks/useCatalogMenu"
import useCatalogSubMenu from "../hooks/useCatalogSubMenu"
/*
Меню каталога
*/
type catalogSubMenuType={
    id:number,
    name:string,
    image_url:string,
    slug:string
}
type calalogMenuType={
    id:number,
    name:string,
    subcatalog:catalogSubMenuType[]
}
type props={
    catalogData:calalogMenuType[]
}
export default function CatalogMenu({catalogData}:props){
    const stateCatalogMenu=useCatalogMenu()
    const stateCatalogSubMenu=useCatalogSubMenu()
    useEffect(()=>{
        stateCatalogMenu.isOpen?document.body.style.overflow="hidden":document.body.style.overflow="auto"
    },[stateCatalogMenu.isOpen])
    const content=(<>
        <div className="fixed inset-0 bg-black/20 h-full" onClick={stateCatalogMenu.close}></div>
        
        <div className="fixed bg-white shadow-xl flex flex-col left-0 top-[80px] bottom-0 w-[280px]">
            <div className="flex-1 overflow-y-auto">
                <div className="h-full bg-[#f8faf5] overflow-y-auto p-6">
                    <h2 className="text-lg font-bold text-[#aeca73] mb-4 uppercase flex items-center gap-2">
                        <svg data-v-dfac7976="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect data-v-dfac7976="" x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"></rect><rect data-v-dfac7976="" x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"></rect><rect data-v-dfac7976="" x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"></rect><rect data-v-dfac7976="" x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"></rect></svg>
                        Каталог
                    </h2>
                    <ul className="space-y-2">
                        <li>
                            {catalogData.map((catalog)=>(
                                <div key={catalog.id} className="relative block text-left w-full">
                                    <div className="w-full" 
                                        onMouseEnter={()=>{stateCatalogSubMenu.setItems(catalog.subcatalog); stateCatalogSubMenu.open();stateCatalogSubMenu.setMouseEnter(true)}}
                                        onMouseLeave={()=>{setTimeout(()=>{stateCatalogSubMenu.close()},300);stateCatalogSubMenu.setMouseEnter(false)}}
                                        >
                                        <div className="w-full text-left px-5 py-3 text-[14px] font-medium text-[#3d4a2e] hover:text-[#aeca73] hover:bg-white border-l-[3px] border-transparent hover:border-l-[#aeca73] transition-all flex items-center justify-between cursor-pointer">
                                            <span>{catalog.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </>)
    return (
        stateCatalogMenu.isOpen?content:<></>
    )
}