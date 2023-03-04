import { component$, Slot } from '@builder.io/qwik';
import Header from '~/components/Layout/Header';


export default component$(() => {
  return (
    <>
      <Header/>
      <main>
        <section>
          <Slot />
        </section>
      </main>
    </>
  );
});
