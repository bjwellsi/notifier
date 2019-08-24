const mysql = require('mysql');




class tableQuerys {
    constructor() {
        this.query = "SELECT ?? FROM ?? WHERE ?? = ?";
        this.add = "INSERT INTO ?? (??) ADD (??);"
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
        this.connection.query(mysql.format(this.query, inserts), (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    }

    getQuotes(username) {
        //let query = "SELECT * FROM quotes WHERE username = '" + username +"';";
        let inserts = ['*', 'quotes', 'username', username];
        this.connection.query(mysql.format(this.query, inserts), (err, result) => {
            if (err) throw err;
            console.log(result);
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
        let inserts = ['quotes', 'username, quote, author', `'${username}', '${quote}', '${author}'`];
        this.connection.query(mysql.format(this.add, inserts), (err, results) => {
            if (err) throw err;
            console.log(results);
        })
    }
}

let tc = new tableQuerys();

tc.getUser('me, bitch');
tc.getQuotes('me, bitch');

tc.close();