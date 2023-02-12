function getParams() {
  try {
    var idx = document.URL.indexOf('?');
    if (idx != -1) {
      var idreq = document.URL.substring(idx + 1, document.URL.length)
      console.log(idreq)
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
    .then(async data => await processData(data))
}

getParams()

window.onload = function () {
  var mb = document.getElementById('searchButton')
  mb.addEventListener('click', getText)
}

async function getText() {
  let file =
    'https://elastic-sync.s3.ap-south-1.amazonaws.com/SJSON/' + document.getElementById('searchSession').value +
    '.json'
  fetch(file) //api for the get request
    .then(response => response.json())
    .then(async data => await processData(data))
}



// ----------------------------------------------------------------------------------------------------------------------
async function processData(out) {
  var hitsHITS = out['hits']['hits']

  var allMessages = hitsHITS.map(each => each['_source']['message'])
  ipFetch(allMessages[0]['ip'])
  dataforDataTables(allMessages)

  document.getElementById('devicetype').innerText = allMessages[0]['deviceType']
  document.getElementById('recentvisit').innerText = new Date(allMessages.at(-1)['ts']).toLocaleString()
  document.getElementById('1stvisit').innerText = new Date(allMessages[0]['ts']).toLocaleString()
  document.getElementById('1stref').innerText = allMessages[0]['referrer']
  if (allMessages[0]['url'].includes("keyword")) {
    document.getElementById('keyword').innerText = allMessages[0]['url'].substring(allMessages[0]['url'].indexOf("keyword=") + 8, allMessages[0]['url'].indexOf("&", allMessages[0]['url'].indexOf("keyword=") + 8))
  }

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

  console.log(allTimes.join(","))
  const timespentbuffer = allTimes.slice(1).map((e, i) => allTimes[i + 1]  - allTimes[i]).filter(indiTimes => indiTimes <= 300000).reduce(function (x, y) { return x + y; }, 0)



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
    "bInfo": false,
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
          masterArrayData.push([url, new Date(eachInfo['tm']).toLocaleString(), eachInfo['en'], eachInfo['ep'], eachInfo['val']])
          // console.log([url,new Date(eachInfo['tm']).toLocaleString(),eachInfo['en'],eachInfo['ep'],eachInfo['val']])
        }
        else {
          masterArrayData.push([url, new Date(eachInfo['tm']).toLocaleString(), eachInfo['en'], eachInfo['ep'], ""])
        }
        if ((eachInfo['en'] == 'click' || eachInfo['en'] == "touchstart" || eachInfo['en'] == "touchmove") && !uniqueClicksBuffer.includes(eachInfo['ep']) && eachInfo['ep'] != "/html[null]") {
          uniqueClicks.push([eachInfo['ep']])
          uniqueClicksBuffer.push(eachInfo['ep'])
        }
      }
    }
    else {
      masterArrayData.push([url, new Date(message['ts']).toLocaleString(), "", "", ""])
    }
  }

  $('#tableforUniqueClicks').DataTable({
    "bInfo": false,
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
    data: masterArrayData,
    destroy: true,
    columns: [
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

