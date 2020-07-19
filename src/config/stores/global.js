import { readable, writable } from 'svelte/store';

// Let's firstly import global api config.
import { 
  url as apiURL, 
  version as apiVersion 
} from "../application/api";

const general =
readable({
  // Site url
  // Hmm, just site url, isn't it?
  globalURL: "wavees.ml",
  currentURL: "medals.wavees.ml"
});

export { general };

//
// @explanation
// Config object, that consists url's and keys to access
// private API, that was made especially for this site.
const api = 
readable({
  // API URL and version parameters
  url: apiURL,
  version: apiVersion
});

export { api };