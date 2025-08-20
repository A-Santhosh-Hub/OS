"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface IframeAppProps {
  initialUrl: string;
  showAddressBar?: boolean;
}

const IframeApp = ({ initialUrl, showAddressBar = false }: IframeAppProps) => {
  const [url, setUrl] = useState(initialUrl);
  const [inputValue, setInputValue] = useState(initialUrl);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let finalUrl = inputValue;
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }
    setUrl(finalUrl);
  };
  
  return (
    <div className="w-full h-full flex flex-col bg-card">
      {showAddressBar && (
        <form onSubmit={handleSubmit} className="flex items-center p-1 border-b">
          <Globe className="w-4 h-4 mx-2 text-muted-foreground" />
          <Input 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            className="h-8 flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="https://example.com"
          />
          <Button type="submit" size="sm" className="ml-1 h-8">Go</Button>
        </form>
      )}
      <iframe
        src={url}
        className="w-full h-full border-0"
        title="Embedded Content"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
};

export default IframeApp;
