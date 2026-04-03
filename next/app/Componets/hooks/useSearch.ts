import {create} from 'zustand'
import { catalogItemType } from '../Catalog_componets/CatalogItem';

interface search{
    isOpen:boolean
    open:()=>void
    close:()=>void
    items:catalogItemType[]
    setItems:(items:catalogItemType[])=>void
    next:string|null
    setNext:(url:string|null)=>void
    previous:string|null
    setPrevious:(url:string|null)=>void
}
const useSearch=create<search>((set)=>({
    isOpen:false,
    open:()=>set({isOpen:true}),
    close:()=>set({isOpen:false}),
    items:[],
    setItems:(items)=>set({items}),
    next:null,
    setNext:(url)=>set({next:url}),
    previous:null,
    setPrevious:(url)=>set({previous:url})
}))
export default useSearch