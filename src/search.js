import { API_URL } from "./config";
import { authenticationHeader } from "./authentication";

export const search = (query, type) => {
  return fetch(
    `${API_URL}/search?q=${query}&type=${type}`,
    authenticationHeader
  ).then((data) => data.json);
};

export const searchAlbums = (query) => search(query, "album");
export const searchTracks = (query) => search(query, "track");
export const searchPlaylists = (query) => search(query, "playlist");
export const searchArtists = (query) => search(query, "artist");
