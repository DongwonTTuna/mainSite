<script lang="ts">
  import { untrack } from "svelte";
  import type { HeroArtworkText } from "#application/home/types";
  import type { TunaSceneController } from "./create-tuna-scene";
  import PaintSplash from "./PaintSplash.svelte";

  type StageState = "static" | "loading" | "ready" | "reduced" | "save-data" | "fallback";
  type DataConnection = EventTarget & { saveData?: boolean };
  type CursorRipple = { id: number; left: number; top: number };
  let { text }: { text: HeroArtworkText } = $props();
  let status = $state<StageState>("static");
  let controller: TunaSceneController | undefined;
  let paused = $state(false);
  let splash = $state(0);
  let ripples = $state<CursorRipple[]>([]);
  let rippleSequence = 0;
  let lastRippleTime = -Infinity;
  let lastRipplePosition = { left: -Infinity, top: -Infinity };
  let statusLabel = $derived({
    static: text.staticLabel,
    loading: text.loadingLabel,
    ready: "",
    reduced: text.reducedMotionLabel,
    "save-data": text.saveDataLabel,
    fallback: text.fallbackLabel,
  }[status]);

  const sceneAttachment = (canvas: HTMLCanvasElement) => untrack(() => mountScene(canvas));

  function mountScene(canvas: HTMLCanvasElement) {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: DataConnection }).connection;
    let disposed = false;
    let generation = 0;
    let inView = false;

    function stop(nextStatus: StageState) {
      generation += 1;
      controller?.dispose();
      controller = undefined;
      status = nextStatus;
      paused = false;
      ripples = [];
    }

    function updateVisibility() {
      controller?.setVisible(inView && document.visibilityState === "visible");
    }

    async function start() {
      if (disposed || controller || status === "loading" || status === "fallback") return;
      status = "loading";
      const currentGeneration = ++generation;
      try {
        const { createTunaScene } = await import("./create-tuna-scene");
        if (disposed || generation !== currentGeneration) return;
        controller = createTunaScene(canvas, {
          onReady() {
            if (disposed || generation !== currentGeneration) return;
            status = "ready";
            splash += 1;
          },
          onError() {
            if (!disposed && generation === currentGeneration) stop("fallback");
          },
        });
        updateVisibility();
      } catch (error) {
        if (!disposed && generation === currentGeneration) {
          console.warn("3D is unavailable; keeping the Blender render.", error);
          stop("fallback");
        }
      }
    }

    function updatePreferences() {
      if (motionPreference.matches) stop("reduced");
      else if (connection?.saveData) stop("save-data");
      else {
        if (status === "reduced" || status === "save-data") status = "static";
        if (inView) void start();
      }
    }

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePreferences();
      updateVisibility();
    }, { threshold: 0.05 });
    intersectionObserver.observe(canvas);
    motionPreference.addEventListener("change", updatePreferences);
    connection?.addEventListener("change", updatePreferences);
    document.addEventListener("visibilitychange", updateVisibility);
    canvas.addEventListener("pointermove", moveCursor);
    updatePreferences();

    return () => {
      disposed = true;
      generation += 1;
      intersectionObserver.disconnect();
      motionPreference.removeEventListener("change", updatePreferences);
      connection?.removeEventListener("change", updatePreferences);
      document.removeEventListener("visibilitychange", updateVisibility);
      canvas.removeEventListener("pointermove", moveCursor);
      controller?.dispose();
      controller = undefined;
    };
  }

  function replay() {
    if (status !== "ready") return;
    paused = false;
    splash += 1;
    ripples = [];
    lastRippleTime = -Infinity;
    lastRipplePosition = { left: -Infinity, top: -Infinity };
    controller?.replay();
  }

  function moveCursor(event: PointerEvent) {
    if (status !== "ready" || paused || event.pointerType !== "mouse") return;
    if (!(event.currentTarget instanceof HTMLCanvasElement)) return;
    if (event.timeStamp - lastRippleTime < 90) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const left = event.clientX - bounds.left;
    const top = event.clientY - bounds.top;
    if (Math.hypot(left - lastRipplePosition.left, top - lastRipplePosition.top) < 18) return;
    lastRippleTime = event.timeStamp;
    lastRipplePosition = { left, top };
    ripples = [...ripples.slice(-5), {
      id: ++rippleSequence,
      left: left / bounds.width * 100,
      top: top / bounds.height * 100,
    }];
  }

  function toggleMotion() {
    paused = !paused;
    controller?.setPlaying(!paused);
  }
</script>

