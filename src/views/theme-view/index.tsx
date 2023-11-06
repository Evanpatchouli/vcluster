import {
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from "@mui/material";
import "./style.css";
import { msg } from "../../util/util";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { emit, listen } from "@tauri-apps/api/event";
import { Moon, Platte, Sun, System } from "@icon-park/react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  setTheme,
  customize as setThemeVars,
} from "../../store/theme/theme.reducer";
import { ThemeVarLabel, themeVarsLocked } from "./constant";
import { useIntl } from "react-intl";

listen("back-msg", (event) => {
  console.log(event.payload);
});

function ThemeLabel(props: { text: string; icon: React.ReactNode }) {
  const intl = useIntl();
  return (
    <div className="row col-center">
      <span className="mgr-8">
        {intl.formatMessage({
          id: props.text,
        })}
      </span>
      {props.icon}
    </div>
  );
}

export default function ThemeView() {
  const intl = useIntl();
  const dispatch = useAppDispatch;
  const themeStore = useAppSelector((state) => state.themeReducer);

  const link = useNavigate();

  const themes = [
    {
      label: <ThemeLabel text="System" icon={<System />} />,
      value: "system",
    },
    {
      label: <ThemeLabel text="Dark" icon={<Moon />} />,
      value: "dark",
    },
    {
      label: <ThemeLabel text="Light" icon={<Sun />} />,
      value: "light",
    },
  ];

  const [customize, setCustomize] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const formSchema = {
    theme: {
      value: "" as string | undefined | null,
      required: true,
      validator: (value?: string) => {
        if (value === "") {
          return "theme is required";
        }
        return "";
      },
    },
  };

  type FormSchema = typeof formSchema;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(formRef.current as HTMLFormElement);
    const theme = data.get("theme") as string;
    const formData: Partial<{
      [K in keyof FormSchema]: FormSchema[K]["value"];
    }> = {};
    Object.keys(formSchema).forEach((key: string) => {
      // @ts-ignore
      formData[key] = data.get(key);
    });
    console.log(formData);
    // await store.set("theme", theme);
    msg("theme saved", "success");
  };

  return (
    <div className="theme-view">
      <h1>
        <Platte
          onClick={() => {
            TauriStore.values().then((values) => {
              console.log(values);
            });
          }}
        />{" "}
        {intl.formatMessage({ id: "$themeViewTitle" })}
      </h1>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
        className="theme-form"
      >
        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="theme-label">
            <InputLabel
              required
              style={{ paddingRight: "0.5rem", color: "red" }}
            />
            <InputLabel
              style={{ paddingRight: "1rem", color: "var(--color-view__text)" }}
            >
              {intl.formatMessage({ id: "Theme" })} :
            </InputLabel>
          </div>
          <RadioGroup
            row
            name="theme"
            value={themeStore.theme}
            onChange={async (e) => {
              dispatch(setTheme(e.target.value as "system" | "dark" | "light"));
              TauriStore.theme = e.target.value as "system" | "dark" | "light";
              await TauriStore.save();
              console.debug(await TauriStore.values());
            }}
          >
            {themes.map((theme, idx) => (
              <FormControlLabel
                key={`theme-${idx}`}
                label={theme.label}
                value={theme.value}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        </div>
        <div>
          <InputLabel
            style={{ paddingRight: "1rem", color: "var(--color-view__text)" }}
          >
            {intl.formatMessage({
              id: "Customize themes details",
            })}
            <Switch
              value={customize}
              onChange={(e) => {
                setCustomize(e.target.checked);
              }}
            />
          </InputLabel>
          <div className={`theme-custom-form-${customize ? "open" : "close"}`}>
            {Object.entries(themeStore.vars).map(([key, $var], idx) => {
              return (
                <TextField
                  className="textField"
                  autoFocus={idx === 0}
                  margin="dense"
                  disabled={themeVarsLocked.includes(key)}
                  id={`theme-var__${key}`}
                  key={`theme-var__${key}`}
                  label={ThemeVarLabel`${key} changeable? ${themeVarsLocked.includes(
                    key
                  )}.`}
                  type="text"
                  fullWidth
                  variant="standard"
                  value={
                    $var.custom ??
                    $var[themeStore.theme as keyof typeof $var] ??
                    $var.dark
                  }
                />
              );
            })}
          </div>
        </div>
        <div className="theme-form__footer">
          <button
            type="button"
            tabIndex={-1}
            onClick={() => {
              dispatch(
                setThemeVars(
                  Object.entries(themeStore.vars).map(([key, $var]) => {
                    return {
                      key: key,
                      value:
                        $var[themeStore.theme as keyof typeof $var] ??
                        $var.dark,
                    };
                  })
                )
              );
            }}
          >
            {intl.formatMessage({
              id: "Load Default",
            })}
          </button>
          <button type="submit" tabIndex={-1}>
            {customize
              ? intl.formatMessage({
                  id: "Save",
                })
              : intl.formatMessage({
                  id: "Apply",
                })}
          </button>
        </div>
      </form>
    </div>
  );
}
