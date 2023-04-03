// async function dataforDataTables_MasterReport(allMessages) {

//     let masterArrayData = []
//     for (message of allMessages) {
//         let url = message['url']
//         let eachKeys = Object.keys(message)

//         if (eachKeys.includes('info')) {
//             for (eachInfo of message['info']) {
//                 // console.log(eachInfo)
//                 let eachInfoKeys = Object.keys(eachInfo)
//                 // console.log(eachInfoKeys)
//                 if (eachInfoKeys.includes('val')) {
//                     masterArrayData.push([message['sessionId'], url, new Date(eachInfo['tm']).toLocaleString(), eachInfo['en'], eachInfo['ep'], eachInfo['val']])
//                     // console.log([url,new Date(eachInfo['tm']).toLocaleString(),eachInfo['en'],eachInfo['ep'],eachInfo['val']])
//                 }
//                 else {
//                     masterArrayData.push([message['sessionId'], url, new Date(eachInfo['tm']).toLocaleString(), eachInfo['en'], eachInfo['ep'], ""])
//                 }
//             }
//         }
//         else {
//             masterArrayData.push([message['sessionId'], url, new Date(message['ts']).toLocaleString(), "", "", ""])
//         }
//     }

//     $('#tableforReport').DataTable({
//         order: [],
//         data: masterArrayData,
//         destroy: true,
//         columns: [
//             { title: 'Session ID' },
//             { title: 'Page URL' },
//             { title: 'Date' },
//             { title: 'Action' },
//             { title: 'Element' },
//             { title: 'Value' },
//         ],
//         "columnDefs": [
//             { "width": "10%", "targets": 0 }
//         ]
//     });

// }