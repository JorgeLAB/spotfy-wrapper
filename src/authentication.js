import { KEY_API_SPOTIFY } from "./config";

const myHeaders = {};

myHeaders.Authorization = `Bearer ${KEY_API_SPOTIFY}`;
myHeaders.Accept = "application/json";
myHeaders["Content-Type"] = "application/json";
myHeaders.expires_in = 500000;

export const authenticationHeader = {
  method: "GET",
  headers: myHeaders,
};
