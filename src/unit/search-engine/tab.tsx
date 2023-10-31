import { CloseOne, Login as Import } from "@icon-park/react";
import { FormattedMessage, useIntl } from "react-intl";
import "./tab.css";
import {
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { useReducer, useRef, useState } from "react";

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
      default:
        return state;
    }
  };

  const [keywords, setKeywords] = useState("");

  const [result, dispatchResult] = useReducer(resultReducer, [
    {
      id: 1,
      content: "relative item 1",
    },
    {
      id: 2,
      content: "relative item 2",
    },
    {
      id: 3,
      content: "relative item 3",
    },
    {
      id: 4,
      content: "relative item 4",
    },
    {
      id: 5,
      content: "relative item 5",
    },
    {
      id: 6,
      content: "relative item 6",
    },
    {
      id: 7,
      content: "relative item 7",
    },
    {
      id: 8,
      content: "relative item 8",
    },
    {
      id: 9,
      content: "relative item 9",
    },
    {
      id: 10,
      content: "relative item 10",
    },
    {
      id: 11,
      content: "relative item 11",
    },
    {
      id: 12,
      content: "relative item 12",
    },
    {
      id: 13,
      content: "relative item 13",
    },
    {
      id: 14,
      content: "relative item 14",
    },
    {
      id: 15,
      content: "relative item 15",
    },
    {
      id: 16,
      content: "relative item 16",
    },
    {
      id: 17,
      content: "relative item 17",
    },
    {
      id: 18,
      content: "relative item 18",
    },
    {
      id: 19,
      content: "relative item 19",
    },
    {
      id: 20,
      content: "relative item 20",
    },
    {
      id: 21,
      content: "relative item 21",
    },
    {
      id: 22,
      content: "relative item 22",
    },
    {
      id: 23,
      content: "relative item 23",
    },
    {
      id: 24,
      content: "relative item 24",
    },
    {
      id: 25,
      content: "relative item 25",
    },
    {
      id: 26,
      content: "relative item 26",
    },
    {
      id: 27,
      content: "relative item 27",
    },
  ]);

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
            color: inputFocused ? "dodgerblue" : "gray",
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
            {item.content}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Tab;
