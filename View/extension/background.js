  //check for notification support
if(window.Notification) {
    setInterval(() => {
        //show the notification
        var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
        var hour = time[1] % 12 || 12;               // The prettyprinted hour.
        var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
        chrome.notifications.create('fuck my but', {
            type: 'basic',
            iconUrl: 'images/get_started16.png',
            message: 'some words.',
            title: 'yoooo'
          });
    }, 10000)
};