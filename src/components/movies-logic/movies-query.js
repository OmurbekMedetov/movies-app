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
  const res = await fetchUrl.json();
  // if (!localStorage.getItem('guest_session_id')) {
  localStorage.setItem('guest_session_id', res.guest_session_id);
  // }
  return res;
}

export async function GuestSessionMovies() {
  const local = localStorage.getItem('guest_session_id');
  const fetchUrl = await fetch(
    `https://api.themoviedb.org/3/guest_session/${local}/rated/movies?api_key=1099c181e74cb0c4caa82a328c7407ab&language=en-US&sort_by=created_at.asc`
  );
  const res = await fetchUrl.json();
  return res;
}

export async function PostQuest(id, rating) {
  const local = localStorage.getItem('guest_session_id');
  const fetchUrl = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/rating?api_key=1099c181e74cb0c4caa82a328c7407ab&guest_session_id=${local}`,
    {
      method: 'POST',
      body: JSON.stringify({
        value: rating,
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
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
