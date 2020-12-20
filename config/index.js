import en from '../lang/en-US.js'

export const i18nConfig = {
    locales: [
        {
            code: 'en',
            iso: 'en-US',
            name: 'English',
        },
    ],
    defaultLocale: 'en',
    vueI18n: {
        fallbackLocale: 'en',
        messages: {
            en,
        }
    }
};

export const baseURL = 'http://localhost:3000/api';
