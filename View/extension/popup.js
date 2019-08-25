
let timer = document.getElementById('change timer');
let amount = document.getElementById('timer');
timer.addEventListener(onClick, () => {
    chrome.storage.sync.set({ timer: amount.value })
    
});