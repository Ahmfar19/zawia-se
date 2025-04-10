import { createEffect, createRoot, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
// import * as i18n from "@solid-primitives/i18n";

// Define your translations
const langs: { [langName: string]: () => Promise<any> } = {
    sv: async () => (await import('../lang/sv.json')).default,
    en: async () => (await import('../lang/en.json')).default,
    no: async () => (await import('../lang/no.json')).default,
};

// Create signal for the current locale
const [locale, setLocale] = createSignal<string>(localStorage.getItem('locale') || 'en');

// Create a signal for the current translations
const [dict, setDict] = createStore<any>({});

// Load the translations based on the selected locale
createRoot(() => {
    createEffect(() => {
        const currentLocale = locale() || 'en';
        langs[currentLocale]().then(setDict);
        document.documentElement.lang = locale();
        localStorage.setItem('locale', locale());
    });
});

// Create the translator function based on the current dictionary
const t = (key: string) => dict?.[key] || key;

// Set the locale function
const changeLocale = (newLocale: string) => {
    setLocale(newLocale); // Update the locale signal
};

export { changeLocale, locale, t };
