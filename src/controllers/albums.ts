import { Response, Request } from 'express';

import requestIp from 'request-ip';

import Req from '../models/requests';
import { getAlbumsByArtists, refreshAccessToken } from '../utils/spotify';


const getAlbums = async (req: Request, res: Response) => {
  try {
    const artist = (req.query.artist as string).trim();

    if (!artist) {
      return res.status(400).json({
        message: 'Artist missing'
      })
    }

    const response = await getAlbumsByArtists(artist);

    const userIp = requestIp.getClientIp(req);
    const request = await Req.create({
      user_ip: userIp,
      artist_name: response.artistName
    })
    await request.save();

    res.json(response)

  } catch (error) {
    refreshAccessToken();
    res.status(500).json({
      message: (error instanceof Error) ? error.message : 'Error getting albums'
    });
    
  }
}

export {getAlbums};