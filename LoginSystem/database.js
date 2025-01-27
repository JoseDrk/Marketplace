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


async function connectToDB() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Conexión a SQL Server exitosa');
        return pool;
    } catch (err) {
        console.error('Error conectando a la base de datos:', err);
        throw err;
    }
}

module.exports = { connectToDB, sql };
