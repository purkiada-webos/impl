'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Notes() {
  const [content, setContent] = useState('');
  const { userId } = useAuth();

  // Load notes from localStorage on component mount
  useEffect(() => {
    if (userId) {
      const savedNotes = localStorage.getItem(`notes-${userId}`);
      if (savedNotes) {
        setContent(savedNotes);
      }
    }
  }, [userId]);

  // Save notes to localStorage when content changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (userId) {
      localStorage.setItem(`notes-${userId}`, newContent);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <textarea 
        value={content}
        onChange={handleChange}
        className="w-full h-full p-2 rounded resize-none border-0 bg-transparent focus:ring-0"
        placeholder="Start typing your notes..."
      />
    </div>
  );
} 