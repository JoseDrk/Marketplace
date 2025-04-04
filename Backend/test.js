const { getDBConnection } = require('./database');

async function testConnection() {
    try {
        const pool = await getDBConnection();
        console.log('✅ Conexión exitosa a la base de datos.');
        pool.close(); // Cierra la conexión después de la prueba
    } catch (err) {
        console.error('❌ Error conectando a la base de datos:', err);
    }
}

testConnection();

