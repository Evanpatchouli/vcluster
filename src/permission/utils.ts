export function hasPermission(
  permissionList?: VCluster.Hint<VCluster.Permission>[] | null | boolean,
  provider?: VCluster.Hint<VCluster.Permission>[]
) {
  if (permissionList === null || permissionList === false)
    return {
      of: <T = any, D = any, R = any>(
        anything?: T,
        options?: {
          default?: D;
          reject?: R;
        }
      ) => options?.reject ?? void 0,
      result: false,
    };
  if (permissionList === undefined)
    return {
      of: <T = any, D = any, R = any>(
        anything?: T,
        options?: {
          default?: D;
          reject?: R;
        }
      ) => options?.default ?? anything,
      result: true,
    };
  if (permissionList === true)
    return {
      of: <T = any, D = any, R = any>(
        anything?: T,
        options?: {
          default?: D;
          reject?: R;
        }
      ) => options?.default ?? anything,
      result: true,
    };
  const permissions = provider || ["read"];
  const ok = permissionList.some((permission) =>
    permissions.includes(permission)
  );
  return {
    of: <T = any, D = any, R = any>(
      anything?: T,
      options?: {
        default?: D;
        reject?: R;
      }
    ) => (ok ? options?.default ?? anything : options?.reject ?? void 0),
    result: ok,
  };
}
