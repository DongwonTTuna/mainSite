<script lang="ts">
  import BaseLineIcon from './BaseLineIcon.svelte';

  const { size = '1rem' } = $props<{ size?: string }>();
</script>

<BaseLineIcon {size}>
  <rect x="3.5" y="7.25" width="17" height="11.5" rx="2" />
  <path d="M9 7.25V5.75C9 4.78 9.78 4 10.75 4H13.25C14.22 4 15 4.78 15 5.75V7.25" />
  <path d="M3.5 11.5H20.5" />
</BaseLineIcon>
