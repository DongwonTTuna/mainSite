import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

/**
 * Root index redirects to default language
 */
export default component$(() => {
  // This will be handled by middleware to redirect to default language
  return (
    <div>
      <script dangerouslySetInnerHTML="window.location.href = '/en/';" />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Lee Dongwon - Interactive Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Interactive portfolio of Lee Dongwon',
    },
  ],
};