import { codeChallenge, codeVerifier, isTokenExpired, refreshAccessToken } from "../spotify";
import useGumloopStore from "../store";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen = true, onClose }: SettingsPanelProps) {

  const updateSpotifyToken = useGumloopStore((state) => state.updateSpotifyToken);
  const updateSpotifyTokenMetadata = useGumloopStore((state) => state.updateSpotifyTokenMetadata);

  const handleSpotifyLogin = async () => {

    const accessToken = localStorage.getItem("access_token");

    if (accessToken != null) {
      if (!isTokenExpired()) {
        const expires_in = parseInt(localStorage.getItem('expires_in') || '0');
        updateSpotifyToken('custom-3', accessToken);
        updateSpotifyTokenMetadata(accessToken, "Bearer", expires_in);
        return;
      }
      else{
        console.log("Token is expired or not available. Refreshing...");
        const response = await refreshAccessToken();
        if (response) {
          console.log("after calling refreshAccessToken - ", response);
          updateSpotifyToken('custom-3', response.access_token);
          updateSpotifyTokenMetadata(response.access_token, response.token_type, parseInt(response.expires_in));
          return;
        }
      }
    }

    // fresh login
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const scopes = [
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private',
    ];
    
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    window.localStorage.setItem('code_verifier', codeVerifier);
    console.log("codeVerifier - first time ", codeVerifier);
    const params =  {
      response_type: 'code',
      client_id: clientId,
      scope: scopes.join(' '),
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    }

    console.log("codeVerifier - second time ", codeVerifier);
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  return (
    <div
      className={`fixed top-20 left-4 h-[90vh] w-96 bg-white border border-gray-200 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-40`}
    >
      <header className="flex justify-between items-center p-4 border-b bg-gray-50">
        <h2 className="text-xl font-bold">Settings</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-1 focus:outline-none"
          aria-label="Close Settings Panel"
        >
          ✕
        </button>
      </header>
      <main className="overflow-y-auto custom-scrollbar" style={{ height: 'calc(100% - 4rem)' }}>
        <section className="p-4">
          <h3 className="text-lg font-semibold mb-2">Instructions</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Click on the "Login With Spotify" button.</li>
            <li>You will be redirected to the Spotify login page.</li>
            <li>Log in with your Spotify account.</li>
            <li>After successful login, you will be redirected back to the app.</li>
            <li>
              You can now see the token in the Spotify Access node.
            </li>
            <li>
              Enter a playlist ID or upload a playlist HTML file in the Playlist Input Node. <strong>(Playlist ID option works only when the API is setup that takes playlist ID and return html)</strong>
            </li>
            <li>
              Enter Playlist name you want to create in the Spotify Create Playlist Node.
            </li>
            <li>
              Enter a the output csv file name to save the results in the Save Output Node.
            </li>
            <li>Click on the "Run Flow" button to start the flow.</li>
            <li>
              Voila! Now, the flow will fetch the YouTube playlist and clone it to your Spotify account.
            </li>
          </ul>
          <p className="text-sm text-gray-600 mt-4">
            <strong>Note:</strong> This works for public playlists only. There is no fuzzy matching (yet), so the flow
            attempts to find an exact match for the song title, artist, and album in Spotify.
          </p>
        </section>
        <footer className="flex justify-center p-4 border-t bg-gray-50">
          <button
            onClick={handleSpotifyLogin}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring focus:ring-green-300"
          >
            Login With Spotify
          </button>
        </footer>
      </main>
    </div>
  );
}
