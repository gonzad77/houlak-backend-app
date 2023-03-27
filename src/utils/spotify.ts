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
  console.log(spotifyApi);

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
    const sortedAlbums = albumsWithInfo.body.albums.sort((a, b) => b.popularity - a.popularity);

    return {
      artistName: artistSearched.name,
      albums: sortedAlbums
    }
  } catch (e) {
    console.log(e)
    throw (e instanceof Error) ? e : new Error('Error getting albums');
  
  }
}

export {getSpotifyData, setAccessToken, createAuthUrl, getAlbumsByArtists};