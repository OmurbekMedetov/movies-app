/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import './movies-list.css';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import lostImg from './picture.png';
import RateMovies from './rate-movies';
import MoviesContext from '../movies-logic/context-movies';
import { PostQuest } from '../movies-logic/movies-query';

// eslint-disable-next-line react/prop-types
export default function MoviesList({ img, rate, text, title, data, id, genresid, rating }) {
  return (
    <MoviesContext.Consumer>
      {(value) => (
        <div className="movies__list--div">
          <div className="rate__movies">
            <Rate
              allowHalfв
              defaultValue={rating}
              count={10}
              onChange={(res) => {
                PostQuest(id, res);
              }}
            />
          </div>
          <li className="movies__list">
            <div className="rate__movies" />
            <RateMovies rate={rate} />
            <img src={img ? `https://image.tmdb.org/t/p/original/${img}` : lostImg} alt={id} className="movies__img" />
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
