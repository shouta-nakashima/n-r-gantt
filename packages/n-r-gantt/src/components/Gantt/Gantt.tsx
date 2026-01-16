import { useEffect, type CSSProperties } from "react";
import { GanttProvider, useGanttContext } from "../../context/GanttContext";
import type { GanttConfig, GanttDependency, GanttTask, ViewMode } from "../../types";
import "./Gantt.css";

export interface GanttProps {
  /** Array of tasks to display */
  tasks: GanttTask[];
  /** Array of dependencies between tasks */
  dependencies?: GanttDependency[];
  /** Timeline view mode */
  viewMode?: ViewMode;
  /** Locale for date formatting */
  locale?: string;
  /** Read-only mode */
  readOnly?: boolean;
  /** Show progress indicator */
  showProgress?: boolean;
  /** Show dependency lines */
  showDependencies?: boolean;
  /** Show today marker */
  showToday?: boolean;
  /** Width of each column */
  columnWidth?: number;
  /** Height of each row */
  rowHeight?: number;
  /** Height of header */
  headerHeight?: number;
  /** Width of task list panel */
  listWidth?: number | string;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Callback when task changes */
  onTaskChange?: (task: GanttTask) => void;
  /** Callback when task is clicked */
  onTaskClick?: (task: GanttTask, event: React.MouseEvent) => void;
  /** Callback when task is double clicked */
  onTaskDoubleClick?: (task: GanttTask, event: React.MouseEvent) => void;
  /** Callback when task is selected */
  onTaskSelect?: (task: GanttTask | null) => void;
  /** Callback when task dates change */
  onDateChange?: (task: GanttTask, start: Date, end: Date) => void;
  /** Callback when task progress changes */
  onProgressChange?: (task: GanttTask, progress: number) => void;
  /** Callback when view mode changes */
  onViewModeChange?: (viewMode: ViewMode) => void;
}

