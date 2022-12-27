const RedisGraph = require('redisgraph.js').Graph;

const graphName = 'AdsApp';
const host = 'localhost'
const port = 6379;
const password = 'admin';

const graph = new RedisGraph(graphName, host, port, {password});

const session = {
  ...graph,
  query: async (...args) => {
    let functionName, pathName;
    {
      try {
        const stack = Error().stack;
        const [f, path] = stack.split('at').slice(1, 3).pop().trim().split(' ');
        try {
          const [, fname] = f.split('.');
          functionName = fname;
        } catch (_) {}
        try {
          const p = path
            .split(')')
            .join('')
            .split('\\')
            .reverse()
            .slice(0, 3)
            .reverse()
            .reduce((a, b) => (a === '' ? b : a + '/' + b), '');
          pathName = p;
        } catch (_) {}
      } catch (_) {}
    }
    let query;
    {
      const [theQuery, values] = args;
      if (values) {
        for (const [key, value] of Object.entries(values)) {
          const theKey = '$' + key;
          query = theQuery.split(theKey).join(`"${value}"`);
        }
      } else {
        query = theQuery;
      }
    }

    console.log(functionName, pathName);
    console.log(query + '\n');
    return await graph.query(...args);
  },
};

exports.getSession =
  process.env.LOG_QUERIES === '1' ? () => session : () => graph;
