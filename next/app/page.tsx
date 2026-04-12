import Link from "next/link";
import apiService from "./services/apiService";
import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
export const metadata: Metadata = {
  title: 'Главная страница',
  description: 'Стартовая страница сайта',
  keywords: ['аренда', 'товары', 'главная']
}
type catalogSubMenuType={
    id:number,
    name:string,
    image_url:string,
    slug:string
}
type calalogMenuType={
    id:number,
    name:string,
    subcatalog:catalogSubMenuType[]
}
export default async function Home() {
  const catalogData:calalogMenuType[]=await apiService.getWithoutToken('/listcatalog/')
  return (
    <div className="mt-[80px]">
      <section className="mx-auto overflow-hidden max-w-[1260px]">
        <div className="px-[30px] sm:px-[30px]">
          <div className="w-full">
            {catalogData.map((catalog)=>(
              <article key={catalog.id}>
                <header className="mt-[30px] mb-4 lg:mt-[50px] lg:mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-[#aeca73] rounded-full"></div>
                    <h3 className={`text-[15px] lg:text-[17px] font-bold text-[#3d4a2e] ${onest.className}`}>{catalog.name}</h3>
                  </div>
                </header>
                <div className="grid grid-cols-2 gap-2 lg:gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {catalog.subcatalog.map((subcatalog)=>(
                    <Link key={subcatalog.id} className="flex items-center gap-3 py-3 px-2 rounded-[10px] transition-all hover:bg-[#aeca73]/20 hover:shadow-soft"
                          href={`/catalog/${subcatalog.slug}`}>
                      <div className="flex items-center justify-center flex-shrink-0">
                        <img className="min-w-[50px] min-h-[50px] w-[50px] h-[50px] sm:min-w-[80px] sm:min-h-[80px] sm:w-[80px] sm:h-[80px] object-contain aspect-square rounded-[8px]" 
                              src={subcatalog.image_url} alt={subcatalog.name} />
                      </div>
                      <div className="flex items-center justify-start px-2">
                        <p className="text-[11px] sm:text-sm text-redesign-brown break-words card-title">
                          {subcatalog.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
