<script lang="ts">
  import { gsap } from 'gsap';

  type FlowingMenuItem = {
    link: string;
    text: string;
    image: string;
  };

  const props = $props<{ items?: FlowingMenuItem[] }>();
  const menuItems = $derived(props.items ?? []);

  const animationDefaults: gsap.TweenVars = {
    duration: 0.6,
    ease: 'expo'
  };

  const repeatedIndices = [0, 1, 2, 3];
  const marqueeCloneIndices = [0, 1];

  const itemRefs = $state<(HTMLDivElement | null)[]>([]);
  const marqueeRefs = $state<(HTMLDivElement | null)[]>([]);
  const marqueeInnerRefs = $state<(HTMLDivElement | null)[]>([]);
  const marqueeTrackRefs = $state<(HTMLDivElement | null)[]>([]);
  let marqueeScrollTweens: Array<gsap.core.Tween | null> = [];

  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const getRefs = (idx: number) => {
    const item = itemRefs[idx];
    const marquee = marqueeRefs[idx];
    const marqueeInner = marqueeInnerRefs[idx];
    const marqueeTrack = marqueeTrackRefs[idx];
    if (!item || !marquee || !marqueeInner || !marqueeTrack) return null;
    return { item, marquee, marqueeInner, marqueeTrack };
  };

  const runEnterAnimation = (idx: number, event: MouseEvent) => {
    const refs = getRefs(idx);
    if (!refs) return;
    const rect = refs.item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    marqueeScrollTweens[idx]?.kill();
    marqueeScrollTweens[idx] = null;

    gsap
      .timeline({ defaults: animationDefaults })
      .set(refs.marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(refs.marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([refs.marquee, refs.marqueeInner], { y: '0%' }, 0);

    gsap.set(refs.marqueeTrack, { xPercent: 0 });
    marqueeScrollTweens[idx] = gsap.to(refs.marqueeTrack, {
      xPercent: '-=50',
      duration: 12,
      ease: 'none',
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.wrap(-50, 0)
      }
    });
  };

  const runLeaveAnimation = (idx: number, event: MouseEvent) => {
    const refs = getRefs(idx);
    if (!refs) return;
    const rect = refs.item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(refs.marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(refs.marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0);

    marqueeScrollTweens[idx]?.kill();
    marqueeScrollTweens[idx] = null;
    gsap.set(refs.marqueeTrack, { xPercent: 0 });
  };
</script>

<div class="menu-wrap">
  <nav class="menu">
    {#each menuItems as item, idx (item.link ?? `${item.text}-${idx}`)}
      <div class="menu__item" bind:this={itemRefs[idx]}>
        <a
          class="menu__item-link"
          href={item.link}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={item.text}
          onmouseenter={(event) => runEnterAnimation(idx, event)}
          onmouseleave={(event) => runLeaveAnimation(idx, event)}
        >
          {item.text}
        </a>

        <div class="marquee" bind:this={marqueeRefs[idx]}>
          <div class="marquee__inner-wrap" bind:this={marqueeInnerRefs[idx]}>
            <div class="marquee__inner" bind:this={marqueeTrackRefs[idx]} aria-hidden="true">
              {#each marqueeCloneIndices as cloneIdx (cloneIdx)}
                {#each repeatedIndices as repeatIdx (`${cloneIdx}-${repeatIdx}`)}
                  <span>{item.text}</span>
                  <div
                    class="marquee__img"
                    style={`background-image: url("${item.image}")`}
                    data-repeat={`${cloneIdx}-${repeatIdx}`}
                  ></div>
                {/each}
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </nav>
</div>

<style>
  .menu-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .menu {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .menu__item {
    flex: 1;
    min-height: clamp(5rem, 12vh, 8rem);
    position: relative;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 -1px #fff;
  }

  .menu__item-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: clamp(5rem, 12vh, 8rem);
    position: relative;
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    font-weight: 600;
    color: #fff;
    font-size: 4vh;
  }

  .menu__item-link:hover {
    color: #060010;
  }

  .menu__item-link:focus:not(:focus-visible) {
    color: #fff;
  }

  .marquee {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: #fff;
    transform: translate3d(0, 101%, 0);
    transition: transform 0.6s ease-expo;
  }

  .marquee__inner-wrap {
    height: 100%;
    width: 200%;
    display: flex;
    justify-content: center;
    transform: translateX(0);
  }

  .marquee__inner {
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    width: 200%;
    will-change: transform;
    transform: translate3d(0, 0, 0);
  }

  .marquee span {
    color: #060010;
    white-space: nowrap;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 4vh;
    line-height: 1.2;
  }

  .marquee__img {
    min-width: 200px;
    width: 200px;
    height: 7vh;
    margin: 2em 2vw;
    border-radius: 50px;
    background-size: cover;
    background-position: 50% 50%;
  }

  .menu__item-link:hover + .marquee {
    transform: translate3d(0, 0%, 0);
  }
</style>
