import fs from 'fs'
import path from 'path'
import GalleryClient from '../Componets/Gallery/GallaryClient'
/*
Галерея с изображениями 
*/
export default function Page() {
  const dir = path.join(process.cwd(),'public/gallery')
  const files = fs.readdirSync(dir)

  return <GalleryClient images={files} />
}