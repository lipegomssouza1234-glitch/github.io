import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Share2 } from "lucide-react";
import MindmapNode from "@/components/MindmapNode";
import MindmapNodeFiltered from "@/components/MindmapNodeFiltered";
import FilterBar, { FilterType } from "@/components/FilterBar";
import { mindmapData, MindmapNode as MindmapNodeType, Task } from "@/data/mindmapData";
import { toast } from "sonner";

interface StorageState {
  expanded: Record<string, boolean>;
  tasks: Record<string, Record<string, boolean>>;
}

export default function Home() {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const [taskStates, setTaskStates] = useState<Record<string, Record<string, boolean>>>({});
  const [dataWithState, setDataWithState] = useState<MindmapNodeType>(mindmapData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mindmap-state");
    if (saved) {
      try {
        const state: StorageState = JSON.parse(saved);
        setExpandedNodes(state.expanded || {});
        setTaskStates(state.tasks || {});
      } catch (e) {
        console.error("Failed to load saved state:", e);
      }
    } else {
      // Expand root and first level by default
      setExpandedNodes({ root: true });
    }
  }, []);

  // Update data with current task states
  useEffect(() => {
    const updateNodeTasks = (node: MindmapNodeType): MindmapNodeType => {
      const nodeTaskStates = taskStates[node.id] || {};
      return {
        ...node,
        tasks: (node.tasks || []).map((task) => ({
          ...task,
          completed: nodeTaskStates[task.id] || false,
        })),
        children: (node.children || []).map(updateNodeTasks),
      };
    };

    setDataWithState(updateNodeTasks(mindmapData));
  }, [taskStates]);

  // Save state to localStorage
  useEffect(() => {
    const state: StorageState = {
      expanded: expandedNodes,
      tasks: taskStates,
    };
    localStorage.setItem("mindmap-state", JSON.stringify(state));
  }, [expandedNodes, taskStates]);

  const handleExpandToggle = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const handleTaskToggle = (nodeId: string, taskId: string) => {
    setTaskStates((prev) => ({
      ...prev,
      [nodeId]: {
        ...(prev[nodeId] || {}),
        [taskId]: !(prev[nodeId]?.[taskId] || false),
      },
    }));
    toast.success("Tarefa atualizada!");
  };

  const calculateOverallProgress = () => {
    let totalTasks = 0;
    let completedTasks = 0;

    const countTasks = (node: MindmapNodeType) => {
      if (node.tasks) {
        node.tasks.forEach((task) => {
          totalTasks++;
          if (taskStates[node.id]?.[task.id]) {
            completedTasks++;
          }
        });
      }
      if (node.children) {
        node.children.forEach(countTasks);
      }
    };

    countTasks(mindmapData);
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const calculateFilteredStats = () => {
    let totalTasks = 0;
    let completedTasks = 0;
    let pendingTasks = 0;

    const countTasks = (node: MindmapNodeType) => {
      if (node.tasks) {
        node.tasks.forEach((task) => {
          totalTasks++;
          if (taskStates[node.id]?.[task.id]) {
            completedTasks++;
          } else {
            pendingTasks++;
          }
        });
      }
      if (node.children) {
        node.children.forEach(countTasks);
      }
    };

    countTasks(mindmapData);
    return { totalTasks, completedTasks, pendingTasks };
  };

  const handleReset = () => {
    if (confirm("Tem certeza que deseja resetar todo o progresso?")) {
      setTaskStates({});
      setExpandedNodes({ root: true });
      localStorage.removeItem("mindmap-state");
      toast.success("Progresso resetado!");
    }
  };

  const handleExport = () => {
    const state = {
      expanded: expandedNodes,
      tasks: taskStates,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(state, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `mindmap-funil-lancamento-${new Date().toISOString().split("T")[0]}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    toast.success("Progresso exportado!");
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: "Mapa Mental - Funil de Lançamento",
        text: "Acompanhe o progresso do seu funil de lançamento",
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  const overallProgress = calculateOverallProgress();
  const stats = calculateFilteredStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">🎯</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mapa Mental</h1>
                <p className="text-sm text-gray-600">Funil de Lançamento</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-500 ease-out rounded-full shadow-lg"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 min-w-fit">{overallProgress}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterType={filterType}
            onFilterChange={setFilterType}
          />
        </div>

        {/* Stats Cards */}
        {(searchTerm || filterType !== "all") && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">📋 Total</div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalTasks}</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">✅ Concluídas</div>
              <div className="text-2xl font-bold text-green-600">{stats.completedTasks}</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">⏳ Pendentes</div>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingTasks}</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </Button>
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <RefreshCw className="w-4 h-4" />
            Resetar
          </Button>
        </div>

        {/* Mindmap */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {searchTerm || filterType !== "all" ? (
            <MindmapNodeFiltered
              node={dataWithState}
              level={0}
              onTaskToggle={handleTaskToggle}
              expanded={expandedNodes}
              onExpandToggle={handleExpandToggle}
              searchTerm={searchTerm}
              filterType={filterType}
            />
          ) : (
            <MindmapNode
              node={dataWithState}
              level={0}
              onTaskToggle={handleTaskToggle}
              expanded={expandedNodes}
              onExpandToggle={handleExpandToggle}
            />
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-8 space-y-4">
          {searchTerm && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">🔍 Resultados da Pesquisa</h3>
              <p className="text-sm text-gray-700">
                Mostrando tarefas que correspondem a <span className="font-semibold">"{searchTerm}"</span>. Use os filtros para refinar ainda mais os resultados.
              </p>
            </div>
          )}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">💡 Dica</h3>
            <p className="text-sm text-gray-700">
              Seu progresso é salvo automaticamente no navegador. Compartilhe o link com sua equipe para que todos possam acompanhar o avanço do funil de lançamento em tempo real.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
