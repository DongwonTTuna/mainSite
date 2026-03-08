<script lang="ts">
  import BaseLineIcon from './BaseLineIcon.svelte';

  const { size = '1rem' } = $props<{ size?: string }>();
</script>

<BaseLineIcon {size}>
  <circle cx="12" cy="8" r="3.25" />
  <path d="M5 19.25C6.8 15.8 9.1 14.25 12 14.25C14.9 14.25 17.2 15.8 19 19.25" />
</BaseLineIcon>
