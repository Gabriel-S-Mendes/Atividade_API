require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Tente com 'postgres' primeiro
  host: 'localhost',
  database: 'mydb',
  password: 'postgres', // Substitua pela senha que você definiu
  port: 8000,
});

module.exports = pool;