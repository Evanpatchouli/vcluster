import { useEffect } from "react";
import useRipple from "./useRipple";
import "./ripple.css";

export default function RippleButton({
  rippleColor,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  rippleColor?: React.CSSProperties["color"];
}) {
  const ripple = useRipple({
    color: rippleColor,
  });
  useEffect(() => {
    try {
      if ("paintWorklet" in CSS) {
        // @ts-ignore
        CSS.paintWorklet.addModule("houdini/ripple.js");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  return <button {...props} ref={ripple} />;
}
