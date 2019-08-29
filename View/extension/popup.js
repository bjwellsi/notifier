$(document).ready(function () {
    let timer = $('#change_timer_button');
    let amount = $('#timer');

    timer.on("click", () => {
        chrome.storage.sync.set({ timer: amount.value })

    });

    let listQuotes = $('#list_quotes');
    console.log($(listQuotes).val())
    $(listQuotes).on("click", () => {
        $('#remove_quotes').show()
        //this url will eventually need to include the signed in user
        fetch('http://localhost:8080/quotes/?user=me')
            .then((res) => {
                return res.json()
            }).then((data) => {
                const quotesDiv = $('#quote_selection');
                let list = $('#quote_list');
                data.ret.forEach(row => {
                    //let line = (`<li class="quote" value="${row.qid}>"${row.quote}" -${row.author}</li>`);
                    list.append('<li class="quote" value="' + row.qid +'">"' + row.quote + '" -' + row.author + '</li>');
                    /*line.text(`"${row.quote}" -${row.author}`);
                    line.val(row.qid);
                    list.append(line);
                    /*row.listLine = i;
                    i++;
                    let lineData = document.createTextNode(`"${row.quote}" -${row.author}`);
                    line.append(lineData);
                    list.append(line);*/
                });
                $('#remove_quote').css({'visibility' : 'visible'})
                //todo make sure ret is getting initialized
            })
    })

    let addQuote = $('#add_quote');
    addQuote.on('click', () => {
        //use the fetch url to add a member
        let quoteToAdd = $('#quote_to_add');
        let author = $('#author');
        let user = 'me';
        //change this eventually
        fetch(`http://localhost:8080/addQuote/?user=${user}&quote=${quoteToAdd.val()}&author=${author.val()}`)
            .then(res => {
                return res.json()
            }).then(data => {
                let para = $('#after_add_quote');
                if (data.succeeded == "true") para.text("Success!");
                else para.text("Failed!")
                console.log(data)
            })
    })
});