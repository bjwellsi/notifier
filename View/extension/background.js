//check for notification support
if (window.Notification) {
  display();
};

function display() {
  setInterval(() => {
    //await a notification
    fetch('http://localhost:8080/getQuote/?username=me').then((response) => {
      response.json().then((data) => {
        console.log(data);
        //show the notification
        var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
        var hour = time[1] % 12 || 12;               // The prettyprinted hour.
        var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
        chrome.notifications.create('Quote', {
          type: 'basic',
          iconUrl: 'images/get_started16.png',
          message: data.quote,
          title: data.author
        });
      });

    });
  }, 1000)
}