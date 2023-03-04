import { component$ } from '@builder.io/qwik';
import { useBrowserVisibleTask$ } from '@builder.io/qwik';
export default component$(() => {
  useBrowserVisibleTask$(()=>{
        window.location.replace("https://tviewchart.dongwontuna.net");
    })
  return (<></>)
});