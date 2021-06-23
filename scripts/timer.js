function start_countdown() {
    var time = parseInt(document.getElementById('time_label').value);
    // if time < 60 sec, reformat! to the way you want it!!
    if (!isNaN(time)) {  // if input is a number - do other checks? 
    // NEED MORE INPUT VALIDATION & do error checking - write tests to error check?
    // note - if "30 check" is input - starts countdown from 30 bc parseInt
        var myInterval = setInterval(() => {  // do action every x seconds
            if (time===0) {
                clearInterval(myInterval);
                // make some type of noise or alarm??
            }
            else {
                time--;
                document.getElementById('time_label').value = time;
            }
        }, 1000);  // decrease time by 1 every second if time!=0
    }
    else {
        alert("Please enter a number!!!");
    }
}

document.getElementById('start_button').addEventListener('click', start_countdown);