import { useRef, useEffect } from "react";

export default function useOutsideClick(onOutSideClick: VoidFunction) {
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function onClick(e: MouseEvent) {
    if (!ref || !ref.current) return;
    const isOpened = (ref.current as any).getAttribute("data-state");
    if (!isOpened) return;

    const isWithin = (e.target as any).closest("#sortbydate-selector");

    if (!isWithin) {
      onOutSideClick();
    }
  }

  return ref;
}
