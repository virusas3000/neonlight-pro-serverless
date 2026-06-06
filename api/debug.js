async function handler(req, res) {
  const results = {
    env: {
      DATABASE: process.env.DATABASE || 'missing',
      USERNAME: process.env.USERNAME || 'missing',
      PASSWORD: process.env.PASSWORD ? 'set (len ' + process.env.PASSWORD.length + ')' : 'missing',
      HOST: process.env.HOST || 'missing',
      TABLE_PREFIX: process.env.TABLE_PREFIX || 'missing',
      SKIP_MYSQL_SSL: process.env.SKIP_MYSQL_SSL || 'missing',
      VERCEL: process.env.VERCEL || 'missing',
    },
    headers: Object.keys(req.headers),
    url: req.url,
  };

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(results, null, 2));
}

module.exports = handler;
module.exports.handler = handler;
