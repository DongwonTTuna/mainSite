<script lang="ts">
	let { closeModal, title, children } = $props();
</script>

<section class="full__size__modal">
	<div class="modal__header">
		<div class="modal__title">
			{title}
		</div>
		<button aria-label="close-button" type="button" class="close-button" onclick={closeModal}>
			<span class="x"></span>
		</button>
	</div>

	{@render children()}
</section>

<style>
    .full__size__modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        transition: height 0.3s;
        z-index: 1000;
    }

    .modal__header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
				border-bottom: 1px solid #dcd9d9;
    }

    .modal__title {
        font-size: 1.5rem;
        font-weight: 500;
        padding: 10px 0;
    }

    .x {
        display: block;
        position: relative;
        width: 30px;
        height: 30px;
    }

    .x::before, .x::after { /* 共通設定 */
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px; /* 棒の幅（太さ） */
        height: 30px; /* 棒の高さ */
        background: #818181;
    }

    .x::before {
        transform: translate(-50%,-50%) rotate(45deg);
    }

    .x::after {
        transform: translate(-50%,-50%) rotate(-45deg);
    }

    .close-button {
        position: absolute;
        right: 10px;
        display: flex;
        justify-content: flex-end;
        padding: 10px 0;
    }

</style>