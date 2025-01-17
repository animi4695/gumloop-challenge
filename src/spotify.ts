import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";

class SpotifySdkSingleton {
  private static instance: SpotifyApi | null = null;

  static getInstance(clientId: string, token: AccessToken): SpotifyApi {
    if (!this.instance) {
      this.instance = SpotifyApi.withAccessToken(clientId, token);
    }
    return this.instance;
  }
}

export default SpotifySdkSingleton;

const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

export const codeVerifier  = generateRandomString(64);

export const sha256 = async (plain: any) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

export const base64encode = (input: any) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}


export const getToken = async (code: string) => {

  const url = 'https://accounts.spotify.com/api/token';
  // stored in the previous step
  let codeVerifier = localStorage.getItem('code_verifier');
  console.log(codeVerifier);
  if(codeVerifier == null){
    throw new Error("Code verifier is not available");
  }
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  }


  const response = await fetch(url, payload).then((response) => {
    if (response.ok) {
      console.log("after fetching Token - ", response);
      return response.json();
    }
    else{
      console.log("after fetching Tokens - ", response);
    }
  });

  localStorage.setItem('access_token', response.access_token);
  localStorage.setItem('refresh_token', response.refresh_token);
  localStorage.setItem('expires_in', (Date.now() + response.expires_in * 1000).toString());
  
  return response;
}

export const isTokenExpired = () => {
  const expiresAt = parseInt(localStorage.getItem('expires_in') || '0');
  return Date.now() > expiresAt;
};

export const refreshAccessToken = async () => {

  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem('refresh_token');
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken || '',
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID
    }),
  }
  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.accessToken);
  if (response.refreshToken) {
    localStorage.setItem('refresh_token', response.refreshToken);
  }

  return response.accessToken;
}