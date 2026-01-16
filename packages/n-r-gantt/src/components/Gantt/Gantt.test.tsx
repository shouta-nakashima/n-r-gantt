import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Gantt } from "./Gantt";
import type { GanttTask } from "../../types";

describe("Gantt", () => {
  const mockTasks: GanttTask[] = [
    {
      id: "1",
      name: "Task 1",
      start: new Date("2024-01-01"),
      end: new Date("2024-01-05"),
      progress: 50,
    },
    {
      id: "2",
      name: "Task 2",
      start: new Date("2024-01-03"),
      end: new Date("2024-01-10"),
      progress: 0,
    },
  ];

  it("renders tasks", () => {
    render(<Gantt tasks={mockTasks} />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("renders header", () => {
    render(<Gantt tasks={mockTasks} />);
    expect(screen.getByText("Task Name")).toBeInTheDocument();
  });

  it("calls onTaskClick when task is clicked", () => {
    const handleClick = vi.fn();
    render(<Gantt tasks={mockTasks} onTaskClick={handleClick} />);

    fireEvent.click(screen.getByText("Task 1"));

    expect(handleClick).toHaveBeenCalledWith(
      mockTasks[0],
      expect.any(Object)
    );
  });

  it("calls onTaskSelect when task is clicked", () => {
    const handleSelect = vi.fn();
    render(<Gantt tasks={mockTasks} onTaskSelect={handleSelect} />);

    fireEvent.click(screen.getByText("Task 1"));

    expect(handleSelect).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("renders empty state", () => {
    render(<Gantt tasks={[]} />);
    expect(screen.getByText("Task Name")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Gantt tasks={mockTasks} className="custom-class" />
    );
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });

  it("renders milestone tasks", () => {
    const tasksWithMilestone: GanttTask[] = [
      {
        id: "1",
        name: "Milestone",
        start: new Date("2024-01-01"),
        end: new Date("2024-01-01"),
        type: "milestone",
      },
    ];

    render(<Gantt tasks={tasksWithMilestone} />);
    expect(screen.getByText("Milestone")).toBeInTheDocument();
  });
});
