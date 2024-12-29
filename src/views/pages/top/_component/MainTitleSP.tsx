import CSS from '../_css/sp_page.module.css'
import ElementAnimator from '@views/common/animation/ElementAnimator'
import { getRandomKey } from '@lib/common/generate-key'

export default function MainTitlePC() {
  const words = [
    'Hi! This is',
    <a
      key={getRandomKey()}
      className={CSS.github__link}
      href={'https://github.com/dongwonttuna'}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      @DongwonTTuna
    </a>
  ]

  return (
    <h1 className={CSS.main__title}>
      <ElementAnimator
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
