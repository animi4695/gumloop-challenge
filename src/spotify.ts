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