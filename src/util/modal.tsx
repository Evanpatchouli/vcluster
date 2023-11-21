import { Loading } from "@icon-park/react";
import { Button, Card, CardContent, Modal, Typography } from "@mui/material";
import { Emoji } from "./constans";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./modal.css";

export interface ModalMeta {
  type?: "info" | "warning" | "error" | "success";
  id?: string;
  confirmLoading?: boolean;
  title?: React.ReactNode;
  onConfirm?: (close: Function) => Promise<void>;
  onCancel?: (close: Function) => Promise<void>;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
  destroyOnClose?: boolean;
}

function getTitle(type: ModalMeta["type"] = "info") {
  switch (type) {
    case "info":
      return "Info";
    case "warning":
      return "Warning";
    case "error":
      return "Error";
    case "success":
      return "Success";
  }
}

export const ConfirmModal: React.FC<
  ModalMeta & {
    destroy?: Function;
    open?: boolean;
    setOpen?: (val: boolean) => void;
  }
> = (
  props = {
    type: "info",
    confirmText: "Confirm",
    cancelText: "Cancel",
    destroyOnClose: true,
  }
) => {
  const [_open, _setOpen] = useState(true);
  const open = props.open ?? _open;
  const setOpen = props.setOpen ?? _setOpen;
  const close = () => {
    setOpen(false);
    if (props.destroyOnClose) {
      props.destroy?.();
    }
  };
  const typeKey = getTitle(props.type);
  return (
    <Modal
      open={open}
      onClose={() => {
        if (props.onCancel) {
          props.onCancel?.(close);
        } else {
          close();
        }
      }}
    >
      <Card className="confirm-modal">
        <CardContent className="confirm-modal__content">
          <Typography gutterBottom variant="h5" component="div">
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.2em" }}>
              {Emoji[typeKey]}
              {props.title ?? typeKey}
            </div>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.children}
          </Typography>
        </CardContent>
        <div className="confirm-modal__actions">
          <button
            className="confirm-modal__actions__button confirm-modal__actions__button--cancel"
            // size="small"
            onClick={async () => {
              if (props.onCancel) {
                await props.onCancel?.(close);
              } else {
                close();
              }
            }}
            // disabled={delModalMeta.confirmLoading}
          >
            {props.cancelText ?? "Cancel"}
          </button>
          <button
            className="confirm-modal__actions__button confirm-modal__actions__button--confirm"
            // size="small"
            // variant="contained"
            color={typeKey.toUpperCase() as any}
            onClick={async () => {
              if (props.onConfirm) {
                await props.onConfirm?.(close);
              } else {
                close();
              }
            }}
            disabled={props.confirmLoading}
          >
            <div className="line">
              {props.confirmLoading && <Loading className="loading-active" style={{ marginRight: "0.5em" }} />}
              <span>{props.confirmText ?? "Confirm"}</span>
            </div>
          </button>
        </div>
      </Card>
    </Modal>
  );
};

const render = (config?: ModalMeta) => {
  const root = document.getElementById("root");
  const div = document.createElement("div", { is: "confirm-modal" });
  root?.appendChild(div);
  const destroy = () => {
    div.remove();
    root?.removeChild(div);
  };
  createRoot(div).render(<ConfirmModal {...config} destroy={destroy} />);
};

const modal = {
  create: (config?: ModalMeta) => {
    render(config);
  },
};

export const useModal = (config: ModalMeta) => {
  const [open, setOpen] = useState(false);
  const Render = () => {
    return <ConfirmModal open={open} setOpen={setOpen} {...config} />;
  };
  return {
    open: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
    openWatched: open as Readonly<boolean>,
    Render: Render,
  };
};

export default modal;
