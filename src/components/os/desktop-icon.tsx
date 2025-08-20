"use client";

import type { AppConfig } from "@/lib/apps.config";
import { useWindowManager } from "@/contexts/window-manager";

interface DesktopIconProps {
  app: AppConfig;
}

const DesktopIcon = ({ app }: DesktopIconProps) => {
  const { openWindow } = useWindowManager();
  const Icon = app.icon;

  return (
    <button
      className="flex flex-col items-center justify-center space-y-1 text-white p-2 rounded-lg hover:bg-white/10 w-24"
      onDoubleClick={() => openWindow(app.id)}
      onClick={() => openWindow(app.id)}
      aria-label={`Open ${app.name}`}
    >
      <Icon className="w-8 h-8" />
      <span className="text-xs text-center shadow-black [text-shadow:1px_1px_2px_var(--tw-shadow-color)]">{app.name}</span>
    </button>
  );
};

export default DesktopIcon;
