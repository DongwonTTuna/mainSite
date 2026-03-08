<script lang="ts">
  import BaseLineIcon from './BaseLineIcon.svelte';

  const { size = '1rem' } = $props<{ size?: string }>();
</script>

<BaseLineIcon {size}>
  <path d="M4 7.25H13" />
  <path d="M8.5 5V7.25C8.5 10.35 6.7 12.8 4.5 14.5" />
  <path d="M8.5 10.25C9.35 11.75 10.55 13.15 12 14.25" />
  <path d="M14.5 19L17.75 10L21 19" />
  <path d="M15.45 16.25H20.05" />
</BaseLineIcon>
