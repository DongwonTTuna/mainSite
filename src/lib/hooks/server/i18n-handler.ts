import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n/i18n';

export const handleParaglide: Handle = i18n.handle();