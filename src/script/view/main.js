import { popMovieOpt, popSeriesOpt, searchOpt } from '../data/data-option.js';
import axios from 'axios';

import '../component/app-bar.js';
import '../component/rec-movies.js';
import '../component/rec-series.js';
import '../component/search-results.js';
import '../component/main-img.js';
import '../data/api-ref.js'

const { merge } = require('webpack-merge');
const mainImg = document.querySelector('main-img');
const appBar = document.querySelector('app-bar');

let bannerData = [];

const main = () => {
  axios
    .request(popMovieOpt)
    .then(function (response) {
      const popularMovies = response.data.results.splice(0, 10);
      const recMovies = document.querySelector('rec-movies');
      recMovies.movies = popularMovies;
      recMovies.itemDetailElement = mainImg;
      bannerData = [...popularMovies];
      showBanner();
      recMovies.render();
    })
    .catch(function (error) {
      console.error(error);
    });

  axios
    .request(popSeriesOpt)
    .then(function (response) {
      const popularSeries = response.data.results.splice(0, 10);
      const recSeries = document.querySelector('rec-series');
      recSeries.series = popularSeries;
      recSeries.render();
    })
    .catch(function (error) {
      console.error(error);
    });

  appBar.clickEvent = () => {
    const query = appBar.value.replace(/^[^a-zA-Z0-9]+/g, '').trim();
    if (document.querySelector('search-results') !== null) {
      document.querySelector('search-results').remove();
    }

    if (query.length > 0) {
      axios
        .request(merge(searchOpt, { params: { query: `${query}` } }))
        .then(function (response) {
          const searchResult = document.createElement('search-results');
          const recMovie = document.querySelector('rec-movies');
          recMovie.parentElement.insertBefore(searchResult, recMovie);
          if (response.data.results.length > 0) {
            const searchResultsData = filterPosterData(response.data.results);
            showBanner();
            searchResult.results = searchResultsData;
          } else {
            searchResult.renderError('Data tidak ditemukan!!');
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      showBanner();
    }
  }
};

const filterPosterData = (data) => {
  let resultsData = [];
  data.forEach((movie) => {
    if (movie.poster_path) {
      resultsData.push(movie);
    }
  })
  return resultsData;
}

const showBanner = () => {
  const index = Math.floor(Math.random() * (bannerData.length - 1));
  mainImg.banner = bannerData[index];
}

export default main;