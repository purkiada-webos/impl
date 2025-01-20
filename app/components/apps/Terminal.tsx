'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const { userId } = useAuth();
  const [currentPath, setCurrentPath] = useState('/root/home/user');
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize terminal output
    setOutput(['Welcome to PurkOS Terminal v1.0']);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      setOutput(prev => [...prev, `${currentPath}$ ${command}`]);
      
      // Process command
      if (command === 'clear') {
        setOutput([]);
      } else if (command.startsWith('cd ') || command === 'cd') {
        const path = command.slice(3).trim();
        const result = await window.fs.cd_command(path || null);
        setOutput(prev => [...prev, result]);
        setCurrentPath(`/${window.fs.currentDir.join('/')}`);
      } else if (command.startsWith('ls')) {
        const path = command.slice(2).trim();
        const result = await window.fs.ls_command(path || null);
        setOutput(prev => [...prev, result]);
      } else if (command === 'help') {
        setOutput(prev => [...prev, 'Available commands: help, clear, cd <path>, ls <path>']);
      } else if (command) {
        setOutput(prev => [...prev, `Command not found: ${command}`]);
      }

      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col font-mono p-2 overflow-hidden">
      <div 
        ref={outputRef}
        className="flex-1 overflow-y-auto whitespace-pre-wrap text-sm scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
      >
        {output.map((line, i) => (
          <div key={i} className="mb-1">
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-green-400">{currentPath}$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-transparent border-none outline-none focus:ring-0"
          spellCheck={false}
          autoFocus
        />
      </div>
    </div>
  );
}

// Add type declarations for the window object
declare global {
  interface Window {
    fs: {
      cd_command: (path: string | null) => string;
      ls_command: (path: string | null) => string;
      currentDir: string[];
    };
  }
} 