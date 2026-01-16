/**
 * Types of dependencies between tasks
 * - finish-to-start: Task B starts when Task A finishes (most common)
 * - start-to-start: Task B starts when Task A starts
 * - finish-to-finish: Task B finishes when Task A finishes
 * - start-to-finish: Task B finishes when Task A starts (rare)
 */
export type DependencyType =
  | "finish-to-start"
  | "start-to-start"
  | "finish-to-finish"
  | "start-to-finish";

/**
 * Represents a dependency relationship between two tasks
 */
export interface GanttDependency {
  /** Unique identifier for the dependency */
  id: string;
  /** ID of the source task */
  fromTaskId: string;
  /** ID of the target task */
  toTaskId: string;
  /** Type of dependency relationship */
  type: DependencyType;
}
