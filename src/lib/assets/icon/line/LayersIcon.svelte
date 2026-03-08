<script lang="ts">
  import BaseLineIcon from './BaseLineIcon.svelte';

  const { size = '1rem' } = $props<{ size?: string }>();
</script>

<BaseLineIcon {size}>
  <path d="M12 4L20 8.5L12 13L4 8.5L12 4Z" />
  <path d="M6.25 12L12 15.25L17.75 12" />
  <path d="M8.25 15.5L12 17.75L15.75 15.5" />
</BaseLineIcon>
