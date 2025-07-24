import { Dashboard } from "@/types/dashboards";
import { Pencil, Trash2 } from "lucide-react";

interface DashboardListItemProps {
  dashboard: Dashboard;
  isDragging: boolean;
  onClick: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DashboardListItem({
  dashboard,
  isDragging,
  onClick,
  onEdit,
  onDelete,
}: DashboardListItemProps) {
  return (
    <div
      className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={() => !isDragging && onClick(dashboard.id)}
    >
      <div className="flex flex-col h-full justify-between">
        <span className="text-xl font-medium mb-4 group-hover:text-primary-color">
          {dashboard.name}
        </span>
        <div className="flex justify-end gap-2 mt-auto">
          <button
            aria-label={`Edit dashboard ${dashboard.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(dashboard.id);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-edit-color rounded hover:bg-edit-hover-color transition"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(dashboard.id);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-error-color rounded hover:bg-error-color-hover transition"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
