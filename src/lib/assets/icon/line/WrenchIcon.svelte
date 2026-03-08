<script lang="ts">
  import BaseLineIcon from './BaseLineIcon.svelte';

  const { size = '1rem' } = $props<{ size?: string }>();
</script>

<BaseLineIcon {size}>
  <path d="M14.75 5.25A4.2 4.2 0 0 1 19 10.9L11.35 18.55A2.1 2.1 0 1 1 8.38 15.58L16.03 7.93A4.2 4.2 0 0 1 14.75 5.25Z" />
  <path d="M13.7 6.3L17.7 10.3" />
</BaseLineIcon>
