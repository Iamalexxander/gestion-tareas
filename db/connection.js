const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.postgres_uri

});

async function setupDatabase() {
    try {
        console.log('🔗 Conectando a la base de datos...');
        
        // Probar conexión
        await pool.query('SELECT NOW()');
        console.log('✅ Conexión exitosa');
        
        // Crear tabla usuario
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuario (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                contrasena VARCHAR(100) NOT NULL
            )
        `);
        
        console.log('✅ Tabla usuario creada');
        
        // Crear tabla tarea
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tarea (
                id SERIAL PRIMARY KEY,
                titulo VARCHAR(100) NOT NULL,
                descripcion TEXT,
                estado VARCHAR(15),
                id_usuario INTEGER REFERENCES usuario(id)
            )
        `);
        
        console.log('✅ Tabla tarea creada');
        
        console.log('✅ Tablas creadas sin datos de ejemplo');
        
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

setupDatabase();

module.exports = pool;