import { useEffect, useRef, type RefObject } from "react";

// Treat a burst of wheel or trackpad events as one turn. Let the page
// continue scrolling when a fresh gesture points past either end.
export function useWheelStep(
  ref: RefObject<HTMLElement | null>,
  step: (direction: number) => boolean,
  verticalOnly = false,
) {
  const latestStep = useRef(step);
  latestStep.current = step;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let last = 0;
    let travel = 0;
    let consumed = false;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || !event.cancelable) return;
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      if (verticalOnly && (horizontal || event.shiftKey)) return;
      const delta = horizontal ? event.deltaX : event.deltaY;
      if (!delta) return;
      if (
        event.timeStamp - last > 160 ||
        (travel && Math.sign(delta) !== Math.sign(travel))
      ) {
        travel = 0;
        consumed = false;
      }
      last = event.timeStamp;
      if (consumed) {
        event.preventDefault();
        return;
      }
      travel += delta * (event.deltaMode === 0 ? 1 : 18);
      if (Math.abs(travel) < 18) return;
      consumed = latestStep.current(Math.sign(travel));
      if (consumed) event.preventDefault();
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [ref, verticalOnly]);
}
