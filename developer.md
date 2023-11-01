# Developer Readme

### react-highlight-words

Example:

```tsx
import React from "react";
import Highlighter from "react-highlight-words";

function MyComponent() {
  return (
    <Highlighter
      highlightClassName="YourHighlightClass"
      searchWords={["name", "user"]}
      autoEscape={true}
      textToHighlight="name and user are highlighted"
    />
  );
}

export default MyComponent;
```

- highlightClassName to customize the highlighting styles
- searchWords to highlight the words
- textToHighlight is the origin text
