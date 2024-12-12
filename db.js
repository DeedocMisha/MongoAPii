//НЕ НУЖЕН Т,К ЕСТЬ MONGOOSE


const { MongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017/moviebox'; // Укажите только адрес базы данных, без конкретной БД
let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(URL)
            .then(client => {
                console.log('Connected to DB');
                dbConnection = client.db(); // Измените имя базы данных, если необходимо
                return cb(); // Успешное подключение, вызываем колбек
            })
            .catch(err => {
                console.error('Database connection error:', err);
                return cb(err); // Возвращаем ошибку в колбек
            });
    },
    getDb: () => dbConnection,
};
