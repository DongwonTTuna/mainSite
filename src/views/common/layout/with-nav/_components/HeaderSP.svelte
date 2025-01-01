<script lang="ts">
	const menuItems = [
		{
			label: 'Home',
			href: '/'
		},
		{
			label: 'About',
			href: '/about'
		},
		{
			label: 'Contact',
			href: '/contact'
		}
	];

	// メニューの開閉状態
	let isMenuOpen = false;

	const setIsMenuOpen = (isOpen: boolean) => {
		isMenuOpen = isOpen;
	};
</script>


<header class="header">
	<div class="header__container">
		<div class="hamburger__menu">
			<div class="menu__icon" onclick={() => setIsMenuOpen(true)}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="header__body" class:open={isMenuOpen}>
			<div class="header__button">
				<div class="menu__icon" onclick={() => setIsMenuOpen(false)}>
					<span class="x"></span>
					<span class="x"></span>
				</div>
			</div>
			<ul class="header__menu">
				{#each menuItems as item}
					<li class="header__menu__item">
						<a href={item.href} class="header__menu__link">
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</header>

<style>
    .header {
        /* ハンバーガーメニュー */
    }

    .header__container {
        padding: 10px 12px;
        display: flex;
        justify-content: flex-end;
    }

    .button__item__button {

    }

    .hamburger__menu {

    }

    .header__container {

    }

    .menu__icon {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 30px;
        height: 25px;
    }

    .menu__icon span {
        display: block;
        width: 30px;
        height: 1px;
        background-color: #333;
        border-radius: 999px;
    }

    .header__body {
        position: absolute;
        display: none;
        height: 0;
        background-color: #fff;
        transition: height 0.3s;
        z-index: 1000;
    }

    .open {
        /** 上から滑らかに開く */
        display: block;
        height: 400px;

    }

    .x:nth-child(1) {
        transform: rotate(45deg) translateY(9px);
    }

    .x:nth-child(2) {
        transform: rotate(-45deg) translateY(-9px);
    }

    .header__button {
        display: flex;
        justify-content: flex-end;
        padding: 10px 0;
    }
</style>