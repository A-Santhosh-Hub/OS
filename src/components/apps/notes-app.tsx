"use client";

import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/use-local-storage";

const NotesApp = () => {
  const [notes, setNotes] = useLocalStorage('aetheros-notes', 'Welcome to AetherOS Notes!\n\nYour notes are saved automatically.');
  
  return (
    <div className="w-full h-full bg-background">
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full h-full resize-none border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Start typing..."
      />
    </div>
  );
};

export default NotesApp;
