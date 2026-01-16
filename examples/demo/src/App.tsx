import { useState } from "react";
import { Gantt, type GanttTask, type ViewMode } from "n-r-gantt";

// Sample tasks data
const initialTasks: GanttTask[] = [
  {
    id: "1",
    name: "Project Planning",
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 5),
    progress: 100,
    type: "project",
    styles: {
      backgroundColor: "#10b981",
      progressColor: "#059669",
    },
  },
  {
    id: "2",
    name: "Requirements Gathering",
    start: new Date(2024, 0, 2),
    end: new Date(2024, 0, 8),
    progress: 80,
    dependencies: ["1"],
  },
  {
    id: "3",
    name: "Design Phase",
    start: new Date(2024, 0, 6),
    end: new Date(2024, 0, 15),
    progress: 60,
    dependencies: ["2"],
  },
  {
    id: "4",
    name: "Design Review",
    start: new Date(2024, 0, 15),
    end: new Date(2024, 0, 15),
    type: "milestone",
    dependencies: ["3"],
  },
  {
    id: "5",
    name: "Development - Frontend",
    start: new Date(2024, 0, 16),
    end: new Date(2024, 0, 30),
    progress: 40,
    dependencies: ["4"],
    styles: {
      backgroundColor: "#6366f1",
      progressColor: "#4f46e5",
    },
  },
  {
    id: "6",
    name: "Development - Backend",
    start: new Date(2024, 0, 16),
    end: new Date(2024, 1, 5),
    progress: 30,
    dependencies: ["4"],
    styles: {
      backgroundColor: "#8b5cf6",
      progressColor: "#7c3aed",
    },
  },
  {
    id: "7",
    name: "Testing",
    start: new Date(2024, 1, 1),
    end: new Date(2024, 1, 10),
    progress: 10,
    dependencies: ["5", "6"],
  },
  {
    id: "8",
    name: "Deployment",
    start: new Date(2024, 1, 11),
    end: new Date(2024, 1, 15),
    progress: 0,
    dependencies: ["7"],
  },
  {
    id: "9",
    name: "Project Complete",
    start: new Date(2024, 1, 15),
    end: new Date(2024, 1, 15),
    type: "milestone",
    dependencies: ["8"],
    styles: {
      backgroundColor: "#f59e0b",
    },
  },
];

function App() {
  const [tasks] = useState<GanttTask[]>(initialTasks);
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [selectedTask, setSelectedTask] = useState<GanttTask | null>(null);

  const handleTaskClick = (task: GanttTask) => {
    console.log("Task clicked:", task);
  };

  const handleTaskSelect = (task: GanttTask | null) => {
    setSelectedTask(task);
  };

  return (
    <div className="app">
      <h1>n-r-gantt Demo</h1>
      <p>A modern React Gantt chart library</p>

      <div className="controls">
        <label>
          View Mode:
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as ViewMode)}
          >
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </label>
      </div>

      <div className="gantt-wrapper" style={{ height: 500 }}>
        <Gantt
          tasks={tasks}
          viewMode={viewMode}
          onTaskClick={handleTaskClick}
          onTaskSelect={handleTaskSelect}
          showProgress
          showToday
          columnWidth={viewMode === "month" ? 150 : viewMode === "week" ? 100 : 60}
          rowHeight={50}
          headerHeight={50}
          listWidth={200}
        />
      </div>

      {selectedTask && (
        <div className="task-info">
          <h3>Selected Task</h3>
          <pre>{JSON.stringify(selectedTask, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