function GanttInner({
  tasks,
  dependencies = [],
  onTaskClick,
  onTaskSelect,
}: GanttProps) {
  const { state, dispatch } = useGanttContext();

  // Sync tasks with context
  useEffect(() => {
    dispatch({ type: "SET_TASKS", payload: tasks });
  }, [tasks, dispatch]);

  // Sync dependencies with context
  useEffect(() => {
    dispatch({ type: "SET_DEPENDENCIES", payload: dependencies });
  }, [dependencies, dispatch]);

  const handleTaskClick = (task: GanttTask, event: React.MouseEvent) => {
    dispatch({ type: "SELECT_TASK", payload: task.id });
    onTaskClick?.(task, event);
    onTaskSelect?.(task);
  };

  // Calculate date range
  const dateRange = calculateDateRange(state.tasks);

  return (
    <div className="gantt">
      {/* Header */}
      <div className="gantt-header" style={{ height: state.config.headerHeight }}>
        <div className="gantt-header-list" style={{ width: state.config.listCellWidth }}>
          Task Name
        </div>
        <div className="gantt-header-timeline">
          {dateRange.dates.map((date) => (
            <div
              key={date.toISOString()}
              className="gantt-header-cell"
              style={{ width: state.config.columnWidth }}
            >
              {formatDate(date, state.config.viewMode, state.config.locale)}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="gantt-body">
        {/* Task List */}
        <div className="gantt-task-list" style={{ width: state.config.listCellWidth }}>
          {state.tasks.map((task) => (
            <div
              key={task.id}
              className={`gantt-task-list-row ${
                state.selectedTaskId === task.id ? "selected" : ""
              }`}
              style={{ height: state.config.rowHeight }}
              onClick={(e) => handleTaskClick(task, e)}
            >
              {task.name}
            </div>
          ))}
        </div>

        {/* Timeline Area */}
        <div className="gantt-timeline">
          <svg
            className="gantt-timeline-svg"
            width={dateRange.dates.length * (state.config.columnWidth ?? 60)}
            height={state.tasks.length * (state.config.rowHeight ?? 50)}
          >
            {/* Grid lines */}
            {dateRange.dates.map((date, index) => (
              <line
                key={date.toISOString()}
                x1={index * (state.config.columnWidth ?? 60)}
                y1={0}
                x2={index * (state.config.columnWidth ?? 60)}
                y2={state.tasks.length * (state.config.rowHeight ?? 50)}
                className="gantt-grid-line"
              />
            ))}

            {/* Today marker */}
            {state.config.showToday && (
              <TodayMarker
                dateRange={dateRange}
                columnWidth={state.config.columnWidth ?? 60}
                height={state.tasks.length * (state.config.rowHeight ?? 50)}
                color={state.config.todayColor}
              />
            )}

            {/* Task bars */}
            {state.tasks.map((task, index) => (
              <TaskBar
                key={task.id}
                task={task}
                index={index}
                dateRange={dateRange}
                config={state.config}
                isSelected={state.selectedTaskId === task.id}
                onClick={(e) => handleTaskClick(task, e)}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

// Task Bar Component
interface TaskBarProps {
  task: GanttTask;
  index: number;
  dateRange: DateRange;
  config: GanttConfig;
  isSelected: boolean;
  onClick: (event: React.MouseEvent) => void;
}

function TaskBar({ task, index, dateRange, config, isSelected, onClick }: TaskBarProps) {
  const columnWidth = config.columnWidth ?? 60;
  const rowHeight = config.rowHeight ?? 50;
  const barHeight = rowHeight * 0.6;
  const barY = index * rowHeight + (rowHeight - barHeight) / 2;

  // Calculate position based on dates
  const startOffset = calculateDateOffset(task.start, dateRange.start, config.viewMode);
  const endOffset = calculateDateOffset(task.end, dateRange.start, config.viewMode);
  const barX = startOffset * columnWidth;
  const barWidth = Math.max((endOffset - startOffset) * columnWidth, columnWidth * 0.5);

  // Milestone rendering
  if (task.type === "milestone") {
    const size = barHeight * 0.7;
    const centerX = barX + size / 2;
    const centerY = barY + barHeight / 2;
    return (
      <g className={`gantt-task-bar milestone ${isSelected ? "selected" : ""}`} onClick={onClick}>
        <polygon
          points={`${centerX},${centerY - size / 2} ${centerX + size / 2},${centerY} ${centerX},${centerY + size / 2} ${centerX - size / 2},${centerY}`}
          className="gantt-milestone"
          fill={task.styles?.backgroundColor ?? "#8b5cf6"}
        />
      </g>
    );
  }

  return (
    <g className={`gantt-task-bar ${isSelected ? "selected" : ""}`} onClick={onClick}>
      {/* Background */}
      <rect
        x={barX}
        y={barY}
        width={barWidth}
        height={barHeight}
        rx={task.styles?.borderRadius ?? 4}
        className="gantt-task-bg"
        fill={task.styles?.backgroundColor ?? "#3b82f6"}
      />
      {/* Progress */}
      {config.showProgress && task.progress !== undefined && task.progress > 0 && (
        <rect
          x={barX}
          y={barY}
          width={barWidth * (task.progress / 100)}
          height={barHeight}
          rx={task.styles?.borderRadius ?? 4}
          className="gantt-task-progress"
          fill={task.styles?.progressColor ?? "#1d4ed8"}
        />
      )}
      {/* Label */}
      <text
        x={barX + 8}
        y={barY + barHeight / 2}
        dy="0.35em"
        className="gantt-task-label"
        fill={task.styles?.textColor ?? "#ffffff"}
      >
        {task.name}
      </text>
    </g>
  );
}

// Today Marker Component
interface TodayMarkerProps {
  dateRange: DateRange;
  columnWidth: number;
  height: number;
  color?: string;
}

function TodayMarker({ dateRange, columnWidth, height, color }: TodayMarkerProps) {
  const today = new Date();
  const offset = calculateDateOffset(today, dateRange.start, "day");

  if (offset < 0 || offset > dateRange.dates.length) {
    return null;
  }

  const x = offset * columnWidth;

  return (
    <line
      x1={x}
      y1={0}
      x2={x}
      y2={height}
      className="gantt-today-marker"
      stroke={color ?? "#f87171"}
      strokeWidth={2}
    />
  );
}

// Utility functions
interface DateRange {
  start: Date;
  end: Date;
  dates: Date[];
}

function calculateDateRange(tasks: GanttTask[]): DateRange {
  if (tasks.length === 0) {
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 7);
    const end = new Date(today);
    end.setDate(end.getDate() + 30);
    return { start, end, dates: generateDates(start, end) };
  }

  let minDate = new Date(tasks[0].start);
  let maxDate = new Date(tasks[0].end);

  for (const task of tasks) {
    if (task.start < minDate) minDate = new Date(task.start);
    if (task.end > maxDate) maxDate = new Date(task.end);
  }

  // Add padding
  const start = new Date(minDate);
  start.setDate(start.getDate() - 3);
  const end = new Date(maxDate);
  end.setDate(end.getDate() + 7);

  return { start, end, dates: generateDates(start, end) };
}

function generateDates(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(start);

  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function calculateDateOffset(date: Date, rangeStart: Date, _viewMode: ViewMode): number {
  const diffTime = date.getTime() - rangeStart.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays;
}

function formatDate(date: Date, viewMode: ViewMode, locale?: string): string {
  const loc = locale ?? "en-US";

  switch (viewMode) {
    case "hour":
      return date.toLocaleTimeString(loc, { hour: "2-digit" });
    case "day":
      return date.toLocaleDateString(loc, { day: "numeric", month: "short" });
    case "week":
      return date.toLocaleDateString(loc, { day: "numeric", month: "short" });
    case "month":
      return date.toLocaleDateString(loc, { month: "short", year: "numeric" });
    case "year":
      return date.toLocaleDateString(loc, { year: "numeric" });
    default:
      return date.toLocaleDateString(loc, { day: "numeric", month: "short" });
  }
}

// Main export with Provider wrapper
export function Gantt(props: GanttProps) {
  const { className, style, ...restProps } = props;

  return (
    <GanttProvider
      initialTasks={props.tasks}
      initialDependencies={props.dependencies}
      initialConfig={{
        viewMode: props.viewMode,
        locale: props.locale,
        readOnly: props.readOnly,
        showProgress: props.showProgress,
        showDependencies: props.showDependencies,
        showToday: props.showToday,
        columnWidth: props.columnWidth,
        rowHeight: props.rowHeight,
        headerHeight: props.headerHeight,
        listCellWidth: typeof props.listWidth === "number" ? `${props.listWidth}px` : props.listWidth,
      }}
    >
      <div className={`gantt-container ${className ?? ""}`} style={style}>
        <GanttInner {...restProps} />
      </div>
    </GanttProvider>
  );
}
