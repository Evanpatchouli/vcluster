import ClusterManagerTab from "../cluster-manager/tab";
import CreateClusterTab from "../create-cluster/tab";
import SearchEngineTab from "../search-engine/tab";
import DatabaseToolTab from "../database-tool/tab";
import ClusterImporterTab from "../cluster-importer/tab";
import TerminalTab from "../terminal-tab";
import ThemePaletteTab from "../theme-palette/tab";

const tabComponents: { [x: number]: React.ReactNode } = {
  0: <ClusterManagerTab />,
  1: <CreateClusterTab />,
  2: <SearchEngineTab />,
  3: <DatabaseToolTab />,
  4: <ClusterImporterTab />,
  5: <TerminalTab />,
  6: <ThemePaletteTab />,
};

export default tabComponents;
