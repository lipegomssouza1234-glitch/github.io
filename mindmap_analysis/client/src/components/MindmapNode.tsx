import { ChevronDown, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import { MindmapNode as MindmapNodeType, Task } from "@/data/mindmapData";
import { cn } from "@/lib/utils";

interface MindmapNodeProps {
  node: MindmapNodeType;
  level: number;
  onTaskToggle: (nodeId: string, taskId: string) => void;
  expanded?: Record<string, boolean>;
  onExpandToggle?: (nodeId: string) => void;
}

export default function MindmapNode({
  node,
  level,
  onTaskToggle,
  expanded = {},
  onExpandToggle,
}: MindmapNodeProps) {
  const isExpanded = expanded[node.id] !== false;
  const hasChildren = (node.children && node.children.length > 0) || (node.tasks && node.tasks.length > 0);

  const completedTasks = (node.tasks || []).filter((t) => t.completed).length;
  const totalTasks = node.tasks?.length || 0;
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const childrenCompletedTasks = (node.children || []).reduce((acc, child) => {
    const childCompleted = (child.tasks || []).filter((t) => t.completed).length;
    return acc + childCompleted;
  }, 0);

  const childrenTotalTasks = (node.children || []).reduce((acc, child) => {
    return acc + (child.tasks?.length || 0);
  }, 0);

  const childrenCompletionPercent = childrenTotalTasks > 0 ? Math.round((childrenCompletedTasks / childrenTotalTasks) * 100) : 0;

  const totalCompletionPercent = totalTasks + childrenTotalTasks > 0 
    ? Math.round(((completedTasks + childrenCompletedTasks) / (totalTasks + childrenTotalTasks)) * 100) 
    : 0;

  const colorClasses = {
    "bg-blue-600": "bg-blue-600",
    "bg-blue-500": "bg-blue-500",
    "bg-indigo-500": "bg-indigo-500",
    "bg-purple-500": "bg-purple-500",
    "bg-pink-500": "bg-pink-500",
    "bg-orange-500": "bg-orange-500",
    "bg-green-500": "bg-green-500",
    "bg-red-500": "bg-red-500",
  };

  const bgColor = node.color && node.color in colorClasses ? node.color : "bg-blue-500";

  return (
    <div className={cn("transition-all duration-200", level > 0 && "ml-4 mt-3")}>
      {/* Node Header */}
      <div
        className={cn(
          "flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group",
          level === 0 && "bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200 shadow-md"
        )}
        onClick={() => hasChildren && onExpandToggle?.(node.id)}
      >
        {/* Expand/Collapse Icon */}
        {hasChildren && (
          <div className="flex-shrink-0">
            {isExpanded ? (
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
              <h3 className={cn(
                "font-semibold truncate",
                level === 0 ? "text-lg text-gray-900" : "text-base text-gray-800"
              )}>
                {node.title}
              </h3>
              {node.description && level === 0 && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{node.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Progress Badge */}
        {totalTasks + childrenTotalTasks > 0 && (
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-2 border-blue-300 shadow-sm">
              <span className="text-sm font-bold text-blue-700">{totalCompletionPercent}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && hasChildren && (
        <div className="mt-3 space-y-3 pl-2 border-l-2 border-gray-200">
          {/* Child Nodes */}
          {(node.children || []).map((child) => (
            <MindmapNode
              key={child.id}
              node={child}
              level={level + 1}
              onTaskToggle={onTaskToggle}
              expanded={expanded}
              onExpandToggle={onExpandToggle}
            />
          ))}

          {/* Tasks */}
          {(node.tasks || []).length > 0 && (
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 space-y-2 border border-gray-150 shadow-sm">
              {(node.tasks || []).map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-all duration-150 hover:shadow-sm"
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
                    {task.title}
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
