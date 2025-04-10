import { MetaProvider } from '@solidjs/meta';
import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

import './index.css';
import 'swiper/swiper-bundle.css';
import 'flatpickr/dist/flatpickr.css';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
    );
}

render(() => (
    <Router>
        <MetaProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </MetaProvider>
    </Router>
), root as HTMLElement);
