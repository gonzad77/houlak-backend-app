import  SpotifyWebApi  from 'spotify-web-api-node';

const clientId = process.env.SPOTIFY_CLIENT_ID || '69b7d74fcd6b46f4b8606b2ea7a13b63';
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || '4216e49447fa414bb2879eb710d3ae77';
const redirectUri = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:8000/api/auth/callback';

console.log(clientId)

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri
})

const createAuthUrl = () => {
  const scopes = ['user-read-email'];
  return spotifyApi.createAuthorizeURL(scopes, '');
}

const getSpotifyData = async (code: string) => {
  const spotifyData = await spotifyApi.authorizationCodeGrant(code);
  return spotifyData;
}

const setAccessToken = (accessToken: string) => {
  spotifyApi.setAccessToken(accessToken);
}

export {getSpotifyData, setAccessToken, createAuthUrl};