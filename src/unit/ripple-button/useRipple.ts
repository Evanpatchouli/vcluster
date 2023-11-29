import { useRef, useEffect } from "react";
import rippleWorklet from "./ripple-worklet";

export type RippleConfig = {
  color?: React.CSSProperties["color"];
  duration?: number;
  trigger?: "click" | "mousedown" | "pointerdown";
};

let isWorkletRegistered = false;

const useRipple = <T extends HTMLElement = HTMLButtonElement>(
  config: RippleConfig = {
    color: "rgba(31, 143, 255, 0.5)",
    duration: 500,
  }
): React.RefObject<T> => {
  const ref = useRef<T>(null);
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (mounted.current) return;
    try {
      if ("paintWorklet" in CSS && !isWorkletRegistered) {
        if (!isWorkletRegistered) {
          // @ts-ignore
          CSS.paintWorklet.addModule(rippleWorklet); // "houdini/ripple.js"
          isWorkletRegistered = true;
          console.log("Ripple worklet is registered");
        } else {
          console.warn("Ripple worklet is already registered");
        }
      } else {
        console.warn("Your browser doesn't support CSS Paint API");
      }
    } catch (error) {
      console.error(error);
    }
    mounted.current = true;
  }, []);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    let animationFrameId: number | null = null;
    const handleClick = (event: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const startTime = performance.now();
      button.style.setProperty("--ripple-color", config.color ?? "rgba(31, 143, 255, 0.5)");
      button.style.setProperty("--ripple-x", `${x}px`);
      button.style.setProperty("--ripple-y", `${y}px`);
      button.style.setProperty("--ripple-time", "0");
      button.style.setProperty("background-image", "paint(ripple)");

      const animate = (time: number) => {
        const progress = (time - startTime) / (config.duration ?? 500); // Convert time to seconds
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

    button.addEventListener(config.trigger ?? "mousedown", handleClick);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      button.removeEventListener(config.trigger ?? "mousedown", handleClick);
    };
  }, []);

  return ref;
};

export default useRipple;
