import Image from 'next/image'
import TunaTopImage from './_images/tuna_top.png'
import './_css/pc_page.css'

export default function PagePC() {
  return (
    <main className='dongwon'>
      <Image src={TunaTopImage} width={500} height={500} alt='DongwonTTuna' className={'main__image'} />
    </main>
  )
}
