// define audio variable
// implemented in every browser? may need a workaround
let beep_audio = new Audio('beep.mp3');

function start_countdown() {
    var time = parseInt(document.getElementById('time_label').value);
    // if time < 60 sec, reformat! to the way you want it!!
    if (!isNaN(time)) {  // if input is a number - do other checks? 
    // NEED MORE INPUT VALIDATION & do error checking - write tests to error check?
    // note - if "30 check" is input - starts countdown from 30 bc parseInt
        var my_interval = setInterval(() => {  // do action every x seconds
            if (time === 0) {
                clearInterval(my_interval);
                // make alarm play on loop for 10 seconds
                // mess with volume?? - see macmost video maybe?? 
                // may be different on windows - need to test on both platforms?
                beep_audio.loop = true;
                beep_audio.play();
                setTimeout(() => beep_audio.loop = false, 10000);
            }
            else {  // time is NOT 0
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

// make 'enter' key trigger button click
document.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        e.preventDefault();  // prevent default behavior
        document.getElementById('start_button').click();  // trigger button click
    }
});

// if at any point the input box is clicked into - stop the timer (if it has started!!)!!
// - user trying to enter a new time!

// branch auto merging? no true master branch? confused
