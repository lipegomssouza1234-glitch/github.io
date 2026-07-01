import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type FilterType = "all" | "pending" | "completed";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterType: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
}: FilterBarProps) {
  const filters: { type: FilterType; label: string; icon: string }[] = [
    { type: "all", label: "Todas", icon: "📋" },
    { type: "pending", label: "Pendentes", icon: "⏳" },
    { type: "completed", label: "Concluídas", icon: "✅" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Pesquisar tarefas, etapas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.type}
            onClick={() => onFilterChange(filter.type)}
            variant={filterType === filter.type ? "default" : "outline"}
            size="sm"
            className={cn(
              "gap-2 transition-all",
              filterType === filter.type &&
                "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-md"
            )}
          >
            <span>{filter.icon}</span>
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="text-sm text-gray-600 bg-blue-50 rounded-lg p-3 border border-blue-200">
          🔍 Pesquisando por: <span className="font-semibold text-gray-900">"{searchTerm}"</span>
        </div>
      )}
    </div>
  );
}
