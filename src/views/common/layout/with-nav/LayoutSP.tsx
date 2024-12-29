import React, { ReactNode } from 'react'
import CSS from './_css/sp_layout.module.css'

export default function LayoutSP({ children }: { children: ReactNode }) {
  return (
    <main className={CSS.main__container}>
      <div className={CSS.main__content}>{children}</div>
    </main>
  )
}
