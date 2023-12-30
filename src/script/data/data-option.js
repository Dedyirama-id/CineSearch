
import { baseUrl, accessToken } from './api-ref.js';

const popMovieOpt = {
  method: 'GET',
  url: `${baseUrl}/movie/popular`,
  params: { language: 'en-US', page: '1' },
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
};

const popSeriesOpt = {
  method: 'GET',
  url: `${baseUrl}/tv/popular`,
  params: { language: 'en-US', page: '1' },
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
};

const searchOpt = {
  method: 'GET',
  url: `${baseUrl}/search/multi`,
  params: {include_adult: 'false', language: 'en-US', page: '1' },
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${accessToken}`
  },
};

const detailOpt = {
  method: 'GET',
  params: {include_adult: 'false', language: 'en-US', page: '1' },
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${accessToken}`
  },
};

export { popMovieOpt, popSeriesOpt, searchOpt, detailOpt };