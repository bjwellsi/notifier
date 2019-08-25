let queries = require('../Model/table.js');
let express = require('express');
const app = express();
let cors = require('cors');

app.use(cors());

app.get('/getQuote', async (req, res) => {
    let qc = new queries();
    try {
        const results = await qc.getQuotes(req.query.username);
        //this isn't sufficient to send back, make it random 
        qc.close();
        return res.send(results[0].quote);
    } catch (err) {
        qc.close()
        console.log(err);
    }
})

app.listen(8080, () => {
    console.log('Listening on 8080...');
})

/*
let qc = new queries();


let bob = async () => {
    try {
        const res = await qc.getQuotes('me, bitch');
        console.log(res[0].quote);
        qc.close();
    } catch (err) {
        throw err;
    }
}
bob();
*/


