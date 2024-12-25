import CSS from '../_css/pc_page.module.css'
import TextAnimator from '@views/common/animation/text/TextAnimator'
import { getRandomKey } from '@lib/common/generate-key'

export default function MainTitlePC() {
  const words = [
    'Hi! This is',
    <a key={getRandomKey()} className={CSS.github__link} href={'https://github.com/dongwonttuna'}>
      @DongwonTTuna
    </a>,
  ]

  return (
    <h1 className={CSS.main__title}>
      <TextAnimator
        text={words}
        className={CSS.main__title}
        transition={{ delay: 0.5, duration: 1 }}
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        exit={'hidden'}
      />
    </h1>
  )
}
