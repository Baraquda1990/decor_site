import {create} from 'zustand'
interface catalogMenu{
    isOpen:boolean;
    open:()=>void;
    close:()=>void;
}
const useCatalogMenu=create<catalogMenu>((set)=>({
    isOpen:false,
    open:()=>set({isOpen:true}),
    close:()=>set({isOpen:false})
}))
export default useCatalogMenu