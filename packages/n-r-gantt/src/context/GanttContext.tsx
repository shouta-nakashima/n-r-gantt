import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { GanttConfig, GanttDependency, GanttTask, ViewMode } from "../types";

// State
interface GanttState {
  tasks: GanttTask[];
  dependencies: GanttDependency[];
  config: GanttConfig;
  selectedTaskId: string | null;
  hoveredTaskId: string | null;
  scrollPosition: { x: number; y: number };
}

// Actions
type GanttAction =
  | { type: "SET_TASKS"; payload: GanttTask[] }
  | { type: "UPDATE_TASK"; payload: GanttTask }
  | { type: "SET_DEPENDENCIES"; payload: GanttDependency[] }
  | { type: "SELECT_TASK"; payload: string | null }
  | { type: "HOVER_TASK"; payload: string | null }
  | { type: "SET_VIEW_MODE"; payload: ViewMode }
  | { type: "SET_CONFIG"; payload: Partial<GanttConfig> }
  | { type: "SET_SCROLL_POSITION"; payload: { x: number; y: number } };

// Default config
const defaultConfig: GanttConfig = {
  viewMode: "day",
  locale: "en-US",
  rtl: false,
  readOnly: false,
  showProgress: true,
  showDependencies: true,
  showToday: true,
  columnWidth: 60,
  rowHeight: 50,
  headerHeight: 50,
  listCellWidth: "200px",
  todayColor: "#f87171",
  excludeWeekends: false,
};

// Initial state
const initialState: GanttState = {
  tasks: [],
  dependencies: [],
  config: defaultConfig,
  selectedTaskId: null,
  hoveredTaskId: null,
  scrollPosition: { x: 0, y: 0 },
};

// Reducer
function ganttReducer(state: GanttState, action: GanttAction): GanttState {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "SET_DEPENDENCIES":
      return { ...state, dependencies: action.payload };
    case "SELECT_TASK":
      return { ...state, selectedTaskId: action.payload };
    case "HOVER_TASK":
      return { ...state, hoveredTaskId: action.payload };
    case "SET_VIEW_MODE":
      return {
        ...state,
        config: { ...state.config, viewMode: action.payload },
      };
    case "SET_CONFIG":
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    case "SET_SCROLL_POSITION":
      return { ...state, scrollPosition: action.payload };
    default:
      return state;
  }
}

// Context
interface GanttContextValue {
  state: GanttState;
  dispatch: React.Dispatch<GanttAction>;
}

const GanttContext = createContext<GanttContextValue | null>(null);

// Provider
interface GanttProviderProps {
  children: ReactNode;
  initialTasks?: GanttTask[];
  initialDependencies?: GanttDependency[];
  initialConfig?: Partial<GanttConfig>;
}

export function GanttProvider({
  children,
  initialTasks = [],
  initialDependencies = [],
  initialConfig = {},
}: GanttProviderProps) {
  const [state, dispatch] = useReducer(ganttReducer, {
    ...initialState,
    tasks: initialTasks,
    dependencies: initialDependencies,
    config: { ...defaultConfig, ...initialConfig },
  });

  return (
    <GanttContext.Provider value={{ state, dispatch }}>
      {children}
    </GanttContext.Provider>
  );
}

// Hook
export function useGanttContext() {
  const context = useContext(GanttContext);
  if (!context) {
    throw new Error("useGanttContext must be used within a GanttProvider");
  }
  return context;
}

export { defaultConfig };
export type { GanttState, GanttAction };
