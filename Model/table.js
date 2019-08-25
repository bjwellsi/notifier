const mysql = require('mysql');
class TableQuerys {
    constructor() {
        this.query = "SELECT ?? FROM ?? WHERE ?? = ?";
        this.add = "INSERT INTO ?? (??) VALUES (??);"
        this.edit = "UPDATE ?? SET ?? = ?? WHERE "

        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'RhQYdMm8fk',
            database: 'annoyer'
        });

        this.connection.connect((err) => {
            if (err) throw err;
            console.log('Connected!');
        })
    }

    close() {
        this.connection.end((err) => {
            if (err) throw err;
            console.log('Disconnected!');
        })
    }

    getUser(username) {
        //let query = "SELECT * FROM users WHERE username = '" + username +"';";
        let inserts = ['*', 'users', 'username', username];
        return new Promise((res, rej) => {
            this.connection.query(mysql.format(this.query, inserts), (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    async getQuotes(username) {
        //let query = "SELECT * FROM quotes WHERE username = '" + username +"';";
        let inserts = ['*', 'quotes', 'username', username];
        return new Promise((res, rej) => {
            this.connection.query(mysql.format(this.query, inserts), (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }


    createUser(username, email, password) {
        let inserts = ['users', 'username, email, password', `'${username}', '${email}', '${password}'`];
        this.connection.query(mysql.format(this.add, inserts), (err, results) => {
            if (err) throw err;
            console.log(results);
        });
    }

    addQuote(username, quote, author) {
        let inserts = `INSERT INTO quotes (username, quote, author) VALUES ('${username}', '${quote}', '${author}');`;
        this.connection.query(inserts, (err) => {
            if (err) throw err;
            console.log(results);
        })
    }
}

module.exports = TableQuerys;