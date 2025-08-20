"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

interface SettingsAppProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  wallpaper: string;
  setWallpaper: (wallpaperUrl: string) => void;
}

const wallpapers = [
  { id: 'w1', url: 'https://placehold.co/1920x1080/333940/4780FF', hint: 'blue abstract' },
  { id: 'w2', url: 'https://placehold.co/1920x1080/1a1a1a/24B3A3', hint: 'dark teal' },
  { id: 'w3', url: 'https://placehold.co/1920x1080/f0f0f0/333333', hint: 'light geometric' },
  { id: 'w4', url: 'https://placehold.co/1920x1080/5D3A9B/FFFFFF', hint: 'purple wave' },
];

const SettingsApp = ({ theme, setTheme, wallpaper, setWallpaper }: SettingsAppProps) => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Settings</h2>
      
      <div className="space-y-2">
        <h3 className="font-medium">Appearance</h3>
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <Label htmlFor="dark-mode-switch">Dark Mode</Label>
          <Switch
            id="dark-mode-switch"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Wallpaper</h3>
        <div className="grid grid-cols-2 gap-4">
          {wallpapers.map((wp) => (
            <button
              key={wp.id}
              className={`relative rounded-md overflow-hidden aspect-video transition-all ${wallpaper === wp.url ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:opacity-80'}`}
              onClick={() => setWallpaper(wp.url)}
            >
              <Image 
                src={wp.url}
                alt={`Wallpaper ${wp.id}`} 
                width={160}
                height={90}
                className="w-full h-full object-cover"
                data-ai-hint={wp.hint}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
