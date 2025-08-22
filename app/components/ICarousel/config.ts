/* --- DOTS --- */
const DOTS_BASE = 'absolute z-10 flex gap-3 items-center'
export const DOTS_POSITIONS = {
  // === INSIDE ===
  'inside-top-left': `${DOTS_BASE} top-3 left-3 right-auto bottom-auto`,
  'inside-top-middle': `${DOTS_BASE} top-3 left-1/2 -translate-x-1/2 right-auto bottom-auto`,
  'inside-top-right': `${DOTS_BASE} top-3 right-3 left-auto bottom-auto`,

  'inside-bottom-left': `${DOTS_BASE} bottom-3 left-3 right-auto top-auto`,
  'inside-bottom-middle': `${DOTS_BASE} bottom-3 left-1/2 -translate-x-1/2 right-auto top-auto`,
  'inside-bottom-right': `${DOTS_BASE} bottom-3 right-3 left-auto top-auto`,

  'inside-right-middle': `${DOTS_BASE} right-3 top-1/2 -translate-y-1/2 left-auto bottom-auto flex-col gap-2`,
  'inside-left-middle': `${DOTS_BASE} left-3 top-1/2 -translate-y-1/2 right-auto bottom-auto flex-col gap-2`,

  // === OUTSIDE ===
  'outside-bottom-left': `${DOTS_BASE} -bottom-3 translate-y-full left-3 right-auto top-auto`,
  'outside-bottom-middle': `${DOTS_BASE} -bottom-3 translate-y-full left-1/2 -translate-x-1/2 right-auto top-auto`,
  'outside-bottom-right': `${DOTS_BASE} -bottom-3 translate-y-full right-3 left-auto top-auto`,
} as const
export type DotsPositionsKeys = keyof typeof DOTS_POSITIONS
/* --- ARROWS --- */
export const ARRAY_POSITIONS = {
  // INSIDE
  'inside-between-top': {
    prev: `sm:start-3 translate-y-1/2 top-0`,
    next: `sm:end-3 translate-y-1/2 top-0`
  },
  'inside-between-middle': {
    prev: `sm:start-3`,
    next: `sm:end-3`
  },
  'inside-between-bottom': {
    prev: `sm:start-3 bottom-0 top-auto`,
    next: `sm:end-3 bottom-0 top-auto`
  },
  // === GROUPED INSIDE ===
  'inside-top-left': {
    prev: `sm:start-3 translate-y-1/2 top-0`,
    next: `sm:start-12 sm:end-auto translate-y-1/2 top-0`
  },
  'inside-top-right': {
    prev: `sm:end-12 sm:start-auto translate-y-1/2 top-0`,
    next: `sm:end-3 sm:start-auto translate-y-1/2 top-0`
  },
  'inside-bottom-left': {
    prev: `sm:start-3 bottom-0 top-auto`,
    next: `sm:start-12 sm:end-auto bottom-0 top-auto`
  },
  'inside-bottom-right': {
    prev: `sm:end-12 sm:start-auto bottom-0 top-auto`,
    next: `sm:end-3 bottom-0 top-auto`
  },
  // OUTSIDE
  'outside-between-middle': {
    prev: `sm:start-3`,
    next: `sm:end-3`
  }
}
export type ArrayPositionsKeys = keyof typeof ARRAY_POSITIONS
