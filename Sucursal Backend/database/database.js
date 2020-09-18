const driver = require('mssql');

const config = {
    user: 'sa',
    password: 'password',
    server: 'localhost',
    database: 'Sucursales',
    port: 1434
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