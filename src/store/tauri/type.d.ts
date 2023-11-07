export type TautiStoreState = {
  updatedAt: string;
  theme: "system" | "dark" | "light";
  lang: "en" | "cn";
  permission: VCluster.Hint<VCluster.Permission>[];
};
