'use client';

import { useState, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import Terminal from '@/app/components/apps/Terminal';
import FileExplorer from '@/app/components/apps/FileExplorer';
import Settings from '@/app/components/apps/Settings';
import Notes from '@/app/components/apps/Notes';
import Calculator from '@/app/components/apps/Calculator';
import { useTheme } from '@/app/contexts/ThemeContext';
import Guide from '@/app/components/apps/Guide';

interface Window {
  id: number;
  title: string;
  content: JSX.Element;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isResizing: boolean;
  resizeDirection: string | null;
}

interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  windowId: number | null;
}

interface IconPosition {
  id: number;
  x: number;
  y: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindow, setActiveWindow] = useState<number | null>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    windowId: null,
  });
  const [iconPositions, setIconPositions] = useState<IconPosition[]>([]);
  const [draggedIcon, setDraggedIcon] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const { accentColor } = useTheme();

  const GRID_SIZE = 96; // 24px * 4 (icon size)
  const GRID_GAP = 12; // 3px * 4 (gap size)

  const apps = [
    { id: 1, title: 'Terminal', icon: '🖥️', component: Terminal },
    { id: 2, title: 'Files', icon: '📁', component: FileExplorer },
    { id: 3, title: 'Settings', icon: '⚙️', component: Settings },
    { id: 4, title: 'Notes', icon: '📝', component: Notes },
    { id: 5, title: 'Calculator', icon: '🧮', component: Calculator },
    { id: 6, title: 'Guide', icon: '📖', component: Guide },
  ];

  useEffect(() => {
    const positionIcons = () => {
      setIconPositions(apps.map((app, index) => {
        const col = index % 3;  // 3 icons per row
        const row = Math.floor(index / 3);
        return {
          id: app.id,
          x: col * (GRID_SIZE + GRID_GAP) + 24,
          y: row * (GRID_SIZE + GRID_GAP) + 24,
        };
      }));
    };

    // Position icons initially
    positionIcons();

    // Reposition on window resize
    window.addEventListener('resize', positionIcons);
    return () => window.removeEventListener('resize', positionIcons);
  }, []);

  const createWindow = (title: string, Component: () => JSX.Element) => {
    const newWindow: Window = {
      id: Date.now(),
      title,
      content: <Component />,
      position: { x: windows.length * 30, y: windows.length * 30 },
      size: { width: 700, height: 500 },
      isMinimized: false,
      isResizing: false,
      resizeDirection: null
    };
    setWindows([...windows, newWindow]);
    setActiveWindow(newWindow.id);
  };

  const closeWindow = (id: number) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const minimizeWindow = (id: number) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const handleMouseDown = (e: ReactMouseEvent, windowId: number) => {
    const target = e.target as HTMLElement;
    if (target.closest('.window-controls')) return;

    setDragState({
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      windowId,
    });
    setActiveWindow(windowId);
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!dragState.isDragging || dragState.windowId === null) return;

    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;

    setWindows(windows.map(window => {
      if (window.id === dragState.windowId) {
        return {
          ...window,
          position: {
            x: window.position.x + deltaX,
            y: window.position.y + deltaY,
          },
        };
      }
      return window;
    }));

    setDragState({
      ...dragState,
      startX: e.clientX,
      startY: e.clientY,
    });
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      startX: 0,
      startY: 0,
      windowId: null,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIcon !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const rawX = e.clientX - rect.left - dragOffset.x;
      const rawY = e.clientY - rect.top - dragOffset.y;
      
      // Snap to grid
      const snappedX = Math.round(rawX / (GRID_SIZE + GRID_GAP)) * (GRID_SIZE + GRID_GAP) + 24;
      const snappedY = Math.round(rawY / (GRID_SIZE + GRID_GAP)) * (GRID_SIZE + GRID_GAP) + 24;
      
      // Update icon position with snapped coordinates
      setIconPositions(prev => prev.map(pos => 
        pos.id === draggedIcon 
          ? { ...pos, x: Math.max(0, snappedX), y: Math.max(0, snappedY) }
          : pos
      ));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedIcon(null);
  };

  const handleIconDragStart = (e: React.DragEvent, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setDraggedIcon(id);
  };

  const handleResizeStart = (e: React.MouseEvent, windowId: number, direction: string) => {
    e.stopPropagation();
    setWindows(windows.map(w => 
      w.id === windowId ? { ...w, isResizing: true, resizeDirection: direction } : w
    ));
    setResizeStart({ x: e.clientX, y: e.clientY });
    setActiveWindow(windowId);
  };

  const handleResize = (e: globalThis.MouseEvent) => {
    const resizingWindow = windows.find(w => w.isResizing);
    if (!resizingWindow) return;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    setWindows(windows.map(window => {
      if (window.id === resizingWindow.id) {
        let newWidth = window.size.width;
        let newHeight = window.size.height;
        let newX = window.position.x;
        let newY = window.position.y;

        switch (window.resizeDirection) {
          case 'e':
            newWidth = Math.max(200, window.size.width + deltaX);
            break;
          case 's':
            newHeight = Math.max(100, window.size.height + deltaY);
            break;
          case 'se':
            newWidth = Math.max(200, window.size.width + deltaX);
            newHeight = Math.max(100, window.size.height + deltaY);
            break;
          case 'w':
            newWidth = Math.max(200, window.size.width - deltaX);
            newX = window.position.x + deltaX;
            break;
          case 'n':
            newHeight = Math.max(100, window.size.height - deltaY);
            newY = window.position.y + deltaY;
            break;
        }

        return {
          ...window,
          size: { width: newWidth, height: newHeight },
          position: { x: newX, y: newY }
        };
      }
      return window;
    }));

    setResizeStart({ x: e.clientX, y: e.clientY });
  };

  const handleResizeEnd = () => {
    setWindows(windows.map(w => 
      w.isResizing ? { ...w, isResizing: false, resizeDirection: null } : w
    ));
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      if (dragState.isDragging) {
        handleMouseMove(e);
      }
      if (windows.some(w => w.isResizing)) {
        handleResize(e);
      }
    };

    const handleGlobalMouseUp = () => {
      handleMouseUp();
      handleResizeEnd();
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [dragState, windows]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Desktop Icons Layer - Lower z-index */}
      <div 
        className="absolute inset-0 p-6 z-0"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {apps.map((app) => {
          const position = iconPositions.find(p => p.id === app.id) || { x: 0, y: 0 };
          return (
            <button
              key={app.id}
              draggable
              onDragStart={(e) => handleIconDragStart(e, app.id)}
              onDragEnd={() => setDraggedIcon(null)}
              onClick={() => createWindow(app.title, app.component)}
              className={`
                absolute flex flex-col items-center gap-2 p-3 rounded-lg 
                hover:bg-white/10 transition-colors group
                w-24 h-24 cursor-pointer
                ${draggedIcon === app.id ? 'opacity-50' : ''}
              `}
              style={{
                left: position.x,
                top: position.y,
              }}
            >
              <span className="text-3xl filter drop-shadow-lg select-none">{app.icon}</span>
              <span className="text-xs text-white font-medium px-2 py-1 rounded bg-black/50 backdrop-blur-sm group-hover:bg-black/70 transition-colors shadow-lg w-full text-center truncate select-none">
                {app.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Windows Layer - Higher z-index */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {windows.map((window) => !window.isMinimized && (
          <div
            key={window.id}
            className={`
              absolute backdrop-blur-sm rounded-lg shadow-lg pointer-events-auto
              ${window.isResizing ? 'select-none' : ''}
              bg-white/80 dark:bg-gray-800/80
              overflow-hidden
            `}
            style={{
              left: window.position.x,
              top: window.position.y,
              width: window.size.width,
              height: window.size.height,
              zIndex: activeWindow === window.id ? 11 : 10,
            }}
            onClick={() => setActiveWindow(window.id)}
          >
            <div 
              className={`
                flex justify-between items-center p-2 
                bg-gray-100/80 dark:bg-gray-900/80 
                backdrop-blur-sm
                border-b border-gray-200 dark:border-gray-700 
                text-gray-800 dark:text-white
                cursor-move
              `}
              onMouseDown={(e) => handleMouseDown(e, window.id)}
            >
              <div className="flex items-center gap-2 px-2 select-none">
                <span className="text-lg">
                  {apps.find(app => app.title === window.title)?.icon}
                </span>
                <h3 className="font-semibold">{window.title}</h3>
              </div>
              <div className="flex gap-2 window-controls">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    minimizeWindow(window.id);
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  {window.isMinimized ? '□' : '−'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(window.id);
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>
            {!window.isMinimized && (
              <div className="p-4 h-[calc(100%-2.5rem)] overflow-auto bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100">
                {window.content}
              </div>
            )}

            {/* Resize handles */}
            <div 
              className="absolute top-0 left-0 w-2 h-full cursor-w-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'w')}
            />
            <div 
              className="absolute top-0 right-0 w-2 h-full cursor-e-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'e')}
            />
            <div 
              className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 's')}
            />
            <div 
              className="absolute top-0 left-0 w-full h-2 cursor-n-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'n')}
            />
            <div 
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
              onMouseDown={(e) => handleResizeStart(e, window.id, 'se')}
            />
          </div>
        ))}
      </div>

      {/* Minimized Windows Bar - Highest z-index */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 z-20">
        {windows.map((window) => window.isMinimized && (
          <button
            key={window.id}
            onClick={() => minimizeWindow(window.id)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md 
              text-white hover:bg-white/20 transition-colors
              bg-black/20 dark:bg-black/40 backdrop-blur-sm
              border border-white/10 dark:border-white/5
              shadow-lg"
          >
            <span className="text-xl">
              {apps.find(app => app.title === window.title)?.icon}
            </span>
            <span className="text-sm font-medium">
              {window.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 