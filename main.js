window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  document.getElementById('controlcenterswitch').addEventListener("change", changeTemplate)
  // let controlCenter = document.getElementById("controlcenterswitch")
  // controlCenter.checked = true
  changeTemplate()
});

function changeTemplate() {
  console.log("Trigger")
  let sessionTemp = document.getElementById("sessionReport")
  let masterTemp = document.getElementById("masterReport")
  let controlCenter = document.getElementById("controlcenterswitch")
  let sizeBlock = document.getElementById('returned')
  sizeBlock.style.display = "none"
  masterTemp.style.display = "none";
  sessionTemp.style.display = " none";
  (controlCenter.checked == true) ? (masterTemp.style.display = "block", document.getElementById("getData").addEventListener('click', makeRequestToAppscript)) : sessionTemp.style.display = 'block'
}

async function makeRequestToAppscript() {
  // (document.getElementById("datasize").value) ? (let dataSize = document.getElementById("datasize").value) : (let dataSize = 10000);
  let dataSize = 10000
  if (document.getElementById("datasize").value) {
    dataSize = document.getElementById("datasize").value
  }
  let start = document.getElementById("start").value + ":00"
  let end = document.getElementById("end").value + ":00"
  let url = "https://script.google.com/macros/s/AKfycbwXC97M6PpuqPkiLbzPUAzxqW2vlLqT_LHns8320RIxH3kdQv8o0YZjwZSTdm2_-Z8/exec?queue=0"

  let reqURL = `${url}start=${start}&end=${end}&size=${dataSize}`
  console.warn(reqURL)
  fetch(reqURL)
    .then(res => res.json())
    .then(async data => await dataforDataTables_MasterReport(data['responsedata']))
}

function getParams() {
  try {
    var idx = document.URL.indexOf('?');
    if (idx != -1) {
      var idreq = document.URL.substring(idx + 1, document.URL.length)
      console.error(idreq)
      getCurrentURL(idreq)
    }
  }
  catch {
    console.log("No Query Params")
  }
}

async function getCurrentURL(sidurl) {
  let file =
    'https://elastic-sync.s3.ap-south-1.amazonaws.com/SJSON/' +
    sidurl +
    '.json'
  fetch(file) //api for the get request
    .then(response => response.json())
    .then(async data => await processData(JSON.parse(data)))
    .catch(error => updateError(error))
}

getParams()

window.onload = function () {
  var searchButton = document.getElementById('searchButton')
  searchButton.addEventListener('click', getFromS3)
  var searchElastic = document.getElementById('searchElastic')
  searchElastic.addEventListener('click', GetFromElastic)

}

async function GetFromElastic() {
  console.log("GetFromElastic")
  let url = "https://script.google.com/macros/s/AKfycbwXC97M6PpuqPkiLbzPUAzxqW2vlLqT_LHns8320RIxH3kdQv8o0YZjwZSTdm2_-Z8/exec?queue=1&sessionID=" +
    document.getElementById('searchSession').value.toString().split("_")[1]
  console.log(url)
  fetch(url) //api for the get request
    .then(response => response.json())
    .then(async data => await processData(data))
    .catch(error => updateError(error))
}

async function getFromS3() {
  let file =
    'https://elastic-sync.s3.ap-south-1.amazonaws.com/SJSON/' + document.getElementById('searchSession').value +
    '.json'
  fetch(file) //api for the get request
    .then(response => response.json())
    .then(async data => await processData(JSON.parse(data)))
    .catch(error => updateError(error))
}

async function updateError(error) {
  try {
    document.getElementById("errorBox").remove()
  }
  catch {
    console.log("Error Div Doesn't Yet")
  }
  console.error('Error:', error);
  window.alert("No Such ID Found")
  let errorDiv = document.createElement("div")
  errorDiv.setAttribute("class", "text-center")
  errorDiv.setAttribute("id", "errorBox")
  document.getElementById("searchInput").after(errorDiv)
  // let errorBox = document.getElementById("errorBox")

  let errorList = document.createElement("ol")
  errorList.setAttribute("class", "center-list")
  errorList.innerHTML = "<h3>Possible Reasons Includes:</h3>"
  let list1 = document.createElement("li")
  list1.innerHTML = "Session ID / Lead ID Doesn't Exists"
  let list2 = document.createElement("li")
  list2.innerHTML = "Session ID / Lead ID files yet to be created &  added in S3"
  errorList.append(list1)
  errorList.append(list2)
  errorDiv.append(errorList)

}

