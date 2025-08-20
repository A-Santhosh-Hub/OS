"use client";
import { useState } from 'react';
import { Folder, File, Music, Image as ImageIcon, Video } from 'lucide-react';

const fileSystem = {
  'Documents': {
    'Resume.pdf': 'file',
    'Project Proposal.docx': 'file',
    'Meeting Notes': {
      'Q1.txt': 'file',
      'Q2.txt': 'file',
    }
  },
  'Music': {
    'Ambient_Dreams.mp3': 'music',
    'Cyberpunk_Beat.wav': 'music',
  },
  'Pictures': {
    'Vacation': {
      'beach.jpg': 'image',
      'mountains.png': 'image',
    },
    'logo.svg': 'image',
  },
  'Videos': {
    'tutorial.mp4': 'video',
    'presentation.mov': 'video',
  },
  'system32': 'folder' // for the memes
};

type FileSystemNode = { [key: string]: 'file' | 'folder' | 'music' | 'image' | 'video' | FileSystemNode };
type FileSystem = typeof fileSystem;

const FileExplorerApp = () => {
  const [path, setPath] = useState<string[]>([]);
  
  const navigateTo = (folder: string) => {
    setPath([...path, folder]);
  };

  const navigateUp = () => {
    setPath(path.slice(0, -1));
  };

  const getCurrentNode = () => {
    let currentNode: FileSystemNode = fileSystem;
    for (const part of path) {
      const nextNode = currentNode[part];
      if (typeof nextNode === 'object' && nextNode !== null) {
          currentNode = nextNode as FileSystemNode;
      } else {
        // Path is invalid, reset
        setPath([]);
        return fileSystem;
      }
    }
    return currentNode;
  };
  
  const currentNode = getCurrentNode();

  const getIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder className="w-6 h-6 text-primary" />;
      case 'file': return <File className="w-6 h-6 text-muted-foreground" />;
      case 'music': return <Music className="w-6 h-6 text-muted-foreground" />;
      case 'image': return <ImageIcon className="w-6 h-6 text-muted-foreground" />;
      case 'video': return <Video className="w-6 h-6 text-muted-foreground" />;
      default: return <Folder className="w-6 h-6 text-primary" />;
    }
  }

  return (
    <div className="w-full h-full bg-background flex flex-col p-1 text-sm">
      <div className="path-bar p-2 bg-muted rounded-md mb-2 flex items-center">
        <Button variant="ghost" size="sm" onClick={navigateUp} disabled={path.length === 0}>
          ..
        </Button>
        <span className="ml-2 text-muted-foreground">/</span>
        {path.map((part, index) => (
          <span key={index}>{part}/</span>
        ))}
      </div>
      <div className="file-grid grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 p-2 overflow-y-auto">
        {Object.entries(currentNode).map(([name, type]) => (
          <div
            key={name}
            className={`flex flex-col items-center justify-center p-2 rounded-md text-center hover:bg-accent/50 ${typeof type === 'object' ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => typeof type === 'object' && navigateTo(name)}
            onDoubleClick={() => typeof type === 'object' && navigateTo(name)}
          >
            {getIcon(typeof type === 'object' ? 'folder' : type)}
            <span className="mt-1 break-all text-xs">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorerApp;
