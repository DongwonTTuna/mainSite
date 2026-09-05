<script lang="ts">
  let { animated = false, paused = false }: { animated?: boolean; paused?: boolean } = $props();
  const artworkId = $props.id();
  const droplets = [
    [106, 146, 7, "#397995"], [91, 192, 3, "#397995"], [460, 134, 8, "#e5a631"],
    [480, 172, 4, "#e5a631"], [528, 222, 6, "#397995"], [488, 308, 10, "#eb6346"],
    [530, 355, 4, "#eb6346"], [446, 461, 7, "#eb6346"], [483, 443, 3, "#193e57"],
    [381, 496, 5, "#e5a631"], [140, 421, 6, "#397995"], [92, 366, 3, "#397995"],
    [176, 104, 4, "#e5a631"], [396, 89, 3, "#eb6346"], [440, 508, 2, "#397995"],
    [70, 262, 4, "#eb6346"], [556, 288, 3, "#e5a631"], [254, 491, 3, "#193e57"],
  ] as const;
</script>

<svg viewBox="0 0 600 580" fill="none" aria-hidden="true" class:animated class:paused>
  <defs><filter id={`${artworkId}-grain`} x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="7" result="grain" /><feDisplacementMap in="SourceGraphic" in2="grain" scale="7" xChannelSelector="R" yChannelSelector="G" /></filter></defs>
  <g class="swipe swipe-blue" filter={`url(#${artworkId}-grain)`}>
    <path d="M151 320C105 299 124 258 161 250C126 220 153 189 188 204C169 164 211 145 239 177C250 134 286 151 301 181C328 143 367 169 361 201C403 178 440 205 412 232C461 223 490 257 460 287C498 310 477 353 447 348C476 384 443 416 408 393C406 439 366 442 347 413C320 452 279 429 278 399C239 435 210 411 218 382C177 406 145 383 164 353C127 361 111 335 151 320Z" fill="#c0d9dc" fill-opacity="0.8" />
    <path d="M170 316C192 297 161 263 209 262C187 225 224 207 258 226C273 204 307 198 328 223C367 210 401 236 395 260C435 244 466 268 442 301C465 327 438 354 412 348C434 385 394 401 366 380C348 411 306 402 292 375C254 399 234 374 234 353C198 363 170 349 170 316Z" fill="#34708b" fill-opacity="0.83" />
    <path d="M151 352C230 316 287 227 410 214M171 370C247 326 323 233 433 233M169 378C257 352 348 263 453 267" stroke="#dcece6" stroke-opacity="0.45" stroke-width="2" />
  </g>
  <g class="swipe swipe-gold" filter={`url(#${artworkId}-grain)`}>
    <path d="M161 371C183 308 216 259 266 220C311 188 353 167 402 139C392 158 376 174 392 176L412 168C356 211 323 231 291 271C258 310 237 353 222 398L214 387L201 414L196 390L180 413L182 380Z" fill="#f7bc4b" />
    <path d="M387 171C299 224 258 280 205 391" stroke="#ffe5a4" stroke-width="3" />
  </g>
  <g class="swipe swipe-red" filter={`url(#${artworkId}-grain)`}>
    <path d="M275 343C331 350 375 377 448 425C464 436 475 454 490 469C465 461 449 448 443 455L453 476C425 461 406 441 397 443L400 460C378 430 352 410 327 396C306 383 298 369 270 365Z" fill="#eb6346" />
    <path d="M361 395L452 468M378 394L476 461" stroke="#ef8c6d" stroke-width="3" />
  </g>
  <g class="ink-lines" stroke="#193e57" stroke-opacity="0.25" stroke-width="1.3">
    <path d="M118 393C213 385 375 220 462 141M149 409C223 374 381 215 458 162M163 426C226 388 364 281 428 185" />
    <path d="M340 398L436 501M356 395L447 497" />
  </g>
  {#each droplets as droplet, index (index)}
    <circle class="droplet" cx={droplet[0]} cy={droplet[1]} r={droplet[2]} fill={droplet[3]} style={`--delay: ${160 + index * 24}ms; --offset-x: ${(300 - droplet[0]) * 0.42}px; --offset-y: ${(290 - droplet[1]) * 0.42}px`} />
  {/each}
</svg>

<style>
  svg { width: 100%; height: 100%; overflow: visible; }
  .swipe { transform-box: fill-box; transform-origin: center; }
  .animated .swipe { animation: paint-sweep 1.15s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .animated .swipe-gold { animation-delay: 130ms; }
  .animated .swipe-red { animation-delay: 260ms; }
  .animated .droplet { animation: paint-drop 1.2s cubic-bezier(0.15, 0.75, 0.3, 1) both; animation-delay: var(--delay); }
  .paused .swipe, .paused .droplet { animation-play-state: paused; }
  @keyframes paint-sweep {
    from { opacity: 0; transform: scale(0.25, 0.08) rotate(-18deg); }
    45% { opacity: 1; }
    to { opacity: 1; transform: scale(1) rotate(0); }
  }
  @keyframes paint-drop {
    from { opacity: 0; transform: translate(var(--offset-x), var(--offset-y)); }
    35% { opacity: 1; }
    to { opacity: 1; transform: translate(0, 0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .animated .swipe, .animated .droplet { animation: none; }
  }
</style>
