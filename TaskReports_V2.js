// All Prototypes
Date.prototype.NDaysBefore = function (n) {
    return new Date(this - (86400000 * n)).toLocaleDateString();
}

function ForcedSave(filename, filecontent) {
    try {
        localStorage.setItem(filename, filecontent)
        console.warn("Saved")
    } catch (error) {
        window.FailedData = filecontent
        console.warn("Error in saving in Forced Save")
    }
}

String.prototype.MakeDatesLocalString = function () {
    newTicketDate = new Date(this)
    // Get year, month, and day part from the date
    year = newTicketDate.toLocaleString("default", { year: "numeric" });
    month = newTicketDate.toLocaleString("default", { month: "2-digit" });
    day = newTicketDate.toLocaleString("default", { day: "2-digit" });
    hour = newTicketDate.toLocaleTimeString()
    var formattedDate = year + "-" + month + "-" + day
    return formattedDate
}

function displayJSONData(data) {
    const jsonContainer = document.getElementById('jsonContainer');
    jsonContainer.textContent = JSON.stringify(data, null, 2);
}


function getPast14Days() {
    const dates = [];
    const currentDate = new Date();

    for (let i = 0; i < 14; i++) {
        const pastDate = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
        // newTicketDate = new Date(this)
        // Get year, month, and day part from the date
        year = pastDate.toLocaleString("default", { year: "numeric" });
        month = pastDate.toLocaleString("default", { month: "2-digit" });
        day = pastDate.toLocaleString("default", { day: "2-digit" });
        hour = pastDate.toLocaleTimeString()
        var formattedDate = year + "-" + month + "-" + day
        dates.push(formattedDate);
    }
    return dates.reverse();
}
function transposeArray(array) {
    return array[0].map((col, i) => array.map(row => row[i]));
}

// Global Variables
var reportStartDate = new Date().NDaysBefore(13)
var todaysDate = new Date().toLocaleDateString()
const allDatesFor2Weeks = getPast14Days()
var TasksAPIURL = "https://script.google.com/macros/s/AKfycbyOTvgT6gfuTryE15SNJvKK_4ISCQ7HQsxPtNQPkkqC5KkQukzdRGdWJ15tk6I8wEP3/exec?queue=0"


async function splitToStoreInLocalStorage() {
    console.log("Splitting Data")
    let start = new Date()
    console.log("Start : ", start.toLocaleString())
    let allKeys = Object.keys(localStorage).filter(eachKey => eachKey.includes("Owner") && eachKey.includes("Batch"))
    for (let eachKey of allKeys) {
        localStorage.removeItem(eachKey)
    }
    console.log(`${TasksAPIURL}&start_date=${reportStartDate.split("/").reverse().join("-")}&end_date=${todaysDate.split("/").reverse().join("-")}`)
    await fetch(`${TasksAPIURL}&start_date=${reportStartDate.split("/").reverse().join("-")}&end_date=${todaysDate.split("/").reverse().join("-")}`)
        // await fetch("/All_Tasks_6_20_2023_9_21_02_PM.json")
        .then(data => data.json())
        .then(result => {

            console.log("Total Owners : ", result.ActiveUsers.length)
            console.log("Total Owners : ", result.TasksData.length)

            localStorage.setItem("AllTaskOwners", JSON.stringify(result.ActiveUsers))
            localStorage.setItem("AllTaskData", JSON.stringify(result.TasksData))

            let end = new Date()
            console.log("End : ", end)
            console.log("Time Taken", (end - start) / 1000, "seconds")
            localStorage.setItem("lastSyncTime", new Date())
            document.getElementById('lastSyncTime').innerText = "Last Sync Time: " + new Date(localStorage.lastSyncTime).toLocaleString()
            generateOwnerOptions()
            readAllDataForOwner()
        })
}



// Function to generate the owner options dynamically

