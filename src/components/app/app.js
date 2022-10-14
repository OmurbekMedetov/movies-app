import React from 'react';
import debounce from 'lodash.debounce';
import QueryMovies from '../movies-logic';
import Movies from '../movies/movies';
import './app.css';
import 'antd/dist/antd.css';

export default class App extends React.Component {
  moviesService = new QueryMovies();

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
    this.moviesService
      .FilmUrl()
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
      return (
        this.moviesService
          // eslint-disable-next-line react/destructuring-assignment
          .PaginationUrl(this.state.search, page)
          .then(({ results }) => {
            this.setState({
              moviesview: results,
              loader: false,
            });
          })
          .catch(this.onError)
      );
    }

    return this.moviesService
      .PaginationUrl('return', page)
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
      return this.moviesService
        .SearchUrl(event.target.value)
        .then(({ results }) => {
          this.setState({
            moviesview: results,
            loader: false,
            search: event.target.value,
          });
        })
        .catch(this.onError);
    }
    return this.moviesService
      .SearchUrl(event.target.value)
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
  onGenres() {
    return this.moviesService
      .GenresUrl()
      .then(({ genres }) => {
        this.setState({
          moviesview: genres,
          loader: false,
        });
      })
      .catch(this.onError);
  }

  onError = () => {
    this.setState({
      error: true,
      loader: false,
    });
  };

  render() {
    const { moviesview, loader, error } = this.state;
    return (
      <div>
        <Movies
          moviesview={moviesview}
          loader={loader}
          error={error}
          pagination={this.onPagination}
          search={this.onLabelChange}
          genres={this.onGenres}
        />
      </div>
    );
  }
}
