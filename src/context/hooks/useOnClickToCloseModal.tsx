import { useEffect } from "react";

export function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Проверяем, есть ли текущий элемент в рефе
      if (!ref.current) {
        return;
      }
      // Если клик был внутри элемента, ничего не делаем
      if (ref.current.contains(event.target as Node)) {
        return;
      }
      // Если клик снаружи, вызываем handler
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
