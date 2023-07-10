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

async function splitToStoreInLocalStorage() {
    console.log("Splitting Data")
    let start = new Date()
    console.log("Start : ", start.toLocaleString())
    let allKeys = Object.keys(localStorage).filter(eachKey => eachKey.includes("Owner") && eachKey.includes("Batch"))
    for (let eachKey of allKeys) {
        localStorage.removeItem(eachKey)
    }
    // await fetch("https://script.google.com/macros/s/AKfycbyOTvgT6gfuTryE15SNJvKK_4ISCQ7HQsxPtNQPkkqC5KkQukzdRGdWJ15tk6I8wEP3/exec?queue=0")
    await fetch("/All_Tasks_6_20_2023_9_21_02_PM.json")
        .then(data => data.json())
        .then(result => {
            let BufferIDs = []
            let uniquOwnerID = [...new Set(result.data.map(item => (!BufferIDs.includes(item.Owner.id) && item.Owner !== undefined) ? (BufferIDs.push(item.Owner.id), item.Owner) : null))].filter(item => item !== null)
            localStorage.setItem("AllTaskOwners", JSON.stringify(uniquOwnerID))

            console.log("Total Owners : ", BufferIDs)
            BufferIDs.forEach((item, index) => {
                let bufferData = result.data.filter(eachTask => {
                    if (eachTask.Owner !== undefined && eachTask.Owner.id === item && eachTask.DueDate !== null) {
                        return eachTask
                    }
                })

                // retain only the required fields

                bufferData = bufferData.map(eachTask => {
                    return {
                        "TaskId": eachTask.id,
                        // "Subject": eachTask.Subject,
                        "Status": eachTask.Status,
                        "CreatedTime": eachTask.Created_Time !== null ? eachTask.Created_Time.MakeDatesLocalString() : null,
                        "DueDate": eachTask.Due_Date,
                        "TaskOwnerID": eachTask.Owner.id,
                        "ClosedTime": eachTask.Closed_Time != null ? eachTask.Closed_Time.MakeDatesLocalString() : null,
                        "OnTime": (eachTask.Due_Date !== null && eachTask.Closed_Time !== null) ? (new Date(eachTask.Due_Date) >= new Date(eachTask.Closed_Time).setHours(0, 0, 0, 0) ? true : false) : false,
                        "OverDueCompleted": (eachTask.Due_Date !== null && eachTask.Closed_Time !== null) ? (new Date(eachTask.Due_Date) < new Date(eachTask.Closed_Time).setHours(0, 0, 0, 0) ? true : false) : false,
                        "CarryOver": (eachTask.Due_Date !== null && eachTask.Closed_Time === null) ? (new Date(eachTask.Due_Date) < new Date() ? true : false) : false,
                        "ModifiedBy": eachTask.Modified_By.id
                    }
                })

                console.log("Total Data Size : ", bufferData.length)
                let batch = 1000
                let batchCount = Math.ceil(bufferData.length / batch)
                console.log("Saving as ", batchCount)
                for (let i = 0; i < batchCount; i++) {
                    let start = i * batch
                    let end = start + batch




                    try {
                        console.log("Saving data for length", JSON.stringify(bufferData.slice(start, end)).length)
                        localStorage.setItem(`Owner${item}Batch${i}`, JSON.stringify(bufferData.slice(start, end)))
                    } catch (error) {
                        // console.log(error)
                        ForcedSave(`Owner${item}Batch${i}`, JSON.stringify(bufferData.slice(start, end)))
                        // console.log("Error in saving data for length", JSON.stringify(bufferData.slice(start, end)).length)
                        // localStorage.setItem(`Owner${item.slice(-4)}Batch${i}`, JSON.stringify(bufferData.slice(start, end)))
                    }
                }
            })
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

    // Get unique owner IDs
    const owners = JSON.parse(localStorage.getItem("AllTaskOwners"));
    // console.log(owners)
    // Create options for owners
    owners.forEach(ownerId => {
        const option = document.createElement('option');
        option.value = ownerId.id;
        option.textContent = ownerId.name;
        ownerSelect.appendChild(option);
    });
}


function CreateDataTables(data) {
    // data = Object.keys(data).map(key => [new Date(key).toLocaleDateString("en-US", {
    //     year: "numeric",
    //     month: "2-digit",
    //     day: "2-digit",
    //     weekday: "short",
    // }), ...Object.values(data[key])])
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
                values: ['<b>Dates</b>', '<b>Prev. Pending</b>', '<b>Total</b>', '<b>On Time</b>', '<b>Closed</b>', '<b>Closed of Others</b>', '<b>Carry Over</b>'],
                align: ['center', 'center', 'center', 'center', 'center', 'center', 'center'],
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
                align: ['left', 'center', 'center', 'center', 'center', 'center', 'center'],
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
// function CreatePlotlyTables_ClosedByOthers(data) {
//     data = Object.keys(data).map(key => [[key, new Date(key).toLocaleString("en-US", { weekday: "short" })].join(", "), data[key]['OthersClosed']]).reverse()
//     console.log(data)
//     var dataForChart = [
//         {

//             type: 'table',
//             header: {
//                 values: ['<b>Dates</b>', '<b>No of Tasks Closed By Others</b>'],
//                 align: ['center', 'center'],
//                 line: { width: 1, color: ['white', 'lightgray'] },
//                 fill: { color: 'gray' },
//                 font: { color: 'white' }
//             },
//             cells: {
//                 values: transposeArray(data),
//                 align: ['left', 'center'],
//                 line: { color: ['white', 'lightgray'], width: 1 },
//                 fill: { color: ['white', 'lightgray'] },
//                 font: { size: 11, color: ['black'] }
//             }
//         }
//     ];

//     var layout = {
//         title: '2-Weeks Report',
//         margin: { t: 50, l: 10, r: 10, b: 10 },
//         padding: { t: 0, l: 0, r: 0, b: 0 },

//     };

//     Plotly.newPlot('othersClosed', dataForChart, layout);
// }

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
    // console.log("dataForChart", dataForChart)
    let layout = { title: "2-Week Report Trend", hovermode: 'x' }
    // Display using Plotly
    Plotly.newPlot("2weekmyPlot", dataForChart, layout);

    // adding listener to the graph to highlight the data using the table
    // var tableRows = document.querySelectorAll('#dashboard tbody tr');
    // var tableRows = document.querySelectorAll('#tableplotly tbody tr');

    // tableRows.forEach(function (row) {
    //     row.addEventListener('click', function () {
    //         var rowIndex = this.rowIndex - 1; // Subtract 1 to match data index

    //         // Trigger hover on the corresponding data point
    //         Plotly.Fx.hover('2weekmyPlot', [
    //             { curveNumber: 0, pointNumber: rowIndex },
    //             { curveNumber: 1, pointNumber: rowIndex },
    //             { curveNumber: 2, pointNumber: rowIndex },
    //             { curveNumber: 3, pointNumber: rowIndex },
    //             { curveNumber: 4, pointNumber: rowIndex },
    //         ]);
    //     });
    // });
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
        // height: chartContainer.offsetHeight,
        // width: chartContainer.offsetWidth
    }
    Plotly.newPlot("OverAllPie", dataForChart, layout);
}
function CreateCurrentPie(data) {
    // let chartContainer = document.getElementById("CurrentPie");
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
        // height: chartContainer.offsetHeight,
        // width: chartContainer.offsetWidth

    }
    Plotly.newPlot("CurrentPie", dataForChart, layout);
}

