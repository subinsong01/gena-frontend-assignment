"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
} from "@hello-pangea/dnd";

interface DragAndDropProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isDragging: boolean) => React.ReactNode;
  onDragEnd: (items: T[]) => void;
  getId: (item: T) => string;
}

export default function DragAndDrop<T>({
  items,
  renderItem,
  onDragEnd,
  getId,
}: DragAndDropProps<T>) {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (start: DragStart) => {
    setDraggingId(start.draggableId);
  };

  const handleDragEnd = (result: DropResult) => {
    setDraggingId(null);

    if (!result.destination) return;

    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    onDragEnd(newItems);
  };

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {items.map((item, index) => (
              <Draggable
                key={getId(item)}
                draggableId={getId(item)}
                index={index}
              >
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={
                      snapshot.isDragging
                        ? "bg-information-color rounded-xl shadow-md"
                        : ""
                    }
                  >
                    {renderItem(item, index, draggingId === getId(item))}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
