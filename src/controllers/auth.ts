import { Response, Request } from 'express';
import { setAccessToken, getSpotifyData, createAuthUrl } from '../utils/spotify';

const spotifyAuthorize = async (req: Request, res: Response) => {
  const url = createAuthUrl();
  res.redirect(url)
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
    // Save access token to get albums
    setAccessToken(accessToken);

    res.json({
      message: 'OK'
    })
  } catch (error) {
    console.log('confirmo')
    res.status(500).json({
      message: 'Error getting access token'
    })
  }
}

export {spotifyAuthorize, getAccessToken}