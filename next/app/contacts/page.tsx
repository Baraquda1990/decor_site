import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
import {Phone,Email, Telegram, Adress,WorkingHours, Instagram} from "../Componets/Contacts_components/Cards"
import Feedback from '../Componets/Contacts_components/Feedback'
import type { Metadata } from 'next'
/*
Страница с контактами администратора
*/
export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Страница с контактами владельца сайта',
  keywords: ['аренда', 'товары', 'каталог','контакты']
}
export default function Contacts(){
    return(
        <main className="min-h-screen bg-white pb-[60px] lg:pb-0">
        <div className="max-w-[1260px] mx-auto px-[15px] lg:px-[30px] pt-[80px] lg:pt-[120px] pb-[10px] lg:pb-[20px]">
            <h1 className={`${onest.className} font-bold text-[24px] lg:text-[36px] text-[#3d4a2e] uppercase tracking-wide`}>Контакты</h1>
            <p className={`${onest.className} text-[14px] lg:text-[16px] text-gray-500 mt-2`}>Свяжитесь с нами удобным способом </p>
        </div>
        <div className="max-w-[1260px] mx-auto px-[15px] lg:px-[30px] py-[20px] lg:py-[40px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-[30px] lg:mb-[40px]">
                <Phone 
                    caption="Телефон"
                    text="+7 747 219 90 55"
                    href="tel:+77472199055"
                    muted_text="WhatsApp, звонки"
                />
                <Email 
                    caption="Почта"
                    text="info@rentalbees.ru"
                    href="mailto:info@rentalbees.ru"
                />
                <Telegram
                    caption="Telegram"
                    text="@rentalbees"
                    href='https://t.me/rentalbees#'
                />
                <Adress
                    caption="Адрес склада"
                    text="деревня Грибки Промышленная улица вл5с1"
                />
                <WorkingHours 
                    caption="Часы работы"
                    text="9:00 — 21:00"
                    muted_text="ежедневно"
                />
                <Instagram
                    caption="Instagram"
                    text="@rentalbees_ru"
                    href="https://instagram.com/rentalbees_ru"
                    muted_text="* запрещена на территории РФ"
                />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
                <div className='lg:col-span-3'>
                    <div className='bg-white border border-gray-200 rounded-[12px] overflow-hidden h-[350px] lg:h-[480px]'>
                        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A44edc120bc14826ea6c58206c291ae8d58dbf719a9bd6e3c925c7d6842fbd703&amp;source=constructor" width="100%" height="100%"></iframe>
                    </div>
                    <p className={`${onest.className} text-[13px] text-gray-400 mt-3 px-1`}>В нашем шоуруме можно посмотреть арендное оборудование и подобрать декор для вашего мероприятия</p>
                </div>
                <div className='lg:col-span-2'>
                    <Feedback/>
                </div>

            </div>
        </div>
        </main>
    )
}