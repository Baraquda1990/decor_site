import { catalogItemType } from "@/app/Componets/Catalog_componets/CatalogItem"
import apiService from "@/app/services/apiService"
import CatalogItem from "@/app/Componets/Catalog_componets/CatalogItem"
import { getUserId } from "@/app/lib/actions"
import type { Metadata } from 'next'
/*
Компонент для отображния списка товаров в субкатегории
*/
export const metadata: Metadata = {
  title: 'Каталог',
  description: 'Страница с карточками товаров',
  keywords: ['аренда', 'товары', 'каталог']
}
export default async function NameCatalog({params}:{params:Promise<{slug:string}>}){
    const slug=(await params).slug
    const userId=await getUserId()
    let products:catalogItemType[]
    if(userId!==null){
        products=await apiService.get(`/catalog/${slug}`)
    }else{
        products=await apiService.getWithoutToken(`/catalog/${slug}`)
    }
    return(
        <main className="pt-[0px] lg:pt-[80px]">
            <div className="min-h-screen bg-bg-light pt-[10px] lg:pt-[20px] pb-[80px] lg:pb-[40px]">
                <div className="max-w-[1260px] mx-auto lg:mx-auto lg:px-6 xl:px-8 2xl:px-10">
                    <div>
                        <div className="px-[6px] lg:px-0 py-[10px] lg:py-0 grid gap-[6px] lg:gap-4 xl:gap-5 2xl:gap-6 grid-cols-2 lg:grid-cols-3">
                            {products.map((item)=>(
                                <CatalogItem key={item.id} catalogItem={item}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}


