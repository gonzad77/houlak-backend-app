import axios from 'axios';
import { Response, Request } from 'express';
import { getAlbumsByArtists } from '../utils/spotify'

const getAlbums = async (req: Request, res: Response) => {
  try {
    const artist = (req.query.artist as string).trim();

    if (!artist) {
      return res.status(400).json({
        message: 'Artist missing'
      })
    }

    const response = await getAlbumsByArtists(artist);
    res.json(response)

  } catch (error) {
    res.status(500).json({
      message: (error instanceof Error) ? error.message : 'Error getting albums'
    });
  }
}

export {getAlbums};