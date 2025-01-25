'use client';

import { useTheme } from '@/app/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useNotification } from '@/app/contexts/NotificationContext';
import { addPoints, setPoints, subtractPoints } from '@/app/backend/PointsSystem';
import { unlockHint } from '@/app/backend/HintSystem';
import { completeTask } from '@/app/backend/TaskSystem';

const DEBUG_MODE = process.env.NODE_ENV === 'development';

const backgrounds = [
  { name: 'Mountains', path: '/wallpapers/mountains.jpg' },
  { name: 'Abstract', path: '/wallpapers/default.jpg' },
  { name: 'Forest', path: '/wallpapers/forest.jpg' },
  { name: 'Desert', path: '/wallpapers/desert.jpg' },
];

const accentColors = [
  { name: 'Blue', value: 'blue', preview: '#3B82F6' },
  { name: 'Purple', value: 'purple', preview: '#8B5CF6' },
  { name: 'Green', value: 'green', preview: '#22C55E' },
  { name: 'Orange', value: 'orange', preview: '#F97316' },
  { name: 'Pink', value: 'pink', preview: '#EC4899' },
];

type Category = {
  id: string;
  name: string;
  icon: string;
  component: () => JSX.Element;
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState('appearance');

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-48 border-r border-gray-200 dark:border-gray-700 p-4 space-y-2">
        <button
          onClick={() => setActiveTab('appearance')}
          className={`w-full text-left px-3 py-2 rounded ${
            activeTab === 'appearance' ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          Appearance
        </button>
        <button
          onClick={() => setActiveTab('network')}
          className={`w-full text-left px-3 py-2 rounded ${
            activeTab === 'network' ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          Network
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`w-full text-left px-3 py-2 rounded ${
            activeTab === 'privacy' ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          Privacy
        </button>
        {DEBUG_MODE && (
          <button
            onClick={() => setActiveTab('debug')}
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === 'debug' ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
          >
            Debug
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeTab === 'appearance' && <Appearance />}
        {activeTab === 'network' && <Network />}
        {activeTab === 'privacy' && <Privacy />}
        {DEBUG_MODE && activeTab === 'debug' && <DebugSection />}
      </div>
    </div>
  );
}

function Appearance() {
  const { isDarkMode, toggleDarkMode, background, setBackground, accentColor, setAccentColor } = useTheme();
  const { userId } = useAuth();
  const { showNotification } = useNotification();

  const handleModeChange = async () => {
    const modeChange = localStorage.getItem("ThemeChanged");

    if (modeChange === "0") {
      localStorage.setItem("ThemeChanged", "1");
      if (userId) {
        const newTotal = await addPoints(userId, 5);
        showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
        unlockHint(userId, 'customization', 'theme');
        completeTask(userId, "mode_changed");
      }
    }

    toggleDarkMode();
  };

  const handleAccentChange = async (accColor: string) => {
    const accentChange = localStorage.getItem("AccentChanged");

    if (accentChange === "0") {
      localStorage.setItem("AccentChanged", "1");
      if (userId) {
        const newTotal = await addPoints(userId, 5);
        showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
        unlockHint(userId, 'customization', 'accent');
      }
    }

    setAccentColor(accColor);
  };

  const handleBackgroundChange = async (bg: string) => {
    const backgroundChange = localStorage.getItem("BackgroundChanged");

    if (backgroundChange === "0") {
      localStorage.setItem("BackgroundChanged", "1");
      if (userId) {
        const newTotal = await addPoints(userId, 5);
        showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
        unlockHint(userId, 'customization', 'background');
      }
    }

    setBackground(bg);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Appearance Settings</h2>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <button 
            onClick={handleModeChange}
            className={`px-3 py-1 rounded text-white transition-colors bg-${accentColor}-500 hover:bg-${accentColor}-600`}
          >
            {isDarkMode ? 'Enabled' : 'Disabled'}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Accent Color</span>
          <div className="flex gap-2">
            {accentColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleAccentChange(color.value)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  accentColor === color.value 
                    ? `border-${accentColor}-500 scale-110` 
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: color.preview }}
                title={color.name}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Background</span>
          <select
            value={background}
            onChange={(e) => handleBackgroundChange(e.target.value)}
            className={`px-3 py-1 rounded bg-white dark:bg-gray-700 border border-${accentColor}-500`}
          >
            {backgrounds.map((bg) => (
              <option key={bg.path} value={bg.path}>
                {bg.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function Notifications() {
  const { accentColor } = useTheme();
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Notification Settings</h2>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Enable Notifications</span>
          <button className={`px-3 py-1 rounded text-white bg-${accentColor}-500 hover:bg-${accentColor}-600 transition-colors`}>
            Enable
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span>Sound</span>
          <button className={`px-3 py-1 rounded text-white bg-${accentColor}-500 hover:bg-${accentColor}-600 transition-colors`}>
            On
          </button>
        </div>
      </div>
    </div>
  );
}

function Privacy() {
  const { setBackground, setAccentColor, toggleDarkMode } = useTheme();
  const { logout } = useAuth();
  const { showNotification } = useNotification();

  const handleClearData = () => {
    // Save authentication and theme status
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const themeChanged = localStorage.getItem('ThemeChanged') || "0";
    const accentChanged = localStorage.getItem('AccentChanged') || "0";
    const backgroundChanged = localStorage.getItem('BackgroundChanged') || "0";
    
    // Clear all data
    localStorage.clear();
    
    // Restore saved settings
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', isAuthenticated);
      localStorage.setItem('userId', userId!);
      localStorage.setItem('username', username!);
    }
    localStorage.setItem('ThemeChanged', themeChanged);
    localStorage.setItem('AccentChanged', accentChanged);
    localStorage.setItem('BackgroundChanged', backgroundChanged);

    // Reset settings to defaults
    setBackground('/wallpapers/mountains.jpg');
    setAccentColor('blue');
    if (document.documentElement.classList.contains('dark')) {
      toggleDarkMode();
    }

    // Reset network settings
    localStorage.setItem('network_ethernet', JSON.stringify(true));
    localStorage.setItem('network_ip', '192.168.1.100');
    localStorage.setItem('network_subnet', '255.255.255.0');
    localStorage.setItem('network_gateway', '192.168.1.1');
    localStorage.setItem('network_dns', '8.8.8.8');

    showNotification('All data has been cleared', 'success');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Privacy Settings</h2>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Analytics</span>
          <button className="px-3 py-1 rounded bg-blue-500 text-white">Opt Out</button>
        </div>
        <div className="flex items-center justify-between">
          <span>Clear Data</span>
          <button 
            onClick={handleClearData}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

function Network() {
  const { showNotification } = useNotification();
  const { accentColor } = useTheme();
  
  // Initialize state from localStorage or use defaults
  const [ethernetEnabled, setEthernetEnabled] = useState(() => {
    const saved = localStorage.getItem('network_ethernet');
    return saved ? JSON.parse(saved) : true;
  });
  
  const [ipAddress, setIpAddress] = useState(() => {
    return localStorage.getItem('network_ip') || '192.168.1.100';
  });
  
  const [subnet, setSubnet] = useState(() => {
    return localStorage.getItem('network_subnet') || '255.255.255.0';
  });
  
  const [gateway, setGateway] = useState(() => {
    return localStorage.getItem('network_gateway') || '192.168.1.1';
  });
  
  const [dns, setDns] = useState(() => {
    return localStorage.getItem('network_dns') || '8.8.8.8';
  });

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('network_ethernet', JSON.stringify(ethernetEnabled));
  }, [ethernetEnabled]);

  useEffect(() => {
    localStorage.setItem('network_ip', ipAddress);
  }, [ipAddress]);

  useEffect(() => {
    localStorage.setItem('network_subnet', subnet);
  }, [subnet]);

  useEffect(() => {
    localStorage.setItem('network_gateway', gateway);
  }, [gateway]);

  useEffect(() => {
    localStorage.setItem('network_dns', dns);
  }, [dns]);

  // Reset to defaults
  const handleReset = () => {
    setEthernetEnabled(true);
    setIpAddress('192.168.1.100');
    setSubnet('255.255.255.0');
    setGateway('192.168.1.1');
    setDns('8.8.8.8');
    showNotification('Network settings reset to defaults', 'info');
  };

  // Apply changes (in a real app, this would apply network settings)
  const handleApply = () => {
    // Show a persistent notification that requires manual closing
    showNotification('Applying network settings...', 'info', true);
    
    // Simulate network configuration
    setTimeout(() => {
      showNotification('Network settings applied successfully', 'success');
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Network Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Ethernet</span>
          <button 
            onClick={() => setEthernetEnabled(!ethernetEnabled)}
            className={`px-3 py-1 rounded text-white transition-colors ${
              ethernetEnabled ? `bg-${accentColor}-500` : 'bg-gray-500'
            }`}
          >
            {ethernetEnabled ? 'Connected' : 'Disconnected'}
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="w-24">IP Address</span>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              className="flex-1 px-3 py-1 rounded border bg-transparent"
              placeholder="192.168.1.100"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-24">Subnet</span>
            <input
              type="text"
              value={subnet}
              onChange={(e) => setSubnet(e.target.value)}
              className="flex-1 px-3 py-1 rounded border bg-transparent"
              placeholder="255.255.255.0"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-24">Gateway</span>
            <input
              type="text"
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
              className="flex-1 px-3 py-1 rounded border bg-transparent"
              placeholder="192.168.1.1"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="w-24">DNS</span>
            <input
              type="text"
              value={dns}
              onChange={(e) => setDns(e.target.value)}
              className="flex-1 px-3 py-1 rounded border bg-transparent"
              placeholder="8.8.8.8"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button 
            onClick={handleReset}
            className="px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
          <button 
            onClick={handleApply}
            className={`px-3 py-1 rounded text-white transition-colors bg-${accentColor}-500 hover:bg-${accentColor}-600`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

function DebugSection() {
  const { userId } = useAuth();
  const { showNotification } = useNotification();
  const [pointsInput, setPointsInput] = useState('0');

  const handleAddPoints = async (amount: number, message: string) => {
    if (!userId) {
      showNotification('No user logged in', 'error');
      return;
    }

    try {
      const newTotal = await addPoints(userId, amount);
      showNotification(`${message} New total: ${newTotal}`, 'success');
    } catch (error) {
      console.error('Error adding points:', error);
      showNotification('Failed to add points', 'error');
    }
  };

  const handleSubtractPoints = async (amount: number, message: string) => {
    if (!userId) {
      showNotification('No user logged in', 'error');
      return;
    }

    try {
      const newTotal = await subtractPoints(userId, amount);
      showNotification(`${message} New total: ${newTotal}`, 'success');
    } catch (error) {
      console.error('Error subtracting points:', error);
      showNotification('Failed to add points', 'error')
    }
  }

  const handleSetPoints = async (amount: number, message: string) => {
    if (!userId) {
      showNotification('No user logged in', 'error');
      return;
    }

    try {
      const newTotal = await setPoints(userId, amount);
      showNotification(`${message} New total: ${newTotal}`, 'success')
    } catch (error) {
      console.error('Error setting points:', error);
      showNotification('Failed to set points', 'error')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Debug Tools</h2>
      <div className="space-y-2 space-x-2">
        <button
          onClick={() => handleAddPoints(10, "Added 10 points.")}
          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded transition-colors"
        >
          Add 10 Points
        </button>
        <button
          onClick={() => handleSubtractPoints(10, "Removed 10 points.")}
          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded transition-colors"
        >
          Subtract 10 Points
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          value={pointsInput}
          onChange={(e) => setPointsInput(e.target.value)}
          className="px-4 py-2 bg-purple-500/10 text-purple-300 rounded w-24"
          min="0"
        />
        <button
          onClick={() => handleSetPoints(Number(pointsInput), `Set points to ${pointsInput}.`)}
          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded transition-colors"
        >
          Set Points
        </button>
      </div>
    </div>
  );
}

const categories: Category[] = [
  { id: 'appearance', name: 'Appearance', icon: '🎨', component: Appearance },
  { id: 'network', name: 'Network', icon: '🌐', component: Network },
  { id: 'notifications', name: 'Notifications', icon: '🔔', component: Notifications },
  { id: 'privacy', name: 'Privacy', icon: '🔒', component: Privacy },
]; 