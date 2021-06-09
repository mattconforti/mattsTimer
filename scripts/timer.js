function start_countdown() {
    var time = parseInt(document.getElementById('time_label').innerText);

    console.log(`Initial: ${time}`);
    var myInterval = setInterval(() => {
        if (time===0) {
            clearInterval(myInterval);
        }
        else {
            time--;
            document.getElementById('time_label').innerText = time;
        }

    }, 1000);  // decrease time by 1 every second if time!=0
}

document.getElementById('start_button').addEventListener('click', start_countdown);