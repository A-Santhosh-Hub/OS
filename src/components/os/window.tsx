"use client";
import React, { useState, useRef, useEffect, useCallback, type MouseEvent as ReactMouseEvent } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Minus, Square } from 'lucide-react';
import type { WindowState } from '@/contexts/window-manager';
import { useWindowManager } from '@/contexts/window-manager';
import { APPS_CONFIG } from '@/lib/apps.config';
import { cn } from '@/lib/utils';

interface WindowProps {
  win: WindowState;
  children: React.ReactNode;
}

const Window = ({ win, children }: WindowProps) => {
  const { closeWindow, focusWindow, toggleMinimize } = useWindowManager();
  const appConfig = APPS_CONFIG.find(app => app.id === win.appId);

  const [position, setPosition] = useState(win.initialPosition);
  const [size, setSize] = useState(win.initialSize);
  const [isDragging, setIsDragging] = useState(false);

  const windowRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  const onDragMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    focusWindow(win.id);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { ...position };
    e.preventDefault();
  };

  const onDragMouseMove = useCallback((e: MouseEvent) => {
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    let newX = initialPos.current.x + dx;
    let newY = initialPos.current.y + dy;

    // Boundary checks
    const vw = window.innerWidth;
    const vh = window.innerHeight - 48; // account for taskbar
    newX = Math.max(-size.width + 100, Math.min(newX, vw - 100));
    newY = Math.max(0, Math.min(newY, vh - 50));

    setPosition({ x: newX, y: newY });
  }, [size.width]);

  const onDragMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onDragMouseMove);
      document.addEventListener('mouseup', onDragMouseUp);
    } else {
      document.removeEventListener('mousemove', onDragMouseMove);
      document.removeEventListener('mouseup', onDragMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', onDragMouseMove);
      document.removeEventListener('mouseup', onDragMouseUp);
    };
  }, [isDragging, onDragMouseMove, onDragMouseUp]);

  if (!appConfig) return null;
  const Icon = appConfig.icon;

  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute rounded-lg shadow-2xl transition-all duration-200",
        win.isMinimized ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      )}
      style={{
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        zIndex: win.zIndex,
      }}
      onMouseDownCapture={() => focusWindow(win.id)}
    >
      <Card className="w-full h-full flex flex-col bg-card/80 backdrop-blur-xl resize overflow-hidden">
        <CardHeader
          className="flex flex-row items-center justify-between p-1 pl-2 border-b cursor-grab active:cursor-grabbing"
          onMouseDown={onDragMouseDown}
        >
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium select-none">{appConfig.name}</span>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleMinimize(win.id)}>
              <Minus className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" disabled>
              <Square className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive" onClick={() => closeWindow(win.id)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow relative">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default Window;
