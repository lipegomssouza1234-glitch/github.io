import { ChevronDown, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { MindmapNode as MindmapNodeType, Task } from "@/data/mindmapData";
import { cn } from "@/lib/utils";
import { FilterType } from "./FilterBar";

interface MindmapNodeFilteredProps {
  node: MindmapNodeType;
  level: number;
  onTaskToggle: (nodeId: string, taskId: string) => void;
  expanded?: Record<string, boolean>;
  onExpandToggle?: (nodeId: string) => void;
  searchTerm: string;
  filterType: FilterType;
}

export default function MindmapNodeFiltered({
  node,
  level,
  onTaskToggle,
  expanded = {},
  onExpandToggle,
  searchTerm,
  filterType,
}: MindmapNodeFilteredProps) {
  const isExpanded = expanded[node.id] !== false;

  // Filter tasks based on search and filter type
  const filteredTasks = (node.tasks || []).filter((task) => {
    const matchesSearch =
      searchTerm === "" ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "all") return matchesSearch;
    if (filterType === "pending") return matchesSearch && !task.completed;
    if (filterType === "completed") return matchesSearch && task.completed;
    return matchesSearch;
  });

  // Filter children recursively
  const filteredChildren = (node.children || [])
    .map((child) => ({
      child,
      hasVisibleContent: hasVisibleContent(child, searchTerm, filterType),
    }))
    .filter(({ hasVisibleContent }) => hasVisibleContent)
    .map(({ child }) => child);

  // Check if node title matches search
  const titleMatches =
    searchTerm === "" ||
    node.title.toLowerCase().includes(searchTerm.toLowerCase());

  const hasChildren =
    (filteredChildren && filteredChildren.length > 0) ||
    (filteredTasks && filteredTasks.length > 0);

  const completedTasks = filteredTasks.filter((t) => t.completed).length;
  const totalTasks = filteredTasks.length;
  const completionPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Don't render if no content matches
  if (!titleMatches && !hasChildren) {
    return null;
  }

  // Auto-expand if search term is active
  const shouldBeExpanded = isExpanded || (searchTerm !== "" && hasChildren);

  return (
    <div
      className={cn("transition-all duration-200", level > 0 && "ml-4 mt-3")}
    >
      {/* Node Header */}
      <div
        className={cn(
          "flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group",
          level === 0 &&
            "bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200 shadow-md",
          searchTerm !== "" &&
            "border-blue-400 bg-blue-50 shadow-sm ring-1 ring-blue-200"
        )}
        onClick={() => hasChildren && onExpandToggle?.(node.id)}
      >
        {/* Expand/Collapse Icon */}
        {hasChildren && (
          <div className="flex-shrink-0">
            {shouldBeExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </div>
        )}
        {!hasChildren && <div className="w-5 flex-shrink-0" />}

        {/* Icon and Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xl flex-shrink-0">{node.icon}</span>
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "font-semibold truncate",
                  level === 0
                    ? "text-lg text-gray-900"
                    : "text-base text-gray-800"
                )}
              >
                {highlightSearchTerm(node.title, searchTerm)}
              </h3>
              {node.description && level === 0 && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {node.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Progress Badge */}
        {totalTasks > 0 && (
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-2 border-blue-300 shadow-sm">
              <span className="text-sm font-bold text-blue-700">
                {completionPercent}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {shouldBeExpanded && hasChildren && (
        <div className="mt-3 space-y-3 pl-2 border-l-2 border-gray-200">
          {/* Child Nodes */}
          {filteredChildren.map((child) => (
            <MindmapNodeFiltered
              key={child.id}
              node={child}
              level={level + 1}
              onTaskToggle={onTaskToggle}
              expanded={expanded}
              onExpandToggle={onExpandToggle}
              searchTerm={searchTerm}
              filterType={filterType}
            />
          ))}

          {/* Tasks */}
          {filteredTasks.length > 0 && (
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 space-y-2 border border-gray-150 shadow-sm">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-all duration-150 hover:shadow-sm",
                    searchTerm !== "" &&
                      task.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) &&
                      "bg-white ring-1 ring-blue-200"
                  )}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTaskToggle(node.id, task.id);
                    }}
                    className="flex-shrink-0 mt-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 hover:text-gray-400" />
                    )}
                  </button>
                  <span
                    className={cn(
                      "text-sm flex-1 transition-all",
                      task.completed && "line-through text-gray-400"
                    )}
                  >
                    {highlightSearchTerm(task.title, searchTerm)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to check if node has visible content
function hasVisibleContent(
  node: MindmapNodeType,
  searchTerm: string,
  filterType: FilterType
): boolean {
  const titleMatches =
    searchTerm === "" ||
    node.title.toLowerCase().includes(searchTerm.toLowerCase());

  // Check tasks
  const visibleTasks = (node.tasks || []).filter((task) => {
    const matchesSearch =
      searchTerm === "" ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "all") return matchesSearch;
    if (filterType === "pending") return matchesSearch && !task.completed;
    if (filterType === "completed") return matchesSearch && task.completed;
    return matchesSearch;
  });

  if (visibleTasks.length > 0) return true;

  // Check children recursively
  if (node.children) {
    for (const child of node.children) {
      if (hasVisibleContent(child, searchTerm, filterType)) {
        return true;
      }
    }
  }

  return titleMatches;
}

// Helper function to highlight search term
function highlightSearchTerm(text: string, searchTerm: string) {
  if (!searchTerm) return text;

  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200 font-semibold rounded px-1">
        {part}
      </mark>
    ) : (
      part
    )
  );
}
