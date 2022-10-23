export async function QueryMovies(name, page) {
  const fetchUrl = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=1099c181e74cb0c4caa82a328c7407ab&language=en-US&page=${page}&include_adult=false&query=${name}`
  );
  if (!fetchUrl.ok) {
    throw new Error(`Неправильный url от сервера ${fetchUrl.status}`);
  }
  const res = await fetchUrl.json();
  return res;
}
export async function AuthenticationMovies() {
  const fetchUrl = await fetch(
    'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=1099c181e74cb0c4caa82a328c7407ab'
  );
  if (!fetchUrl.ok) {
    throw new Error(`Неправильный url от сервера ${fetchUrl.status}`);
  }
  const res = await fetchUrl.json();
  const localMovies = localStorage.setItem('guest_session_id', res.guest_session_id);
  return localMovies;
}

export async function GuestSessionMovies() {
  const fetchUrl = await fetch(
    'https://api.themoviedb.org/3/guest_session/7d4ce0b4e89fcfa904c65395890f590b/rated/movies?api_key=1099c181e74cb0c4caa82a328c7407ab&language=en-US&sort_by=created_at.asc'
  );
  if (!fetchUrl.ok) {
    throw new Error(`Неправильный url от сервера ${fetchUrl.status}`);
  }
  const res = await fetchUrl.json();
  return res;
}

export async function GenresMovies() {
  const fetchUrl = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=1099c181e74cb0c4caa82a328c7407ab&language=en-US&query=return'
  );
  if (!fetchUrl.ok) {
    throw new Error(`Неправильный url от сервера ${fetchUrl.status}`);
  }
  const res = await fetchUrl.json();
  return res;
}
