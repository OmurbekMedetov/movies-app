import React from 'react';
import debounce from 'lodash.debounce';
import { Offline, Online } from 'react-detect-offline';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import QueryMovies from '../movies-logic/movies-query';
import Movies from '../movies';
import './app.css';
import 'antd/dist/antd.min.css';
import ErrorMovies from '../movies-logic/error-movies';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      moviesview: [],
      loader: true,
      error: false,
      search: '',
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
    return QueryMovies(event.target.value)
      .then(({ results }) => {
        this.setState({
          moviesview: results,
          loader: false,
          search: '',
        });
      })
      .catch(this.onError);
  }, 1000);

  // eslint-disable-next-line react/no-unused-class-component-methods
  // onGenres() {
  //   return this.moviesService
  //     .GenresUrl()
  //     .then(({ genres }) => {
  //       this.setState({
  //         moviesview: genres,
  //         loader: false,
  //       });
  //     })
  //     .catch(this.onError);
  // }

  onError = () =>
    this.setState({
      error: true,
      loader: false,
    });

  render() {
    const { moviesview, loader, error } = this.state;
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
        <Online>
          <div className="div__movies">
            <button type="button" className="button__movies">
              Search
            </button>
            <button type="button" className="button__movies">
              Rated
            </button>
          </div>
          <div className="search__movies--div">
            <input
              placeholder="Type to search..."
              type="text"
              className="search__movies"
              onChange={this.onLabelChange}
            />
          </div>
          <Movies
            moviesview={moviesview}
            loader={loader}
            error={error}
            pagination={this.onPagination}
            // genres={this.onGenres}
          />
          <Pagination defaultCurrent={1} total={50} onChange={(page) => this.onPagination(page)} />
        </Online>
        <div className="offline__movies">
          <Offline>У вас отключен интернет, подключитесь и все заработает :D</Offline>
        </div>
      </div>
    );
  }
}
