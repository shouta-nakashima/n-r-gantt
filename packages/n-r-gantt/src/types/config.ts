/**
 * View mode for the timeline
 */
export type ViewMode =
  | "hour"
  | "quarter-day"
  | "half-day"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";

/**
 * Configuration options for the Gantt chart
 */
export interface GanttConfig {
  /** Timeline view mode */
  viewMode: ViewMode;
  /** Locale for date formatting (e.g., 'en-US', 'ja-JP') */
  locale?: string;
  /** Right-to-left mode */
  rtl?: boolean;
  /** Read-only mode (disables editing) */
  readOnly?: boolean;
  /** Show progress indicator on tasks */
  showProgress?: boolean;
  /** Show dependency lines */
  showDependencies?: boolean;
  /** Show today marker line */
  showToday?: boolean;
  /** Width of each column in pixels */
  columnWidth?: number;
  /** Height of each row in pixels */
  rowHeight?: number;
  /** Height of the header in pixels */
  headerHeight?: number;
  /** Width of the task list panel */
  listCellWidth?: string;
  /** Color of the today marker */
  todayColor?: string;
  /** Exclude weekends from timeline */
  excludeWeekends?: boolean;
  /** Specific dates to exclude from timeline */
  excludedDates?: Date[];
}
