const express = require('express');
const app = express();
const path = require('path');
const port = process.env.NODE_PORT || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');

// db
const models = require('./api/models');

// App API
const apiRouter = require('./api/routes/index');

// configure our app to handle CORS requests
app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'localhost');
	res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

// This disables the ability for attackers to know that Express is
// being used, so they can't perform Express specific attacks
app.disable('x-powered-by');

// if prod, output to a log. if dev, print to console
if (process.env.NODE_ENV === 'production') {
	const logDirectory = path.join(__dirname, 'log');
	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

	const accessLogStream = rfs('access.log', {
		interval: '1d', // rotate daily
		path: logDirectory
	});

	app.use(morgan('common', { stream: accessLogStream }));

} else {
	app.use(morgan('dev'));
}

// handle application/json content type
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'www')));
app.use('/api', apiRouter);

// if it doesn't match the API, let the frontend handle it
app.get('*', (_, res) => {
	res.sendFile(`${path.join(__dirname, 'www')}/index.html`);
});

// sync with database
models.sequelize.sync().then(() => {
	app.listen(port, err => {
		if (err) {
			return console.error(err);
		}
		console.log(`HTTP server listening on port ${port}`);
	});
});
