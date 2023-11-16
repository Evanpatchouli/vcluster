import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { msg } from "../../util/util";
import useForm from "../../util/form";
import Label from "../Label";
import Api from "../../api";

export type AppCreatorProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialData?: Partial<VCluster.PkgConfig>;
};

const AppCreator: React.FC<AppCreatorProps> = (props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<{
    cluster_id: string;
    name: string;
  }>(
    {
      cluster_id: {
        value: "",
        required: true,
      },
      name: {
        value: "",
        required: true,
        validator(value) {
          if ((value?.length ?? 0) > 10) {
            return "Name too long";
          }
        },
      },
    },
    formRef
  );
  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
      <form
        ref={formRef}
        onSubmit={form.onSubmit((formData) => {
          Api.create_app(formData).then((res) => {
            if (!res.ok) {
              msg.error(res.error);
            } else {
              msg.success("App created successfully");
              props.setOpen(false);
            }
          });
        })}
      >
        <DialogTitle textAlign={"left"}>
          <Typography variant={"h6"}>Create a new app</Typography>
        </DialogTitle>
        <DialogContent>
          <input
            name="cluster_id"
            title="cluster_id"
            value={props.initialData?.cluster_id}
            type="hidden"
          />
          <Label required text="Name" style={{ color: "black" }}>
            <input name="name" title="name" type="text" />
          </Label>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AppCreator;
