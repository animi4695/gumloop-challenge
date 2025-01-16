import { themes } from "../layouts/layouts";

interface ThemesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeClick: (id: number) => void;
}


export function ThemesPanel({ isOpen = true, onClose, onThemeClick }: ThemesPanelProps) {

  const getToken = () => {
    const clientId = 'd0429ee040f54ec7b068dcf55211712c';
    const redirectUri = 'http://localhost:5173/callback';
    const scopes = [
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private',
    ];

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;
    window.location.href = authUrl;
  }

  return (
    <div
      className={`fixed top-20 left-4 h-[90vh] w-96 bg-white border border-gray-200 rounded-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Select a Theme</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          ✕
        </button>
      </div>
      <div className="overflow-y-auto custom-scrollbar" style={{ height: "calc(100% - 4rem)" }}>
      <div className="p-4 grid grid-cols-2 gap-4 ">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="w-36 h-36 border border-gray-300 rounded-lg flex flex-col items-center justify-center hover:shadow-md hover:bg-gray-50 transition cursor-pointer"
            onClick={() => onThemeClick(theme.id)}
          >
            <h3 className="text-sm font-semibold text-center">{theme.name}</h3>
            <p className="text-xs text-gray-500 text-center mt-2">{theme.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center p-4 border-t">
          <button
            onClick={getToken}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Login With Spotify
          </button>
        </div>
      </div>
    </div>
  );
}
