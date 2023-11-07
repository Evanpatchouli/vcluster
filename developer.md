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

### tauri-store

I make a proxy class of tauri-store and assign a proxy instance to global window as `TauriStore`,
thus, you can access it directly by calling `TauriStore` or `window.TauriStore`.

If you dont' like a proxy, you can use the raw store at `/src/store/tauri/store.ts` instead.

You should notice that tauri-store is a lazy store so it wouldn't force the page to rerender when
store is updated. You can treat it as a databased store, and you need to keep redux store asynchronous
with the tauri-store.

More details can be found in `/src/store/tauri`.

### permissions

I make a global permission validator function named `hasPermi(p1, p2?)`, which receives two parameters: `permissionList` and `provider`. The first parameter is the permissions can be accessed, and the second parameter is the origin of the permissions owned by the user (If not given, it will be readonly as `['read']`), the provider should be the state stored in Redux.

The return of `hasPermi` is a object with a property called `of(p1, options?)`:  
The first parameter is the things to retuened when access allowed. The second parameter is config of default returned
and the returned when access denied.

```tsx
hasPermi(["write", permiStore]).of(
  <>
    <Input />
  </>,
  {
    default: "-",
    reject: "401 not authorized",
  }
);
```
