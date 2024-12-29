import { Image } from '@unpic/react/nextjs'

type Props = {
  isMobile: boolean
  className: string
}

export default function DongwonTTunaImage({ isMobile, className }: Props) {
  const imageWidth = isMobile ? 300 : 500
  const imageHeight = isMobile ? 300 : 500

  return (
    <Image
      src='https://res.cloudinary.com/dfd9pdmuf/image/upload/v1735070084/dongwontuna/ap59sakylhpoklaxsfkn.png'
      loading={'eager'}
      width={imageWidth}
      height={imageHeight}
      alt='DongwonTTuna'
      layout={'fixed'}
      className={className}
    />
  )
}
