"use client";

import { useState } from "react";
import { useWindowManager } from "@/contexts/window-manager";
import { APPS_CONFIG } from "@/lib/apps.config";
import Clock from "./clock";
import StartMenu from "./start-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const Taskbar = () => {
  const { windows, focusWindow, toggleMinimize } = useWindowManager();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const getAppConfig = (appId: string) => APPS_CONFIG.find(app => app.id === appId);

  return (
    <footer className="absolute bottom-0 left-0 right-0 h-12 bg-black/30 backdrop-blur-md flex items-center justify-between text-white border-t border-white/20">
      <div className="flex items-center h-full">
        {/* Start Button */}
        <Popover open={isStartMenuOpen} onOpenChange={setIsStartMenuOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-full rounded-none px-4 hover:bg-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" className="p-0 border-0 bg-transparent shadow-none mb-1">
             <StartMenu apps={APPS_CONFIG} onClose={() => setIsStartMenuOpen(false)} />
          </PopoverContent>
        </Popover>

        {/* Running Apps */}
        <div className="flex items-center h-full">
          {windows.map(win => {
            const app = getAppConfig(win.appId);
            if (!app) return null;
            const Icon = app.icon;
            
            return (
              <Button
                key={win.id}
                variant="ghost"
                className={`h-full rounded-none px-4 flex flex-col justify-center items-center group relative hover:bg-white/10 ${win.isFocused ? 'bg-white/20' : ''}`}
                onClick={() => { win.isMinimized ? toggleMinimize(win.id) : focusWindow(win.id) }}
              >
                <Icon className="w-6 h-6" />
                <div className={`absolute bottom-0 left-1 right-1 h-1 rounded-t-full ${win.isFocused ? 'bg-primary' : 'group-hover:bg-white/50'} ${win.isMinimized ? 'bg-accent' : ''}`} />
              </Button>
            );
          })}
        </div>
      </div>

      <Clock />
    </footer>
  );
};

export default Taskbar;
