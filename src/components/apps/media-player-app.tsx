"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';

const tracks = [
  { title: "Ambient Dreams", artist: "AetherNet", duration: "3:45" },
  { title: "Cyberpunk Beat", artist: "Chrome Ryders", duration: "4:12" },
  { title: "Lofi Chill", artist: "StudyCat", duration: "2:58" },
];

const MediaPlayerApp = () => {
  return (
    <div className="w-full h-full bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">AetherPlayer</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
            <Music className="w-24 h-24 text-muted-foreground" />
          </div>
          <div className="text-center w-full">
            <p className="font-bold text-lg">Ambient Dreams</p>
            <p className="text-muted-foreground text-sm">AetherNet</p>
          </div>
          <div className="w-full my-4">
            <Slider defaultValue={[33]} max={100} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1:15</span>
              <span>3:45</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Button variant="ghost" size="icon">
              <SkipBack />
            </Button>
            <Button size="icon" className="w-16 h-16 rounded-full">
              <Play className="fill-primary-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward />
            </Button>
          </div>
          <div className="flex items-center w-full mt-4">
            <Volume2 className="mr-2" />
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaPlayerApp;
