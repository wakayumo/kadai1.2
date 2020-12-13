require('dotenv').config();
const typeorm = require('typeorm');
const EntitySchema = typeorm.EntitySchema;
const connection = typeorm.createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'postgres',
    database: 'mydb',
    logging: true,
    synchronize: false,
    entities: [
        new EntitySchema(require('./entity/users')),
    ],
});
module.exports = connection;