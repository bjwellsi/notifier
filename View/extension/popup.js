$(document).ready(function () {
    
    let identiy;
    chrome.identity.getProfileUserInfo(function(userInfo){
        identity = userInfo.id;
        console.log(identity)
    });

    let amount = $('#number');
    $('#change_timer_button').on("click", () => {
        //todo change format so this is either minutes or seconds
        let milis = amount[0].value;
        console.log(milis)
        let time = milis * 1000;
        if ($('#time_unit')[0].value == 'minutes') {
            time *= 60;
        } else if (('$time_unit')[0].value == 'hours') {
            time *= 360;
        }
        chrome.storage.sync.set({ 'timer': time })

        //chrome.storage.sync.set({ 'timer': amount[0].value })
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
            let username = identity; //for now
            fetch('http://localhost:8080/removeQuote/?user=' + username + '&qid=' + qidToRemove)
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
    $('#quote_to_add').on('click', () => {
        addQuote.css({
            'display': 'block'
        });
    })

    addQuote.on('click', () => {
        //use the fetch url to add a member
        let quoteToAdd = $('#quote_to_add');
        let author = $('#author');
        let user = identity;
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
        fetch('http://localhost:8080/quotes/?user=' + identity)
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