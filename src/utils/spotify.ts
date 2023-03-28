import  SpotifyWebApi  from 'spotify-web-api-node';
import dotenv from 'dotenv';
dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri
})

const createAuthUrl = () => {
  const scopes = ['user-read-email'];
  return (spotifyApi.getAccessToken()) ? null : spotifyApi.createAuthorizeURL(scopes, '');
}

const getSpotifyData = async (code: string) => {
   return await spotifyApi.authorizationCodeGrant(code);
}

const setAccessToken = (accessToken: string) => {
  spotifyApi.setAccessToken(accessToken);
}

const setRefreshToken = (refreshToken: string) => {
  spotifyApi.setRefreshToken(refreshToken);
}

const refreshAccessToken = async () => {
  const data = await spotifyApi.refreshAccessToken();
  const newAccessToken = data.body.access_token;
  setAccessToken(newAccessToken);
}

const getAlbumsByArtists = async (artist: string) => {
  try {
    // Get first artist if there are more than one artist searched
    const artists = await spotifyApi.searchArtists(artist);
    const artistSearched = artists.body.artists?.items[0];
    if (!artistSearched) throw new Error('Artist not found');

    const albums = await spotifyApi.getArtistAlbums(artistSearched.id);
    if (!albums.body.items.length) throw new Error(`${artistSearched.name} does not have albums`);

    const albumsId = albums.body.items.map(({id}) => id);
    const albumsWithInfo = await spotifyApi.getAlbums(albumsId);
    const sortedAlbums = albumsWithInfo.body.albums
    .sort((a, b) => b.popularity - a.popularity)
    .map( ({id, name, images, release_date, total_tracks}) => ({
      id,
      name,
      image_url: images[0].url,
      release_date,
      total_tracks
    })) 

    return {
      artistName: artistSearched.name,
      albums: sortedAlbums
    }
  } catch (e) {
    throw (e instanceof Error) ? e : new Error('Error getting albums');
  
  }
}

export {getSpotifyData, setAccessToken, createAuthUrl, getAlbumsByArtists, setRefreshToken, refreshAccessToken};