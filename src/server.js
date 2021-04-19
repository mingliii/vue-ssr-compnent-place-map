const express = require('express');
const server = express();
const vueServerRenderer = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');
const proxy = require('express-http-proxy');
const setupDevServer = require('../config/setup-dev-server');
const LRU = require("lru-cache");
const dev = process.env.NODE_ENV === 'development';
const components = Object.keys(require('./entries/config').servers);
const port = 3000;
const microCache = new LRU({
  max: 10000,
  maxAge: 10000 // Important: entries expires after 1 second.
})

server.use('/graphql', proxy('https://www.nationaltrust.org.uk', {
  "proxyReqPathResolver"() {
    return '/apps/search/api/graphql';
  },
  // userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
  //     const data = JSON.parse(proxyResData.toString('utf8'));
  //     return JSON.stringify(data);
  // }
}));

const createRenderer = (bundle, options) =>
  vueServerRenderer.createBundleRenderer(bundle, {
    runInNewContext: false,
    inject: false,
    cache: new LRU({
      max: 10000,
      maxAge: 10000
    }),
    ...options
  });

const requestHandler = async (req, res, serverBundle) => {
  try {

    const hit = microCache.get(req.url)
    if (hit) {
      return res.end(hit)
    }

    const component = req.path.substring(1);
    if (!components.includes(component)) {
      return res.status(404).send('404 | Page Not Found');
    }

    const context = {url: req.url, title: 'vue ssr'}
    const bundle = {...serverBundle};
    let template = fs.readFileSync(path.resolve(process.cwd(), 'src', 'index.template.html'), 'utf-8');

    bundle.entry = `${component}.js`
    context.contextKey = `state.${component}`
    template = template.replace("<!--contextKey-->", `state.${component}`).replace("<!--windowKey-->", `__${component.toUpperCase()}_INITIAL_STATE__`)

    let clientManifest = {...require('../dist/vue-ssr-client-manifest.json')};
    clientManifest.initial = clientManifest.initial.filter(filename => filename.match(`^${component}(\\.[\\d\\w]+)?\\.js$`))
    const renderer = createRenderer(bundle, {template, clientManifest});
    const html = await renderer.renderToString(context);
    res.end(html);
    microCache.set(req.url, html)
  } catch (error) {
    console.error(error)
    if (error.code === 404) {
      return res.status(404).send('404 | Page Not Found');
    }
    return res.status(500).send('500 | Internal Server Error');
  }
}
let bundle = require("../dist/vue-ssr-server-bundle.json");

if (dev) {
  setupDevServer(server, (serverBundle) => {
    bundle = serverBundle;
  });
}

server.use('/public', express.static('dist'))
server.get('*', (req, res) => {
  return requestHandler(req, res, bundle);
})

server.listen(port, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`> http://localhost:${port}`)
});