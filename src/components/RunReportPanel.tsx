import useGumloopStore from '../store';
import OutputComponent from './OutputComponent';

interface RunReportPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RunReportPanel({ isOpen, onClose }: RunReportPanelProps) {

  const nodeOutputs = useGumloopStore((state) => state.nodeOutputs);

  return (
    <div
      className={`fixed top-20 right-4 h-[90vh] w-96 bg-white border border-gray-200 rounded-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
        } z-40`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Run Report</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          ✕
        </button>
      </div>

      <div className="overflow-y-auto custom-scrollbar" style={{ height: "calc(100% - 4rem)" }}>
        {nodeOutputs.map((output) => (
          <OutputComponent
            key={output.id}
            id={output.id}
            label={output.label}
            status={output.status}
            time={output.time} output={output.output} logs={output.logs} />
        ))}
      </div>
    </div>
  );
}
