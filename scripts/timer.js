// NOTE - TIMER IS SLOWWWWWWWW. TESTED IT VS. IPHONE TIMER! need a closer look
// test to figure out whats going on. where & why is it slow? where does it start
// to get slower vs an already established timer?? b/c based on computer clock? 
// would run slower/faster on a different machine?? may need a more accurate 1000ms
// in setInterval!!

// define audio variable
// implemented in every browser? may need a workaround
let beep_audio = new Audio('beep.mp3');

// REFACTOR CODE TO HAVE ALL LABELS AT THE TOP OF THE PROGRAM - will need them
// in just about every function
function resetTimer() {
    let labels = document.getElementsByClassName('time_labels');
    for(let i = 0; i < labels.length; i++) {
        labels[i].value = '00';
        // STOP THE COUNTDOWN!!!! but how?? interval not visible here is it?
    }
}

function start_countdown() {
    let hours_label = document.getElementById('hour_label');
    let mins_label = document.getElementById('min_label');
    let seconds_label = document.getElementById('sec_label');

    // get int values from html objects
    let hours_val = parseInt(hours_label.value);
    let mins_val = parseInt(mins_label.value);
    let seconds_val = parseInt(seconds_label.value);

    // INPUT REFORMATTING LOGIC HERE
    // ADD '0' to number if necessary
    // - can refactor this part? switch statement/non-short-circuited or?
    if (hours_val.toString().length === 1) {
        hours_val = '0' + hours_val.toString();
        // update label with new format
        hours_label.value = hours_val;
        // NEED TO MAKE FONT MONOSPACED BECAUSE '1' is smaller than '0' etc.
        // funny looking spacing!!
    }

    if (mins_val.toString().length === 1) {
        mins_val = '0' + mins_val.toString();
        mins_label.value = mins_val;
    }

    if (seconds_val.toString().length === 1) {
        seconds_val = '0' + seconds_val.toString();
        seconds_label.value = seconds_val;
    }

    // VERY tricky with data types - depends on if i add '0' etc. NEED TO REFACTOR
    // case of turning 60 seconds into 1 min... 60 mins to 1 hour... etc
    // DO I EVEN NEED THIS PART? IF A USER WANTS 60 seconds shouldnt we let them have it? 
    // user will type in the format they want...
    if (seconds_val >= 60) {  // allow users 120 seconds input? need more logic for this
        mins_label.value = parseInt(mins_val) + 1;  // add 1 to minute label
        if (mins_label.value.toString().length === 1) {  // add leading zero if necessary
            mins_label.value = '0' + mins_label.value.toString();
        }
        let remaining_seconds = seconds_val - 60;  // remaining time after reformatted min
        if (remaining_seconds.toString().length === 1) {
            remaining_seconds = '0' + remaining_seconds.toString();
            seconds_label.value = remaining_seconds;
        }
        else {
            seconds_label.value = remaining_seconds;
        }
    }

    if (mins_val >= 60) {
        hours_label.value = parseInt(hours_val) + 1;
        if (hours_label.value.toString().length === 1) {
            hours_label.value = '0' + hours_label.value.toString();
        }
        let remaining_mins = mins_val - 60;
        if(remaining_mins.toString().length === 1) {
            remaining_mins = '0' + remaining_mins.toString();
            mins_label.value = remaining_mins;
        }
        else {
            mins_label.value = remaining_mins;
        }
    }

    // TEST THIS CODE!!!! ^^

    // print reformatted starting time for debugging

    // INPUT VALIDATION HERE
    // need cases when 1 min goes down to 59 seconds, etc
    var my_interval = setInterval(() => {
        if (seconds_val === '00') {  // no seconds left
            // check how many minutes and hours are left
            if((mins_val === '00') && (hours_val === '00')) {
                // TIMER DONE! STOP COUNTING & SOUND ALARM
                clearInterval(my_interval);
                beep_audio.loop = true;
                beep_audio.play();
                setTimeout(() => beep_audio.loop = false, 10000);
            }
            else {
                if (mins_val === '00') {
                    // theres only hours left
                }
                else {
                    mins_val--;
                    if (mins_val.toString().length === 1) {
                        mins_val = '0' + mins_val.toString();
                    }
                    mins_label.value = mins_val;
                    seconds_val = 59;  // DOES THIS LOSE A SECOND??
                    seconds_label.value = seconds_val;
                    return;  // next interval iteration
                }
                // LOGIC IS MESSED UP? NEED TO TEST MORE.
                // EX - input 60 mins

                // check how many minutes. if no minutes, check how many hours
                // if minutes, start turning minutes into seconds
                // if no minutes but hours, turn hours into minutes & seconds etc
                // GET IT TO WORK NOW, REFACTOR & IMPROVE LOGIC LATER
                // CAN ALSO LOOK AT OTHER PEOPLES SOLUTIONS FOR MORE REFACTORING
                // & possible cleaning & simplification
            }
        }
        else {  // more seconds left
            seconds_val--;
            if (seconds_val.toString().length === 1) {
                seconds_val = '0' + seconds_val.toString();
            }
            document.getElementById('sec_label').value = seconds_val;
        }     
    }, 1000);

    /*
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
    */
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
input_boxes = document.getElementsByClassName('time_labels');
for (let c = 0; c < input_boxes.length; c++) {  // use foreach instead??
    input_boxes[c].addEventListener('click', resetTimer);
}
