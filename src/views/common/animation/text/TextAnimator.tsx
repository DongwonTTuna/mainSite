'use client'
import { type CSSProperties, JSX, useRef, ComponentProps } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { getRandomKey } from '@lib/common/generate-key'

type Props = ComponentProps<typeof motion.p> & {
  text: (string | JSX.Element)[]
  delay?: number
  onInView?: boolean
  className?: string
  style?: CSSProperties
}

export default function TextAnimator(props: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  console.log(getRandomKey())
  return (
    <AnimatePresence>
      {props.text.map((word, i) => (
        <motion.p
          ref={ref}
          key={getRandomKey()}
          {...props}
          animate={isInView ? props.animate : {}}
          transition={{ ...props.transition, delay: i * (props.delay ?? 0.5) }}
        >
          {word}
        </motion.p>
      ))}
    </AnimatePresence>
  )
}
