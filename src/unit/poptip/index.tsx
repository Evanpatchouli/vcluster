import "./index.css";

export default function Poptip({
  children,
  title,
  placement = "top",
  bgColor,
  color,
}: {
  children?: React.ReactNode;
  title?: string;
  bgColor?: React.CSSProperties["backgroundColor"];
  color?: React.CSSProperties["color"];
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    // | "top-left"
    // | "top-right"
    // | "bottom-left"
    // | "bottom-right"
    // | "left-top"
    // | "left-bottom"
    // | "right-top"
    // | "right-bottom";
}) {
  return (
    <div
      className={`poptip poptip--${placement}`}
      title={title}
      style={{
        // @ts-ignore
        "--poptip-bg-color": bgColor ?? "#665a5a",
        "--poptip-color": color ?? "#fff",
      }}
    >
      {children}
    </div>
  );
}
