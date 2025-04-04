const sql = require('mssql');

const dbConfig = {
    user: 'sa',
    password: '123456!',
    server: 'localhost',
    database: 'marketplace',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

let poolPromise;

async function getDBConnection() {
    if (!poolPromise) {
        console.log('Creando nueva conexión a la base de datos...');
        poolPromise = sql.connect(dbConfig);
    }
    return poolPromise;
}

module.exports = { getDBConnection, sql };
