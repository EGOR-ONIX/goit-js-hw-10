import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_FpnNMj4486wdbAV2HBZk4eBsnfJf1F7eeoOgla5R5wCPvkUKqmoRSdSgrilOnWKj';

//* AXIOS LAB

const instance = axios.create({
  baseURL: BASE_URL,
});
instance.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  const listURL = '/breeds';

  return instance.get(listURL).then(resp => {
    if (resp.status >= 400) {
      throw new Error(resp.statusText);
    }
    return resp.data;
  });
}

export function fetchCatByBreed(breedId) {
  const catURL = '/images/search';
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return instance.get(`${catURL}?${params}`).then(resp => {
    if (resp.status >= 400) {
      throw new Error(resp.statusText);
    }
    return resp.data;
  });
}

//* FETCH()

// export function fetchBreeds() {
//   const listURL = '/breeds';
//   const params = new URLSearchParams({
//     api_key: API_KEY,
//   });

//   return fetch(`${BASE_URL + listURL}?${params}`).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }

//     return resp.json();
//   });
// }

// export function fetchCatByBreed(breedId) {
//   const catURL = '/images/search';
//   const params = new URLSearchParams({
//     api_key: API_KEY,
//     breed_ids: breedId,
//   });

//   return fetch(`${BASE_URL + catURL}${params}`).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.statusText);
//     }

//     return resp.json();
//   });
// }
