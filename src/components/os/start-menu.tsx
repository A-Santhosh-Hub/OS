"use client";

import type { AppConfig } from "@/lib/apps.config";
import { useWindowManager } from "@/contexts/window-manager";
import { Button } from "../ui/button";

interface StartMenuProps {
  apps: AppConfig[];
  onClose: () => void;
}

const StartMenu = ({ apps, onClose }: StartMenuProps) => {
  const { openWindow } = useWindowManager();

  const handleAppClick = (appId: string) => {
    openWindow(appId);
    onClose();
  };

  return (
    <div className="absolute bottom-full mb-2 w-72 bg-background/80 backdrop-blur-lg rounded-lg shadow-2xl border border-white/10 overflow-hidden">
        <div className="p-4">
            <h3 className="font-bold text-lg">AetherOS</h3>
        </div>
        <div className="p-2 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 gap-1">
                {apps.map(app => (
                    <Button 
                        key={app.id} 
                        variant="ghost" 
                        className="flex justify-start items-center space-x-3 h-12"
                        onClick={() => handleAppClick(app.id)}
                    >
                        <app.icon className="w-6 h-6" />
                        <span>{app.name}</span>
                    </Button>
                ))}
            </div>
        </div>
    </div>
  );
};

export default StartMenu;
