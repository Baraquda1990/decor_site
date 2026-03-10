import {create} from 'zustand'
interface catalogSubMenu{
    isOpen:boolean
    open:()=>void
    close:()=>void
    items:string[]
    setItems:(items:string[])=>void
    isMouseEnter:boolean
    setMouseEnter:(value:boolean)=>void
}
const useCatalogSubMenu=create<catalogSubMenu>((set)=>({
    isMouseEnter:false,
    setMouseEnter:(value)=>set({isMouseEnter:value}),
    isOpen:false,
    open:()=>set({isOpen:true}),
    close:()=>set((state)=>({isOpen:state.isMouseEnter?true:false})),
    items:[],
    setItems:(items)=>set({items:items})

}))
export default useCatalogSubMenu