import { type RenderOptions } from '@builder.io/qwik';

/**
 * Collects inline script hashes from Qwik's render output
 * and generates a CSP policy that includes them.
 */
export function generateCSPWithQwikHashes(renderResult: RenderOptions): string {
  const hashes = renderResult.snapshotResult?.scriptHashes || [];
  
  const hashDirectives = hashes
    .map(hash => `'sha256-${hash}'`)
    .join(' ');
  
  return [
    "default-src 'self'",
    `script-src 'self' 'wasm-unsafe-eval' ${hashDirectives}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.github.com https://api.linkedin.com",
    "media-src 'self'",
    "object-src 'none'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "upgrade-insecure-requests"
  ].join('; ');
}