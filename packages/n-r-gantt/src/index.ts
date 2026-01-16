// Components
export { Gantt } from "./components/Gantt";
export type { GanttProps } from "./components/Gantt";

// Types
export type {
  GanttTask,
  TaskStyles,
  GanttDependency,
  DependencyType,
  GanttConfig,
  ViewMode,
} from "./types";

// Hooks (for advanced usage)
export { useGanttContext } from "./context/GanttContext";
