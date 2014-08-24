function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}

function loadJSONDoc() {
    //var url = "http://localhost:55133/workout.json"
    var url = "xml/workout.json"

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            myArrWorkout = JSON.parse(xhttp.responseText);
            viewWorkoutsJSON(myArrWorkout);
            domTableFromJSONWorkout(0);
        }
    }
    xhttp.open("GET", url, false);
    xhttp.send();
}
var myArrWorkout;
var table;
var youtubeiFrame;

function onSelectWorkout() {
    var selectWorkout = document.getElementById("selectWorkout");
    domTableFromJSONWorkout(selectWorkout.selectedIndex);
    //viewYouTube("//www.youtube.com/embed/uUGDRwge4F8");
    exerciseIndex = 0;
    viewYouTubeFromIndex(selectWorkout.selectedIndex, exerciseIndex);
}

function viewWorkoutsJSON(myArrWorkout) {
    var selectWorkout = document.getElementById("selectWorkout");
    for (i = 0; i < myArrWorkout.workout.length; ++i) {
        option = document.createElement("option");
        option.text = myArrWorkout.workout[i].name;
        selectWorkout.add(option);
    }
    selectWorkout.addEventListener("change", onSelectWorkout);
}

function viewYouTubeFromIndex(workoutIndex, exerciseIndex) {
    viewYouTube(myArrWorkout.workout[workoutIndex].exercise[exerciseIndex].description.video);
}

function viewYouTube(url) {
//    <iframe width="560" height="315" src="
    //    frameborder="0" allowfullscreen></iframe>
    if (youtubeiFrame != null)
        document.body.removeChild(youtubeiFrame);

    youtubeiFrame = document.createElement('iframe');
    //iframe.style.display = "none";
    youtubeiFrame.src = url;
    document.body.appendChild(youtubeiFrame);
}



function domTableFromJSONWorkout(workoutIndex) {
    //http://localhost:55133/
    //http://localhost:8080/
    //var myArrWorkout = loadJSONDoc("http://localhost:55133/workout.json");

    var out = "";
    var i;
    if(table!=null)
        document.body.removeChild(table);

    table = document.createElement("TABLE");
    table.setAttribute("class", "TrainingProgramTable");
    row = table.insertRow(0);
    var th = document.createElement("th");
    var t = document.createTextNode("Name");
    th.appendChild(t);
    row.appendChild(th);

    var th = document.createElement("th");
    var t = document.createTextNode("Sets");
    th.appendChild(t);
    row.appendChild(th);


    var th = document.createElement("th");
    var t = document.createTextNode("Reps");
    th.appendChild(t);
    row.appendChild(th);

    var th = document.createElement("th");
    var t = document.createTextNode("Description");
    th.appendChild(t);
    row.appendChild(th);

    var th = document.createElement("th");
    var t = document.createTextNode("Muscle");
    th.appendChild(t);
    row.appendChild(th);


    for (i = 0; i < myArrWorkout.workout[workoutIndex].exercise.length; i++) {
        out = myArrWorkout.workout[0].exercise[i].name;
        row = table.insertRow(i+1);
        cell = row.insertCell(0)
        cell.innerHTML = myArrWorkout.workout[workoutIndex].exercise[i].name;
        cell = row.insertCell(1)
        cell.innerHTML = myArrWorkout.workout[workoutIndex].exercise[i].sets;
        cell = row.insertCell(2)
        cell.innerHTML = myArrWorkout.workout[workoutIndex].exercise[i].reps;
        cell = row.insertCell(3)
        cell.innerHTML = myArrWorkout.workout[workoutIndex].exercise[i].description.text;
        cell = row.insertCell(4)
        cell.innerHTML = myArrWorkout.workout[workoutIndex].exercise[i].muscle.name;
    }
    document.body.appendChild(table);
}


