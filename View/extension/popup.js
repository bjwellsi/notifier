
let timer = document.getElementById('change timer');
let amount = document.getElementById('timer');

timer.addEventListener("click", () => {
    chrome.storage.sync.set({ timer: amount.value })
    
});

let listQuotes = document.getElementById('list quotes');
listQuotes.addEventListener("click", () => {
    //this url will eventually need to include the signed in user
    fetch('http://localhost:8080/quotes/?user=me')
    .then((res) =>{
        return res.json()
    }).then((data) => {
        const quotesDiv = document.getElementById('quote selection');
        const list = document.createElement('ol');
        let i = 0;
        let ret = data.ret.map(row => {
            let line = document.createElement('li');
            row.listLine = i;
            i++;
            let lineData = document.createTextNode(`"${row.quote}" -${row.author}`);
            line.append(lineData);
            list.append(line);
        });
        //todo make sure ret is getting initialized
        quotesDiv.append(list);
    })
})

let addQuote = document.getElementById('add quote');
addQuote.addEventListener('click', () => {
    //use the fetch url to add a member
    let quoteToAdd = document.getElementById('quote to add');
    let author = document.getElementById('author');
    let user = 'me';
    //change this eventually
    fetch(`http://localhost:8080/addQuote/?user=${user}&quote=${quoteToAdd.value}&author=${author.value}`)
    .then(res => {
        return res.json()
    }).then(data => {
        console.log(data)
    })
})