$(document).ready(function () {
  //global variables for time and alarm
  var hours;
  var minutes;
  var alarmHours = 25;
  var alarmMinutes = 61;
  var resetFlag = false;
  var alarmMeridiem = "";

  var populateHours = function () {
    for (var i = 1; i <= 12; i++) {
      $('#alarm-hour').append('<option value=' + i + '>' + i + '</option>');
    }
  }

  var populateMinutes = function () {
    for (var i = 0; i <= 60; i++) {
      $('#alarm-minute').append('<option value=' + i + '>' + appendZeroTime(i) + '</option>');
    }
  }

  var updateTime = function () {
    //get time
    var today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var meridiem;
    if (hours < 12) {
      meridiem = "AM";
    } else {
      meridiem = "PM";
    }
    var twelveHour = hours%12;
    if (twelveHour===0) {
      twelveHour = 12;
    }
    $('h1').html(appendZeroTime(twelveHour) + ":" + appendZeroTime(minutes) + ":" + appendZeroTime(seconds) + " <span id='meridiem'>" + meridiem + '</span>');
    var colorSeconds = seconds*4;
    var colorMinutes = minutes*4;
    var colorHours = hours*10;
    $('body').css({ "background-color": "rgba(" + colorHours + ", " + colorMinutes + ", " +  colorSeconds + ",1.0)"});
    checkTime();
  }

  var appendZeroTime = function (number) {
    return number > 9 ? "" + number: "0" + number;
  }

  var checkTime = function () {
    if (Number(alarmHours) === Number(hours) && Number(alarmMinutes) === Number(minutes) && !resetFlag) {
      if (myAudio.paused) {
        //Create pause button
        $('#alarm-settings').slideDown();
      }
      myAudio.play();
    }
  }

  myAudio = new Audio('../audio/Loud-alarm-clock-sound.wav'); 
    if (typeof myAudio.loop == 'boolean')
    {
        myAudio.loop = true;
    }
    else
    {
        myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }



  $('#timer').change(function () {
    alarmHours = $('#alarm-hour').val();
    alarmMinutes = $('#alarm-minute').val(); 
    alarmMeridiem = $('#alarm-meridiem').val();
    if (alarmMeridiem==='pm' && alarmHours > 12) {
      alarmHours = Number(alarmHours) + 12;
    }
    if (alarmMeridiem==='am' && alarmHours ==='12') {
      alarmHours = 0;
    }
    console.log(alarmHours + ':' + alarmMinutes + alarmMeridiem);
  });

  $(document).on('click', '#reset', function() {
    myAudio.pause();
    resetFlag = true;
    $('#alarm-settings').slideUp();
  });

  updateTime();
  populateHours();
  populateMinutes();
  var timer = setInterval(updateTime,1000);
});