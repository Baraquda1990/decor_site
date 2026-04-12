import {create} from 'zustand'
type catalogSubMenuType={
    id:number,
    name:string,
    image_url:string,
    slug:string
}
interface catalogSubMenu{
    isOpen:boolean
    open:()=>void
    close:()=>void
    closeAll:()=>void
    items:catalogSubMenuType[]
    setItems:(items:catalogSubMenuType[])=>void
    isMouseEnter:boolean
    setMouseEnter:(value:boolean)=>void
}
const useCatalogSubMenu=create<catalogSubMenu>((set)=>({
    isMouseEnter:false,
    setMouseEnter:(value)=>set({isMouseEnter:value}),
    isOpen:false,
    open:()=>set({isOpen:true}),
    close:()=>set((state)=>({isOpen:state.isMouseEnter?true:false})),
    closeAll:()=>set({isOpen:false}),
    items:[],
    setItems:(items)=>set({items})

}))
export default useCatalogSubMenu