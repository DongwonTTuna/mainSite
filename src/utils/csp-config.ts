/**
 * CSP Configuration for Qwik Application
 * 
 * Qwik's resumability requires inline scripts for serializing component state.
 * This configuration handles CSP properly for both development and production.
 */

// Qwik-generated inline script hashes (collected from production build)
// Run scripts/collect-csp-hashes.js after build to update these
const QWIK_SCRIPT_HASHES = [
  'sha256-RmhsvWJ/vH0gNZDxgfkzlEfeCB8C1mR73/k32nQjwTQ=',
  'sha256-15L/9YNAkAUAf8G3LGCo8yzw9Beqxadudqfyyq2V3MY=',
  'sha256-oyJPtGt6kb4NigoW+N1VRcyNRZQfjMBYl2psWraQTsA=',
  'sha256-L2VzofRwMKVb7ZeLc29Zs5ei5OG9KJ1eXSwz+w4q4/g=',
  'sha256-6WHWhiUFSczbUiBvl0gdiF+EeOdPRe66tRIT3FE3E8M=',
  'sha256-g01uwY0Xp3A6CVmaGXVUZb4BB5+qYIWzHD6zL4NT2+Q=',
  'sha256-aQN/mYK3Xk6MmCp/vuZHTafdvG3CjhZQ0Tn9uyLLB+I=',
  'sha256-EwODyXb+JyP/QFEaG9yjy11qmIlA9bcynhiLgeq19to=',
  'sha256-Ixeqw7WXt51vvnXJRZBZFStZ780P8hT5LzcDDydDTyk=',
];

export function getCSPDirectives(isDev = false): Record<string, string> {
  // Base CSP directives
  const directives: Record<string, string> = {
    'default-src': "'self'",
    'style-src': "'self' 'unsafe-inline'", // Required for inline styles
    'img-src': "'self' data: https:",
    'font-src': "'self' data:",
    'connect-src': "'self' https://api.github.com https://api.linkedin.com",
    'media-src': "'self'",
    'object-src': "'none'",
    'frame-src': "'none'",
    'frame-ancestors': "'none'", // Only works in HTTP headers, not meta tags
    'base-uri': "'self'",
    'form-action': "'self'",
    'worker-src': "'self'",
    'manifest-src': "'self'",
  };

  // Script source configuration
  if (isDev) {
    // Development: Allow unsafe-inline for easier development
    directives['script-src'] = "'self' 'wasm-unsafe-eval' 'unsafe-inline'";
  } else {
    // Production: Use strict CSP with hashes
    const hashes = QWIK_SCRIPT_HASHES.map(hash => `'${hash}'`).join(' ');
    directives['script-src'] = `'self' 'wasm-unsafe-eval' ${hashes}`;
  }

  return directives;
}

export function getCSPString(isDev = false): string {
  const directives = getCSPDirectives(isDev);
  
  return Object.entries(directives)
    .map(([key, value]) => `${key} ${value}`)
    .join('; ') + '; upgrade-insecure-requests';
}

export function getCSPMetaString(): string {
  // For meta tags, exclude frame-ancestors (doesn't work in meta)
  const directives = getCSPDirectives(false);
  delete directives['frame-ancestors'];
  
  return Object.entries(directives)
    .map(([key, value]) => `${key} ${value}`)
    .join('; ') + '; upgrade-insecure-requests';
}