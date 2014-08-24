

$(function () {
    setInterval(viewClock, 1000);
    //domTableFromXML();
    //domTableFromXMLWorkout();
    loadJSONDoc();
    //writeTableFromXML();
});


function viewClock() {
    date = new Date();
    //$("#clock").html(new Date().toLocaleString());
    $("#clock").html(pad(date.getHours()) + ":" + pad(date.getMinutes()));
};

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
};

var currentSet = 0;
function onStartButton() {
    currentSet = 1;
    $('#currentSet').html(currentSet);
}
function onIncrementSet() {
    ++currentSet;
    $('#currentSet').html(currentSet);
}
function onDecrementSet() {
    if(currentSet > 1)
        --currentSet;
    $('#currentSet').html(currentSet);
}
/*
var stopWatch = {
    duration: 0,
    interval: 0,
    state: "stopped",   
    start: function () {
        stopWatch.startTime = new Date();
        stopWatch.duration = 0;
        interval= setInterval(stopWatch.viewDuration, 1000);
        $('#startButton').html("Stoppa");
        stopWatch.state = "started";
    },
    stop: function () {
        clearInterval(interval);
        $('#startButton').html("Omstart");
        stopWatch.state = "stopped";
    },

    viewDuration: function () {
        ++stopWatch.duration;
        $('#duration').html(stopWatch.getDurationString(stopWatch.duration));
    },

    getDurationString: function (date1, date2) {

        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var durationString = "";
        var milliseconds;

        milliseconds = date1.getTime() - date2.getTime();
        hours = Math.floor(milliseconds / (1000*60*60) % 24);
        minutes = Math.floor(((milliseconds / (1000 * 60)) % 60));
        seconds = Math.floor((milliseconds / 1000) % 60);
        durationString += stopWatch.pad(hours) + ":";
        durationString += stopWatch.pad(minutes) + ":";
        durationString += stopWatch.pad(seconds);
        return durationString;
    },
    getDurationString: function (durationSeconds) {

        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var durationString = "";

        hours = Math.floor(durationSeconds / (60 * 60) % 24);
        minutes = Math.floor(((durationSeconds / 60) % 60));
        seconds = Math.floor(durationSeconds % 60);
        durationString += stopWatch.pad(hours) + ":";
        durationString += stopWatch.pad(minutes) + ":";
        durationString += stopWatch.pad(seconds);
        return durationString;
    },
    pad: function (n) {
        return (n < 10) ? ("0" + n) : n;
    },

    onButton: function () {
        if (stopWatch.state == "stopped")
            stopWatch.start();
        else
            stopWatch.stop();

    }
};

*/

function stopWatch(id) {
    this.id = id;
    this.duration = 0;
    this.interval = 0;
    this.state = "stopped";  /* started, stopped*/

    this.start = function() {
        this.startTime = new Date();
        this.duration = 0;
        this.interval= setInterval(this.viewDuration.bind(this), 1000);
        $('#startButton' + id).html("Stoppa");
        this.state = "started";
    }
    this.stop = function() {
        clearInterval(this.interval);
        $('#startButton' + id).html("Omstart");
        this.state = "stopped";
    };

    this.viewDuration = function() {
        ++this.duration;
        /*$('#duration' + id).html(this.getDurationString(this.duration));*/
        $('#duration' + id).html(this.getDurationString(this.duration));
    };

    this.getDurationString = function(date1, date2) {
        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var durationString = "";
        var milliseconds;

        milliseconds = date1.getTime() - date2.getTime();
        hours = Math.floor(milliseconds / (1000*60*60) % 24);
        minutes = Math.floor(((milliseconds / (1000 * 60)) % 60));
        seconds = Math.floor((milliseconds / 1000) % 60);
        durationString += this.pad(hours) + ":";
        durationString += this.pad(minutes) + ":";
        durationString += this.pad(seconds);
        return durationString;
    };

    this.getDurationString = function (durationSeconds) {

        var seconds = 0;
        var minutes = 0;
        var hours = 0;
        var durationString = "";

        hours = Math.floor(durationSeconds / (60 * 60) % 24);
        minutes = Math.floor(((durationSeconds / 60) % 60));
        seconds = Math.floor(durationSeconds % 60);
        durationString += this.pad(hours) + ":";
        durationString += this.pad(minutes) + ":";
        durationString += this.pad(seconds);
        return durationString;
    };

    this.pad = function(n) {
        return (n < 10) ? ("0" + n) : n;
    };

    this.onButton = function() {
        if (this.state == "stopped")
            this.start();
        else
            this.stop();
    }

}

function saveTraining() {
    test();
    if (localStorage) {
        localStorage["trainig"] = "Träning";
        localStorage["date"] = (new Date()).toJSON();
    }
}


function getTraining() {

    if (localStorage && localStorage["trainig"]) {
        alert("Alert: localStorage traing: " + localStorage["trainig"] + 
            "\n" + "date: " +  Date(localStorage["date"]));
    }
    else {
        alert("No localStorage");
    }
}

function test() {
    var v = new XMLWriter();
    v.writeStartDocument(true);
    v.writeElementString('test', 'Hello World');
    v.writeAttributeString('foo', 'bar');
    v.writeEndDocument();
}

var stopWatch1 = new stopWatch(1);
var stopWatch2 = new stopWatch(2);
var stopWatch3 = new stopWatch(3);
var stopWatch4 = new stopWatch(4);

