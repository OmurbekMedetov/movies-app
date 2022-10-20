/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import './movies-list.css';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import { Online } from 'react-detect-offline';
import lostImg from './picture.png';
import RateMovies from './rate-movies';
import MoviesContext from '../movies-logic/context-movies';
import { AuthenticationMovies } from '../movies-logic/movies-query';

// eslint-disable-next-line react/prop-types
export default function MoviesList({ img, rate, text, title, data, id, genresid }) {
  return (
    <MoviesContext.Consumer>
      {(value, localMovies) => (
        <div className="movies__list--div">
          <Online>
            <div className="rate__movies">
              <Rate
                allowHalfв
                defaultValue={0}
                count={10}
                onChange={() => {
                  localStorage.setItem('stars', JSON.stringify({ id: values }));
                }}
              />
            </div>
            <li className="movies__list">
              <div className="rate__movies" />
              <RateMovies rate={rate} />
              <img
                src={img ? `https://image.tmdb.org/t/p/original/${img}` : lostImg}
                alt={id}
                className="movies__img"
              />
              <h2 className="movies__h2">{title}</h2>
              <div className="movies__date">{data}</div>
              <span className="movies__button">
                {genresid.map((item) => {
                  // eslint-disable-next-line no-restricted-syntax
                  for (const res of value) {
                    if (res.id === item) {
                      return `${res.name},\n`;
                    }
                  }
                })}
              </span>
              <p className="movies__text">{text}</p>
            </li>
          </Online>
        </div>
      )}
    </MoviesContext.Consumer>
  );
}

MoviesList.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  genresid: PropTypes.instanceOf(Array).isRequired,
};
