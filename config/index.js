var en = require('../lang/en-US.js')
module.exports = {
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
