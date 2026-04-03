"use client";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="pt-[0px] lg:pt-[80px]">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-gray-700">
            Что-то пошло не так 😕
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    </main>
  );
}