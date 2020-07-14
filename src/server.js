import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server';

import "./i18n.js";

const app = require('express')();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

app
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
