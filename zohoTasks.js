// function RefreshAccessTokens() {
//     var RequestToKenOption = {
//         method: 'POST',
//         headers: {
//             "ContentType": "application/json"
//         },
//         payload: {
//             "client_id": "1000.TQFUZDV6MDM5L7VQ81Y9QQ2ODLDOMG",
//             "client_secret": "9d8bc58aca8107da208e8f111077326e74ebe23f92",
//             "refresh_token": "1000.08bef2d6ac88d0e2ecd2f54f3c173469.50ab532fb725263b7bb98c6c60bf6cbd",
//             "grant_type": "refresh_token"
//         },
//         redirect: 'follow'
//     };
//     let token;
//     fetch("https://accounts.zoho.in/oauth/v2/token", RequestToKenOption).then(response => response.json()).then(data => console.log(data))
//     return `${token.token_type} ${token.access_token}`
// }

// let task_number = 1
// let ListofTasks = []
// let MorePages = true
// let zohoToken;

// if (document.cookie === "") {
//     document.cookie = `zohoToken=${RefreshAccessTokens()}; max-age=${1 * 60 * 60}`
//     document.cookie.split(";").filter(item => item.includes("zohoToken"))[0].split("=")[1]
// }
// else {
//     document.cookie.split(";").filter(item => item.includes("zohoToken"))[0].split("=")[1]
// }

// var options = {
//     "method": "GET",
//     "headers": {
//         "Authorization": RefreshAccessTokens(),
//         "contentType": "application/json"
//     }
// }


// function GetTasksData() {
//     fetch("https://www.zohoapis.in/crm/v2/Tasks?page=" + task_number, options).then(response => response.json()).then(data => {
//         ListofTasks.push(...data.data)
//         MorePages = data.info.more_records
//         console.log("For iteration %s, Tasks Length is %s", task_number, ListofTasks.length)
//         if (MorePages) {
//             task_number++
//             GetTasksData()
//         }
//         else {
//             let BufferIDs = []
//             let uniquOwnerID = [...new Set(ListofTasks.map(item => (!BufferIDs.includes(item.Owner.id) && item.Owner !== undefined) ? (BufferIDs.push(item.Owner.id), item.Owner) : null))].filter(item => item !== null)
//             localStorage.setItem("AllTaskOwners", JSON.stringify(uniquOwnerID))


//             BufferIDs.forEach((item, index) => {
//                 let bufferData = ListofTasks.filter(eachTask => {
//                     if (eachTask.Owner !== undefined && eachTask.Owner.id === item && eachTask.DueDate !== null) {
//                         return eachTask
//                     }
//                 })

//                 // retain only the required fields

//                 bufferData = bufferData.map(eachTask => {
//                     return {
//                         "TaskId": eachTask.id,
//                         "Subject": eachTask.Subject,
//                         "Status": eachTask.Status,
//                         "CreatedTime": eachTask.Created_Time !== null ? eachTask.Created_Time.MakeDatesLocalString() : null,
//                         "DueDate": eachTask.Due_Date,
//                         "TaskOwnerID": eachTask.Owner.id,
//                         "ClosedTime": eachTask.Closed_Time != null ? eachTask.Closed_Time.MakeDatesLocalString() : null,
//                         "OnTime": (eachTask.Due_Date !== null && eachTask.Closed_Time !== null) ? (new Date(eachTask.Due_Date) >= new Date(eachTask.Closed_Time).setHours(0, 0, 0, 0) ? true : false) : false,
//                         "OverDueCompleted": (eachTask.Due_Date !== null && eachTask.Closed_Time !== null) ? (new Date(eachTask.Due_Date) < new Date(eachTask.Closed_Time).setHours(0, 0, 0, 0) ? true : false) : false,
//                         "CarryOver": (eachTask.Due_Date !== null && eachTask.Closed_Time === null) ? (new Date(eachTask.Due_Date) < new Date() ? true : false) : false,
//                     }
//                 })

//                 console.log("Total Data Size : ", bufferData.length)
//                 let batch = 10000
//                 let batchCount = Math.ceil(bufferData.length / batch)
//                 console.log("Saving as ", batchCount)
//                 for (let i = 0; i < batchCount; i++) {
//                     let start = i * batch
//                     let end = start + batch
//                     localStorage.setItem(`Owner${item}Batch${i}`, JSON.stringify(bufferData.slice(start, end)))
//                 }
//             })
//             let end = new Date()
//             console.log("End : ", end)
//             console.log("Time Taken", (end - start) / 1000, "seconds")
//         }
//     })
// }

// window.onload = function () {
//     document.getElementById("getLatestTasks").addEventListener("click", GetTasksData)
// }