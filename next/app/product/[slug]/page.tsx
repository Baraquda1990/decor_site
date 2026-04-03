import apiService from "@/app/services/apiService"
import TabImage from "@/app/Componets/ProductsComponents/TabImage"
import Link from "next/link"
import { getUserId } from "@/app/lib/actions"
import ButtonAddToCard from "@/app/Componets/CardComponents/ButtonAddToCard"
import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
/*
Карточка товара
*/
type imagesType={
    id:number,
    image_url:string
}

type subCatalogType={
    id:string,
    name:string,
    image_url:string,
    slug:string
}

type productType={
    id:number,
    name:string,
    slug:string,
    price:string,
    nominal:string,
    image_url:string,
    description:string,
    width:number,
    length:number,
    height:number,
    diameter:number,
    unit:string,
    subcatalog:subCatalogType,
    images:imagesType[],
    cart_quantity:number
}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  let product: productType
  const slug=(await params).slug
  try {
    product = await apiService.getWithoutToken(`/product/${slug}`)
  } catch {
    return {
      title: 'Продукт не найден',
      description: 'Страница с товаром не найдена'
    }
  }
  return {
    title: `${product.name} — ${product.price}`,
    description: product.description.slice(0, 160),
    keywords: ['аренда', 'товары', product.name],
  }
}
export default async function Product({params}:{params:Promise<{slug:string}>}){
    const slug=(await params).slug
    const userId=await getUserId()
    let product:productType
    if(userId!==null){
        product=await apiService.get(`/product/${slug}`)
    }else{
        product=await apiService.getWithoutToken(`/product/${slug}`)
    }
    type Nominal='rub'|'kaz'|'usd'
    const nominal:Record<Nominal,string>={
        rub:'руб',
        kaz:'тг.',
        usd:'usd'
    }

    type Unit = 'mm' | 'sm' | 'm'
    const units: Record<Unit, string> = {
        mm: "мм",
        sm: "см",
        m: "м"
    }
    return(
        <main className="pt-[0px] lg:pt-[80px]">
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
                <div className="max-w-[1260px] mx-auto px-6 pt-4 pb-16">
                    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                        <Link className="hover:text-[#aeca73] transition-all duration-200" href='/'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"></path></svg>
                        </Link>
                        <span className="text-gray-400">·</span>
                        <Link className="hover:text-[#aeca73] transition-all duration-200 hover:underline" href='/catalog/'>
                            Каталог
                        </Link>
                        <span className="text-gray-400">·</span>
                        <Link className="hover:text-[#aeca73] transition-all duration-200 hover:underline capitalize" href={`/catalog/${product.subcatalog.slug}`}>
                            {product.subcatalog.name}
                        </Link>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-900 font-medium truncate max-w-[300px]">
                            {product.name}
                        </span>
                    </nav>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10">
                        <div className="space-y-3">
                            <TabImage id={product.id} image={product.image_url} images={product.images} userId={userId}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h1 className={`${onest.className} font-semibold text-2xl xl:text-3xl text-gray-900 leading-tight tracking-tight`}>
                                    {product.name}
                                </h1>
                            </div>
                            <div className="flex items-center justify-between mt-[16px]">
                                <span className="font-jost font-semibold text-[32px] text-black leading-[36px]">
                                    {product.price} {nominal[product.nominal as Nominal]}
                                </span>
                            </div>
                            <div className="min-w-[300px] my-5 mx-auto">
                                <ButtonAddToCard userId={userId} cart_quantity={product.cart_quantity} product_id={product.id}/>
                            </div>
                            <div className="mt-8 space-y-6">
                                <div className="bg-white rounded-xl overflow-hidden">
                                    <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                                        <div className="w-1 h-5 bg-[#aeca73] rounded-full"></div>
                                        <h3 className={`${onest.className} font-semibold text-base text-gray-900`}>Описание</h3>
                                    </div>
                                    <div className="px-5 pb-5">
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl overflow-hidden">
                                    <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                                        <div className="w-1 h-5 bg-[#aeca73] rounded-full"></div>
                                        <h3 className={`${onest.className} font-semibold text-base text-gray-900`}>Размеры</h3>
                                    </div>
                                    <div className="px-5 pb-5">
                                        <div className="text-[14px] list-none mt-[12px] mb-[12px] props-list text-[#5B5C5E]">
                                            {(product.diameter!==0)&&(
                                                <p>Диаметр: {product.diameter} {units[product.unit as Unit]}</p>
                                            )}                                            
                                            {(product.height!==0)&&(
                                                <p>Высота: {product.height} {units[product.unit as Unit]}</p>
                                            )}
                                            {(product.width!==0)&&(
                                                <p>Ширина: {product.width} {units[product.unit as Unit]}</p>
                                            )}
                                            {(product.length!==0)&&(
                                                <p>Длина : {product.length} {units[product.unit as Unit]}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}