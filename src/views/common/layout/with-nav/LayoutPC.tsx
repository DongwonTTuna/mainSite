import React, { ReactNode } from 'react'
import CSS from './_css/pc_layout.module.css'
import Circle from '@views/common/mouse-movement/Circle'

export default function LayoutPC({ children }: { children: ReactNode }) {
  return (
    <main className={CSS.main__container}>
      <Circle />
      <div className={CSS.main__content}>{children}</div>
    </main>
  )
}
