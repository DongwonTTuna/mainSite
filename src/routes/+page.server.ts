export const load = async (event) => {
	const { isMobile } = await event.parent();

	return {
		isMobile
	};
};
