const express = require('express');
const methodOverride = require('method-override');
const history = require('connect-history-api-fallback');
const {writeError} = require('./helpers/response');
const {initialize} = require('./db/initialize');
const {
  authRouter,
  adsRouter,
} = require('./routers');

const app = express();

const historyMiddleware = history({
  verbose: false,
});
app
  .use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      next();
    } else {
      return historyMiddleware(req, res, next);
    }
  })

const api = express();

app.use('/api', api);


app.set('port', 4000);

api.use(express.json());
api.use(methodOverride());

// api routes
api.use('/auth', authRouter);
api.use('/ads', adsRouter);

// api error handler
api.use((err, req, res, next) => {
  if (err && err.status) {
    writeError(res, err);
  } else next(err);
});

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(
    `Express server listening on port ${app.get('port')} see docs at /docs`,
  );
  /** We need to check the initialization state in here. */
  initialize();
});
