'use client';

export default function Guide() {
  const content = `const CORRECT_SETTINGS = {
    ip: '192.168.1.42',
    subnet: '255.255.255.0',
    dns: '8.8.4.4'
  };

const FIREWALL_CONFIG = {
    inbound: [80, 443, 22],
    outbound: 'ALL'
};`

  return (
    <div className="h-full flex flex-col">
      <textarea 
        value={content}
        readOnly
        className="w-full h-full p-2 rounded resize-none border-0 bg-transparent focus:ring-0 user-select-none outline-none"
      />
    </div>
  );
} 