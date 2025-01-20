'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, createContext, useContext } from 'react';
import { getPoints } from '@/app/backend/PointsSystem';
import { getAllCategories, getAvailableHints, showHint, isHintSeen } from '@/app/backend/HintSystem';
import { useNotification } from '@/app/contexts/NotificationContext';
import { OSFileSystem } from '@/app/backend/terminal';

function Clock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setTime(timeString);
    }

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-sm font-medium">
      {time}
    </span>
  );
}

function HintMenu({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories] = useState(getAllCategories());
  const { showNotification } = useNotification();
  const { refreshPoints } = usePoints();

  const handleUnlock = async (e: React.MouseEvent, category: string, hintId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await showHint(userId, category, hintId);
    if (result.success) {
      showNotification('Hint unlocked successfully!', 'success');
      refreshPoints();
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleShow = (e: React.MouseEvent, hint: string) => {
    e.preventDefault();
    e.stopPropagation();
    showNotification(hint, 'info', true);
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      const closeMenu = () => setIsOpen(false);
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener('click', closeMenu);
    }
  }, [isOpen]);

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 text-sm font-medium hover:bg-white/10 px-3 py-1.5 rounded-md transition-colors"
      >
        <span className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-300">
          💡
        </span>
        <span>Hints</span>
      </button>

      {isOpen && (
        <div 
          className="fixed top-[4.5rem] right-4 w-80 bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-xl p-2"
          onClick={e => e.stopPropagation()}
        >
          {categories.map(category => (
            <div key={category} className="mb-2">
              <div className="text-xs text-gray-400 uppercase font-semibold px-2 py-1">
                {category}
              </div>
              {getAvailableHints(category).map(hint => {
                const seen = isHintSeen(userId, category, hint.id);
                return (
                  <div
                    key={hint.id}
                    className="px-3 py-2 rounded-md text-sm hover:bg-white/5"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>{seen ? '✓' : '🔒'}</span>
                      <span className="flex-1">
                        {hint.id.charAt(0).toUpperCase() + hint.id.slice(1)} Hint
                      </span>
                      {seen ? (
                        <button
                          type="button"
                          onClick={(e) => handleShow(e, hint.text)}
                          className="px-2 py-1 text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded transition-colors cursor-pointer select-none"
                        >
                          Show
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleUnlock(e, category, hint.id)}
                          className="px-2 py-1 text-xs bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded transition-colors flex items-center gap-1 cursor-pointer select-none"
                        >
                          <span>{hint.cost}★</span>
                          <span>Unlock</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PointsCounter({ userId }: { userId: string }) {
  const [points, setPoints] = useState<number>(0);
  const { refreshPoints } = usePoints();

  useEffect(() => {
    async function fetchPoints() {
      try {
        const currentPoints = await getPoints(userId);
        setPoints(currentPoints);
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    }

    fetchPoints();
    const interval = setInterval(fetchPoints, 5000);
    return () => clearInterval(interval);
  }, [userId, refreshPoints]);

  return (
    <div className="flex items-center gap-1.5 text-sm font-medium">
      <span className="w-5 h-5 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-300">
        ★
      </span>
      <span>{points}</span>
    </div>
  );
}

const PointsContext = createContext<{ refreshPoints: () => void }>({
  refreshPoints: () => {},
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, userId, logout } = useAuth();
  const { background } = useTheme();
  const router = useRouter();
  const [refreshCounter, setRefreshCounter] = useState(0);

  const refreshPoints = () => {
    setRefreshCounter(prev => prev + 1);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (typeof window !== 'undefined') {
    window.fs = new OSFileSystem();
  }

  return (
    <PointsContext.Provider value={{ refreshPoints }}>
      <div 
        className="min-h-screen bg-background relative overflow-hidden"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh', // Force full height
        }}
      >
        {/* Semi-transparent overlay - darker in dark mode */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/50" />
        
        {/* Content */}
        <div className="relative z-10">
          <nav className="bg-black/20 dark:bg-black/60 backdrop-blur-sm text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold">PurkOS</h1>
                <span className="text-sm">Welcome, {user}</span>
              </div>
              <div className="flex items-center gap-4">
                {userId && (
                  <>
                    <PointsCounter userId={userId} />
                    <HintMenu userId={userId} />
                  </>
                )}
                <Clock />
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
          <main className="container mx-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </PointsContext.Provider>
  );
}

function usePoints() {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsContext.Provider');
  }
  return context;
} 