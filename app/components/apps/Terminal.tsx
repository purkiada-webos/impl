'use client';

import { useEffect, useState, useRef } from 'react';
import { OSFileSystem } from '@/app/backend/terminal';
import { useAuth } from '@/app/contexts/AuthContext';
import { completeTask } from '@/app/backend/TaskSystem';
import { addPoints } from '@/app/backend/PointsSystem';
import { useNotification } from '@/app/contexts/NotificationContext';

export default function Terminal() {
  const { userId } = useAuth();
  const { showNotification } = useNotification();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [fs] = useState(() => new OSFileSystem());
  const outputRef = useRef<HTMLDivElement>(null);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    setOutput(['Welcome to PurkOS Terminal v1.0', 'Type "help" for help']);
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const appendOutput = (newLines: string[]) => {
    setOutput(prev => {
      const updated = [...prev, ...newLines];
      setTimeout(() => {
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      }, 0);
      return updated;
    });
  };

  const handleCommand = async (command: string): Promise<string> => {
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (cmd) {
      case 'cd':
        const result_cd = fs.cd_command(args || null);
        if (fs.success && userId) {
          const result = await completeTask(userId, 'cd');
          if (result.isFirstTime) {
            const newTotal = await addPoints(userId, 5);
            showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
          }
        }
        return result_cd;
      case 'ls':
        return fs.ls_command();
      case 'pwd':
        return fs.pwd_command();
      case 'mkdir':
        const result_mkdir = fs.mkdir_command(args);
        if (fs.success && userId) {
          const result = await completeTask(userId, 'mkdir');
          if (result.isFirstTime) {
            const newTotal = await addPoints(userId, 5);
            showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
          }
        }
        return result_mkdir;
      case 'cat':
        const result_cat = fs.cat_command(args);
        if (fs.success && userId) {
          const result = await completeTask(userId, 'cat');
          if (result.isFirstTime) {
            const newTotal = await addPoints(userId, 5);
            showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
          }
        }
        return result_cat;
      case 'touch':
        const result_touch = fs.touch_command(args);
        if (fs.success && userId) {
          const result = await completeTask(userId, 'touch');
          if (result.isFirstTime) {
            const newTotal = await addPoints(userId, 5);
            showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
          }
        }
        return result_touch;
      case 'echo':
        const result_echo = fs.echo_command(args);
        if (fs.success && userId) {
          const result = await completeTask(userId, 'echo');
          if (result.isFirstTime) {
            const newTotal = await addPoints(userId, 5);
            showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
          }
        }
        return result_echo;
      case 'clear':
        setTimeout(() => setOutput([]), 0);
        return '';
      case 'help':
        return `Commands:\ncd [path] - Change directory\nls - List contents\nmkdir [name] - Create directory\ntouch [name] - Create file\ncat [file] - Read file\necho [text] > [file] - Write to file\nclear - Clear screen\npwd - Print working directory\ncp [file1] [file2] - Copy file\nap install [package] - Install package`;
      case 'cp':
        const [file1, file2] = parts.slice(1);
        const result_cp = fs.cp_command(file1, file2);
        if (fs.success && userId) {
          const result = await completeTask(userId, 'cp');
          if (result.isFirstTime) {
            const newTotal = await addPoints(userId, 5);
            showNotification(`Task Completed! Added 5 points! New total: ${newTotal}`, 'success');
          }
        }
        return result_cp;
      case 'apt':
      case 'apt-get':
        if (parts[1] === 'install') {
          const packages = parts.slice(2);
          if (packages.length === 0) {
            return 'Usage: apt install <package>';
          }
          if (isInstalling) {
            return 'Another installation is in progress...';
          }
          setIsInstalling(true);
          setTimeout(async () => {
            appendOutput([
              'Reading package lists... Done',
              'Building dependency tree... Done',
              'Reading state information... Done',
              'The following NEW packages will be installed:',
              `  ${packages.join(' ')}`,
              'Need to get 0 B/42.1 kB of archives.',
              'After this operation, 12.4 MB of additional disk space will be used.',
              'Get:1 Downloaded package files',
              'Selecting previously unselected packages.',
              'Preparing to unpack...',
              'Unpacking packages...',
              'Setting up packages...',
              'Processing triggers...',
              'Done!'
            ]);

            if (userId) {
              const result = await completeTask(userId, 'apt');
              if (result.isFirstTime) {
                const newTotal = await addPoints(userId, 10);
                showNotification(`Task Completed! Added 10 points! New total: ${newTotal}`, 'success');
              }
            }
            setIsInstalling(false);
          }, 500);
          return '';
        }
        return 'Usage: apt install <package>';
      default:
        return `Command not found: ${cmd}`;
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      if (command) {
        if (command === 'clear') {
          setOutput([]);
        } else {
          const prompt = `${fs.pwd_command()}$ ${command}`;
          const result = await handleCommand(command);
          setOutput(prev => [...prev, prompt, result]);
        }
        setInput('');
      }
    }
  };

  return (
    <div className="h-auto flex flex-col font-mono text-sm">
      <div 
        ref={outputRef} 
        className="flex-1 overflow-auto p-2 space-y-1"
        style={{ maxHeight: '500px' }}
      >
        {output.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-2">
        <span>{fs.pwd_command()} $</span>
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