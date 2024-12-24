import Image from 'next/image'
import TunaTopImage from './_images/tuna_top.png'
import CSS from './_css/pc_page.module.css'

export default function PagePC() {
  return (
    <main className={CSS.main__container}>
      <Image
        className={CSS.main__image}
        src={TunaTopImage}
        loading={'eager'}
        width={500}
        height={500}
        alt='DongwonTTuna'
        quality={100}
      />
    </main>
  )
}
