import { InputLabel } from "@mui/material";
import "./index.css";

export type LabelProps = {
  children?: React.ReactNode;
  text?: React.ReactNode;
  required?: boolean;
} & React.ComponentProps<typeof InputLabel>;

export default function Label({ children, text, required, style, ...props }: LabelProps) {
  return (
    <div className="vcluster-label">
      {required && <InputLabel required style={{ paddingRight: "0.5rem", color: "red" }} />}
      <InputLabel style={{ paddingRight: "1rem", color: "var(--color-view__text)", ...style }} {...props}>
        {text}
        {children}
      </InputLabel>
    </div>
  );
}
