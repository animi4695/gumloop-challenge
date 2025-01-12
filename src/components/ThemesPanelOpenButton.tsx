import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

interface ThemesPanelOpenButtonProps {
  isOpen: boolean;
  onOpen: () => void;
}

export function ThemesPanelOpenButton({ onOpen, isOpen = false }: ThemesPanelOpenButtonProps) {
  const runFlow = () => {
    console.log("Running flow...");
    onOpen();
  };

  return (
    <button
      onClick={runFlow}
      className={`transform transition-transform duration-300 ease-in-out absolute text-lg top-20 left-40 bg-gray-100 hover:bg-gray-200 text-gray-500
       font-semibold py-4 px-4 rounded-lg border border-gray-500 transition-colors z-20 flex items-center gap-2 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <SettingsSuggestIcon />
    </button>
    
  );
}
