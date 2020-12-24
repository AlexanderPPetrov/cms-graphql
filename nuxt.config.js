import {i18nConfig} from './config';

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
        '~/plugins/api',
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/apollo',
        'bootstrap-vue/nuxt',
        ['nuxt-i18n', i18nConfig],
    ],
    axios: {
        baseURL: process.env.API_BASE_URL,
        common: {
            'Accept': 'application/json, text/plain, */*'
        },
    },
    apollo: {
        tokenName: "nuxt-apollo",
        cookieAttributes: {
            expires: 1
        },
        defaultOptions: {
            $query: {
                fetchPolicy: "network-only",
                errorPolicy: "all"
            }
        },
        watchLoading: "@/apollo/loadingHandler.js",
        errorHandler: "@/apollo/errorHandler.js",
        clientConfigs: {
            default: {
                httpEndpoint: process.env.GRAPHQL_BASE_URL
            }
        }
    },
    publicRuntimeConfig: {
        axios: {
            browserBaseURL: process.env.BROWSER_BASE_URL
        }
    },
    privateRuntimeConfig: {
        axios: {
            baseURL: process.env.API_BASE_URL
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
    build: {

    },
    telemetry: false,
}
