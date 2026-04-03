'use client'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
/*
Динамическая генерация изображений для галереи 
*/
export default function GalleryClient({images}:{images:string[]}) {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div className="p-6 mt-[100px]">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer overflow-hidden rounded-2xl shadow-lg"
            onClick={() => setSelected(src)}
          >
            <Image
              src={'/gallery/'+src}
              alt="gallery image"
              width={400}
              height={300}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative"
            >
              <Image
                src={'/gallery/'+selected}
                alt="selected"
                width={800}
                height={600}
                className="rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
