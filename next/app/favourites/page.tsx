import apiService from "../services/apiService";
import CatalogItem from "../Componets/Catalog_componets/CatalogItem";
import { catalogItemType } from "../Componets/Catalog_componets/CatalogItem";
import { getUserId } from "../lib/actions";
import type { Metadata } from 'next'
/*
Отображение избранного
*/
export const metadata: Metadata = {
  title: 'Избранное',
  description: 'Страница с карточками избранных товаров',
  keywords: ['аренда', 'товары', 'избранное']
}
export default async function Favourites(){
    const user_id=await getUserId()
    let products:catalogItemType[]=[]
    if(user_id){
        products=await apiService.get('/favourites/')
    }
    return(
        <main className="pt-[0px] lg:pt-[80px]">
            <div className="min-h-screen bg-bg-light pt-[10px] lg:pt-[20px] pb-[80px] lg:pb-[40px]">
                <div className="max-w-[1260px] mx-auto lg:mx-auto lg:px-6 xl:px-8 2xl:px-10">
                    <div>
                        <h1 className="my-5 text-xl mx-4 font-bold">Ибранное:</h1>
                        {user_id?(
                            <div className="px-[6px] lg:px-0 py-[10px] lg:py-0 grid gap-[6px] lg:gap-4 xl:gap-5 2xl:gap-6 grid-cols-2 lg:grid-cols-3">
                                {products.map((item)=>(
                                        <CatalogItem key={item.id} catalogItem={item}/>
                                    ))}
                            </div>
                            ):(
                            <div className="border-2 border-red-400 rounded-2xl mx-2 my-1 px-3 py-4 bg-red-600">
                                <p className="text-bold text-white text-[18px]">Для просмотра страницы "Избранное" необходима авторизация!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}