<script lang="ts">
  import BaseLineIcon from './BaseLineIcon.svelte';

  const { size = '1rem' } = $props<{ size?: string }>();
</script>

<BaseLineIcon {size}>
  <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
  <path d="M4.75 7L12 12.25L19.25 7" />
</BaseLineIcon>
