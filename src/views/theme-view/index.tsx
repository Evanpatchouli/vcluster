import {
  Button,
  FormControlLabel,
  InputBase,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import "./style.css";
import { msg, msg3s, routeTo } from "../../util/util";
import React, { useRef } from "react";

import { Command, Child } from "@tauri-apps/api/shell";
import { Store } from "tauri-plugin-store-api";
import { useNavigate } from "react-router-dom";
import Api from "../../api";

import { emit, listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api";

import Axios from "axios";
import { Moon, Platte, Sun, System } from "@icon-park/react";

listen("back-msg", (event) => {
  console.log(event.payload);
});

export default function Test() {
  const link = useNavigate();
  const store = new Store(".settings.dat");
  const themes = [
    {
      label: (
        <div className="row col-center">
          <span className="mgr-8">System</span> <System />
        </div>
      ),
      value: "System",
    },
    {
      label: (
        <div className="row col-center">
          <span className="mgr-8">Dark</span> <Moon />
        </div>
      ),
      value: "Dark",
    },
    {
      label: (
        <div className="row col-center">
          <span className="mgr-8">Light</span> <Sun />
        </div>
      ),
      value: "Light",
    },
  ];

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
        <Platte /> Configure Application Themes
      </h1>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
        style={{ width: "60%" }}
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
          <InputLabel
            required
            style={{ paddingRight: "1rem", color: "var(--color-view__text)" }}
          >
            Theme:
          </InputLabel>
          <RadioGroup row name="theme" defaultValue={"System"}>
            {themes.map((theme) => (
              <>
                <FormControlLabel
                  label={theme.label}
                  value={theme.value}
                  control={<Radio />}
                />
              </>
            ))}
          </RadioGroup>
        </div>
        <div>
          <InputLabel style={{ paddingRight: "1rem", color: "var(--color-view__text)" }}>
            Customize themes details:
          </InputLabel>
          <TextField
            className="textField"
            autoFocus
            margin="dense"
            id="Primary-Button-Color"
            label="Primary Button Color"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            className="textField"
            margin="dense"
            id="Danger-Button-Color"
            label="Danger Button Color"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            className="textField"
            margin="dense"
            id="Warn-Button-Color"
            label="Warn Button Color"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            className="textField"
            margin="dense"
            id="Content-text-color"
            label="Content-text-color"
            type="text"
            fullWidth
            variant="standard"
          />
        </div>
        <div className="theme-form__footer">
          <button type="button" tabIndex={-1}>
            Load Default
          </button>
          <button type="submit" tabIndex={-1}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
