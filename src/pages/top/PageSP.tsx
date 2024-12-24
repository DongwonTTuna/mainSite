import Image from 'next/image'
import TunaTopImage from './_images/tuna_top.png'
import CSS from './_css/sp_page.module.css'

export default function PageSP() {
  return (
    <main className={CSS.main__container}>
      <Image
        src={TunaTopImage}
        loading={'eager'}
        width={300}
        height={300}
        alt='DongwonTTuna'
        className={CSS.main__image}
        quality={75}
      />
    </main>
  )
}
