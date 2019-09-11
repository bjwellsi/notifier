let queries = require('../Model/table.js');
let express = require('express');
const app = express();
let cors = require('cors');

run();

function run() {
    //allow cross origin resources
    app.use(cors());

    //listen for every call
    getQuote();
    removeQuote();
    userExists();
    addQuote();
    allQuotes();

    //listen for the calls
    app.listen(8080, () => {
        console.log('Listening on 8080...');
    })
}

async function call(command, opp) {
    app.get(command, async (req, res) => {
        let qc = new queries();
        try {
            return opp(qc, req, res);
        } catch (err) {
            qc.close()
        }
    })
}

function getQuote() {
    call('/getQuote', async (qc, req, res) => {
        //randomly sends a quote from the user's list
        //right now it's just a random quote, eventually 
        //it would be nice to bias the randomness toward 
        //quotes that haven't been said in a minute
        const results = await qc.getQuotes(req.query.user);
        qc.close();
        let r = Math.floor(Math.random() * results.length);
        return res.send(
            {
                quote: results[r].quote,
                author: results[r].author

            });
    })
}

function removeQuote() {
    call('/removeQuote', async (qc, req, res) => {
        //remove the quote from the db
        const results = await qc.removeQuote(req.query.qid, req.query.user);
        qc.close();
        if (results) return res.send({ succeeded: "true" });
        else return res.send({ succeeded: "false" });
    })
}

function userExists() {
    call('/userExists', async (qc, req, res) => {
        const results = await qc.userExists(req.query.user);
        if (!results) {
            qc.createUser(req.query.user, req.query.email, req.query.pass).then(() => {
                qc.close();
                return res.send({ success: 'true' });
            });
        }
        else {
            qc.close()
            return res.send({ success: 'false' });
        };
    })
}

function addQuote() {
    call('/addQuote', async (qc, req, res) => {
        //this should change to post so you can have spaces and such
        const results = await qc.addQuote(req.query.user, req.query.quote, req.query.author);
        qc.close();
        if (results) return res.send({ succeeded: "true" });
        else return res.send({ succeeded: "false" });
    })
}

function allQuotes() {
    call('/quotes', async (qc, req, res) => {
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
    })
}