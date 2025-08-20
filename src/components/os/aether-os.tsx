"use client";

import { useEffect, useState } from 'react';
import { WindowManagerProvider, useWindowManager } from '@/contexts/window-manager';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { APPS_CONFIG } from '@/lib/apps.config';
import Window from './window';
import Taskbar from './taskbar';
import DesktopIcon from './desktop-icon';
import SettingsApp from '../apps/settings-app';

const wallpapers = [
  'https://placehold.co/1920x1080/333940/4780FF',
  'https://placehold.co/1920x1080/1a1a1a/24B3A3',
  'https://placehold.co/1920x1080/f0f0f0/333333',
  'https://placehold.co/1920x1080/5D3A9B/FFFFFF',
];

const DesktopContent = () => {
  const { windows } = useWindowManager();
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('aetheros-theme', 'dark');
  const [wallpaper, setWallpaper] = useLocalStorage('aetheros-wallpaper', wallpapers[0]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);
  
  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <main
      className="h-screen w-screen overflow-hidden bg-cover bg-center font-body"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="h-full w-full backdrop-blur-sm bg-black/10">
        {/* Desktop Icons */}
        <div className="absolute top-0 left-0 p-4 grid grid-cols-1 gap-4">
          {APPS_CONFIG.map(app => <DesktopIcon key={app.id} app={app} />)}
        </div>

        {/* Windows */}
        {windows.map(win => {
          const App = win.appId === 'settings' 
            ? () => <SettingsApp theme={theme} setTheme={setTheme} wallpaper={wallpaper} setWallpaper={setWallpaper} />
            : win.component;
          
          return (
            <Window key={win.id} win={win}>
              <App />
            </Window>
          );
        })}

        <Taskbar />

        <footer className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 text-xs pointer-events-none">
          👉 Developed by SANTHOSH_A
        </footer>
      </div>
    </main>
  );
};


const AetherOS = () => {
  return (
    <WindowManagerProvider>
      <DesktopContent />
    </WindowManagerProvider>
  );
};

export default AetherOS;
