var myInterval = setInterval(insertTimes, 1000);

window.addEventListener("load", function () {
    // do things after the DOM loads fully
    console.log("Everything is loaded");
    fetch("https://worldtimeapi.org/api/timezone")
        .then(res => res.json())
        .then(data => processTimeZoneList(data))
    this.document.addEventListener('keydown', evt => {
        if (evt.key === "Enter" && evt.shiftKey) {
            let country = this.document.getElementById("timezone").value
            console.log("https://worldtimeapi.org/api/timezone/" + country)
            fetch("https://worldtimeapi.org/api/timezone/" + country)
                .then(res => res.json())
                .then(data => this.sessionStorage.setItem('queuedCountry', data))
        }
        insertTimes()
    })
    document.addEventListener('visibilitychange', function (ev) {
        console.log("Focus Off the Page")
        clearInterval(myInterval)
    });
});

function processTimeZoneList(allZones) {
    const timeZoneListElement = document.getElementById('timeZoneList');
    var arrayforProcess = [...new Set(allZones.map(each => each.split("/")[0]))]
    arrayforProcess.forEach(each => timeZoneListElement.appendChild(new Option(each, each)))
}

function insertTimes() {
    let countryZones = sessionStorage.getItem('queuedCountry').split(",")
    let resultDiv = document.getElementById('result')
    resultDiv.innerHTML = ""
    let allCurrentTimes = '<table><tr><th>Time Zone</th><th>Current Time</th></tr>'
    countryZones.map(each => allCurrentTimes += `<tr><td>${each}</td><td>${new Date().toLocaleString("en-IN", { timeZone: each, dateStyle: "medium", timeStyle: "medium" })}</td></tr>`)
    resultDiv.innerHTML = allCurrentTimes + '</table>'
}
