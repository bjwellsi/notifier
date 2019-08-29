let queries = require('../Model/table.js');
let express = require('express');
const app = express();
let cors = require('cors');

app.use(cors());

app.get('/getQuote', async (req, res) => {
    //randomly sends a quote from the user's list
    //right now it's just a random quote, eventually 
    //it would be nice to bias the randomness toward 
    //quotes that haven't been said in a minute
    let qc = new queries();
    try {
        const results = await qc.getQuotes(req.query.username);
        qc.close();
        let r = Math.floor(Math.random() * results.length);
        return res.send(
            {
                quote: results[r].quote,
                author: results[r].author

            });
    } catch (err) {
        qc.close()
        console.log(err);
    }
})

app.get('/checkuser', async (req, res) => {
    //validates the username for account creation
    let qc = new queries();
    try {
        const results = await qc.userExists(req.query.user);
        qc.close();
        return res.send({ exists: results });
    } catch (err) {
        qc.close();
        console.log(err);
    }
})

app.get('/checkemail', async (req, res) => {
    //validates the username for account creation
    let qc = new queries();
    try {
        const results = await qc.emailExists(req.query.email);
        qc.close();
        return res.send({ exists: results });
    } catch (err) {
        qc.close();
        console.log(err);
    }
})

app.get('/quotes', async (req, res) => {
    let qc = new queries();
    try {
        const results = await qc.getQuotes(req.query.user)
        qc.close()
        let ret = results.map((row) => {
            return {
                quote: row.quote,
                author: row.author,
                qid: row.qid
            }
        });
        return res.send({ ret })
    } catch (err) {
        qc.close();
        console.log(err);
    }
})

app.get('/addQuote', async (req, res) => {
    let qc = new queries();
    try {
        //this should change to post so you can have spaces and such
        const results = await qc.addQuote(req.query.user, req.query.quote, req.query.author);
        qc.close();
        if (results) return res.send({ succeeded: "true" });
        else return res.send({ succeeded: "false" });
    } catch (err) {
        qc.close();
        console.log(err);
    }
})

app.get('/removeQuote', async (req, res) => {
    let qc = new queries();
    try {
        //remove the quote from the db
        const results = await qc.removeQuote(req.query.qid, req.query.user);
        qc.close();
        if (results) return res.send({ succeeded: "true" });
        else return res.send({ succeeded: "false" });
    } catch (err) {
        qc.close();
        console.log(err);
    }
})

app.listen(8080, () => {
    console.log('Listening on 8080...');
})


