$(document).ready(function() {
    let amount = $('#timer');

    $('#change_timer_button').on("click", () => {
        //todo change format so this is either minutes or seconds
        chrome.storage.sync.set({ 'timer': amount[0].value })
            //display that the interval has changed:

    });
    let listQuotes = $('#list_quotes');
    $(listQuotes).on("click", () => {
        listTheQuotes();
    })

    /*$("#test_auth").on('click', () => {
        fetch('http://localhost:3000').then(res => {
            console.log(res);
        })
    })*/

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
                if (data.succeeded != "true") para.text("Failed!")
                listTheQuotes();
            })
    })

    function listTheQuotes() {
        //$('#remove_quotes').show()
        //this url will eventually need to include the signed in user
        fetch('http://localhost:8080/quotes/?user=me')
            .then((res) => {
                return res.json()
            }).then((data) => {
                $('#quote_list').empty(); //to refresh the quote list
                let list = $('#quote_list');
                data.ret.forEach(row => {
                    list.append('<li class="quote" name="' + row.qid + '">"' + row.quote + '" <br>-' + row.author + '<br><button class="remove_quote">Remove Quote</button></li>');
                });
                //$('#remove_quote').css({ 'visibility': 'visible' })
                //todo make sure ret is getting initialized

                listenForQuoteDelete()
            })
    }
});