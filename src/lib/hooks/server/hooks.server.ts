import { sequence } from "@sveltejs/kit/hooks"
import { handleParaglide } from "$lib/hooks/server/i18n-handler"

export const handle = sequence(handleParaglide)
