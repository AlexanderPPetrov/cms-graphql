import translations from './translations';
export default {
    head: {
        title: 'cms',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['@/assets/scss/styles.scss'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~/plugins/vuelidate',
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: ['@nuxt/typescript-build'],

    modules: [
        '@nuxtjs/axios/nuxt',
        'bootstrap-vue/nuxt',
        'nuxt-i18n',
    ],
    axios: {
        // proxy: true
        common: {
            'Accept': 'application/json, text/plain, */*'
        },
    },
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
        vueI18n: {
            fallbackLocale: 'en',
            messages: translations,
        }
    },
    bootstrapVue: {
        bootstrapCSS: false,
        bootstrapVueCSS: false,
        icons: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader','css-loader','sass-loader',],
            },
        ],
    },
    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {}
}
