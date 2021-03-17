import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import { sequelize } from './sequelize';

import { IndexRouter } from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import { config } from './config/config';
import { V0_FEED_MODELS } from './controllers/v0/model.index';


(async () => {
	await sequelize.addModels(V0_FEED_MODELS);
	await sequelize.sync();

	const app = express();
	const port = process.env.PORT || 8080;
	console.log(port);

	app.use(bodyParser.json());

	app.use(cors({
		allowedHeaders: [
			'Origin', 'X-Requested-With',
			'Content-Type', 'Accept',
			'X-Access-Token', 'Authorization',
		],
		methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
		origin: config.url,
	}));

	app.use('/api/v0/', IndexRouter);

	// Root URI call
	app.get('/', async (req, res) => {
		res.send('Response from Feed service');
	});

	// Root URI call
	app.get('/logs/:username', async (req, res) => {
		let { username } = req.params;
		let pid = uuidv4();
		console.log(new Date().toLocaleString() + `: ${pid} requested from ${username}`);

		res.send('Response from Feed service logging tool');

		console.log(new Date().toLocaleString() + `: ${pid} Finished processing request from ${username}`);
	});

	// Start the Server
	app.listen(port, () => {
		console.log(`server running ${config.url}`);
		console.log(`press CTRL+C to stop server`);
	});
})();
