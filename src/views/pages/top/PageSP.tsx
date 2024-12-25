import { Image } from '@unpic/react/nextjs'
import CSS from './_css/sp_page.module.css'

export default function PageSP() {
  return (
    <main className={CSS.main__container}>
      <Image
        src='https://res.cloudinary.com/dfd9pdmuf/image/upload/v1735070084/dongwontuna/ap59sakylhpoklaxsfkn.png'
        loading={'eager'}
        width={300}
        height={300}
        alt='DongwonTTuna'
        layout={'fixed'}
        className={CSS.main__image}
      />
    </main>
  )
}
