import type { LayoutServerLoad } from './$types';

type Output = {
	isMobile: boolean
}

export const load: LayoutServerLoad<Output> = async ({ locals }) => {
 return {
	 isMobile: locals.isMobile
 }
}