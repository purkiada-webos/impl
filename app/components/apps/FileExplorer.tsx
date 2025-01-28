'use client';

import { useEffect, useState } from 'react';

interface FileSystemNode {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: { [key: string]: FileSystemNode };
}

export default function FileExplorer() {
  const [fileSystem, setFileSystem] = useState<FileSystemNode | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>(["root", "home", "user"]);

  useEffect(() => {
    const storedFS = localStorage.getItem('FileSystem');
    if (storedFS) {
      setFileSystem(JSON.parse(storedFS));
    }
  }, []);

  // Listen for filesystem changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedFS = localStorage.getItem('FileSystem');
      if (storedFS) {
        setFileSystem(JSON.parse(storedFS));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getCurrentDirectory = (): FileSystemNode | null => {
    if (!fileSystem) return null;
    
    let current = fileSystem;
    for (const dir of currentPath.slice(1)) {
      if (current.children && current.children[dir]) {
        current = current.children[dir];
      } else {
        return null;
      }
    }
    return current;
  };

  const handleNavigate = (name: string, type: string) => {
    if (type === 'directory') {
      if (name === '..') {
        // Go up one directory
        if (currentPath.length > 1) {
          setCurrentPath(prev => prev.slice(0, -1));
        }
      } else {
        // Go into directory
        setCurrentPath(prev => [...prev, name]);
      }
    }
  };

  const renderContents = () => {
    const currentDir = getCurrentDirectory();
    if (!currentDir || !currentDir.children) return null;

    return (
      <>
        {/* Add back button if not in root */}
        {currentPath.length > 1 && (
          <div 
            key=".." 
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer"
            onClick={() => handleNavigate('..', 'directory')}
          >
            <span className="text-accent-500">📁</span>
            <span>..</span>
          </div>
        )}
        {Object.entries(currentDir.children).map(([name, node]) => (
          <div 
            key={name} 
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer"
            onClick={() => handleNavigate(name, node.type)}
          >
            <span className="text-accent-500">
              {node.type === 'directory' ? '📁' : '📄'}
            </span>
            <span>{name}</span>
            {node.type === 'file' && node.content && (
              <span className="ml-auto text-xs text-gray-500">
                {node.content.length} bytes
              </span>
            )}
          </div>
        ))}
      </>
    );
  };

  if (!fileSystem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-2 border-b dark:border-gray-800">
        <span className="text-sm text-gray-500">
          /{currentPath.join('/')}
        </span>
      </div>
      <div className="flex-1 overflow-auto">
        {renderContents()}
      </div>
    </div>
  );
} 