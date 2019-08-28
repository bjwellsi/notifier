
let timer = document.getElementById('change timer');
let amount = document.getElementById('timer');
let listQuotes = document.getElementById('list quotes');

timer.addEventListener("click", () => {
    chrome.storage.sync.set({ timer: amount.value })
    
});

listQuotes.addEventListener("click", () => {
    //this url will eventually need to include the signed in user
    fetch('http://localhost:8080/quotes/?user=me')
    .then((res) =>{
        return res.json()
    }).then((data) => {
        const quotesDiv = document.getElementById('quote selection');
        const list = document.createElement('ol');
        let i = 0;
        data.ret.map(row => {
            let line = document.createElement('li');
            console.log(row.quote)
            row.listLine = i;
            i++;
            let lineData = document.createTextNode(`"${row.quote}" -${row.author}`);
            line.append(lineData);
            list.append(line);
        });
        quotesDiv.append(list);
    })
})