// ----------------------------------------------------------------------------------------------------------------------
async function processData(out) {

  var hitsHITS = out['hits']['hits']
  var allMessages = hitsHITS.map(each => each['_source']['message'])

  ipFetch(allMessages[0]['ip'])
  dataforDataTables(allMessages)

  document.getElementById('devicetype').innerText = allMessages[0]['deviceType']
  document.getElementById('recentvisit').innerText = new Date(allMessages.at(-1)['ts']).toDateString() + ", " + new Date(allMessages.at(-1)['ts']).toLocaleTimeString()
  document.getElementById('1stvisit').innerText = new Date(allMessages[0]['ts']).toDateString() + ", " + new Date(allMessages[0]['ts']).toLocaleTimeString()
  document.getElementById('1stref').innerText = allMessages[0]['referrer']

  // let sourceIdentifierURL = "https://script.google.com/macros/s/AKfycbwXC97M6PpuqPkiLbzPUAzxqW2vlLqT_LHns8320RIxH3kdQv8o0YZjwZSTdm2_-Z8/exec?queue=3&sessionURL=" + allMessages[0]['url'] + "&sessionRefferer=" + allMessages[0]['referrer']
  getAdData(allMessages[0]['url'], allMessages[0]['referrer'])
  // if (allMessages[0]['url'].includes("keyword")) {
  //   document.getElementById('keyword').innerText = allMessages[0]['url'].substring(allMessages[0]['url'].indexOf("keyword=") + 8, allMessages[0]['url'].indexOf("&", allMessages[0]['url'].indexOf("keyword=") + 8))
  // }

}
async function getAdData(initURL, initREF) {
  let adURL = "https://script.google.com/macros/s/AKfycbwXC97M6PpuqPkiLbzPUAzxqW2vlLqT_LHns8320RIxH3kdQv8o0YZjwZSTdm2_-Z8/exec?queue=2"
  // console.log(adURL)
  fetch(adURL)
    .then(response => response.json())
    .then(async sourceData => await processSourceData(sourceData, initURL, initREF))
}
async function processSourceData(sourceDataProcess, initURL, initREF) {
  var campdetails = ""
  var keyword = ""

  console.log("processSourceData")
  console.log(sourceDataProcess)
  console.log(initURL)
  console.log(initREF)
  if (initURL.includes("&keyword=")) {
    keyword = initURL.toString().substring(initURL.lastIndexOf("&keyword=") + 9, initURL.lastIndexOf("&device") + 50).split("&")[0]
    console.log(keyword)
  }
  if (initURL.includes('campaignid')) {
    let campid = initURL.substring(initURL.indexOf("?campaignid=") + 12, initURL.indexOf("&"))
    console.log(campid)
    campdetails = sourceDataProcess[campid].CAMPAIGN
  }
  else {
    if (initREF != undefined || initREF != null || initREF == '') {

      if (initREF.includes("https://www.google")) {
        campdetails = "SEO"
      }
      else if (initREF.includes("https://www.youtube")) {
        campdetails = "Youtube Organic"
      }
      else if (initREF.includes("https://www.bing")) {
        campdetails = "SEO"
      }
      else {
        campdetails = initREF
      }
    }
    if (initREF == null || initREF == undefined || initREF == '') {
      campdetails = "Direct"
    }
  }
  document.getElementById('leadSource').innerText = campdetails
  document.getElementById('keyword').innerText = keyword
}

async function ipFetch(ip) {
  let ipurl = 'http://ip-api.com/json/' + ip
  fetch(ipurl)
    .then(response => response.json())
    .then(async ipData => await processIP(ipData))
}

async function processIP(ipdata) {
  let mapurl = `http://maps.google.com/maps?q=${ipdata['lat']},${ipdata['lon']}&z=7&output=embed`
  document.getElementById('ipcountry').innerText = ipdata['country']
  document.getElementById('ipregion').innerText = ipdata['regionName']
  document.getElementById('ipcity').innerText = ipdata['city']
  document.getElementById('iptimezone').innerText = ipdata['timezone']
  document.getElementById('orgIP').innerText = ipdata['org']
  document.getElementById('ispIP').innerText = ipdata['isp']
  document.getElementById('ipzip').innerText = ipdata['zip']
  document.getElementById('ccode').innerText = ipdata['countryCode']
  document.getElementById('locamap').setAttribute('src', mapurl)
}

