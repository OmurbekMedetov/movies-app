/* eslint-disable camelcase */
import React from 'react';
import debounce from 'lodash.debounce';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Movies from '../movies/movies';
import ErrorMovies from '../movies-logic/error-movies';
import MoviesContext from '../movies-logic/context-movies';
import { QueryMovies, GenresMovies, AuthenticationMovies, GuestSessionMovies } from '../movies-logic/movies-query';
import './app.css';
import 'antd/dist/antd.min.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      moviesview: [],
      genresarr: [],
      loader: true,
      error: false,
      search: '',
      rating: [],
    };
  }

  componentDidMount() {
    QueryMovies('return', 1)
      .then(({ results }) => {
        this.setState({
          moviesview: results,
          loader: false,
        });
      })
      .catch(this.onError);
    GenresMovies()
      .then(({ genres }) => {
        this.setState({
          genresarr: genres,
          loader: false,
        });
      })
      .catch(this.onError);

    AuthenticationMovies();
  }

  componentDidUpdate() {
    GuestSessionMovies().then(({ results }) =>
      this.setState({
        rating: results,
        loader: false,
      })
    );
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  onPagination = (page) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.search !== '') {
      // eslint-disable-next-line react/destructuring-assignment
      return QueryMovies(this.state.search, page)
        .then(({ results }) => {
          this.setState({
            moviesview: results,
            loader: false,
          });
        })
        .catch(this.onError);
    }

    return QueryMovies('return', page)
      .then(({ results }) => {
        this.setState({
          moviesview: results,
          loader: false,
        });
      })
      .catch(this.onError);
  };

  // eslint-disable-next-line react/no-unused-class-component-methods, consistent-return
  onLabelChange = debounce((event) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (event.target.value !== '') {
      return QueryMovies(event.target.value)
        .then(({ results }) => {
          this.setState({
            moviesview: results,
            loader: false,
            search: event.target.value,
          });
        })
        .catch(this.onError);
    }
    QueryMovies(event.target.value)
      .then(({ results }) => {
        this.setState({
          moviesview: results,
          loader: false,
          search: '',
        });
      })
      .catch(this.onError);
  }, 1000);

  onError = () =>
    this.setState({
      error: true,
      loader: false,
    });

  render() {
    const { moviesview, loader, error, genresarr, rating } = this.state;
    const antIcon = (
      <LoadingOutlined
        style={{
          fontSize: 200,
        }}
        spin
      />
    );
    if (error) {
      return (
        <div className="error__movies">
          <ErrorMovies error={error} />;
        </div>
      );
    }
    if (loader) {
      return (
        <div className="loader__movies">
          <Spin indicator={antIcon} />
        </div>
      );
    }
    return (
      <div>
        <MoviesContext.Provider value={genresarr}>
          <Movies
            moviesview={moviesview}
            loader={loader}
            error={error}
            onRated={this.onRatedLocalStorage}
            rated={this.onRatedSession}
            rating={rating}
            onPagination={this.onPagination}
            onLabelChange={this.onLabelChange}
          />
        </MoviesContext.Provider>
      </div>
    );
  }
}
