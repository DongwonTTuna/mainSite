import { browser } from '$app/environment';

/**
 * Get menu items
 * @returns {Array} Menu items
 * @warning This function will return an empty array on SSR.
 */
export const getMenuItems = () => {
	if (browser !== true) {
		return [];
	}

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
		},
		{
			label: 'Product',
			href: '/product'
		}
	];

	const url = new URL(window.location.href);
	const path = url.pathname;

	return menuItems.filter((i) => path !== i.href);
};