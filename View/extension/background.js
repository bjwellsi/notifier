//check for notification support
if (window.Notification) {
  display();
};

async function getTimer() {
  //todo reject with a default timer
  return new Promise((res, rej) => {
    chrome.storage.sync.get(['timer'], (timerData) => {
      if(!timerData.timer){
        rej()
      }
      else {
        res(timerData)
      }
    })
  }).then(data => {
    let interval = parseInt(data.timer, 10);
    console.log(typeof (interval) + ": " + interval);
    return interval;
  }).catch(err => {
    return 1000;
  })
}

chrome.storage.onChanged.addListener( async () => {
  clearInterval(theVal);
  display();
})

let theVal;

async function display() {

  //eventually want this to worker, get interval from storage
  /*chrome.storage.sync.get('timer', (data) =>{
    interval = data.timer;
  })*/
  let interval = await getTimer();

  theVal = setInterval(() => {
    //await a notification
    fetch('http://localhost:8080/getQuote/?username=me').then((response) => {
      response.json().then((data) => {
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
  }, await interval)
}