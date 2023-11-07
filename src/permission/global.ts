import { hasPermission } from "./utils";

declare global {
  interface Window {
    /**
     * **Global** permission validator function named `hasPermi(p1, p2?)`, which receives two parameters: **`permissionList`** and **`provider`**.
     * The first parameter is the permissions can be accessed, and the second parameter is the origin of the permissions owned by the user
     * (If not given, it will be readonly as `['read']`), the provider should be the state stored in **Redux**.
     * The return of `hasPermi` is a object with a property called **`of(p1, options?)`**:
     *
     * **`hasPermi().of(p1, options)`** :
     * The first parameter is the things to retuened when access allowed. The second parameter is config of default returned
     * and the returned when access denied.
     *
     * **Examples:**
     * ```tsx
     * hasPermi(["write", permiStore]).of(
     *   <>
     *     <Input />
     *   </>,
     *   {
     *     default: "-",
     *     reject: "401 not authorized",
     *   }
     * );
     * ```
     */
    hasPermi: typeof hasPermission;
  }
}

window.hasPermi = hasPermission;

declare global {
  /**
   * **Global** permission validator function named `hasPermi(p1, p2?)`, which receives two parameters: **`permissionList`** and **`provider`**.
   * The first parameter is the permissions can be accessed, and the second parameter is the origin of the permissions owned by the user
   * (If not given, it will be readonly as `['read']`), the provider should be the state stored in **Redux**.
   * The return of `hasPermi` is a object with a property called **`of(p1, options?)`**:
   *
   * **`hasPermi().of(p1, options)`** :
   * The first parameter is the things to retuened when access allowed. The second parameter is config of default returned
   * and the returned when access denied.
   *
   * **Examples:**
   * ```tsx
   * hasPermi(["write", permiStore]).of(
   *   <>
   *     <Input />
   *   </>,
   *   {
   *     default: "-",
   *     reject: "401 not authorized",
   *   }
   * );
   * ```
   */
  const hasPermi: typeof hasPermission;
}
