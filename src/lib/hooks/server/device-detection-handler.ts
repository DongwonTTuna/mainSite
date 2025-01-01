import type { Handle } from '@sveltejs/kit';

export const deviceDetectionHandler: Handle = async ({ event, resolve }) => {
	event.locals.isMobile = isMobile(event.request.headers as Headers);
	return await resolve(event);
};

/**
 * Check if the request is from a mobile device
 */
function isMobile(headers: Headers): boolean {
	return (
		/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
			headers.get('user-agent') || ''
		) || headers.get('sec-ch-ua-mobile') == '?1'
	);
}