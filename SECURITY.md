# Security Policy and CSP Implementation

## Content Security Policy (CSP)

This project implements a comprehensive Content Security Policy to protect against XSS attacks, data injection, and other web vulnerabilities.

### CSP Implementation Details

The CSP is implemented in two ways for maximum coverage:

1. **Meta Tag (for SSG)**: In `src/components/router-head/router-head.tsx`
2. **HTTP Headers (for dev/preview)**: In `src/routes/plugin.ts`

### CSP Directives Explained

```
default-src 'self'
```
- Default policy: Only allow resources from the same origin
- Acts as fallback for other directives

```
script-src 'self' 'wasm-unsafe-eval'
```
- Scripts only from same origin
- `'wasm-unsafe-eval'` required for Qwik's WebAssembly functionality
- No inline scripts allowed (good security practice)

```
style-src 'self' 'unsafe-inline'
```
- Stylesheets from same origin
- `'unsafe-inline'` required for GSAP animations that modify inline styles
- Consider using CSS-in-JS nonces in future for better security

```
img-src 'self' data: https:
```
- Images from same origin
- Data URIs allowed (for inline images)
- Any HTTPS source allowed (for external images)

```
font-src 'self' data:
```
- Fonts from same origin
- Data URIs for inline fonts

```
connect-src 'self' https://api.github.com https://api.linkedin.com
```
- AJAX/fetch requests to same origin
- External APIs explicitly whitelisted for social links

```
frame-ancestors 'none'
```
- Prevents clickjacking by disallowing the site to be embedded in frames

```
worker-src 'self'
```
- Service workers only from same origin

```
upgrade-insecure-requests
```
- Automatically upgrades HTTP requests to HTTPS

### Additional Security Headers

The middleware also sets these security headers:

- **X-Frame-Options**: DENY - Legacy clickjacking protection
- **X-Content-Type-Options**: nosniff - Prevents MIME type sniffing
- **Referrer-Policy**: strict-origin-when-cross-origin - Controls referrer information
- **Permissions-Policy**: Denies access to camera, microphone, and geolocation

### Testing CSP

1. **Browser DevTools**: Check Console for CSP violations
2. **CSP Evaluator**: Use Google's CSP Evaluator tool
3. **Report-Only Mode**: Add `Content-Security-Policy-Report-Only` header for testing

### Future Improvements

1. **Remove 'unsafe-inline' for styles**: 
   - Implement nonce-based or hash-based CSP for GSAP
   - Use Qwik's style management for CSP compatibility

2. **CSP Reporting**:
   - Add `report-uri` or `report-to` directive
   - Monitor CSP violations in production

3. **Stricter Policies**:
   - Consider removing `https:` from img-src
   - Implement strict-dynamic for scripts

### GSAP and CSP Compatibility

GSAP requires `'unsafe-inline'` for styles because it directly manipulates element styles for animations. Alternatives:

1. Use GSAP's `cssText` property instead of individual style properties
2. Implement a nonce-based system for inline styles
3. Use CSS animations where possible instead of JavaScript

### Maintenance

When adding new features:
- Review if new external resources are needed
- Update CSP in both locations (meta tag and headers)
- Test thoroughly in development before deploying
- Monitor for CSP violations in production logs