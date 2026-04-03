'use client'
import { useRouter } from "next/navigation"
import useCatalogSubMenu from "../hooks/useCatalogSubMenu"
import useCatalogMenu from "../hooks/useCatalogMenu"
/*
Меню СубКаталога
*/
export default function CatalogSubMenu(){
    const stateCatalogSubMenu=useCatalogSubMenu()
    const stateCatalogMenu=useCatalogMenu()
    const router=useRouter()
    const content=(<div className="fixed bg-white shadow-xl flex flex-col left-[282px] top-[80px] bottom-0 w-[280px]" 
        onMouseEnter={()=>{stateCatalogSubMenu.setMouseEnter(true)}}
        onMouseLeave={()=>{setTimeout(()=>{stateCatalogSubMenu.close()},500);stateCatalogSubMenu.setMouseEnter(false)}}
    >
            <div className="flex-1 overflow-y-auto">
                <div className="h-full bg-[#f8faf5] overflow-y-auto p-6">
                    <ul className="space-y-2">
                        {stateCatalogSubMenu.items.map((item)=>(
                        <li key={item.id}>
                            <div className="relative block text-left w-full">
                                <div className="w-full">
                                    <button
                                        className="w-full text-left px-1 py-3 text-[14px] font-medium text-[#3d4a2e] hover:text-[#aeca73] hover:bg-white border-l-[3px] border-transparent hover:border-l-[#aeca73] transition-all flex items-center justify-between cursor-pointer"
                                        onClick={()=>{
                                            stateCatalogSubMenu.closeAll()
                                            stateCatalogMenu.close()
                                            router.push(`/catalog/${item.slug}`)}}
                                    >
                                        <div className="flex items-center space-x-2">
                                        <img className="rounded-xl" src={item.image_url} alt={item.name} width="50px" height="50px"/>
                                        <span>{item.name}</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>)
    return stateCatalogSubMenu.isOpen?content:<></>
}