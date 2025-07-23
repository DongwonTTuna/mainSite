import { component$, Slot } from "@builder.io/qwik"
import { Navigation } from "~/components/ui/Navigation"

export default component$(() => {
  return (
    <>
      <Navigation />
      <Slot />
    </>
  )
})
