import {create} from 'zustand'
interface catalogDrawler{
    isOpen:boolean;
    open: ()=>void;
    close: ()=>void;
}
const useCatalogDrawler=create<catalogDrawler>((set)=>({
    isOpen:false,
    open:()=>set({isOpen:true}),
    close:()=>set({isOpen:false})
}))
export default useCatalogDrawler