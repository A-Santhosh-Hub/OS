import {
  Notebook,
  Calculator,
  Search,
  Folder,
  Globe,
  Settings,
  UserCircle,
  Youtube,
  PlayCircle,
  type LucideIcon,
} from 'lucide-react';

import NotesApp from '@/components/apps/notes-app';
import CalculatorApp from '@/components/apps/calculator-app';
import FileExplorerApp from '@/components/apps/file-explorer-app';
import MediaPlayerApp from '@/components/apps/media-player-app';
import IframeApp from '@/components/apps/iframe-app';
import SettingsApp from '@/components/apps/settings-app';

export interface AppConfig {
  id: string;
  name: string;
  icon: LucideIcon;
  component: React.ComponentType<any>;
  initialSize?: { width: number; height: number };
}

export const APPS_CONFIG: AppConfig[] = [
  {
    id: 'notes',
    name: 'Notes',
    icon: Notebook,
    component: NotesApp,
    initialSize: { width: 500, height: 600 },
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: Calculator,
    component: CalculatorApp,
    initialSize: { width: 350, height: 500 },
  },
  {
    id: 'google',
    name: 'Google',
    icon: Search,
    component: () => <IframeApp initialUrl="https://www.google.com/search?igu=1" />,
    initialSize: { width: 800, height: 600 },
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    component: () => <IframeApp initialUrl="https://www.youtube.com/embed" />,
    initialSize: { width: 900, height: 650 },
  },
  {
    id: 'portfolio',
    name: 'My Portfolio',
    icon: UserCircle,
    component: () => <IframeApp initialUrl="https://a-santhosh-hub.github.io/in/" />,
    initialSize: { width: 800, height: 600 },
  },
  {
    id: 'file-explorer',
    name: 'File Explorer',
    icon: Folder,
    component: FileExplorerApp,
    initialSize: { width: 700, height: 500 },
  },
  {
    id: 'browser',
    name: 'Browser',
    icon: Globe,
    component: () => <IframeApp initialUrl="https://www.google.com/search?igu=1" showAddressBar />,
    initialSize: { width: 1024, height: 768 },
  },
  {
    id: 'media-player',
    name: 'Media Player',
    icon: PlayCircle,
    component: MediaPlayerApp,
    initialSize: { width: 400, height: 600 },
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    component: SettingsApp, // This is a special case handled in aether-os.tsx
    initialSize: { width: 500, height: 550 },
  },
];
