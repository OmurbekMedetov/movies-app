import './movies.css';
import PropTypes from 'prop-types';
import { Pagination, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Offline, Online } from 'react-detect-offline';
import MoviesList from '../movies-list/movies-list';
import ErrorMovies from '../movies-logic/error-movies';

export default function Movies({ moviesview, loader, error, search, pagination, genres }) {
  if (error) {
    return (
      <div className="error__movies">
        <ErrorMovies error={error} />;
      </div>
    );
  }

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 200,
      }}
      spin
    />
  );
  if (loader) {
    return (
      <div className="loader__movies">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  const element = moviesview.map((movies) => (
    <MoviesList
      key={movies.id}
      id={movies.id}
      img={movies.poster_path}
      title={movies.original_title}
      text={movies.overview}
      data={movies.release_date}
      rate={movies.vote_average}
      genres={movies.name}
    />
  ));
  return (
    <div className="swiper__movies">
      <Online>
        <div className="div__movies">
          <button type="button" className="button__movies">
            Search
          </button>
          <button type="button" className="button__movies">
            Rated{genres}
          </button>
        </div>
        <div className="search__movies--div">
          <input placeholder="Type to search..." type="text" className="search__movies" onChange={search} />
        </div>
        <ul className="movies">{element}</ul>
        <Pagination defaultCurrent={1} total={50} onChange={(page) => pagination(page)} />
      </Online>
      <div className="offline__movies">
        <Offline>У вас отключен интернет, подключитесь и все заработает :D</Offline>
      </div>
    </div>
  );
}

Movies.propTypes = {
  moviesview: PropTypes.instanceOf(Array).isRequired,
  loader: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  pagination: PropTypes.func.isRequired,
  genres: PropTypes.string.isRequired,
};
