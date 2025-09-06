const pool = require('./db');

async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('Conexão bem-sucedida! Hora do servidor:', result.rows[0]);
    client.release();
  } catch (err) {
    console.error('Erro na conexão:', err.stack);
  }
}

testConnection();