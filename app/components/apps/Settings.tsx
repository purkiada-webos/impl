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
          onClick={() => setActiveTab('firewall')}
          className={`w-full text-left px-3 py-2 rounded ${
            activeTab === 'firewall' ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          Firewall
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
        {activeTab === 'firewall' && <Firewall />}
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
    toggleDarkMode();
    if (userId) {
      const result = await completeTask(userId, "theme_change");
      if (result.isFirstTime) {
        const newTotal = await addPoints(userId, 5);
        showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
        unlockHint(userId, 'customization', 'theme');
      }
    }
  };

  const handleAccentChange = async (accColor: string) => {
    setAccentColor(accColor);
    if (userId) {
      const result = await completeTask(userId, "accent_change");
      if (result.isFirstTime) {
        const newTotal = await addPoints(userId, 5);
        showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
        unlockHint(userId, 'customization', 'accent');
      }
    }
  };

  const handleBackgroundChange = async (bg: string) => {
    setBackground(bg);
    if (userId) {
      const result = await completeTask(userId, "background_change");
      if (result.isFirstTime) {
        const newTotal = await addPoints(userId, 5);
        showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
        unlockHint(userId, 'customization', 'background');
      }
    }
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
          <div className="flex gap-2">
            {backgrounds.map((bg) => (
              <button
                key={bg.path}
                onClick={() => handleBackgroundChange(bg.path)}
                className={`w-12 h-8 rounded border-2 transition-all ${
                  background === bg.path 
                    ? `border-${accentColor}-500 scale-105` 
                    : 'border-transparent'
                }`}
                style={{
                  backgroundImage: `url(${bg.path})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                title={bg.name}
              />
            ))}
          </div>
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
  const { userId } = useAuth();
  
  // Define correct network settings
  const CORRECT_SETTINGS = {
    ip: '192.168.1.42',
    subnet: '255.255.255.0',
    dns: '8.8.4.4'
  };
  
  const [ethernetEnabled, setEthernetEnabled] = useState(() => {
    return localStorage.getItem('network_ethernet') === 'true';
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

  // Apply changes and check if settings are correct
  const handleApply = async () => {
    showNotification('Applying network settings...', 'info', true);
    
    // Check if settings are correct
    const isCorrect = 
      ipAddress === CORRECT_SETTINGS.ip &&
      subnet === CORRECT_SETTINGS.subnet &&
      dns === CORRECT_SETTINGS.dns;

    if (isCorrect) {
      const result = await completeTask(userId, 'network_config');
      if (result.isFirstTime) {
        const newTotal = await addPoints(userId!, 15);
        showNotification(`Network configured correctly! Added 15 points! New total: ${newTotal}`, 'success');
        unlockHint(userId!, 'network', 'config');
        setEthernetEnabled(true);
        localStorage.setItem('network_ethernet', 'true');
      } else {
        showNotification('Network settings applied successfully', 'success');
        setEthernetEnabled(true);
        localStorage.setItem('network_ethernet', 'true');
      }
    } else {
      showNotification('Network configuration incorrect. Internet remains disconnected.', 'error');
      setEthernetEnabled(false);
      localStorage.setItem('network_ethernet', 'false');
    }
  };

  // Reset to defaults (incorrect settings)
  const handleReset = () => {
    setEthernetEnabled(false);
    setIpAddress('192.168.1.100');
    setSubnet('255.255.255.0');
    setGateway('192.168.1.1');
    setDns('8.8.8.8');
    localStorage.setItem('network_ethernet', 'false');
    showNotification('Network settings reset to defaults', 'info');
  };

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

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Network Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Ethernet</span>
          <div 
            className={`px-3 py-1 rounded text-white transition-colors ${
              ethernetEnabled ? 'bg-green-500' : 'bg-gray-500'
            }`}
          >
            {ethernetEnabled ? 'Connected' : 'Disconnected'}
          </div>
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

function Firewall() {
  const { showNotification } = useNotification();
  const { accentColor } = useTheme();
  const { userId } = useAuth();
  
  // Define correct firewall settings
  const CORRECT_SETTINGS = {
    inbound: [80, 443, 22],
    outbound: 'ALL'
  };
  
  const [firewallEnabled, setFirewallEnabled] = useState(() => {
    return localStorage.getItem('firewall_enabled') === 'true';
  });
  
  const [inboundPorts, setInboundPorts] = useState(() => {
    return localStorage.getItem('firewall_inbound') || '80, 443';
  });
  
  const [outboundPolicy, setOutboundPolicy] = useState(() => {
    return localStorage.getItem('firewall_outbound') || 'BLOCK';
  });

  // Apply changes and check if settings are correct
  const handleApply = async () => {
    showNotification('Applying firewall settings...', 'info', true);
    
    // Parse inbound ports and ensure proper formatting
    const ports = inboundPorts.split(',')
      .map(port => parseInt(port.trim()))
      .filter(port => !isNaN(port))
      .sort((a, b) => a - b);

    // Ensure exact port match
    const hasAllRequiredPorts = 
      ports.length === CORRECT_SETTINGS.inbound.length &&
      CORRECT_SETTINGS.inbound.every(port => ports.includes(port));

    // Check if settings are correct
    const isCorrect = 
      hasAllRequiredPorts &&
      outboundPolicy === CORRECT_SETTINGS.outbound;

    if (isCorrect) {
      const result = await completeTask(userId, 'firewall_config');
      if (result.isFirstTime) {
        const newTotal = await addPoints(userId!, 5);
        showNotification(`Firewall configured correctly! Added 5 points! New total: ${newTotal}`, 'success');
        unlockHint(userId!, 'firewall', 'config');
        setFirewallEnabled(true);
        localStorage.setItem('firewall_enabled', 'true');
      } else {
        showNotification('Firewall settings applied successfully', 'success');
        setFirewallEnabled(true);
        localStorage.setItem('firewall_enabled', 'true');
      }
    } else {
      let errorMessage = 'Firewall configuration incorrect. ';
      if (!hasAllRequiredPorts) {
        errorMessage += '';
      }
      if (outboundPolicy !== CORRECT_SETTINGS.outbound) {
        errorMessage += '';
      }
      errorMessage += 'System remains vulnerable.';
      
      showNotification(errorMessage, 'error');
      setFirewallEnabled(false);
      localStorage.setItem('firewall_enabled', 'false');
    }

    // Save settings regardless
    localStorage.setItem('firewall_inbound', inboundPorts);
    localStorage.setItem('firewall_outbound', outboundPolicy);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Firewall Status</span>
          <div className={`px-3 py-1 rounded ${firewallEnabled ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {firewallEnabled ? 'Protected' : 'Vulnerable'}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm">Inbound Ports (comma-separated)</label>
          <input
            type="text"
            value={inboundPorts}
            onChange={(e) => setInboundPorts(e.target.value)}
            className={`w-full px-3 py-2 rounded bg-white/5 border border-${accentColor}-500/30 focus:border-${accentColor}-500`}
            placeholder="80, 443, 22"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm">Outbound Policy</label>
          <select
            value={outboundPolicy}
            onChange={(e) => setOutboundPolicy(e.target.value)}
            className={`w-full px-3 py-2 rounded bg-white/5 border border-${accentColor}-500/30 focus:border-${accentColor}-500`}
          >
            <option value="BLOCK">BLOCK</option>
            <option value="ALL">ALL</option>
            <option value="NONE">NONE</option>
          </select>
        </div>

        <button
          onClick={handleApply}
          className={`w-full px-4 py-2 rounded bg-${accentColor}-500/20 hover:bg-${accentColor}-500/30 text-${accentColor}-300 transition-colors`}
        >
          Apply Firewall Settings
        </button>
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
  { id: 'firewall', name: 'Firewall', icon: '🛡️', component: Firewall },
  { id: 'notifications', name: 'Notifications', icon: '🔔', component: Notifications },
  { id: 'privacy', name: 'Privacy', icon: '🔒', component: Privacy },
]; 