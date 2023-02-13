// write a code to modify title of the window.open page


// --------------------------------------------- MAIN -----------------------------
try {
  document.getElementById('copy').addEventListener('click', getformDetails)
  document.getElementById('action').addEventListener('change', getOption)
  document.getElementById('reset-template').addEventListener('click', resetTemplate)
  document.getElementById('GenerateINTOBox').addEventListener('click', pushintoTextBox)
} catch {
  console.log("not the index.html page")
}

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  if (tabs[0].url.includes("crm.zoho.in/crm/org60006702612/tab/Leads/")) {
    document.getElementById("flyURL").setAttribute("href", `report.html?${tabs[0].url.split("/").at(-1)}`)
    document.getElementById("flyURlBut").innerText = "Get Session Report for " + tabs[0].title.split(" (")[0]
  }
  else {
    document.getElementById("flyURL").setAttribute("href", "report.html")
    document.getElementById("flyURlBut").innerText = "Session Report"
  }
});

//   hide everything on initial load
try {
  var email = document.getElementById('emailSection')
  email.style.display = 'none'
  var wap = document.getElementById('wapSection')
  wap.style.display = 'none'
  var call = document.getElementById('callSection')
  call.style.display = 'none'
  var demo = document.getElementById('demoSection')
  demo.style.display = 'none'
} catch {
  console.log("Not Index.html Page")
}

// reset function
async function resetTemplate() {
  //   hide everything on reset & reinitiate
  var emailfrs = document.getElementById('emailsform')
  emailfrs.reset()
  var wapfrs = document.getElementById('whatsappform')
  wapfrs.reset()
  var callfrs = document.getElementById('callsform')
  callfrs.reset()
  var demofrs = document.getElementById('demoform')
  demofrs.reset()
}

async function getOption() {
  resetTemplate()
  let selectElement = document.querySelector('#action')
  output = selectElement.value
  // document.querySelector('.output').textContent = output;
  var demo = document.getElementById('demoSection')
  demo.style.display = 'none'
  var email = document.getElementById('emailSection')
  email.style.display = 'none'
  var wap = document.getElementById('wapSection')
  wap.style.display = 'none'
  var call = document.getElementById('callSection')
  call.style.display = 'none'

  if (output == 'Call Notes') {
    call.style.display = 'block'
  } else if (output == 'Email Notes') {
    email.style.display = 'block'
  } else if (output == 'Demo Notes') {
    demo.style.display = 'block'
  } else if (output == 'WhatsApp Notes') {
    wap.style.display = 'block'
  }
}

async function getformDetails() {
  selectElement = document.querySelector('#action')
  output = selectElement.value

  console.log('Getting Form Details')

  if (output == 'Call Notes') {
    var kvpairs = []
    var form = document.getElementById('callsform')
    let buffer = [' Min : ', ' Sec']
    let dur = 'Duration-:- '
    for (var i = 0; i < form.elements.length; i++) {
      var e = form.elements[i]
      if (!buffer.includes(e.name)) {
        kvpairs.push(e.name + ' -:- ' + e.value)
      } else {
        dur += e.value + e.name
      }
    }
    kvpairs.splice(4, 0, dur)
    kvpairs.splice(0, 0, output)

    var queryString = kvpairs.join('\n')
    console.log(queryString)
    await navigator.clipboard.writeText(queryString)
    // window.alert("Copied")
    // window.close()
  } else if (output == 'Email Notes') {
    var kvpairs = []
    var form = document.getElementById('emailsform')
    for (var i = 0; i < form.elements.length; i++) {
      var e = form.elements[i]
      kvpairs.push(e.name + ' -:- ' + e.value)
    }
    kvpairs.splice(0, 0, output)
    var queryString = kvpairs.join('\n')
    console.log(queryString)
    await navigator.clipboard.writeText(queryString)
    // window.alert("Copied")
    // window.close()
  } else if (output == 'Demo Notes') {
    var kvpairs = []
    var form = document.getElementById('demoform')
    for (var i = 0; i < form.elements.length; i++) {
      var e = form.elements[i]
      kvpairs.push(e.name + ' -:- ' + e.value)
    }
    kvpairs.splice(0, 0, output)
    var queryString = kvpairs.join('\n')
    console.log(queryString)
    await navigator.clipboard.writeText(queryString)
    // window.alert("Copied")
    // window.close()
  } else if (output == 'WhatsApp Notes') {
    var kvpairs = []
    var form = document.getElementById('whatsappform')
    for (var i = 0; i < form.elements.length; i++) {
      var e = form.elements[i]
      kvpairs.push(e.name + ' -:- ' + e.value)
    }
    kvpairs.splice(0, 0, output)
    var queryString = kvpairs.join('\n')
    console.log(queryString)
    await navigator.clipboard.writeText(queryString)
    // window.alert("Copied")
    // window.close()
  }
}

