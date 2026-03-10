'use client'
import useCatalogSubMenu from "../hooks/useCatalogSubMenu"
export default function CatalogSubMenu(){
    const stateCatalogSubMenu=useCatalogSubMenu()
    const content=(<div className="fixed bg-white shadow-xl flex flex-col left-[282px] top-[80px] bottom-0 w-[280px]" 
        onMouseEnter={()=>{stateCatalogSubMenu.setMouseEnter(true)}}
        onMouseLeave={()=>{setTimeout(()=>{stateCatalogSubMenu.close()},500);stateCatalogSubMenu.setMouseEnter(false)}}
    >
            <div className="flex-1 overflow-y-auto">
                <div className="h-full bg-[#f8faf5] overflow-y-auto p-6">
                    <ul className="space-y-2">
                        {stateCatalogSubMenu.items.map((item)=>(
                        <li>
                            <div className="relative block text-left w-full">
                                <div className="w-full">
                                    <div className="w-full text-left px-5 py-3 text-[14px] font-medium text-[#3d4a2e] hover:text-[#aeca73] hover:bg-white border-l-[3px] border-transparent hover:border-l-[#aeca73] transition-all flex items-center justify-between cursor-pointer">
                                        <span>{item}</span>
                                    </div>
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