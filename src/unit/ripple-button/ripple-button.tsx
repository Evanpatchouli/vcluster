import useRipple from "./useRipple";

export default function RippleButton({
  rippleColor,
  ...props
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  rippleColor?: React.CSSProperties["color"];
}) {
  const ripple = useRipple({
    color: rippleColor,
    trigger: "mousedown",
  });
  return <button {...props} ref={ripple} />;
}