document.addEventListener('keydown', evt => {
  if ((evt.key === 'e' || evt.key === 'E') && evt.shiftKey) {
    //    alert('You have been detected, you have pressed Ctrl+C');
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      console.error(tabs[0].url.split("/").at(-1));
      window.open(`report.html?${tabs[0].url.split("/").at(-1)}`)
    });
    // getformDetails()
  }
  if ((evt.key === 'z' || evt.key === 'Z') && evt.shiftKey) {
    //    alert('You have been detected, you have pressed Ctrl+C');
    window.open('index.html')
    // getformDetails()
  }
  // else if (evt.key === 'v' && evt.ctrlKey) {
  //    alert('You have been detected, you have pressed Ctrl+V');
  // }
})

document.addEventListener('keydown', evt => {
  document.addEventListener
  if ((evt.key === 'c' || evt.key === 'C') && evt.ctrlKey) {
    //    alert('You have been detected, you have pressed Ctrl+C');
    getformDetails()
  }
  // else if (evt.key === 'v' && evt.ctrlKey) {
  //    alert('You have been detected, you have pressed Ctrl+V');
  // }
})

// -------------------------------------------------------------------------------
async function pushintoTextBox() {
  selectElement = document.querySelector('#action')
  output = selectElement.value

  console.log('Getting Form Details')

  if (output == 'Call Notes') {
    var kvpairs = []
    var form = document.getElementById('callsform')
    let buffer = [' Min : ', ' Sec']
    let dur = 'Duration-:- '
    for (var i = 0; i < form.elements.length; i++) {
      var e = form.elements[i]
      if (!buffer.includes(e.name)) {
        kvpairs.push(e.name + ' -:- ' + e.value)
      } else {
        dur += e.value + e.name
      }
    }
    kvpairs.splice(4, 0, dur)
    kvpairs.splice(0, 0, output)

    var queryString = kvpairs.join('\n')
    console.log(queryString)
    // await navigator.clipboard.writeText(queryString)
    // window.alert("Copied")
    // window.close()
  } else if (output == 'Email Notes') {
    var kvpairs = []
    var form = document.getElementById('emailsform')
    for (var i = 0; i < form.elements.length; i++) {
      var e = form.elements[i]
      kvpairs.push(e.name + ' -:- ' + e.value)
    }
    kvpairs.splice(0, 0, output)
    var queryString = kvpairs.join('\n')
    console.log(queryString)
    // await navigator.clipboard.writeText(queryString)
    // window.alert("Copied")
    // window.close()
  } else if (output == 'Demo Notes') {
    var kvpairs = []
    var form = document.getElementById('demoform')
    for (var i = 0; i < form.elements.length; i++) {
      var e = form.elements[i]
      kvpairs.push(e.name + ' -:- ' + e.value)
    }
    kvpairs.splice(0, 0, output)
    var queryString = kvpairs.join('\n')
    console.log(queryString)
    // await navigator.clipboard.writeText(queryString)
    // window.alert("Copied")
    // window.close()
  } else if (output == 'WhatsApp Notes') {
    var kvpairs = []
    var form = document.getElementById('whatsappform')
    for (var i = 0; i < form.elements.length; i++) {
      var e = form.elements[i]
      kvpairs.push(e.name + ' -:- ' + e.value)
    }
    kvpairs.splice(0, 0, output)
    var queryString = kvpairs.join('\n')
    console.log(queryString)
    // await navigator.clipboard.writeText(queryString)
    // window.alert("Copied")
    // window.close()
  }

  try {
    document.getElementById('textcopy').value = ''
    document.getElementById('textcopy').value = queryString
  } catch {
    // document.body.innerHTML = ""
    let anotherDiv = document.createElement('textarea')
    anotherDiv.setAttribute('id', 'textcopy')
    anotherDiv.setAttribute('style', 'height:150px;width:98%')
    document.body.appendChild(anotherDiv)
    // postButton.after(anotherDiv);
    anotherDiv.value = queryString
  }
  // return queryString
  document.getElementById('GenerateINTOBox').scrollIntoView()
  document.getElementById('textcopy').focus()
  document.getElementById('textcopy').select()
}

