const mysql = require('mysql2/promise');

module.exports = async (req, res) => {
  const results = {
    env: {
      DATABASE: process.env.DATABASE ? 'set' : 'missing',
      USERNAME: process.env.USERNAME ? 'set' : 'missing',
      PASSWORD: process.env.PASSWORD ? 'set' : 'missing',
      HOST: process.env.HOST ? 'set' : 'missing',
      TABLE_PREFIX: process.env.TABLE_PREFIX ? 'set' : 'missing',
    },
    connection: null,
    tables: null,
    error: null,
  };

  try {
    const conn = await mysql.createConnection({
      host: process.env.HOST.split(':')[0],
      port: process.env.HOST.includes(':') ? parseInt(process.env.HOST.split(':')[1]) : 3306,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      ssl: { rejectUnauthorized: false },
    });

    const [rows] = await conn.execute('SHOW TABLES');
    results.tables = rows.map(r => Object.values(r)[0]);
    results.connection = 'OK';
    await conn.end();
  } catch (err) {
    results.error = err.message;
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(results);
};
