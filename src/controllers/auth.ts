import axios from 'axios';
import { Response, Request } from 'express';
import  SpotifyWebApi  from 'spotify-web-api-node';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri
})

const spotifyAuthorize = async (req: Request, res: Response) => {
  const scopes = ['user-read-email'];
  res.redirect(spotifyApi.createAuthorizeURL(scopes, ''))
}

const getAccessToken = async (req: Request, res: Response) => {
  
}

export { spotifyAuthorize, getAccessToken};