<script lang="ts">
  import {resolve} from "$app/paths"
</script>

<section class="tech-page">
    <div class="content">
        <h1>Tech Stack</h1>
        <div class="status">
            <span class="status-label">Status</span>
            <p>This section is currently under construction.</p>
        </div>
        <a href={resolve("/")} class="back-link">Back to TOP</a>
    </div>
</section>

<style>
    .tech-page {
        --page-padding: clamp(2rem, 5vw, 4rem);
        min-height: 100dvh;
        padding: var(--page-padding);
        background: radial-gradient(circle at top, rgba(5, 3, 12, 0.9), #010104 70%);
        color: #f4f4f5;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .content {
        max-width: 720px;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    h1 {
        font-size: clamp(2.25rem, 6vw, 3.5rem);
        margin: 0;
    }

    .status {
        border: 1px solid rgba(244, 244, 245, 0.25);
        border-radius: 1rem;
        padding: 1.5rem;
        background: rgba(244, 244, 245, 0.05);
    }

    .status-label {
        font-size: 0.9rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(244, 244, 245, 0.6);
    }

    .status p {
        margin: 0.25rem 0 0;
        font-size: 1.1rem;
        font-weight: 600;
    }

    .back-link {
        align-self: center;
        margin-top: 0.5rem;
        color: #f4f4f5;
        text-decoration: none;
        font-weight: 600;
        border-bottom: 1px solid rgba(244, 244, 245, 0.4);
        width: fit-content;
    }

    .back-link:hover {
        color: #f9f9f9;
        border-color: #f9f9f9;
    }
</style>
