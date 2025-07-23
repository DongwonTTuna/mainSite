/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the preview server when building for production.
 *
 * Learn more about the cloudflare integration here:
 * - https://qwik.dev/integrations/deployments/cloudflare-pages/
 *
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/node"
import qwikCityPlan from "@qwik-city-plan"
import { manifest } from "@qwik-client-manifest"
import render from "./entry.ssr"

/**
 * The default export is the QwikCity adapter used by Vite preview.
 */
export default createQwikCity({ render, qwikCityPlan, manifest })
