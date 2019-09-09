let identiy;
chrome.identity.getProfileUserInfo(function(userInfo){
    identity = userInfo.id;
});

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

  let interval = await getTimer();

  theVal = setInterval(() => {
    //await a notification
    fetch('http://localhost:8080/getQuote/?username=' + identity).then((response) => {
      response.json().then((data) => {
        //show the notification
          chrome.notifications.create('Quote', {
          type: 'basic',
          iconUrl: 'images/annoyed16.png',
          message: data.quote,
          title: data.author
        });
      });
    });
  }, interval)
}