function writeTableFromXML() {
    xmlDoc = loadXMLDoc("XML//Program1.xml");
    if (xmlDoc == null)
        return;

    var x = xmlDoc.getElementsByTagName("ROW");
    document.write("<table  class='TrainingProgramTable'>");
    var tagName1 = x[0].childNodes[1].tagName;
    var tagName2 = x[0].childNodes[3].tagName;
    var tagName3 = x[0].childNodes[5].tagName;
    var tagName4 = x[0].childNodes[7].tagName;

    document.write("<tr><th>" + tagName1 + "</th><th>" + tagName2 + "</th><th>" + tagName3 + "</th><th>" + tagName4 + "</th></tr>");
    for (i = 0; i < x.length; i++) {
        document.write("<tr><td>");
        document.write(x[i].getElementsByTagName(tagName1)[0].childNodes[0].nodeValue);
        document.write("</td><td>");
        document.write(x[i].getElementsByTagName(tagName2)[0].childNodes[0].nodeValue);
        document.write("</td><td>");
        document.write(x[i].getElementsByTagName(tagName3)[0].childNodes[0].nodeValue);
        document.write("</td><td>");
        document.write(x[i].getElementsByTagName(tagName4)[0].childNodes[0].nodeValue);
        document.write("</td></tr>");
    }
    document.write("</table>");
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function domTableFromXMLWorkout() {
    //http://localhost:55133/
    //http://localhost:8080/
    xmlDoc = loadXMLDoc("XML//workout.xml");

    if (xmlDoc == null) {
        alert("xmlDoc == null\nXML/Program1.xml");
        return;
    }


    var table = document.createElement("TABLE");
    table.setAttribute("class", "TrainingProgramTable");
    var x = xmlDoc.getElementsByTagName("exercise");
    var tagName1 = x[0].childNodes[1].tagName;
    var tagName2 = x[0].childNodes[3].tagName;
    var tagName3 = x[0].childNodes[5].tagName;
    var tagName4 = x[0].childNodes[7].tagName;

    row = table.insertRow(0);
    var th = document.createElement("th");
    var t = document.createTextNode(tagName1.capitalize());
    th.appendChild(t);
    row.appendChild(th);

    var th = document.createElement("th");
    stringTagName = tagName2;
    var t = document.createTextNode(tagName2.capitalize());
    th.appendChild(t);
    row.appendChild(th);


    var th = document.createElement("th");
    var t = document.createTextNode(tagName3.capitalize());
    th.appendChild(t);
    row.appendChild(th);

    var th = document.createElement("th");
    var t = document.createTextNode(tagName4.capitalize());
    th.appendChild(t);
    row.appendChild(th);

    for (i = 1; i <= x.length; i++) {
        row = table.insertRow(i);
        cell = row.insertCell(0)
        cell.innerHTML = x[i - 1].getElementsByTagName(tagName1)[0].childNodes[0].nodeValue;
        cell = row.insertCell(1)
        cell.innerHTML = x[i - 1].getElementsByTagName(tagName2)[0].childNodes[0].nodeValue;
        cell = row.insertCell(2)
        cell.innerHTML = x[i - 1].getElementsByTagName(tagName3)[0].childNodes[0].nodeValue;
        cell = row.insertCell(3)
        cell.innerHTML = x[i - 1].getElementsByTagName(tagName4)[0].childNodes[0].nodeValue;
        cell.innerHTML = x[i - 1].getElementsByTagName(tagName4)[0].childNodes[1].textContent;
    }
    document.body.appendChild(table);
}


function domTableFromXML() {
    //http://localhost:55133/
    //http://localhost:8080/
    xmlDoc = loadXMLDoc("XML//Program1.xml");

    if (xmlDoc == null) {
        alert("xmlDoc == null\nXML/Program1.xml");
        return;
    }


    var table = document.createElement("TABLE");
    //table.className = "TrainingProgramTable";
    table.setAttribute("class", "TrainingProgramTable");
    var x = xmlDoc.getElementsByTagName("ROW");
    var tagName1 = x[0].childNodes[1].tagName;
    var tagName2 = x[0].childNodes[3].tagName;
    var tagName3 = x[0].childNodes[5].tagName;
    var tagName4 = x[0].childNodes[7].tagName;
    // Create an empty <thead> element and add it to the table:
    //   var header = table.createTHead();
    //header.className = "TrainingProgramTable";
    // Create an empty <tr> element and add it to the first position of <thead>:
    //   var row = header.insertRow(0);
    // Insert a new cell (<td>) at the first position of the "new" <tr> element:

    row = table.insertRow(0);
    var th = document.createElement("th");
    var t = document.createTextNode(tagName1);
    th.appendChild(t);
    row.appendChild(th);

    var th = document.createElement("th");
    var t = document.createTextNode(tagName2);
    th.appendChild(t);
    row.appendChild(th);


    var th = document.createElement("th");
    var t = document.createTextNode(tagName3);
    th.appendChild(t);
    row.appendChild(th);

    var th = document.createElement("th");
    var t = document.createTextNode(tagName4);
    th.appendChild(t);
    row.appendChild(th);
    /*
    var cell = row.insertCell(0);
    // Add some bold text in the new cell:
    cell.innerHTML = tagName1;

    cell = row.insertCell(1);
    cell.innerHTML = tagName2;
    cell = row.insertCell(2);
    cell.innerHTML = tagName3;
    cell = row.insertCell(3);
    cell.innerHTML = tagName4;
*/
    for (i = 1; i <= x.length; i++) {
        row = table.insertRow(i);
        cell = row.insertCell(0)
        cell.innerHTML = x[i - 1].getElementsByTagName(tagName1)[0].childNodes[0].nodeValue;
        cell = row.insertCell(1)
        cell.innerHTML = x[i - 1].getElementsByTagName(tagName2)[0].childNodes[0].nodeValue;
        cell = row.insertCell(2)
        cell.innerHTML = x[i - 1].getElementsByTagName(tagName3)[0].childNodes[0].nodeValue;
        cell = row.insertCell(3)
        cell.innerHTML = x[i - 1].getElementsByTagName(tagName4)[0].childNodes[0].nodeValue;
    }
    document.body.appendChild(table);
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
}

function writeFileUsingFileSaver() {
    var blob = new Blob(['hello all!']);
    window.saveAs(blob, "test_file.txt");
}
