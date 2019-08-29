$(document).ready(function () {
    let timer = $('#change_timer_button');
    let amount = $('#timer');

    timer.on("click", () => {
        chrome.storage.sync.set({ timer: amount.value })

    });

    let listQuotes = $('#list_quotes');
    console.log($(listQuotes).val())
    $(listQuotes).on("click", () => {
        //this url will eventually need to include the signed in user
        fetch('http://localhost:8080/quotes/?user=me')
            .then((res) => {
                return res.json()
            }).then((data) => {
                const quotesDiv = $('#quote_selection');
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

    let addQuote = $('#add_quote');
    addQuote.on('click', () => {
        //use the fetch url to add a member
        let quoteToAdd = $('#quote_to_add');
        let author = $('#author');
        let user = 'me';
        //change this eventually
        fetch(`http://localhost:8080/addQuote/?user=${user}&quote=${quoteToAdd.value}&author=${author.value}`)
            .then(res => {
                return res.json()
            }).then(data => {
                let para = $('#after_add_quote');
                if (data.succeeded == "true") para.text("Success!");
                else para.text("Failed!")
                console.log(data)
            })
    })

    let removeQuote = $('#add_quote');
    removeQuote.on('click', () => {
        //use the fetch url to add a member
        let quoteToAdd = $('#quote_to_add');
        let author = $('#author');
        let user = 'me';
        //change this eventually
        fetch(`http://localhost:8080/addQuote/?user=${user}&quote=${quoteToAdd.value}&author=${author.value}`)
            .then(res => {
                return res.json()
            }).then(data => {
                let para = $('#after_remove_quote');
                if (data.succeeded == "true") para.val("Success!");
                else para.val("Failed!")
                console.log(data)
            })
    })
});