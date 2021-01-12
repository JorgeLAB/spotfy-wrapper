import { API_URL } from "./config";
import { authenticationHeader } from "./authentication";

global.fetch = require("node-fetch");

export const getAlbum = (id) =>
  fetch(`${API_URL}/albums/${id}`, authenticationHeader).then(
    (data) => data.json
  );

export const getAlbums = (ids) =>
  fetch(`${API_URL}/albums?ids=${ids}`, authenticationHeader).then(
    (data) => data.json
  );

export const getAlbumTracks = (id) =>
  fetch(`${API_URL}/albums/${id}/tracks`, authenticationHeader).then(
    (data) => data.json
  );
