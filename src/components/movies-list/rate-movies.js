import PropTypes from 'prop-types';

export default function RateMovies({ rate }) {
  let average = rate;
  if (average <= 3) average = 'average__3';
  if (average > 3 && average <= 5) average = 'average__5';
  if (average > 5 && average <= 7) average = 'average__7';
  if (average > 7) average = 'average__max';
  return (
    <div>
      <div className={average}>{rate}</div>
    </div>
  );
}

RateMovies.propTypes = {
  rate: PropTypes.number.isRequired,
};
