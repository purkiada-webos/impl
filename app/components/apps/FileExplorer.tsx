export default function FileExplorer() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-blue-500">📁</span>
        <span>Documents</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-blue-500">📁</span>
        <span>Downloads</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-blue-500">📁</span>
        <span>Pictures</span>
      </div>
    </div>
  );
} 