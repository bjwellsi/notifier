let identity;
let email;
let pass;
new Promise((res) => {
  chrome.identity.getProfileUserInfo(function (userInfo) {
    identity = userInfo.id;
    email = userInfo.email;
    pass = 'pass';
    res();
  })
}).then(() => {
  //check for existence of user profile
  fetch(`http://localhost:8080/userExists/?user=${identity}&email=${email}&pass=${pass}`).then(() => {
    //check for notification support
    if (window.Notification) {
      display();
    };
    chrome.storage.onChanged.addListener(async () => {
      display();
    })
  })
});
//^the rest of the app should wait on this call


async function getTimer() {
  //returns the interval to display quotes at
  return new Promise((res, rej) => {
    chrome.storage.sync.get(['timer'], (timerData) => {
      if (!timerData.timer) {
        res(5)
      }
      else {
        res(timerData)
      }
    })
  }).then(data => {
    let interval = parseInt(data.timer, 10);
    return interval;
  }).catch(err => {
    //fail fast
    throw err;
  })
}

async function display() {
  //clear any current alarms first:
  chrome.alarms.clear('annoyer');

  let interval = await getTimer();
  chrome.alarms.create('annoyer', {delayInMinutes: interval, periodInMinutes: interval});
  chrome.alarms.onAlarm.addListener(() => {
    fetch('http://localhost:8080/getQuote/?user=' + identity)
      .then((response) => {
        return response.json();
      }).then((data) => {
        //show the notification
        chrome.notifications.create('Quote', {
          type: 'basic',
          iconUrl: 'images/annoyed16.png',
          message: data.quote,
          title: data.author
        });
      });
  });
}

/*let identiy;
let email;
let pass;
let theVal;
new Promise((res) => {
  chrome.identity.getProfileUserInfo(function (userInfo) {
    identity = userInfo.id;
    email = userInfo.email;
    pass = 'pass';
    res()
  })
}).then(() => {
  //check for existence of user profile
  fetch(`http://localhost:8080/userExists/?user=${identity}&email=${email}&pass=${pass}`).then(() => {
    console.log('donQuotee');
    //check for notification support
    if (window.Notification) {
      display();
    };
    chrome.storage.onChanged.addListener(async () => {
      clearInterval(theVal);
      display();
    })
  })
});
//^the rest of the app should wait on this call


async function getTimer() {
  //todo reject with a default timer
  return new Promise((res, rej) => {
    chrome.storage.sync.get(['timer'], (timerData) => {
      if (!timerData.timer) {
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

async function display() {

  //eventually want this to worker, get interval from storage

  let interval = await getTimer();

  chrome.alarms.create('annoyer', {delayInMinutes: 1, periodInMinutes: 1});
  chrome.alarms.onAlarm.addListener(() => {
    console.log('yo');
    chrome.notifications.create('Alarm', {
      type: 'basic',
      iconUrl: 'images/annoyed16.png',
      message: 'an alarm just happened',
      title: 'yeet'
    });
  });
  theVal = setInterval(() => {
    //await a notification
    fetch('http://localhost:8080/getQuote/?user=' + identity)
      .then((response) => {
        return response.json();
      }).then((data) => {
        //show the notification
        chrome.notifications.create('Quote', {
          type: 'basic',
          iconUrl: 'images/annoyed16.png',
          message: data.quote,
          title: data.author
        });
      });
  }, interval);
}*/