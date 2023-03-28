import { Response, Request } from 'express';
import { setAccessToken, getSpotifyData, createAuthUrl, setRefreshToken } from '../utils/spotify';

const spotifyAuthorize = async (req: Request, res: Response) => {
  const url = createAuthUrl();
  res.json({
    url, 
  })
}

const getAccessToken = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    
    if (!code) {
      return res.status(400).json({
        message: 'Code missing'
      })
    }

    const sporifyData = await getSpotifyData(code);
    
    const accessToken = sporifyData.body.access_token;
    const refreshToken = sporifyData.body.refresh_token;
    // Save access and refresh token to get albums
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    res.redirect(process.env.REDIRECT_AFTER_CALLBACK || 'http://localhost:3000')

  } catch (error) {
    res.status(500).json({
      message: 'Error getting access token'
    })
  }
}

export {spotifyAuthorize, getAccessToken}