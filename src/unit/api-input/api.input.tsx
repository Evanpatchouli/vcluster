import { TextField, InputAdornment, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Method } from "axios";
import "./api.input.css";

type ApiInputProps = {
  label: React.ReactNode;
  placeholder?: string;
  defaultValue?: unknown;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  title?: string;
  className?: string;
  id?: string;
  method?: Method;
  methodName?: string;
  onMethodChange?: (event: SelectChangeEvent<Method>) => void;
};

/**
 * @class `api-input md-styled`
 */
const ApiInput: React.FC<ApiInputProps> = (props) => {
  return (
    <TextField
      label={props.label}
      id={props.id}
      sx={{ m: 0, width: "100%" }}
      className={`api-input md-styled ${props.className || ""}`}
      title={props.title}
      name={props.name}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Select
              className="prefix-api-input"
              name={props.methodName}
              defaultValue={props.method}
              onChange={props.onMethodChange}
            >
              <MenuItem value={"GET"}>GET</MenuItem>
              <MenuItem value={"POST"}>POST</MenuItem>
              <MenuItem value={"PUT"}>PUT</MenuItem>
              <MenuItem value={"DELETE"}>DELETE </MenuItem>
            </Select>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ApiInput;
