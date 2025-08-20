"use client";

import { createContext, useContext, useState, ReactNode, useRef, useCallback } from 'react';
import type { AppConfig } from '@/lib/apps.config';
import { APPS_CONFIG } from '@/lib/apps.config';

export interface WindowState {
  id: string;
  appId: string;
  component: React.ComponentType;
  zIndex: number;
  isMinimized: boolean;
  isFocused: boolean;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
}

interface WindowManagerContextType {
  windows: WindowState[];
  openWindow: (appId: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
};

export const WindowManagerProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const lastZIndex = useRef(10);
  const windowIdCounter = useRef(0);

  const openWindow = useCallback((appId: string) => {
    // Check if a window for this app is already open
    const existingWindow = windows.find(win => win.appId === appId);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        toggleMinimize(existingWindow.id);
      } else {
        focusWindow(existingWindow.id);
      }
      return;
    }

    const appConfig = APPS_CONFIG.find(app => app.id === appId);
    if (!appConfig) return;

    const newZIndex = lastZIndex.current + 1;
    lastZIndex.current = newZIndex;

    const newWindow: WindowState = {
      id: `win-${windowIdCounter.current++}`,
      appId: appConfig.id,
      component: appConfig.component,
      zIndex: newZIndex,
      isMinimized: false,
      isFocused: true,
      initialPosition: { x: Math.random() * 200 + 100, y: Math.random() * 100 + 50 },
      initialSize: appConfig.initialSize || { width: 640, height: 480 },
    };

    setWindows(prev =>
      prev.map(win => ({ ...win, isFocused: false })).concat(newWindow)
    );
  }, [windows]);

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(win => win.id !== id));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => {
      const isAlreadyFocused = prev.find(win => win.id === id)?.isFocused;
      if (isAlreadyFocused) return prev;

      const newZIndex = lastZIndex.current + 1;
      lastZIndex.current = newZIndex;

      return prev.map(win => ({
        ...win,
        zIndex: win.id === id ? newZIndex : win.zIndex,
        isFocused: win.id === id,
      }));
    });
  };
  
  const toggleMinimize = (id: string) => {
    setWindows(prev => {
      const windowToMinimize = prev.find(win => win.id === id);
      if (!windowToMinimize) return prev;
      
      const shouldMinimize = !windowToMinimize.isMinimized;

      if (!shouldMinimize) { // if un-minimizing
         const newZIndex = lastZIndex.current + 1;
         lastZIndex.current = newZIndex;

         return prev.map(win => ({
           ...win,
           isMinimized: win.id === id ? false : win.isMinimized,
           zIndex: win.id === id ? newZIndex : win.zIndex,
           isFocused: win.id === id,
         }));
      } else { // if minimizing
        return prev.map(win => ({
          ...win,
          isMinimized: win.id === id ? true : win.isMinimized,
          isFocused: win.id === id ? false : win.isFocused
        }))
      }
    });
  };

  const value = { windows, openWindow, closeWindow, focusWindow, toggleMinimize };

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
};
