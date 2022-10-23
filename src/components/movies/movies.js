import './movies.css';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Online } from 'react-detect-offline';
import MoviesList from '../movies-list/movies-list';
import ErrorMovies from '../movies-logic/error-movies';

export default function Movies({ moviesview, loader, error, onRated }) {
  const storage = JSON.parse(localStorage.getItem('rated'));
  console.log(storage);
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
      genresid={movies.genre_ids}
      onRated={onRated}
      defaultValueStar={storage.stars[movies.id] ?? 0}
    />
  ));
  return (
    <div className="swiper__movies">
      <Online>
        <ul className="movies">{element}</ul>
      </Online>
    </div>
  );
}

Movies.propTypes = {
  moviesview: PropTypes.instanceOf(Array).isRequired,
  loader: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onRated: PropTypes.func.isRequired,
};
