import './movies.css';
import PropTypes from 'prop-types';
import { Spin, Tabs, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Offline, Online } from 'react-detect-offline';
import MoviesList from '../movies-list/movies-list';
import ErrorMovies from '../movies-logic/error-movies';
import { GuestSessionMovies } from '../movies-logic/movies-query';

export default function Movies({ moviesview, loader, error, rating, onPagination, onLabelChange }) {
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
    />
  ));
  const ratedMovies = rating.map((rated) => (
    <MoviesList
      key={rated.id}
      id={rated.id}
      img={rated.poster_path}
      title={rated.original_title}
      text={rated.overview}
      data={rated.release_date}
      rate={rated.vote_average}
      genresid={rated.genre_ids}
      rating={rated.rating}
    />
  ));
  return (
    <div className="swiper__movies">
      <Online>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Search" key="1">
            <ul className="movies">{element}</ul>
            <Pagination defaultCurrent={1} total={50} onChange={(page) => onPagination(page)} />
            <div className="search__movies--div">
              <input placeholder="Type to search..." type="text" className="search__movies" onChange={onLabelChange} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Rated" key="2">
            <ul className="movies">{ratedMovies}</ul>
          </Tabs.TabPane>
        </Tabs>
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
  rating: PropTypes.instanceOf(Array).isRequired,
  onPagination: PropTypes.func.isRequired,
  onLabelChange: PropTypes.func.isRequired,
};
