'use client'
import { useEffect, useRef, useState } from 'react'
import CSS from './_css/circle.module.css'

export default function Circle() {
  const circleElement = useRef<HTMLDivElement>(null)
  const [circleStyle, setCircleStyle] = useState<{
    left: string
    top: string
  }>({ left: '0px', top: '0px' })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!circleElement.current) return
      setTimeout(() => {
        setCircleStyle({
          left: `${e.clientX}px`,
          top: `${e.clientY}px`
        })
      }, 100)
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return <div className={CSS.circle} ref={circleElement} style={circleStyle} />
}
