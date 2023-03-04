import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import FirstComponent from "~/components/main/FirstComponent";

export default component$(() => {

  return (
    <div>
      <FirstComponent/>
    </div>
  );
});

export const head: DocumentHead = {
  title: "DongwonTTuna's Land",
  meta: [
    {
      content: "@DongwonTTuna Main Land",
    },
  ],
};
