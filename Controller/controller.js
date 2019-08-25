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
        let r = Math.floor(Math.random()*results.length);
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


