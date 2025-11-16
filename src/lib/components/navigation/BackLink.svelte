<script lang="ts">
  import {resolve} from "$app/paths";
</script>

<a class="back-link" href={resolve("/")}>
    <span aria-hidden="true" class="back-link__arrow">←</span>
</a>

<style>
    .back-link__arrow {
        font-size: 2rem;
        line-height: 1;
        margin-top: 0.1rem;
        min-width: 48px;
        min-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
