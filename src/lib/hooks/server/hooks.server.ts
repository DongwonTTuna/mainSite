import {sequence} from '@sveltejs/kit/hooks';
import { deviceDetectionHandler } from '$lib/hooks/server/device-detection-handler';
import { handleParaglide } from '$lib/hooks/server/i18n-handler';

export const handle = sequence(
	deviceDetectionHandler,
	handleParaglide
)