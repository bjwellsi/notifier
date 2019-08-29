$(document).ready(function () {
    let timer = $('#change_timer_button');
    let amount = $('#timer');

    timer.on("click", () => {
        chrome.storage.sync.set({ timer: amount.value })

    });

    let listQuotes = $('#list_quotes');
    $(listQuotes).on("click", () => {
        //$('#remove_quotes').show()
        //this url will eventually need to include the signed in user
        fetch('http://localhost:8080/quotes/?user=me')
            .then((res) => {
                return res.json()
            }).then((data) => {
                removeQuoteList();
                let list = $('#quote_list');
                data.ret.forEach(row => {
                    list.append('<li class="quote" name="' + row.qid + '">"' + row.quote + '" -' + row.author + '<button class="remove_quote">Remove Quote</button></li>');
                });
                //$('#remove_quote').css({ 'visibility': 'visible' })
                //todo make sure ret is getting initialized
                listenForQuoteDelete()
            })
    })

    function listenForQuoteDelete() {
        $('.quote').on('click', (event) => {
            let qidToRemove = $(event.currentTarget).attr('name');
            //remove qid from the list of quotes and the db
            let username = 'me'; //for now
            fetch('http://localhost:8080/removeQuote/?user=me&qid=' + qidToRemove)
                .then((res) => {
                    return res.json()
                }).then((data) => {
                    if (data.succeeded) {
                        //then:
                        $(event.currentTarget).remove();
                        //then:
                        //relist the quotes:
                        //should build an actual method to do this
                    }
                })

        })
    }

    function removeQuoteList() {
        //remove the quote list before redisplaying
        $('#quote_list').empty();
    }

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