const api = "http://localhost:3002/api/video-player/";

export const ApiService = {
  get(endpoint) {
    return fetch(`${api}${endpoint}`).then((resp) => resp.json());
  },
};
