'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationContextType {
  showNotification: (message: string, type?: 'success' | 'error' | 'info', persistent?: boolean) => void;
  closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
  closeNotification: () => {},
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
    persistent: boolean;
  }>({
    message: '',
    type: 'info',
    visible: false,
    persistent: false,
  });

  const showNotification = (
    message: string, 
    type: 'success' | 'error' | 'info' = 'info',
    persistent: boolean = false
  ) => {
    setNotification({ message, type, visible: true, persistent });
    if (!persistent) {
      setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, 3000);
    }
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, visible: false }));
  };

  const getIcon = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '!';
      case 'info':
        return 'i';
      default:
        return 'i';
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification, closeNotification }}>
      {children}
      {/* Notification Popup */}
      {notification.visible && (
        <div className="fixed top-[calc(4rem+1rem)] right-4 z-50 animate-fade-in">
          <div className={`
            flex items-start gap-3 p-3 rounded-lg shadow-lg
            bg-gray-800/95 dark:bg-gray-900/95 backdrop-blur-sm
            border border-gray-700/50
            text-white min-w-[300px] max-w-[400px]
            relative
          `}>
            <div className={`
              w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
              ${notification.type === 'success' ? 'bg-green-500' : ''}
              ${notification.type === 'error' ? 'bg-red-500' : ''}
              ${notification.type === 'info' ? 'bg-blue-500' : ''}
            `}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 pt-0.5 pr-6">
              <div className="text-sm font-medium">
                {notification.type === 'success' && 'Success'}
                {notification.type === 'error' && 'Error'}
                {notification.type === 'info' && 'Information'}
              </div>
              <div className="text-sm text-gray-300 mt-0.5">
                {notification.message}
              </div>
            </div>
            {notification.persistent && (
              <button 
                onClick={closeNotification}
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext); 