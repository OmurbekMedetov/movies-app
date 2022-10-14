export default async function QueryMovies(name, page) {
  const fetchUrl = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=1099c181e74cb0c4caa82a328c7407ab&language=en-US&page=${page}&include_adult=false&query=${name}`
  );
  if (!fetchUrl.ok) {
    throw new Error(`Неправильный url от сервера ${fetchUrl.status}`);
  }
  const res = await fetchUrl.json();
  return res;
}

// eslint-disable-next-line react/no-unused-class-component-methods
// GenresUrl() {
//   return this.imgUrl(
//     'https://api.themoviedb.org/3/genre/movie/list?api_key=1099c181e74cb0c4caa82a328c7407ab&language=en-US&query=return'
//   );
// }
