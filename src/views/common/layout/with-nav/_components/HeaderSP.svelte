<script lang="ts">
	import FullSizeModal from '$views/common/modal/FullSizeModal.svelte';
	import WaveUnderText from '$views/common/text/WaveUnderText.svelte';
	import { getMenuItems } from '$views/common/layout/with-nav/_components/menu-items';

	let menuItems = getMenuItems();

	// メニューの開閉状態
	let isMenuOpen = $state(false);

	const toggleModal = (isOpen: boolean) => {
		isMenuOpen = isOpen;
	};
</script>


<header class="header">
	<div class="header__container">
		<div class="hamburger__menu">
			<button aria-label="hamburger" type="button" class="menu__icon" onclick={() => toggleModal(true)}>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
		{#if isMenuOpen}
			<FullSizeModal closeModal={() => toggleModal(false)} title="サイドバー">
				<ul class="header__menu">
					{#each menuItems as item}
						<WaveUnderText>
							<li class="header__menu__item">
								<a href={item.href} class="header__menu__link">
									{item.label}
								</a>
							</li>
						</WaveUnderText>
					{/each}
				</ul>
			</FullSizeModal>
		{/if}
	</div>
</header>

<style>
    .header__container {
        padding: 10px 12px;
        display: flex;
        justify-content: flex-end;
    }

    .menu__icon {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 30px;
    }

    .menu__icon span {
        display: block;
        width: 30px;
        height: 1.5px;
        background: #818181;
    }

    .header__menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;
        height: 100%;
        list-style: none;
        padding: 0;
    }

    .header__menu__item {
        width: 120px;
        text-align: center;
        padding: 8px 24px;
    }


</style>