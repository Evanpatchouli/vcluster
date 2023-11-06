import { CloseOne, Login as Import } from "@icon-park/react";
import { FormattedMessage, useIntl } from "react-intl";
import Hightlighter from "react-highlight-words";
import "./tab.css";
import {
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useReducer, useRef, useState } from "react";
import Api from "../../api";
import { Sql } from "../../util/util";

function Tab() {
  const intl = useIntl();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputFocused, setInputFocused] = useState(false);

  const resultReducer = (
    state: {
      id: any;
      content: string;
    }[],
    action: {
      type: string;
      payload: any;
    }
  ): {
    id: any;
    content: string;
  }[] => {
    switch (action.type) {
      case "add":
        return [...state, action.payload];
      case "remove":
        return state.filter((item) => item !== action.payload);
      case "override":
        return [...(action.payload ?? [])];
      default:
        return state;
    }
  };

  const [keywords, setKeywords] = useState("");

  const [result, dispatchResult] = useReducer(resultReducer, []);

  useEffect(() => {
    Api.sql<VCluster.Cluster[]>(Sql.SEL_CLUSTER_LIKE(keywords ?? "")).then(
      ({ data }) => {
        dispatchResult({
          type: "override",
          payload: (data ?? []).map((item) => ({
            id: item.id,
            content: JSON.stringify(item),
          })),
        });
      }
    );
  }, [keywords]);

  const filterResult = result.filter((item) =>
    item.content.toLowerCase().includes(keywords.toLowerCase())
  );

  return (
    <div className="search-engine-tab">
      <TextField
        className="search-engine-tab__input"
        size="small"
        ref={inputRef}
        onFocus={() => {
          setInputFocused(true);
        }}
        onBlur={() => {
          setInputFocused(false);
        }}
        style={{
          border: inputFocused ? "none" : "1px solid rgb(60, 60, 60)",
        }}
        InputLabelProps={{
          style: {
            color: inputFocused
              ? "var(--color-element-active_or_focus-highlight)"
              : "var(--color-element-inactive_or_unfocus)",
          },
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            inputRef.current?.blur();
            //@ts-ignore
            setKeywords(e.target?.value || "");
          }
        }}
        label={intl.formatMessage({
          id: "keywords",
        })}
      />
      <List className="search-engine-tab__result-list">
        {filterResult.map((item) => (
          <ListItem
            key={item.id}
            className="search-engine-tab__result-list-item"
            secondaryAction={
              <Tooltip
                title={intl.formatMessage({
                  id: "Delete",
                })}
                placement="top-end"
              >
                <IconButton
                  className="btn-cleanup-one"
                  edge="end"
                  onClick={() => {
                    dispatchResult({
                      type: "remove",
                      payload: item,
                    });
                  }}
                >
                  <CloseOne />
                </IconButton>
              </Tooltip>
            }
            disablePadding
          >
            <Hightlighter
              highlightClassName="searched-highlight"
              searchWords={[keywords]}
              textToHighlight={item.content}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Tab;
