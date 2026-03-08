<script lang="ts">
  import BaseLineIcon from './BaseLineIcon.svelte';

  const { size = '1rem' } = $props<{ size?: string }>();
</script>

<BaseLineIcon {size}>
  <path d="M3.5 7.5C3.5 6.4 4.4 5.5 5.5 5.5H9L10.75 7.25H18.5C19.6 7.25 20.5 8.15 20.5 9.25V17.5C20.5 18.6 19.6 19.5 18.5 19.5H5.5C4.4 19.5 3.5 18.6 3.5 17.5V7.5Z" />
</BaseLineIcon>
