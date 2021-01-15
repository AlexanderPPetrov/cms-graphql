import {app} from "./app";
import consola from "consola";

import {Nuxt, Builder} from 'nuxt';
import config from '../nuxt.config.js';

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    const host = nuxt.options.server.host;
    const port = nuxt.options.server.port;

    await nuxt.ready();

    // Build only in dev mode
    if (process.env.NODE_ENV === 'development') {
        const builder = new Builder(nuxt);
        await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render);

    // Listen the server
    app.listen(port, host);
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true,
    });
}

start();