<figure class="tuna-stage" data-scene-state={status}>
  <div class="artwork">
    <div class="artwork-disc" aria-hidden="true"></div>
    <div class="orbit" aria-hidden="true"></div>
    <div class="paint-layer">
      {#key splash}<PaintSplash animated={status === "ready"} {paused} />{/key}
    </div>
    <img class="tuna-poster" class:replaced={status === "ready"} src="/images/tuna-poster.webp"
      alt={text.alt} width="1000" height="1000" fetchpriority="high" decoding="async" />
    <canvas {@attach sceneAttachment} class:visible={status === "ready"} aria-hidden="true"></canvas>
    <div class="cursor-ripples" class:paused aria-hidden="true">
      {#each ripples as ripple (ripple.id)}
        <span class="cursor-ripple" style:left={`${ripple.left}%`} style:top={`${ripple.top}%`}
          onanimationend={() => ripples = ripples.filter((current) => current.id !== ripple.id)}></span>
      {/each}
    </div>
    <span class="artwork-index eyebrow" aria-hidden="true">FIG. 01 — THE TUNA</span>
    <div class="artwork-signature" aria-hidden="true"><span>Not just another fish.</span><svg viewBox="0 0 90 40" fill="none"><path d="M3 8C45 5 15 47 74 23M65 18L78 22L71 31" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg></div>
  </div>
  <figcaption>
    <p class="stage-status" aria-live="polite">{statusLabel}</p>
    {#if status === "ready"}
      <div class="stage-controls">
        <button type="button" onclick={replay} aria-label={text.replayLabel} title={text.replayLabel}><span aria-hidden="true">↻</span><span class="control-word">{text.replayShortLabel}</span></button>
        <button type="button" onclick={toggleMotion} aria-label={paused ? text.resumeLabel : text.pauseLabel} aria-pressed={paused} title={paused ? text.resumeLabel : text.pauseLabel}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span><span class="control-word">{paused ? text.resumeShortLabel : text.pauseShortLabel}</span></button>
      </div>
    {/if}
  </figcaption>
</figure>

<style>
  .tuna-stage { min-width: 0; width: 100%; margin: 0; align-self: center; }
  .artwork { position: relative; width: 100%; aspect-ratio: 1; isolation: isolate; }
  .artwork-disc { position: absolute; inset: 13% 8% 12% 8%; border-radius: 50%; background: #eaece1; }
  .orbit { position: absolute; inset: 6% 2% 8% 6%; border: 1px solid #d5dacc; border-radius: 50%; transform: scaleY(0.92); }
  .orbit::before, .orbit::after { content: "+"; position: absolute; color: #a3afa7; font: 300 1rem var(--font-mono); }
  .orbit::before { top: 6%; right: 14%; }
  .orbit::after { left: 10%; bottom: 8%; }
  .paint-layer { position: absolute; inset: -2%; pointer-events: none; }
  .tuna-poster, canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: contain; transition: opacity 350ms ease; }
  .tuna-poster { pointer-events: none; }
  .tuna-poster.replaced { opacity: 0; }
  canvas { opacity: 0; }
  canvas.visible { opacity: 1; }
  .cursor-ripples { position: absolute; inset: 0; overflow: hidden; border-radius: 16%; pointer-events: none; }
  .cursor-ripple { position: absolute; width: 30px; height: 30px; margin: -15px 0 0 -15px; border: 2px solid #397995; border-radius: 50%; opacity: 0; animation: cursor-wave 1.25s ease-out both; }
  .cursor-ripple::after { content: ""; position: absolute; inset: 5px; border: 1px solid #397995; border-radius: 50%; }
  .paused .cursor-ripple { animation-play-state: paused; }
  @keyframes cursor-wave {
    from { opacity: 0.8; transform: scale(0.4); }
    to { opacity: 0; transform: scale(3.5); }
  }
  .artwork-index { position: absolute; top: 3%; left: 6%; font-size: 0.56rem; color: var(--text-muted); letter-spacing: 0.1em; }
  .artwork-signature { position: absolute; right: -1%; bottom: 14%; display: flex; flex-direction: column; align-items: flex-end; color: #68796d; transform: rotate(-7deg); pointer-events: none; }
  .artwork-signature span { font-family: Georgia, serif; font-style: italic; font-size: 0.87rem; }
  .artwork-signature svg { width: 72px; margin-right: 35%; transform: rotate(140deg); }
  figcaption { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; min-height: 54px; padding-left: 6%; }
  .stage-status { max-width: 240px; color: var(--text-muted); font-size: 0.7rem; line-height: 1.6; word-break: keep-all; }
  .stage-controls { display: flex; flex-shrink: 0; gap: 0.4rem; }
  button { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0 0.55rem; min-width: 44px; min-height: 44px; background: transparent; border: 1px solid transparent; border-radius: 50px; color: var(--text-body); cursor: pointer; }
  button:hover { border-color: var(--surface-border); background: var(--surface-elevated); }
  button > span:first-child { font-size: 1.2rem; }
  .control-word { font: 500 0.65rem var(--font-ui); }
  @media (max-width: 1000px) {
    .control-word { display: none; }
    .artwork-signature { right: 0; font-size: 0.75rem; }
  }
  @media (max-width: 760px) {
    .tuna-stage { max-width: 520px; margin: 1.5rem auto 0.25rem; }
    .artwork-signature span { font-size: 0.75rem; }
    figcaption { padding-inline: 4%; }
    .stage-status { max-width: 220px; font-size: 0.63rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    .tuna-poster, canvas { transition: none; }
    .cursor-ripples { display: none; }
  }
</style>
