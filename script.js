// write a code to modify title of the window.open page


// --------------------------------------------- MAIN -----------------------------
document.getElementById('copy').addEventListener('click', getformDetails)
document.getElementById('action').addEventListener('change', getOption)
document.getElementById('reset-template').addEventListener('click', resetTemplate)
document.getElementById('GenerateINTOBox').addEventListener('click', pushintoTextBox)

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  if (tabs[0].url.includes("crm.zoho.in/crm/org60006702612/tab/Leads/")){
    document.getElementById("flyURL").setAttribute("href",`report.html?${masterLeadIDForNow[tabs[0].url.split("/").at(-1)]}`)
    document.getElementById("flyURlBut").innerText = "Get Session Report for " + tabs[0].title.split(" (")[0]
  }
  else{
    document.getElementById("flyURL").setAttribute("href","report.html")
    document.getElementById("flyURlBut").innerText = "Session Report"
  }
});

//   hide everything on initial load
var email = document.getElementById('emailSection')
email.style.display = 'none'
var wap = document.getElementById('wapSection')
wap.style.display = 'none'
var call = document.getElementById('callSection')
call.style.display = 'none'
var demo = document.getElementById('demoSection')
demo.style.display = 'none'

// reset function
async function resetTemplate () {
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

async function getOption () {
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

async function getformDetails () {
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
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      console.error(masterLeadIDForNow[tabs[0].url.split("/").at(-1)]);
      window.open(`report.html?${masterLeadIDForNow[tabs[0].url.split("/").at(-1)]}`)
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
async function pushintoTextBox () {
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

var masterLeadIDForNow = {
"156684000007911001" : "SID_32520225756528664",
"156684000007907001" : "SID_20592406241755400",
"156684000007903002" : "SID_17178894933825084",
"156684000007820038" : "SID_75773213067400140",
"156684000007837001" : "SID_89839441331952720",
"156684000007833038" : "SID_28427624329921176",
"156684000007833001" : "SID_91143225194445250",
"156684000007829001" : "SID_55618099775471030",
"156684000007827001" : "SID_44767606261812290",
"156684000007823001" : "SID_80691680736036910",
"156684000007820001" : "SID_29963130289344076",
"156684000007814030" : "SID_65635306617235290",
"156684000007719247" : "SID_27161417094294760",
"156684000007736001" : "SID_60461092427750216",
"156684000007733001" : "SID_46163060817797210",
"156684000007725002" : "SID_84403081577341280",
"156684000007727002" : "SID_30971033793112680",
"156684000007690001" : "SID_74186383593142130",
"156684000007683002" : "SID_77676969130515230",
"156684000007648001" : "SID_981677283940474.1",
"156684000007620018" : "SID_82702885189619730",
"156684000007645002" : "SID_3897236289796968",
"156684000007610001" : "SID_26343813931141868",
"156684000007609001" : "SID_83184751095230930",
"156684000007607002" : "SID_82019955449359230",
"156684000007558107" : "SID_43383619748512616",
"156684000007555129" : "SID_44541611026896424",
"156684000007557003" : "SID_19501959857472496",
"156684000007555094" : "SID_4400204121737494.5",
"156684000007561001" : "SID_81661592559677800",
"156684000007555067" : "SID_51722385900082250",
"156684000007558002" : "SID_48379445654051144",
"156684000007511001" : "SID_88877563048134200",
"156684000007509002" : "SID_84401040328933740",
"156684000007502001" : "SID_94348644873251540",
"156684000007470001" : "SID_11926415819826742",
"156684000007467001" : "SID_38524851433113016",
"156684000007464002" : "SID_25566169208598020",
"156684000007433001" : "SID_45911396283434370",
"156684000007430002" : "SID_34603589406576196",
"156684000007411002" : "SID_6480623933260099",
"156684000007397038" : "SID_42317130979052010",
"156684000007413012" : "SID_29918713907065840",
"156684000007405005" : "SID_70292707627525130",
"156684000007416001" : "SID_42253058455109910",
"156684000007415001" : "SID_86527640813136510",
"156684000007414002" : "SID_25233015807024704",
"156684000007397002" : "SID_94491685967232140",
"156684000007373008" : "SID_47527360935420024",
"156684000007355038" : "SID_78352019308991170",
"156684000007358001" : "SID_37943867429730390",
"156684000007355001" : "SID_9430094089916396",
"156684000007352001" : "SID_80091399343242960",
"156684000007349001" : "SID_83567638462984940",
"156684000007346001" : "SID_2407585812356605",
"156684000007342002" : "SID_10409546250979118",
"156684000007276001" : "SID_9137541596567456",
"156684000007274001" : "SID_88725155705030020",
"156684000007272001" : "SID_10796162928332408",
"156684000007269001" : "SID_4093703228445755.5",
"156684000007266001" : "SID_38879912124644830",
"156684000007263002" : "SID_3712317569402157",
"156684000007223001" : "SID_67502112581033400",
"156684000007220001" : "SID_18001470663586172",
"156684000007217001" : "SID_47447441135080440",
"156684000007214001" : "SID_26809678471355360",
"156684000007211002" : "SID_96572711652595550",
"156684000007169001" : "SID_93167703598792370",
"156684000007168002" : "SID_84860260105930450",
"156684000007167001" : "SID_34958253146570972",
"156684000007165001" : "SID_44292251760541230",
"156684000007163002" : "SID_38056343248653500",
"156684000007067001" : "SID_16722344759071416",
"156684000007061001" : "SID_76358793676079170",
"156684000007058001" : "SID_50698617749392860",
"156684000007055002" : "SID_28018832598327024",
"156684000007031002" : "SID_12954121793420704",
"156684000007030001" : "SID_71056962351347016",
"156684000006996222" : "SID_2587507974039738",
"156684000007029001" : "SID_71207702833498550",
"156684000007028001" : "SID_89597352598166460",
"156684000007020030" : "SID_27427215675625584",
"156684000006998039" : "SID_6547957354127965",
"156684000006995048" : "SID_42502735036023840",
"156684000007001001" : "SID_14417396084178614",
"156684000006998002" : "SID_6976498095390871",
"156684000006969030" : "SID_67003165094931700",
"156684000006956002" : "SID_41382074317719740",
"156684000006959004" : "SID_55266874167997070",
"156684000006960001" : "SID_26619393964897196",
"156684000006935120" : "SID_36213440156656060",
"156684000006945001" : "SID_42236278289841710",
"156684000006944001" : "SID_27661844037496784",
"156684000006932003" : "SID_7602821139555727",
"156684000006943001" : "SID_69623558160427250",
"156684000006942001" : "SID_50077805495504740",
"156684000006941002" : "SID_49539395243910550",
"156684000006940001" : "SID_1953919978710416.8",
"156684000006939001" : "SID_25779311405129324",
"156684000006938001" : "SID_15892067496475782",
"156684000006892115" : "SID_90889832456833950",
"156684000006929001" : "SID_8478854168342798",
"156684000006902079" : "SID_77565617507442690",
"156684000006911056" : "SID_72511237563142480",
"156684000006910005" : "SID_32374700861898444",
"156684000006900005" : "SID_55218081667177580",
"156684000006909001" : "SID_26538014542329580",
"156684000006903002" : "SID_94918728657734200",
"156684000006905002" : "SID_92754651936440030",
"156684000006892001" : "SID_60417278464863110",
"156684000006878009" : "SID_44087892892791540",
"156684000006857039" : "SID_22190909022843708",
"156684000006856039" : "SID_25337425144620784",
"156684000006862001" : "SID_60229989042784584",
"156684000006861001" : "SID_43444176591156980",
"156684000006856002" : "SID_66159553598765110",
"156684000006859038" : "SID_74003216960146460",
"156684000006860001" : "SID_44168974423056920",
"156684000006859001" : "SID_77703826545279310",
"156684000006820438" : "SID_13388633125438388",
"156684000006812729" : "SID_90496927657071420",
"156684000006857002" : "SID_78433163513349970",
"156684000006796001" : "SID_77441727306492770",
"156684000006794001" : "SID_31438208139918668",
"156684000006792001" : "SID_82418487812224580",
"156684000006790001" : "SID_84513801777781650",
"156684000006787001" : "SID_42410454881552480",
"156684000006785001" : "SID_31496934650636030",
"156684000006781002" : "SID_55428710768540190",
"156684000006746597" : "SID_91821327975308590",
"156684000006743002" : "SID_85273564757519200",
"156684000006757001" : "SID_67691360961368500",
"156684000006736005" : "SID_65727196420099920",
"156684000006753001" : "SID_41702579853552760",
"156684000006749002" : "SID_69681961606206210",
"156684000006720002" : "SID_70900946192513656",
"156684000006695005" : "SID_7213621621530497",
"156684000006695004" : "SID_81906873309999860",
"156684000006695003" : "SID_29996929647230750",
"156684000006706002" : "SID_1502175077709799.8",
"156684000006704005" : "SID_16539420527926806",
"156684000006704004" : "SID_57857294385167736",
"156684000006704003" : "SID_31985996512245896",
"156684000006704002" : "SID_65263924443719176",
"156684000006704001" : "SID_94027305710063340",
"156684000006686002" : "SID_13544441725946620",
"156684000006655119" : "SID_3120440541534419.5",
"156684000006655118" : "SID_14235521160777254",
"156684000006655117" : "SID_29973037638350820",
"156684000006655116" : "SID_91106613538511520",
"156684000006655115" : "SID_41959519619964160",
"156684000006655114" : "SID_62691289908523840",
"156684000006655113" : "SID_37421301388071670",
"156684000006655112" : "SID_58487614015250740",
"156684000006655111" : "SID_66115194915673730",
"156684000006655110" : "SID_61690657847403930",
"156684000006604162" : "SID_60010676508074540",
"156684000006605182" : "SID_45965542572362424",
"156684000006605139" : "SID_67067909910032420",
"156684000006610103" : "SID_2298962071617472",
"156684000006610102" : "SID_13515352095925736",
"156684000006605066" : "SID_87435601236547840",
"156684000006605065" : "SID_30813931545214170",
"156684000006604099" : "SID_31993332890254344",
"156684000006604098" : "SID_53721138620071380",
"156684000006610002" : "SID_65425707992028050",
"156684000006610001" : "SID_26720283687579548",
"156684000006605024" : "SID_54958492490198840",
"156684000006604025" : "SID_31520544253691950",
"156684000006604024" : "SID_71629933666157816",
"156684000006502295" : "SID_6149132700773596",
"156684000006501462" : "SID_84716755871205940",
"156684000006501393" : "SID_95779083456803730",
"156684000006501392" : "SID_76763154591264430",
"156684000006516174" : "SID_83649420096789340",
"156684000006502201" : "SID_54974901478874696",
"156684000006502136" : "SID_97877931138928050",
"156684000006502131" : "SID_12712159616139230",
"156684000006501276" : "SID_22828695990313030",
"156684000006501275" : "SID_9024283929395860",
"156684000006501199" : "SID_31888418882455572",
"156684000006502094" : "SID_98306469331985230",
"156684000006501138" : "SID_53745816161016570",
"156684000006501137" : "SID_31572853819133904",
"156684000006502055" : "SID_69733610329235064",
"156684000006502002" : "SID_58588520044268600",
"156684000006502001" : "SID_74806168839032260",
"156684000006501102" : "SID_6825518620092375",
"156684000006501005" : "SID_18908851782682668",
"156684000006501002" : "SID_69222693873153920",
"156684000006501001" : "SID_60169838934160940",
"156684000006414005" : "SID_86507735981697700",
"156684000006388097" : "SID_93402588741779310",
"156684000006388037" : "SID_8413797412303903",
"156684000006364004" : "SID_7711545091794880",
"156684000006364003" : "SID_27756392751430360",
"156684000006311202" : "SID_93133514101508720",
"156684000006326082" : "SID_23431538654034510",
"156684000006325144" : "SID_98732316447617860",
"156684000006325138" : "SID_73614888400199540",
"156684000006325093" : "SID_1176555172948434.8",
"156684000006311069" : "SID_24613529944923740",
"156684000006280005" : "SID_50728143950221496",
"156684000006224001" : "SID_42481977157364504",
"156684000006187121" : "SID_39642355553933384",
"156684000006185109" : "SID_37831102108368800",
"156684000006187086" : "SID_4507611046502724",
"156684000006185065" : "SID_69733610329235064",
"156684000006187001" : "SID_36123512688140184",
"156684000006186001" : "SID_38428497342560800",
"156684000006185002" : "SID_42500452389628070",
"156684000006185001" : "SID_53577815974422040",
"156684000006149038" : "SID_82633853980474100",
"156684000006149001" : "SID_12200605624980154",
"156684000006148055" : "SID_44896627624532330",
"156684000006148002" : "SID_70856551490302680",
"156684000006148001" : "SID_32864960777608544",
"156684000006147073" : "SID_32099853512708100",
"156684000006147002" : "SID_87552968873436960",
"156684000006147001" : "SID_25259795827761588",
"156684000006109010" : "SID_60404633812506340",
"156684000006109009" : "SID_52458390333878470",
"156684000006109008" : "SID_48541336524604240",
"156684000006109007" : "SID_10897494965062938",
"156684000006109006" : "SID_38844371934280920",
"156684000006109005" : "SID_56873447212186740",
"156684000006109004" : "SID_83752826620102660",
"156684000006109003" : "SID_39647878432083670",
"156684000006073003" : "SID_91691210758804110",
"156684000006039283" : "SID_26392704930714640",
"156684000006039282" : "SID_32185359483032692",
"156684000006039281" : "SID_77720599056876580",
"156684000006027004" : "SID_49588804198124590",
"156684000006027003" : "SID_73964136905756100",
"156684000006027002" : "SID_29146267031154040",
"156684000006027001" : "SID_78609487463802900",
"156684000005984018" : "SID_71301152834875790",
"156684000005984016" : "SID_90704659198897870",
"156684000005984015" : "SID_61258937244999690",
"156684000005984014" : "SID_21098652021875550",
"156684000005984013" : "SID_12615910632388172",
"156684000005984012" : "SID_52518635591633010",
"156684000005984011" : "SID_39269376265658430",
"156684000005984010" : "SID_7494082437984639",
"156684000005984009" : "SID_80101467613587300",
"156684000005984008" : "SID_2731487738254245.5",
"156684000005984007" : "SID_28130394660594636",
"156684000005984006" : "SID_45924626839299460",
"156684000005984005" : "SID_65174884470221240",
"156684000005984004" : "SID_49525803084743416",
"156684000005915156" : "SID_3098494914623817",
"156684000005928010" : "SID_50504714239669576",
"156684000005928009" : "SID_98118367145858530",
"156684000005915085" : "SID_19445604205577484",
"156684000005915084" : "SID_59031314531800530",
"156684000005893123" : "SID_64779218455940970",
"156684000005893084" : "SID_1813543149068763.8",
"156684000005915006" : "SID_15656527560184252",
"156684000005915005" : "SID_21139705399304476",
"156684000005893015" : "SID_46791093269936776",
"156684000005893014" : "SID_61575534094352970",
"156684000005833025" : "SID_15422433785946676",
"156684000005833024" : "SID_45969430760323850",
"156684000005820001" : "SID_26893798041777560",
"156684000005819002" : "SID_66637884114920180",
"156684000005818001" : "SID_18804119109421748",
"156684000005355001" : "SID_37859906529125870",
"156684000005244001" : "SID_20339733497040436",
"156684000005228078" : "SID_78248305133683500",
"156684000005137056" : "SID_35746919708236204",
"156684000004220064" : "SID_14133769966791964",
"156684000003720001" : "SID_83178192699193500",
"156684000003578070" : "SID_42933809496513440",
"156684000003518001" : "SID_19318289466962456",
"156684000002676749" : "SID_10070496152290032",
"156684000002546154" : "SID_66018283649680610",
"156684000001630061" : "SID_84848845317107780",
"156684000001552125" : "SID_11599369177058150",
"156684000000384012" : "SID_81082025460761470"
}