function generateOwnerOptions() {
    const ownerSelect = document.getElementById('ownerSelect');
    ownerSelect.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Owners';
    ownerSelect.appendChild(allOption);
    // Get unique owner IDs
    const owners = JSON.parse(localStorage.getItem("AllTaskOwners"));
    console.log(owners)
    // Create options for owners
    owners.forEach(owner => {
        const option = document.createElement('option');
        option.value = owner.OwnerID;
        option.textContent = owner.FullName;
        ownerSelect.appendChild(option);
    });
}


function CreateDataTables(data) {
    data = Object.keys(data).map(key => [[key, new Date(key).toLocaleString("en-US", { weekday: "short" })].join(", "), ...Object.values(data[key])])
    $('#dashboard').DataTable({
        dom: "",
        data: data.reverse(),
        paginate: false,
        order: [[0, "desc"]],
        destroy: true,
        autoWidth: true,
        sortable: false,
        columns: [
            { title: 'Dates' },
            { title: 'Prev. Pending' },
            { title: 'Total' },
            { title: 'On Time' },
            { title: 'Closed' },
            { title: 'CarryOver' },
        ]
    });
}

function CreatePlotlyTables(data) {
    data = Object.keys(data).map(key => [[key, new Date(key).toLocaleString("en-US", { weekday: "short" })].join(", "), ...Object.values(data[key])]).reverse()

    var dataForChart = [
        {

            type: 'table',
            header: {
                values: ['<b>Dates</b>', '<b>Prev. Pending</b>', '<b>Total</b>', '<b>On Time</b>', '<b>Closed</b>', '<b>Carry Over</b>'],
                align: ['center', 'center', 'center', 'center', 'center', 'center'],
                line: { width: 1, color: ['white', 'lightgray'] },
                fill: { color: 'gray' },
                font: { color: 'white' }
            },
            cells: {
                values: transposeArray(data),
                // [
                //     ['Row 1', 'Row 1', 'Row 1'],
                //     ['Row 2', 'Row 2', 'Row 2'],
                //     ['Row 3', 'Row 3', 'Row 3']
                // ],
                align: ['left', 'center', 'center', 'center', 'center', 'center'],
                line: { color: ['white', 'lightgray'], width: 1 },
                fill: { color: ['white', 'lightgray'] },
                font: { size: 11, color: ['black'] }
            }
        }
    ];

    var layout = {
        title: '2-Weeks Report',
        margin: { t: 50, l: 10, r: 10, b: 10 },
        padding: { t: 0, l: 0, r: 0, b: 0 },

    };

    Plotly.newPlot('tableplotly', dataForChart, layout);
}
function CreatePlotlyTables_ClosedByOthers(data) {
    console.log(data)
    data = Object.keys(data).map(key => [[key, new Date(key).toLocaleString("en-US", { weekday: "short" })].join(", "), data[key]]).reverse()
    // console.log(data)
    var dataForChart = [
        {

            type: 'table',
            header: {
                values: ['<b>Dates</b>', '<b>Others Tasks Closed</b>'],
                align: ['center', 'center'],
                line: { width: 1, color: ['white', 'lightgray'] },
                fill: { color: 'gray' },
                font: { color: 'white' }
            },
            cells: {
                values: transposeArray(data),
                align: ['left', 'center'],
                line: { color: ['white', 'lightgray'], width: 1 },
                fill: { color: ['white', 'lightgray'] },
                font: { size: 11, color: ['black'] }
            }
        }
    ];

    var layout = {
        title: 'Closed off Others Tasks',
        margin: { t: 50, l: 10, r: 10, b: 10 },
        padding: { t: 0, l: 0, r: 0, b: 0 },

    };

    Plotly.newPlot('othersClosed', dataForChart, layout);
}