async function dataforDataTables(allMessages) {
  var sec = 1000;
  var min = 60 * sec;
  var hour = 60 * min;
  var day = 24 * hour;


  const allTimes = []
  for (let timeVars of allMessages) {
    allTimes.push(timeVars['ts'])
  }

  // console.log(allTimes.join(","))
  const timespentbuffer = allTimes.slice(1).map((e, i) => allTimes[i + 1] - allTimes[i]).filter(indiTimes => indiTimes <= 120000).reduce(function (x, y) { return x + y; }, 0)


  var days = Math.floor(timespentbuffer / day);
  var hours = Math.floor(timespentbuffer % day / hour);
  var minutes = Math.floor(timespentbuffer % day % hour / min);
  var seconds = Math.floor(timespentbuffer % day % hour % min / sec);
  var timespent = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

  console.log(timespent)
  document.getElementById('timespent').innerText = timespent


  let uniquePagesList = []
  let bufferPageList = []
  for (msg of allMessages) {
    if (!bufferPageList.includes(msg['url'])) {
      uniquePagesList.push([msg['url']])
      bufferPageList.push(msg['url'])
    }
  }
  document.getElementById('upv').innerText = uniquePagesList.length


  $('#tableforUniquePages').DataTable({
    order: [],
    bInfo: false,
    destroy: true,
    searching: false,
    paging: false,
    info: false,
    data: uniquePagesList,
    columns: [{
      title: "Unique Pages Visited"
    }]
  })

  let uniqueClicks = []
  let uniqueClicksBuffer = []
  let masterArrayData = []
  for (message of allMessages) {
    let url = message['url']
    let eachKeys = Object.keys(message)

    if (eachKeys.includes('info')) {
      for (eachInfo of message['info']) {
        // console.log(eachInfo)
        let eachInfoKeys = Object.keys(eachInfo)
        // console.log(eachInfoKeys)
        if (eachInfoKeys.includes('val')) {
          masterArrayData.push([message['sessionId'], url, new Date(eachInfo['tm']).toLocaleString(), eachInfo['en'], eachInfo['ep'], eachInfo['val']])
          // console.log([url,new Date(eachInfo['tm']).toLocaleString(),eachInfo['en'],eachInfo['ep'],eachInfo['val']])
        }
        else {
          masterArrayData.push([message['sessionId'], url, new Date(eachInfo['tm']).toLocaleString(), eachInfo['en'], eachInfo['ep'], ""])
        }
        if ((eachInfo['en'] == 'click' || eachInfo['en'] == "touchstart" || eachInfo['en'] == "touchmove") && !uniqueClicksBuffer.includes(eachInfo['ep']) && eachInfo['ep'] != "/html[null]") {
          uniqueClicks.push([eachInfo['ep']])
          uniqueClicksBuffer.push(eachInfo['ep'])
        }
      }
    }
    else {
      masterArrayData.push([message['sessionId'], url, new Date(message['ts']).toLocaleString(), "", "", ""])
    }
  }

  $('#tableforUniqueClicks').DataTable({
    order: [],
    bInfo: false,
    destroy: true,
    searching: false,
    paging: false,
    info: false,
    data: uniqueClicks,
    columns: [{
      title: " Unique Elements (clicked / touchstart / touchmove)"
    }]
  })

  $('#tableforReport').DataTable({
    order: [],
    data: masterArrayData,
    destroy: true,
    columns: [
      { title: 'Session ID' },
      { title: 'Page URL' },
      { title: 'Date' },
      { title: 'Action' },
      { title: 'Element' },
      { title: 'Value' },
    ],
    "columnDefs": [
      { "width": "10%", "targets": 0 }
    ]
  });

}

// ------------------------------------ dataforDataTables_MasterReport ---------------------------------------------

async function dataforDataTables_MasterReport(allMessages) {
  console.log("dataforDataTables_MasterReport")
  let sizeBlock = document.getElementById('returned')
  sizeBlock.style.display = "block"
  let sizeBlockValue = document.getElementById('returneddatasize')
  sizeBlockValue.innerHTML = allMessages.length
  let masterArrayData = []
  let countMessage = 1
  for (message of allMessages) {
    console.warn("Currently Procesing %s Message", countMessage)
    countMessage++
    let url = message['url']
    let eachKeys = Object.keys(message)

    if (eachKeys.includes('info')) {
      for (eachInfo of message['info']) {
        // console.log(eachInfo)
        let eachInfoKeys = Object.keys(eachInfo)
        // console.log(eachInfoKeys)
        if (eachInfoKeys.includes('val')) {
          masterArrayData.push([message['sessionId'], url, new Date(eachInfo['tm']).toLocaleString(), eachInfo['en'], eachInfo['ep'], eachInfo['val']])
          // console.log([url,new Date(eachInfo['tm']).toLocaleString(),eachInfo['en'],eachInfo['ep'],eachInfo['val']])
        }
        else {
          masterArrayData.push([message['sessionId'], url, new Date(eachInfo['tm']).toLocaleString(), eachInfo['en'], eachInfo['ep'], ""])
        }
      }
    }
    else {
      masterArrayData.push([message['sessionId'], url, new Date(message['ts']).toLocaleString(), "", "", ""])
    }
  }

  $('#tableforReport').DataTable({
    // order: [],
    "autoWidth": false,
    data: masterArrayData,
    destroy: true,
    columns: [
      { title: 'Session ID' },
      { title: 'Page URL' },
      { title: 'Date' },
      { title: 'Action' },
      { title: 'Element' },
      { title: 'Value' },
    ],
    "columnDefs": [
      { "width": "20%", "targets": 1 }
    ]
  });

}
