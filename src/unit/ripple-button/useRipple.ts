import { useRef, useEffect } from "react";

export type RippleConfig = {
  color?: React.CSSProperties["color"];
};

const useRipple = (
  config?: RippleConfig
): React.RefObject<HTMLButtonElement> => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    let animationFrameId: number | null = null;
    const handleClick = (event: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const startTime = performance.now();
      button.classList.add("ripple-button");
      button.style.setProperty(
        "--ripple-color",
        config?.color ?? "rgba(31, 143, 255, 0.5)"
      );
      button.style.setProperty("--ripple-x", `${x}px`);
      button.style.setProperty("--ripple-y", `${y}px`);
      button.style.setProperty("--ripple-time", "0");

      const animate = (time: number) => {
        const progress = (time - startTime) / 500; // Convert time to seconds
        button.style.setProperty("--ripple-time", `${progress}`);
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    button.addEventListener("mousedown", handleClick);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      button.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return ref;
};

export default useRipple;
