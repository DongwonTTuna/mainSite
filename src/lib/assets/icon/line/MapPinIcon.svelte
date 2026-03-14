<script lang="ts">
  import BaseLineIcon from './BaseLineIcon.svelte';

  const { size = '1rem' } = $props<{ size?: string }>();
</script>

<BaseLineIcon {size}>
  <path d="M12 20C15.5 15.9 18 12.84 18 9.5A6 6 0 1 0 6 9.5C6 12.84 8.5 15.9 12 20Z" />
  <circle cx="12" cy="9.5" r="2" />
</BaseLineIcon>