function CreateTrendGraph(data) {
    // Define Data
    let X_Values = Object.keys(data).reverse()
    let y1Values = Object.values(data).map(item => item.PreviouslyPending).reverse()
    let y2Values = Object.values(data).map(item => item.TotalTasks).reverse()
    let y3Values = Object.values(data).map(item => item.OnTimeCompleted).reverse()
    let y4Values = Object.values(data).map(item => item.Closed).reverse()
    let y5Values = Object.values(data).map(item => item.CarryOver).reverse()
    var dataForChart = [
        { x: X_Values, y: y1Values, mode: "lines", name: "Previously Pending", hovertemplate: 'Date: %{x}<br>Previously Pending: %{y}' },
        { x: X_Values, y: y2Values, mode: "lines", name: "Total Tasks", hovertemplate: 'Date: %{x}<br>Total Tasks: %{y}' },
        { x: X_Values, y: y3Values, mode: "lines", name: "On Time Completed", hovertemplate: 'Date: %{x}<br>On Time: %{y}' },
        { x: X_Values, y: y4Values, mode: "lines", name: "Closed", hovertemplate: 'Date: %{x}<br>Closed: %{y}' },
        { x: X_Values, y: y5Values, mode: "lines", name: "Carry Over", hovertemplate: 'Date: %{x}<br>Carry Over: %{y}' }
    ];

    let layout = { title: "2-Week Report Trend", hovermode: 'x' }

    // Display using Plotly
    Plotly.newPlot("2weekmyPlot", dataForChart, layout);
}

function CreateOverAllPie(data) {
    // let chartContainer = document.getElementById("OverAllPie");
    let dataForChart = [{
        values: Object.values(data),
        labels: Object.keys(data),
        type: 'pie',
        hole: 0.6,
        hovertemplate: '%{label}: %{value}',
        textinfo: 'label+percent',
        textposition: 'inside',
        showlegend: false,
        automargin: true,
        autosize: true

    }];
    let layout = {
        title: "Overall Summary",
        margin: { t: 50, l: 10, r: 10, b: 10 },
        padding: { t: 0, l: 0, r: 0, b: 0 },
    }
    Plotly.newPlot("OverAllPie", dataForChart, layout);
}
function CreateCurrentPie(data) {

    let dataForChart = [{
        values: Object.values(data),
        labels: Object.keys(data),
        type: 'pie',
        hole: 0.6,
        hovertemplate: '%{label}: %{value}',
        textinfo: 'label+percent',
        textposition: 'inside',
        showlegend: false,
        automargin: true,
        autosize: true

    }];
    let layout = {
        title: "Current Week Summary",
        margin: { t: 50, l: 10, r: 10, b: 10 },
        padding: { t: 0, l: 0, r: 0, b: 0 },
    }
    Plotly.newPlot("CurrentPie", dataForChart, layout);
}

