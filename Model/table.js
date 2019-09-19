const mysql = require('mysql');
class TableQuerys {
    constructor() {
        this.query = "SELECT ?? FROM ?? WHERE ?? = ?";
        this.add = "INSERT INTO ?? (??) VALUES (??);"
        this.edit = "UPDATE ?? SET ?? = ?? WHERE "

        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
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

    getQuotes(username) {
        //let query = "SELECT * FROM quotes WHERE username = '" + username +"';";
        let inserts = ['*', 'quotes', 'username', username];
        return new Promise((res, rej) => {
            this.connection.query(mysql.format(this.query, inserts), (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    exists(field, value, table) {
        try {
            let inserts = ['*', table, field, value];
            return new Promise((res, rej) => {
                this.connection.query(mysql.format(this.query, inserts), (err, results) => {
                    if (err) rej(err);
                    res(results);
                })
            }).then((data) => {
                if (data.length > 0)
                    return true;
                return false;
            }).catch((err) => {
                throw err;
            })
        } catch (err) {
            throw err;
        }
    }

    userExists(name) {
        return this.exists('username', name, 'users');
    }

    emailExists(email) {
        return this.exists('email', email, 'users');
    }

    createUser(username, email, password) {
        let inserts = ['users', 'username, email, password', `'${username}', '${email}', '${password}'`];
        let quer = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}');`;
        this.connection.query(quer, (err, results) => {
            if (err) throw err;
            console.log(results);
        });
    }

    addQuote(username, quote, author) {
        let quer = `INSERT INTO quotes (username, quote, author) VALUES ('${username}', '${quote}', '${author}');`;
        try {
            return new Promise((res, rej) => {
                this.connection.query(quer, (err, results) => {
                    if (err) rej(err);
                    res(results);
                })
            }).then(data => {
                return data.affectedRows > 0;
            }).catch(err => {
                return false;
            })
        } catch (err) {
            throw err;
        }
    }

    removeQuote(qid, username) {
        let quer = `DELETE FROM quotes WHERE qid = '${qid}' AND username = '${username}';`;
        try {
            return new Promise((res, rej) => {
                this.connection.query(quer, (err, results) => {
                    if (err) rej(err);
                    res(results);
                })
            }).then(data => {
                return data.affectedRows > 0;
            }).catch(err => {
                return false;
            })
        } catch (err) {
            throw err;
        }
    }
}

/*let qc = new TableQuerys();
qc.addQuote('e', 'Boggodsdflo', 'persdfsony').then((data) => {
    console.log(data);
    qc.close();
})
*/


module.exports = TableQuerys;
