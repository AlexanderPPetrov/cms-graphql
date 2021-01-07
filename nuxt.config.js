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
    css: ['@/assets/styles/styles.scss'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~/plugins/vuelidate',
        '~/plugins/api',
        '~/plugins/apollo',
    ],
    router: {
        middleware: ['auth']
    },
    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/pwa',
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/apollo',
        ['nuxt-i18n', i18nConfig],
    ],
    vuetify: {
        customVariables: ['~/assets/styles/variables.scss'],
        treeShake: true,
    },
    axios: {
        baseURL: process.env.API_BASE_URL,
        common: {
            'Accept': 'application/json, text/plain, */*'
        },
    },
    apollo: {
        tokenName: "apollo-token",
        defaultOptions: {
            $query: {
                fetchPolicy: "network-only",
                errorPolicy: "all"
            }
        },
        watchLoading: "~/plugins/apollo-loading-handler.js",
        errorHandler: '~/plugins/apollo-error-handler.js',

        authenticationType: 'Bearer',

        // [deprecated] Enable the graphql-tag/loader to parse *.gql/*.graphql files
        includeNodeModules: true,

        // Cookie parameters used to store authentication token
        cookieAttributes: {
            expires: 1,
            path: '/',
            secure: false,
        },
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
