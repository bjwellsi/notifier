$(document).ready(function () {
    $('#body').hide();
    $('#body').slideDown(500);
    $('#changed').hide()

    let identiy;
    chrome.identity.getProfileUserInfo(function (userInfo) {
        identity = userInfo.id;
        console.log(identity)
    });

    let pause = $('#pause')
    $(pause).on('click', () => {
        $(pause).toggleClass('gray');
        console.log('hello')
        //if it exists:
        chrome.alarms.clear('annoyer', (cleared) => {
            console.log(cleared);
            if (!cleared) {
                chrome.alarms.create('annoyer', { delayInMinutes: interval, periodInMinutes: interval });
            }
        });
    });

    let amount = $('#number');
    $('#change_timer_button').on("click", () => {
        let time = amount[0].value;
        if ($('#time_unit')[0].value == 'hours') {
            time *= 60;
        }
        chrome.storage.sync.set({ 'timer': time });
        $('#changed').fadeIn(1000);
        if (!$(pause).hasClass('gray')) {
            $(pause).addClass('gray');
        }
        setTimeout(() => {
            $('#changed').slideUp(1000);
        }, 3000);
    });

    let listQuotes = $('#list_quotes');
    $(listQuotes).on("click", () => {
        listTheQuotes();
    })

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
                        $(event.currentTarget).remove();
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
        fetch('http://localhost:8080/quotes/?user=' + identity)
            .then((res) => {
                return res.json()
            }).then((data) => {
                $('#quote_list').empty(); //to refresh the quote list
                let list = $('#quote_list');
                data.ret.forEach(row => {
                    list.append('<li class="quote" name="' + row.qid + '">"' + row.quote + '" <br>-' + row.author + '<br><button class="remove_quote">Remove Quote</button></li>');
                });
                listenForQuoteDelete()
            })
    }
});