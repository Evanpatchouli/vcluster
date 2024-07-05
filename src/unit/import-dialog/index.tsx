import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { SeoFolder, FileCode } from "@icon-park/react";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import "./index.css";

export type ImporterProps = {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  beforeClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  afterClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  watchOpen?: (open: boolean, props?: ImporterProps) => void;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

function PanelBox(props: { children?: React.ReactNode }) {
  return <div className="importer-dialog-panel-box">{props.children}</div>;
}

export default function Importer(props: ImporterProps) {
  const intl = useIntl();
  function closeDialog() {
    props.setOpen?.(false);
    setCurTab(0);
    setImportTypeToFile();
  }
  useEffect(() => {
    props.watchOpen?.(props.open ?? false, props);
  }, [props.open]);

  const [curTab, setCurTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurTab(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [jsonFilePickerBtnAble, setJsonFilePickerBtnAble] = useState(true);

  const [importType, setImportType] = useState<"file" | "url">("file");
  const setImportTypeToFile = () => setImportType("file");
  const setImportTypeToUrl = () => setImportType("url");

  const handleLoadJson = async () => {
    setJsonFilePickerBtnAble(false);
    // @ts-ignore experimental web api support
    if (window.showOpenFilePicker) {
      try {
        // @ts-ignore experimental web api support - 获取文件处理句柄
        const [fileHandle] = (await window.showOpenFilePicker?.({
          types: [
            {
              description: "Json file",
              accept: {
                "application/*": [".json"],
              },
            },
          ],
          excludeAcceptAllOption: true,
          multiple: false,
        })) as FileSystemFileHandle[];
        const fileData: File = await fileHandle.getFile?.();
        // console.log(fileData);
        let reader = new FileReader();
        reader.onload = function (evt) {
          let jsonResult = JSON.parse((evt.target?.result as string) ?? "{}");
          console.log(jsonResult);
        };
        reader.readAsText(fileData, "UTF-8");
      } catch (error) {
        console.error(error);
      } finally {
        setJsonFilePickerBtnAble(true);
      }
    } else {
      setJsonFilePickerBtnAble(true);
    }
  };

  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    // @todo
    closeDialog();
  };

  return (
    <Dialog
      open={props.open ?? false}
      onClose={(e, r) => {
        props.beforeClose?.(e, r);
        props.onClose ? props.onClose(e, r) : props.setOpen?.(false);
        props.afterClose?.(e, r);
      }}
    >
      <DialogTitle>
        {intl.formatMessage({
          id: "Import a cluster",
        })}
        <span className="importer-dialog-header-desc">
          {intl.formatMessage({
            id: curTab ? "do importing" : "select type",
          })}
        </span>
      </DialogTitle>
      <DialogContent>
        {/* <Tabs
          className="import-dialog__tabs"
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
          value={curTab}
        >
          <Tab
            className="import-dialog__tabs__tab"
            label={intl.formatMessage({
              id: "type",
            })}
            {...a11yProps(0)}
          />
          <Tab
            className="import-dialog__tabs__tab"
            label={intl.formatMessage({
              id: "import",
            })}
            {...a11yProps(1)}
          />
        </Tabs> */}
        <PanelBox>
          <TabPanel value={curTab} index={0}>
            <ButtonGroup className="importer__button-group">
              <Button
                className="importer__button-group__button"
                variant="text"
                onClick={() => {
                  setImportTypeToFile();
                  setCurTab(1);
                }}
              >
                {intl.formatMessage({
                  id: "FILE",
                })}
              </Button>
              <Button
                className="importer__button-group__button"
                variant="text"
                onClick={() => {
                  setImportTypeToUrl();
                  setCurTab(1);
                }}
              >
                {intl.formatMessage({
                  id: "URL",
                })}
              </Button>
            </ButtonGroup>
          </TabPanel>
          <TabPanel value={curTab} index={1}>
            {importType === "file" ? (
              <>
                <Button
                  disabled={!jsonFilePickerBtnAble}
                  startIcon={<FileCode />}
                  onClick={handleLoadJson}
                >
                  {intl.formatMessage({
                    id: "Select a json file to import",
                  })}
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label={intl.formatMessage({
                    id: "URL",
                  })}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </>
            )}
          </TabPanel>
        </PanelBox>
      </DialogContent>
      {curTab === 1 ? (
        <DialogActions>
          <Button onClick={closeDialog}>
            {intl.formatMessage({
              id: "cancel",
            })}
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {intl.formatMessage({
              id: "submit",
            })}
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
