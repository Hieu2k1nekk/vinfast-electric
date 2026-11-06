import { useSyncExternalStore } from "react"

const noopSubscribe = () => () => {}

/** Swiper reads the clock while rendering, so it can only mount on the client (Cache Components prerender). */
export function useMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false)
}
