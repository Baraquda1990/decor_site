import apiService from "../services/apiService"
import { getUserId } from "../lib/actions"
import { catalogItemType } from "../Componets/Catalog_componets/CatalogItem"
import CardItem from "../Componets/CardComponents/CardItem"
import CardItemForOrder from "../Componets/CardComponents/CardItemForOrder"
import Phone from "../Componets/CardComponents/PhoneInput"
import DateRange from "../Componets/CardComponents/DateRange"
import ButtonSaveCard from "../Componets/CardComponents/ButtonSaveCard"
import type { Metadata } from 'next'
/*
Компонент отображения корзины и предыдущих заказов
*/
export const metadata: Metadata = {
  title: 'Корзина',
  description: 'Страница оформления аренды товаров',
  keywords: ['аренда', 'товары', 'корзина']
}
export type cardItemsType={
    id:number,
    product:catalogItemType,
    quantity:number,
    price_by_quantity:number
}
type cardType={
    id:number,
    status:string,
    start_date:string,
    end_date:string,
    items:cardItemsType[],
    phone:string,
    created:string
}
export default async function Card(){
    type Nominal='rub'|'kaz'|'usd'
    const nominal:Record<Nominal,string>={
        rub:'руб',
        kaz:'тг.',
        usd:'usd'
    }
    const userId=await getUserId()
    let card:cardType|undefined=undefined
    let orders:cardType[]|undefined=undefined
    if(userId!==null){
        card=await apiService.get('/cart/')
        orders=await apiService.get('/cart/past-orders/')
    }
    let sum:number=0
    for(let cardItem of card?.items ?? []){
        sum+=cardItem.price_by_quantity
    }
    let quantity_products=card?.items.length
    return(
        <main className="pt-[0px] lg:pt-[80px]">
            <div className="bg-bg-light py-[10px]">
                <div className="max-w-[1260px] mx-auto lg:mx-auto lg:px-6 xl:px-8 2xl:px-10">
                    <div>
                        <h1 className="my-5 text-xl mx-4 font-bold">Корзина:</h1>
                        {userId?(
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="flex flex-col text-xl space-y-3 border-[2px] border-[#aeca73] mx-5 rounded-2xl">
                                    <div className="flex flex-col text-[#668544] font-bold space-y-2 py-5 px-8 my-3 mx-3 border border-[#aeca73] rounded-2xl">
                                        <p>Выбирите дату аренды</p>
                                        <DateRange userId={userId} dateStart={card?.start_date} dateEnd={card?.end_date}/>
                                    </div>
                                    <div className="text-[#668544] font-bold space-y-2 py-5 px-8 my-3 mx-3 border border-[#aeca73] rounded-2xl">
                                        <p>Товаров корзине: {quantity_products}</p>
                                    </div>
                                    <div className="text-[#668544] font-bold space-y-2 py-5 px-8 my-3 mx-3 border border-[#aeca73] rounded-2xl">
                                        <p>Сумма: {sum} {nominal[card?.items[0]?.product.nominal as Nominal]}</p>
                                    </div>
                                    <div className="flex flex-col text-[#668544] font-bold space-y-2 py-5 px-8 my-3 mx-3 border border-[#aeca73] rounded-2xl">
                                        <p>Введите номер телефона для связи:</p>
                                        <Phone userId={userId} initialPhone={card?.phone}/>
                                    </div>
                                    <div className="text-[#668544] font-bold space-y-2 py-5 px-8 my-3 mx-3 border border-[#aeca73] rounded-2xl">
                                        <ButtonSaveCard userId={userId}/>
                                    </div>
                                </div>
                                <div className="flex flex-col text-xl space-y-3 border-[2px] border-[#aeca73] mx-5 rounded-2xl p-5 mt-2 lg:mt-0">
                                    <h2 className="my-5 text-xl mx-4 text-[#668544] font-bold">Товары в корзине</h2>
                                
                                    <div className="flex flex-col space-y-5">
                                        {(card!==undefined)&&card?.items?.map((item)=>(
                                            <CardItem key={item.id} item={item} userId={userId}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            ):(
                            <div className="border-2 border-red-400 rounded-2xl mx-2 my-1 px-3 py-4 bg-red-600">
                                <p className="text-bold text-white text-[18px]">Для просмотра страницы "Корзина" необходима авторизация!</p>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        {orders!==undefined&&orders?.map((order)=>(
            <div key={order.id} className="bg-bg-light py-[10px]">
                <div className="max-w-[1260px] mx-auto lg:mx-auto lg:px-6 xl:px-8 2xl:px-10">
                    <div>
                        <h1 className="my-5 text-xl mx-4 font-bold">Заказ от {order.created.slice(0,10)}</h1>
                        {userId&&(
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="flex flex-col text-xl space-y-3 border-[2px] border-[#aeca73] mx-5 rounded-2xl">
                                    <div className="flex flex-col text-[#668544] font-bold space-y-2 py-5 px-8 my-3 mx-3 border border-[#aeca73] rounded-2xl">
                                        <p>Дата аренды</p>
                                        <p>{order.start_date} - {order.end_date}</p>
                                    </div>
                                    <div className="text-[#668544] font-bold space-y-2 py-5 px-8 my-3 mx-3 border border-[#aeca73] rounded-2xl">
                                        <p>Товаров корзине: {order?.items.length}</p>
                                    </div>
                                    <div className="text-[#668544] font-bold space-y-2 py-5 px-8 my-3 mx-3 border border-[#aeca73] rounded-2xl">
                                        <p>
                                            Сумма: {(order.items ?? []).reduce((acc, item) => acc + item.price_by_quantity, 0)}{' '}
                                            {nominal[order.items[0]?.product.nominal as Nominal]}
                                        </p>
                                    </div>
                                    <div className="flex flex-col text-[#668544] font-bold space-y-2 py-5 px-8 my-3 mx-3 border border-[#aeca73] rounded-2xl">
                                        <p>Номер телефона для связи:</p>
                                        <p>{order.phone}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col text-xl space-y-3 border-[2px] border-[#aeca73] mx-5 rounded-2xl p-5 mt-2 lg:mt-0">
                                    <h2 className="my-5 text-xl mx-4 text-[#668544] font-bold">Товары в корзине</h2>
                                
                                    <div className="flex flex-col space-y-5">
                                        {(order!==undefined)&&order?.items?.map((item)=>(
                                            <CardItemForOrder key={item.id} item={item}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        ))}
        </main>
    )
}