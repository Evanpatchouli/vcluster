import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import "./style.css";
import { msg3s } from "../../util/util";
import { UserForm, UserValidator } from "./valid";
import { Button } from "@mui/material";

export default () => {
  const intl = useIntl();
  const [form, setForm] = React.useState<UserForm>({
    username: "",
    password: "",
  });
  return (
    <div className="user-view">
      {/* <p>After login, your data can be shared with azure</p> */}
      <div className="line">
        <img className="logo" alt="logo" src="/vcluster.png"></img>
      </div>
      <div className="line">
        <h1 className="h1">
          {intl.formatMessage({
            id: "$login-title",
          })}
        </h1>
      </div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          let valid_result = UserValidator.safeParse(form);
          if (!valid_result.success) {
            const firsetError: VCluster.ZodErrorMessage = JSON.parse(
              valid_result.error.message
            )[0];
            console.error(firsetError.message);
            return msg3s(
              intl.formatMessage({
                id: firsetError.message,
              }),
              "warning"
            );
          } else {
            return msg3s(
              intl.formatMessage({
                id: "Login success",
              }),
              "success"
            );
          }
        }}
      >
        <label className="label">
          {intl
            .formatMessage({
              id: "username...",
            })
            .replace("...", "")}
        </label>
        <div className="line">
          <input
            value={form.username}
            onChange={(e) =>
              setForm((pre) => {
                return { ...pre, username: e.target.value };
              })
            }
            className="input"
            placeholder={intl.formatMessage({
              id: "username...",
            })}
          ></input>
        </div>
        <label className="label">
          {intl
            .formatMessage({
              id: "password...",
            })
            .replace("...", "")}
        </label>
        <div className="line">
          <input
            value={form.password}
            type="password"
            onChange={(e) =>
              setForm((pre) => {
                return { ...pre, password: e.target.value };
              })
            }
            className="input"
            placeholder={intl.formatMessage({
              id: "password...",
            })}
          ></input>
        </div>
        <Button className="button login-btn" type="submit">
          <span className="login-btn-text">
            {intl.formatMessage({
              id: "login",
            })}
          </span>
        </Button>
      </form>
      <div className="go-create">
        <Button className="go-create-btn">
          {intl.formatMessage({
            id: "$go-create",
          })}
        </Button>
      </div>
    </div>
  );
};
