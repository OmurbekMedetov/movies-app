import * as ReactDOMClient from 'react-dom/client';

import App from './components/app/app';

const movies = ReactDOMClient.createRoot(document.querySelector('.root'));
movies.render(<App />);
