/**
 * Animation constants reproduced from the original Framer build.
 *
 * Every value below was read out of the site's own JavaScript bundle
 * (`framer.*.mjs` / the page module), not estimated by eye:
 *
 *   effect      { filter: blur(10px), opacity: .001, scale: .95, y: 10 }
 *   transitions { bounce: 0, duration: 1.8 | 1.6 | 1.4, delay: .1 | .2 }
 *   section     { opacity: .2, y: 40, transformPerspective: 1200 }
 *               with spring { stiffness: 415, damping: 60, mass: 1 }
 *
 * In Framer, `transition.delay` is the *per-token stagger* and `startDelay`
 * is the offset before a group begins — see `vm()` in the bundle.
 */

/** How a text block is cut up before animating. Mirrors Framer's tokenizer. */
export type Tokenization =
  /** One animated span per word. */
  | 'word'
  /** One animated span per character. */
  | 'character'
  /** Per-character spans, but staggered by visual line (grouped at runtime). */
  | 'line'
  /** No splitting — the whole element animates as one. */
  | 'element';

export interface RevealConfig {
  tokenization: Tokenization;
  /** Seconds before the group starts. */
  startDelay: number;
  /** Seconds between tokens. */
  stagger: number;
  /** Seconds for one token's animation. */
  duration: number;
  /** Play on load rather than on entering the viewport. */
  onMount?: boolean;
  /** The footer intro drops the blur; everything else keeps it. */
  noBlur?: boolean;
}

/** Named exactly as in the bundle so the mapping stays auditable. */
export const reveal = {
  /** io — hero title, on load. */
  heroTitle:    { tokenization: 'word',      startDelay: 0.6, stagger: 0.1, duration: 1.8, onMount: true },
  /** oo — hero subtitle, on load, whole element. */
  heroSubtitle: { tokenization: 'element',   startDelay: 0.8, stagger: 0,   duration: 1.8, onMount: true },
  /** so — section headings, on scroll. */
  heading:      { tokenization: 'word',      startDelay: 0.2, stagger: 0.1, duration: 1.8 },
  /** wo — body copy, on scroll, no blur. */
  body:         { tokenization: 'line',      startDelay: 0.2, stagger: 0.1, duration: 1.6, noBlur: true },
  /** So / Co / To / $ — project page header rows, on load, cascading. */
  meta1:        { tokenization: 'line',      startDelay: 1.2, stagger: 0.1, duration: 1.6, onMount: true },
  meta2:        { tokenization: 'line',      startDelay: 1.3, stagger: 0.1, duration: 1.6, onMount: true },
  meta3:        { tokenization: 'line',      startDelay: 1.4, stagger: 0.1, duration: 1.6, onMount: true },
  meta4:        { tokenization: 'line',      startDelay: 1.5, stagger: 0.1, duration: 1.6, onMount: true },
} satisfies Record<string, RevealConfig>;

export type RevealName = keyof typeof reveal;

/** Breakpoints, taken from the bundle's own media queries. */
export const bp = {
  /** Phone */
  phone: 809.98,
  /** Tablet starts here */
  tablet: 810,
  /** Desktop starts here */
  desktop: 1200,
  /** Big starts here */
  big: 1920,
} as const;
