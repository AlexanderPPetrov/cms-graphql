import {app} from "./app";
import consola from "consola";

// @ts-ignore
import { Nuxt, Builder } from 'nuxt';
const configPath = process.env.NODE_ENV === 'development' ? '../nuxt.config.js' : '../../nuxt.config.js';
const config = require(configPath);

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    const host: string = nuxt.options.server.host;
    const port: string = nuxt.options.server.port;

    await nuxt.ready();

    // Build only in dev mode
    if (process.env.NODE_ENV === 'development') {
        const builder = new Builder(nuxt);
        await builder.build()
    }


    // Give nuxt middleware to express
    app.use(nuxt.render);

    // Listen the server
    // @ts-ignore
    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true,
    });

}
start();
