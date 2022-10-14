import React from 'react';

export default class QueryMovies extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  async FetchUrl(url) {
    const filUrl = await fetch(url);
    if (!filUrl.ok) {
      throw new Error(`Неправильный url от сервера ${filUrl.status}`);
    }
    const res = await filUrl.json();
    return res;
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  FilmUrl() {
    return this.FetchUrl(
      'https://api.themoviedb.org/3/search/movie?api_key=1099c181e74cb0c4caa82a328c7407ab&language=en-US&page=1&include_adult=false&query=return'
    );
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  PaginationUrl(name, page) {
    return this.FetchUrl(
      `https://api.themoviedb.org/3/search/movie?api_key=1099c181e74cb0c4caa82a328c7407ab&language=en-US&page=${page}&include_adult=false&query=${name}`
    );
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  SearchUrl(name) {
    return this.FetchUrl(
      `https://api.themoviedb.org/3/search/movie?api_key=1099c181e74cb0c4caa82a328c7407ab&language=en-US&page=1&include_adult=false&query=${name}`
    );
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  GenresUrl() {
    return this.imgUrl(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=1099c181e74cb0c4caa82a328c7407ab&language=en-US&query=return'
    );
  }
}