// Function to calculate task summary metrics for a specific set of tasks
function calculateTaskSummaryMetrics(tasksForOwner, ownerId) {
    console.log("tasksForOwner", ownerId)
    console.log("tasksForOwner", tasksForOwner)
    window.tasksForOwner = tasksForOwner
    window.ownerId = ownerId
    const resultNumbersMaster = {
        totalTasks: tasksForOwner.filter(each => each.TaskOwnerID == ownerId).length,
        completedTasks: tasksForOwner.filter(task => task.TaskOwnerID == ownerId && task.Status == 'Completed').length,
        pendingTasks: tasksForOwner.filter(task => task.TaskOwnerID == ownerId && task.Status == 'Scheduled').length,
        twoWeeks: {
        }
    };
    let twoWeeksOthers = {}

    let ResultNumberCurrentWeek = {
        pendingTasks: 0,
        completedTasks: 0

    }
    allDatesFor2Weeks.map(eachDate => (!Object.keys(resultNumbersMaster.twoWeeks).includes(eachDate)) ? (resultNumbersMaster.twoWeeks[eachDate] = { 'PreviouslyPending': 0, 'TotalTasks': 0, 'OnTimeCompleted': 0, 'Closed': 0, 'CarryOver': 0 }, twoWeeksOthers[eachDate] = 0) : "")

    for (let eachDay of allDatesFor2Weeks) {
        // Tasks for the Day
        for (let eachTask of tasksForOwner) {
            // current week numbers
            if (eachTask.DueDate == eachDay && eachTask.Status == "Completed" && eachTask.TaskOwnerID == ownerId) {
                ResultNumberCurrentWeek.completedTasks++
            }
            if (eachTask.DueDate == eachDay && eachTask.Status == "Scheduled" && eachTask.TaskOwnerID == ownerId) {
                ResultNumberCurrentWeek.pendingTasks++
            }


            // Total Tasks
            if (eachTask.DueDate == eachDay && eachTask.TaskOwnerID == ownerId) {
                resultNumbersMaster.twoWeeks[eachDay].TotalTasks++
            }

            // On-Time Tasks
            if (
                eachTask.OnTime
                && eachTask.DueDate == eachDay
                && eachTask.TaskOwnerID == ownerId
            ) {
                resultNumbersMaster.twoWeeks[eachDay].OnTimeCompleted++
            }

            // tasks closed by owner
            if (
                eachTask.ClosedTime
                && eachTask.ClosedTime == eachDay
                && eachTask.TaskOwnerID == ownerId
                && eachTask.ModifiedBy == ownerId
            ) {
                resultNumbersMaster.twoWeeks[eachDay].Closed++
            }

            // others tasks closed
            if (
                eachTask.ClosedTime
                && eachTask.ClosedTime == eachDay
                && eachTask.TaskOwnerID != ownerId
                && eachTask.ModifiedBy == ownerId
            ) {
                twoWeeksOthers[eachDay]++
            }

            // previously pending tasks
            if (
                (new Date(eachTask.DueDate) < new Date(eachDay) && eachTask.Status == "Scheduled" && eachTask.TaskOwnerID == ownerId)
                ||
                (
                    eachTask.ClosedTime !== null
                    && eachTask.DueDate !== null
                    && new Date(eachTask.DueDate) < new Date(eachDay)
                    && new Date(eachTask.ClosedTime) > new Date(eachDay)
                    && eachTask.TaskOwnerID == ownerId
                )
            ) {
                resultNumbersMaster.twoWeeks[eachDay].PreviouslyPending++
            }
        }
    }

    for (let eachDay of allDatesFor2Weeks) {
        resultNumbersMaster.twoWeeks[eachDay].CarryOver = resultNumbersMaster.twoWeeks[eachDay].TotalTasks + resultNumbersMaster.twoWeeks[eachDay].PreviouslyPending - resultNumbersMaster.twoWeeks[eachDay].Closed
    }

    // displayJSONData(resultNumbersMaster)
    // CreateDataTables(resultNumbersMaster.twoWeeks)
    CreatePlotlyTables(resultNumbersMaster.twoWeeks)
    CreateTrendGraph(resultNumbersMaster.twoWeeks)
    CreateOverAllPie({ pendingTasks: resultNumbersMaster.pendingTasks, completedTasks: resultNumbersMaster.completedTasks })
    CreateCurrentPie(ResultNumberCurrentWeek)
    CreatePlotlyTables_ClosedByOthers(twoWeeksOthers)
    // console.log(resultNumbersMaster.twoWeeks)
}



// read all data for particular owner
function readAllDataForOwner() {
    console.log("readAllDataForOwner", new Date().toLocaleTimeString())
    let ownerId = document.getElementById('ownerSelect').value

    calculateTaskSummaryMetrics(JSON.parse(localStorage.AllTaskData), ownerId)
    console.log("readAllDataForOwner end", new Date().toLocaleTimeString())
}


// Generate the dashboard on page load
window.onload = function () {
    // splitToStoreInLocalStorage()
    document.getElementById("getLatestTasks").addEventListener("click", splitToStoreInLocalStorage)
    generateOwnerOptions()
    document.getElementById('ownerSelect').addEventListener('change', readAllDataForOwner)
    readAllDataForOwner()
    if (localStorage.lastSyncTime) {
        document.getElementById('lastSyncTime').innerText = "Last Sync Time: " + new Date(localStorage.lastSyncTime).toLocaleString()
    }
    else {
        document.getElementById('lastSyncTime').innerText = "Last Sync Time: Never"
    }
    document.getElementById('clearLocalData').addEventListener('click', function () {
        localStorage.removeItem("AllTaskData")
        localStorage.removeItem("AllTaskOwners")
    })
};