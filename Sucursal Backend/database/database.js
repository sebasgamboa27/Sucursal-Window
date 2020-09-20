const driver = require('mssql');

const config = {
    user: 'SA',
    password: '<hola1234>',
    server: 'localhost',
    database: 'PruebasBD2',
    port: 1433
};

console.log('Atempting connection to database...')
driver.connect(config, error => {
    if (error) {
        throw new Error(`Cannot connect to database\n${error}`);
    }else{
        console.log('Connected to database')
    }
});

module.exports = driver;