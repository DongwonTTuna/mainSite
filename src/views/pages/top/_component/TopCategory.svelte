<script lang="ts">
	import { getMenuItems } from '$views/common/layout/with-nav/_components/menu-items';

	let menuItems = getMenuItems();
</script>


<div class="menu__container">
	{#each menuItems as item}
		<div class="header__menu__item">
			<a href={item.href} class="header__menu__link">
				{item.label}
			</a>
		</div>
	{/each}
</div>

<style>
.menu__container {
		position: absolute;
		bottom: 60px;
		width: 684px;
		right: 50%;
		transform: translateX(50%);
		display: flex;
		justify-content: space-between;
}

.header__menu__item {
		font-size: 1.5rem;
		font-weight: 700;
		text-align: center;
		filter: drop-shadow(0 0 20px #000);
		background-color: transparent;
		transition: all 0.3s;
}

.header__menu__item:hover {
    filter: drop-shadow(0 0 40px #000);
		transform: scale(1.1);
}
</style>