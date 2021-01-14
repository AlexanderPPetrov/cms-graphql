import { onError } from 'apollo-link-error'

export default function(ctx) {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        console.log(graphQLErrors, networkError)
    })
    return {
        link: errorLink,
        // required
        httpEndpoint: ctx.env.GRAPHQL_BASE_URL,

        httpLinkOptions: {
            credentials: 'same-origin'
        },
    }
}
