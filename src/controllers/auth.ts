import axios from 'axios';
import { Response, Request } from 'express';
import { setAccessToken, getSpotifyData, createAuthUrl } from '../utils/spotify';

const spotifyAuthorize = async (req: Request, res: Response) => {
  const url = createAuthUrl();
  res.redirect(url)
}

const getAccessToken = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const sporifyData = await getSpotifyData(code);
    const accessToken = sporifyData.body.access_token;
    // Save access token to get albums
    setAccessToken(accessToken);

    res.json({
      message: 'OK'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error getting access token'
    })
  }
}

export {spotifyAuthorize, getAccessToken}