/**
 * Script para insertar datos de prueba en MongoDB
 * 
 * Ejecutar con: node src/seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Bebedero = require('./models/Bebedero');

// Datos de prueba
const bebederosData = [
    {
        nombre: "Bebedero Plaza Matriz",
        ubicacion: "Plaza Matriz, Centro Histórico de Montevideo",
        estado: "operativo",
        caudal: 2.5,
        fechaRegistro: new Date("2024-01-15")
    },
    {
        nombre: "Bebedero Parque Rodó",
        ubicacion: "Entrada principal del Parque Rodó, Montevideo",
        estado: "operativo",
        caudal: 3.0,
        fechaRegistro: new Date("2024-02-20")
    },
    {
        nombre: "Bebedero Rambla Pocitos",
        ubicacion: "Rambla República de México, frente a Playa Pocitos",
        estado: "mantenimiento",
        caudal: 1.8,
        fechaRegistro: new Date("2024-03-10")
    },
    {
        nombre: "Bebedero Ciudad Vieja",
        ubicacion: "Calle Peatonal Sarandí esquina Ituzaingó",
        estado: "fuera de servicio",
        caudal: 2.0,
        fechaRegistro: new Date("2024-04-05")
    },
    {
        nombre: "Bebedero Parque Batlle",
        ubicacion: "Av. Dr. Américo Ricaldoni, Parque Batlle",
        estado: "operativo",
        caudal: 4.5,
        fechaRegistro: new Date("2024-05-12")
    },
    {
        nombre: "Bebedero Prado",
        ubicacion: "Av. Buschental, entrada al Jardín Botánico",
        estado: "operativo",
        caudal: 3.2,
        fechaRegistro: new Date("2024-06-18")
    },
    {
        nombre: "Bebedero Carrasco",
        ubicacion: "Plaza de los Olímpicos, Carrasco",
        estado: "mantenimiento",
        caudal: 2.8,
        fechaRegistro: new Date("2024-07-25")
    },
    {
        nombre: "Bebedero Malvín",
        ubicacion: "Rambla O'Higgins, Playa Malvín",
        estado: "operativo",
        caudal: 2.2,
        fechaRegistro: new Date("2024-08-30")
    }
];

const seedDatabase = async () => {
    try {
        // Conectar a MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB');

        // Limpiar colección existente
        await Bebedero.deleteMany({});
        console.log('���️  Colección limpiada');

        // Insertar datos de prueba
        const bebederos = await Bebedero.insertMany(bebederosData);
        console.log(`✅ ${bebederos.length} bebederos insertados`);

        // Mostrar los bebederos insertados
        console.log('\n��� Bebederos insertados:');
        bebederos.forEach((b, i) => {
            console.log(`   ${i + 1}. ${b.nombre} (${b.estado})`);
        });

        // Cerrar conexión
        await mongoose.connection.close();
        console.log('\n✅ Conexión cerrada');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedDatabase();
