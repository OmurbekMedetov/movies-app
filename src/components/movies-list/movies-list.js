import './movies-list.css';
import PropTypes from 'prop-types';
import { Online } from 'react-detect-offline';
import { Rate } from 'antd';
import lostImg from './picture.png';

// eslint-disable-next-line react/prop-types
export default function MoviesList({ img, title, text, data, rate, id }) {
  return (
    <div className="movies__list--div">
      <Online>
        <li className="movies__list">
          <div className="rate__movies">
            <Rate allowHalf defaultValue={0} count={10} />
          </div>
          {/* <RateMovies /> */}
          <div className="average__3">{rate}</div>
          <img src={img ? `https://image.tmdb.org/t/p/original/${img}` : lostImg} alt={id} className="movies__img" />
          <h2 className="movies__h2">{title}</h2>
          <div className="movies__date">{data}</div>
          <span className="movies__button btn">Action</span>
          <p className="movies__text">{text}</p>
        </li>
      </Online>
    </div>
  );
}

MoviesList.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