// Function to calculate task summary metrics for a specific set of tasks
function calculateTaskSummaryMetrics(tasksForOwner, ownerId) {
    console.log("tasksForOwner", ownerId)
    const resultNumbersMaster = {
        totalTasks: tasksForOwner.length,
        completedTasks: tasksForOwner.filter(task => task.Status == 'Completed').length,
        pendingTasks: tasksForOwner.filter(task => task.Status == 'Scheduled').length,
        twoWeeks: {
        }
    };
    let ResultNumberCurrentWeek = {
        pendingTasks: 0,
        completedTasks: 0

    }
    allDatesFor2Weeks.map(eachDate => (!Object.keys(resultNumbersMaster.twoWeeks).includes(eachDate)) ? resultNumbersMaster.twoWeeks[eachDate] = { 'PreviouslyPending': 0, 'TotalTasks': 0, 'OnTimeCompleted': 0, 'Closed': 0, 'OthersClosed': 0, 'CarryOver': 0 } : "")

    for (let eachDay of allDatesFor2Weeks) {
        // Tasks for the Day
        for (let eachTask of tasksForOwner) {
            // current week numbers
            if (eachTask.DueDate == eachDay && eachTask.Status == "Completed") {
                ResultNumberCurrentWeek.completedTasks++
            }
            if (eachTask.DueDate == eachDay && eachTask.Status == "Scheduled") {
                ResultNumberCurrentWeek.pendingTasks++
            }


            // Total Tasks
            if (eachTask.DueDate == eachDay) {
                resultNumbersMaster.twoWeeks[eachDay].TotalTasks++
            }

            // On-Time Tasks
            if (
                // eachTask.Status == "Completed"
                // && eachTask.DueDate == eachDay
                // && eachTask.ClosedTime
                // // && eachTask.DueDate == eachTask.ClosedTime.MakeDatesLocalString()
                // && eachTask.DueDate == eachTask.ClosedTime

                // latest modification
                eachTask.OnTime
                && eachTask.DueDate == eachDay
            ) {
                resultNumbersMaster.twoWeeks[eachDay].OnTimeCompleted++
            }

            if (ownerId != "all") {
                // All Closed For the Day
                if (
                    eachTask.ClosedTime
                    && eachTask.ClosedTime == eachDay
                ) {
                    resultNumbersMaster.twoWeeks[eachDay].Closed++
                }

                // tasks of the owner closed by another person
                if (
                    eachTask.ClosedTime != null
                    && eachTask.ClosedTime == eachDay
                    && eachTask.TaskOwnerID != ownerId
                    && eachTask.ModifiedBy == ownerId
                ) {
                    // console.log("__aaaaa", eachTask.ClosedTime, eachTask.ClosedTime == eachDay, eachTask.ModifiedByOther, eachTask.TaskOwnerID != ownerId)
                    resultNumbersMaster.twoWeeks[eachDay].OthersClosed++
                }
            }
            else {
                // All Closed For the Day
                if (
                    eachTask.ClosedTime
                    && eachTask.ClosedTime == eachDay
                ) {
                    resultNumbersMaster.twoWeeks[eachDay].Closed++
                }
            }

            // Previously Pending Tasks
            // console.log("Previously Pending Tasks. Check 1", (new Date(eachTask.DueDate) < new Date(eachDay) && eachTask.Status == "Scheduled"))
            // console.log("eachTask.ClosedTime:", eachTask.ClosedTime);
            // console.log("eachDay.DueDate:", eachDay.DueDate);
            // console.log("new Date(eachTask.DueDate) < new Date(eachDay):", new Date(eachTask.DueDate) < new Date(eachDay));
            // console.log("new Date(eachTask.ClosedTime) > new Date(eachDay):", new Date(eachTask.ClosedTime) > new Date(eachDay));

            // console.warn("Previously Pending Tasks. Check 2", (eachTask.ClosedTime && eachDay.DueDate && new Date(eachTask.DueDate) < new Date(eachDay) && new Date(eachTask.ClosedTime) > new Date(eachDay)))
            if (
                (new Date(eachTask.DueDate) < new Date(eachDay) && eachTask.Status == "Scheduled")
                ||
                (
                    eachTask.ClosedTime !== null
                    && eachTask.DueDate !== null
                    && new Date(eachTask.DueDate) < new Date(eachDay)
                    // && eachTask.Status == "Completed"
                    && new Date(eachTask.ClosedTime) > new Date(eachDay)
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
    // CreatePlotlyTables_ClosedByOthers(resultNumbersMaster.twoWeeks)
    // console.log(resultNumbersMaster.twoWeeks)
}



// read all data for particular owner
function readAllDataForOwner() {
    console.log("readAllDataForOwner", new Date().toLocaleTimeString())
    let ownerId = document.getElementById('ownerSelect').value
    let bufferData = []
    // let batchCount = 0
    // if (ownerId != "all") {
    //     while (true) {
    //         let buffer = localStorage.getItem(`Owner${ownerId}Batch${batchCount}`)
    //         if (buffer === null) {
    //             break
    //         }
    //         bufferData.push(...JSON.parse(buffer))
    //         batchCount++
    //     }
    // } else {
    let allKeys = Object.keys(localStorage).filter(eachKey => eachKey.includes("Owner") && eachKey.includes("Batch"))
    for (let eachKey of allKeys) {
        bufferData.push(...JSON.parse(localStorage.getItem(eachKey)))
    }
    // }
    console.log(bufferData.length)
    // return bufferData
    calculateTaskSummaryMetrics(bufferData, ownerId)
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
        let allKeys = Object.keys(localStorage).filter(eachKey => eachKey.includes("Owner") && eachKey.includes("Batch"))
        for (let eachKey of allKeys) {
            localStorage.removeItem(eachKey)
        }
    })
};


// [
//     { "name": "Suhas Masana", "id": "156684000000399001", "email": "suhas@morphlelabs.com" },
//     { "name": "S. Daniel", "id": "156684000000162001", "email": "daniel@morphlelabs.com" },
//     { "name": "Anvesha", "id": "156684000010312108", "email": "anvesha@morphlelabs.com" },
//     { "name": "Naveenraj G", "id": "156684000010211059", "email": "naveen@morphlelabs.com" },
//     { "name": "Anamika Singh", "id": "156684000008795123", "email": "anamika@morphle.in" },
//     { "name": "Anamika Singh", "id": "156684000004150009", "email": "mukund@morphlelabs.com" },
//     { "name": "Sanjay", "id": "156684000000373002", "email": "sanjayk@morphlelabs.com" }
// ]