import { Onest } from 'next/font/google'
const onest=Onest({subsets:['cyrillic']})
import {Phone,Email, Telegram, Adress,WorkingHours, Instagram} from "../Componets/Contacts_components/Cards"
export default function Contacts(){
    return(
        <main className="min-h-screen bg-white pb-[60px] lg:pb-0">
        <div className="max-w-[1260px] mx-auto px-[15px] lg:px-[30px] pt-[80px] lg:pt-[120px] pb-[10px] lg:pb-[20px]">
            <h1 className={`${onest.className} font-bold text-[24px] lg:text-[36px] text-[#3d4a2e] uppercase tracking-wide`}>Контакты</h1>
            <p className='font-onest text-[14px] lg:text-[16px] text-gray-500 mt-2'>Свяжитесь с нами удобным способом </p>
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
                    <div className='bg-white border border-gray-200 rounded-[12px] p-6'>
                        <h2 className='font-onest font-bold text-[18px] lg:text-[20px] text-[#3d4a2e] mb-[20px]'>
                            Остались вопросы? 
                        </h2>
                        <form className='space-y-[15px]' action="">
                            <input type="text" placeholder='Имя' className='w-full h-[50px] lg:h-[60px] px-[20px] bg-white border border-[#dfe8cc] rounded-[10px] text-[14px] lg:text-[16px] text-[#5B5C5E] placeholder-[#B8B8B8] focus:outline-none focus:border-[#aeca73] transition-colors' />
                            <input type="text" placeholder="+7 (000) 000-00-00" className='w-full h-[50px] lg:h-[60px] px-[20px] bg-white border border-[#dfe8cc] rounded-[10px] text-[14px] lg:text-[16px] text-[#5B5C5E] placeholder-[#B8B8B8] focus:outline-none focus:border-[#aeca73] transition-colors' />
                            <textarea name="" id="" placeholder="Ваш вопрос" rows={4} className='w-full px-[20px] py-[15px] bg-white border border-[#dfe8cc] rounded-[10px] text-[14px] lg:text-[16px] text-[#5B5C5E] placeholder-[#B8B8B8] focus:outline-none focus:border-[#aeca73] transition-colors resize-none'></textarea>
                            <button className='w-full h-[50px] lg:h-[60px] rounded-[10px] bg-[#aeca73] text-white text-[14px] lg:text-[16px] font-bold font-onest uppercase tracking-wide hover:bg-[#8fb55a] transition-colors disabled:opacity-50 flex items-center justify-center'>
                                Отправить заявку
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
        </main>
    )
}