export default async function Loading(){
    return(
    <main className="pt-[0px] lg:pt-[80px]">
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#aeca73] rounded-full animate-spin"></div>
        <p className="text-center text-gray-600">
            Подождите немного...
        </p>
        </div>
    </div>
    </main>
    )
}