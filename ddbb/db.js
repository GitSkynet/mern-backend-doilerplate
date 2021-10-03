module.exports = {
    ddbb: {
        connectionLimit: 10,
        host: process.env.HOSTSQL,
        user: process.env.USERMYSQL,
        password: process.env.PASSWORD,
        database: process.env.DATABASESQL
    },
};
