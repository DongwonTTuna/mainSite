import { Image } from '@unpic/react/nextjs'
import CSS from './_css/pc_page.module.css'
import MainTitle from './_component/MainTitle'

export default function PagePC() {
  return (
    <main className={CSS.main__container}>
      <div className={CSS.main__content}>
        <MainTitle />
        <Image
          src='https://res.cloudinary.com/dfd9pdmuf/image/upload/v1735070084/dongwontuna/ap59sakylhpoklaxsfkn.png'
          loading={'eager'}
          width={500}
          height={500}
          alt='DongwonTTuna'
          layout={'fixed'}
          className={CSS.main__image}
        />
      </div>
    </main>
  )
}
