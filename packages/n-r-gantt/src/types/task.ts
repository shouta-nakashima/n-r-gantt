/**
 * Styles for customizing task appearance
 */
export interface TaskStyles {
  /** Background color of the task bar */
  backgroundColor?: string;
  /** Color of the progress indicator */
  progressColor?: string;
  /** Text color for task label */
  textColor?: string;
  /** Border radius of the task bar in pixels */
  borderRadius?: number;
}

/**
 * Represents a task in the Gantt chart
 */
export interface GanttTask {
  /** Unique identifier for the task */
  id: string;
  /** Display name of the task */
  name: string;
  /** Start date of the task */
  start: Date;
  /** End date of the task */
  end: Date;
  /** Progress percentage (0-100) */
  progress?: number;
  /** Type of the task */
  type?: "task" | "milestone" | "project";
  /** Array of task IDs that this task depends on */
  dependencies?: string[];
  /** Parent task ID for hierarchical structure */
  parentId?: string;
  /** Whether child tasks are collapsed */
  collapsed?: boolean;
  /** Custom styles for this task */
  styles?: TaskStyles;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}
