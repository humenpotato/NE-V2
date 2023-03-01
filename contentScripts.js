const initforNotes = function () {
  const injectElement = document.createElement('div')
  injectElement.id = 'new-rustyZone-element'
  injectElement.style.width = '40%'
  // injectElement.style.textAlign = "center"
  injectElement.innerHTML = `
  
  <div id="fullInfoDiv" style="display:block;">
      <style>
      .new-rustyZone-element{
        margin-left:20%
        width:50%;
        text-align: center;
      }

      .text-center{
        text-align: center;
      }
      
      .button {
          background-color: #4CAF50; /* Green */
          border: none;
          color: white;
          text-align: center;
          text-decoration: none;
          transition-duration: 0.4s;
          cursor: pointer;
          margin: 5px;
        }
      
          input:invalid { 
          background: red;
          }
      
      .columnForBasic{
        text-align: center;
      }
      
      </style>
      <br>
      <div>
        <h2 class="text-center">CRM Notes</h2>
      </div>
      <!--<a href="./report.html" target="_blank" class="text-center"><button class="text-center">Session Report</button></a>-->
      <div class="text-center">
        <label for="action-select"></label>
        <select name="action" id="action">
          <option value="null" disabled selected>Select an Action</option>
          <option value="Call Notes">Call Notes</option>
          <option value="Email Notes">Email Notes</option>
          <option value="WhatsApp Notes">WhatsApp Notes</option>
          <option value="Demo Notes">Demo Notes</option>
        </select>
      </div>
      <br />
  
      <!------------------------------------------------------------------------------------------------------------------------>
      <!--<div class="template-output" id="template-output"></div>-->
      <section id="callSection">
        <form id="callsform">
          <!-- <p>
              <label>Lead Id : <input id="leadid" name="Lead Id"></label>
          </p> -->
          <p>
            <label
              >Call Stage :
              <select name="Call Stage" id="Call Stage" required>
                <option value="" disabled selected>Choose Stage</option>
                <option value="Activated Call">Activated Call</option>
                <option value="Incoming Call">Incoming Call</option>
                <option value="1st Call">1st Call</option>
                <option value="2nd Call">2nd Call</option>
                <option value="3rd Call">3rd Call</option>
                <option value="4th Call">4th Call</option>
                <option value="5th Call">5th Call</option>
              </select>
            </label>
          </p>
          <br>
          <p>
            <label
              >Time of the Call :
              <input
                name="Date & Time of the Call"
                id="date"
                type="datetime-local"
                required
            /></label>
          </p>
          <br>
          <p>
            <label
              >Call Result :
              <select name="Call Result" id="callResult" required>
                <option value="" disabled selected>⁉️</option>
                <option value="Interested">Interested</option>
                <option value="Invalid Number">Invalid Number</option>
                <option value="No Response-Busy">No Response or Busy</option>
                <option value="Not Interested">Not Interested</option>
                <option value="Requested Call Back">Requested Call Back</option>
                <option value="Requested More Info">Requested More Info</option>
              </select>
            </label>
          </p>
          <br>
          <p>
            <label
              >Call Validity / Mood :
              <select name="Call Validity" id="Call Validity" required>
                <option value="" disabled selected>Select Validity</option>
                <option value="Spicy">Data Missing</option>
                <option value="Spicy">Spicy</option>
                <option value="Dicy">Dicy</option>
                <option value="Icy">Icy</option>
                <option value="Pricy">Pricy</option>
                <option value="Chameleon">Chameleon</option>
                <option value="Never">Never</option>
                <option value="Junk">Junk</option>
              </select>
            </label>
          </p>
          <br>
          <p>
            <label
              >Duration of the Call :
              <input
                rows="5"
                cols="60"
                name=" Min : "
                type="number"
                value="00"
                min="00"
                max="60"
              />Min<input
                name=" Sec"
                value="00"
                type="number"
                min="0"
                max="60"
                attr
              />Sec</label
            >
          </p>
          <br>
          <p>
            <label
              >Call Transcript : <br />
              <textarea
                style="height: 100px; width: 98%"
                id="call-Transcript"
                name="Call Transcript"
                placeholder="Type the transcription of your call"
                required
              ></textarea>
            </label>
          </p>
          <br>
          <p>
          <label>Next Action : </label>
          <input
            list="nextAction"
            type="text"
            name="Next Action"
            id="Next Action"
            placeholder="Choose Next Action"
          />

          <datalist id="nextAction">
            <option value="Product Demo">Product Demo</option>
            <option value="Follow up Call">Follow up Call</option>
            <option value="Follow up Email">Follow up Email</option>
            <option value="Follow up WhatsApp">Follow up WhatsApp</option>
            <option value="1st Call">1st Call</option>
            <option value="2nd Call">2nd Call</option>
            <option value="3rd Call">3rd Call</option>
            <option value="4th Call">4th Call</option>
            <option value="5th Call">5th Call</option>
            <option value="1st Email">1st Email</option>
            <option value="2nd Email">2nd Email</option>
            <option value="3rd Email">3rd Email</option>
            <option value="4th Email">4th Email</option>
            <option value="5th Email">5th Email</option>
            <option value="1st WhatsApp">1st WhatsApp</option>
            <option value="2nd WhatsApp">2nd WhatsApp</option>
            <option value="3rd WhatsApp">3rd WhatsApp</option>
            <option value="4th WhatsApp">4th WhatsApp</option>
            <option value="5th WhatsApp">5th WhatsApp</option>
          </datalist>
        </p>
          <br>
          <p>
            <label
              >Next Action on :
              <input
                name="Next Action on"
                id="date"
                type="datetime-local"
                required
            /></label>
          </p>
          <br>
          <p>
            <label
              >Next Action by :
              <select name="Next Action by" id="Next Action by" required>
                <option value="" disabled selected>
                  Next Action to be done by
                </option>
                <option value="S. Daniel">S. Daniel</option>
                <option value="Suhas M.">Suhas M.</option>
                <option value="Kanupriya S.">Kanupriya S.</option>
                <option value="Anamika S.">Anamika S.</option>
                <option value="Naveenraj">Naveenraj</option>
              </select>
            </label>
          </p>
        </form>
      </section>
  
      <section id="demoSection">
        <form id="demoform">
          <p>
            <label
              >Demo Booked After :
              <select name="Demo Booked After" id="Demo Booked After">
                <option value="" disabled selected>Demo Booked Stage</option>
                <option value="Activated Email">Activated Email</option>
                <option value="5th Follow-up WhatsApp">Activated WhatsApp</option>
                <option value="5th Follow-up WhatsApp">Activated Call</option>
                <option value="5th Follow-up WhatsApp">Direct</option>
                <option value="5th Follow-up WhatsApp">External referrer</option>
                <option value="1st Follow-up Email">1st Follow-up Email</option>
                <option value="2nd Follow-up Email">2nd Follow-up Email</option>
                <option value="3rd Follow-up Email">3rd Follow-up Email</option>
                <option value="4th Follow-up Email">4th Follow-up Email</option>
                <option value="5th Follow-up Email">5th Follow-up Email</option>
                <option value="1st Follow-up WhatsApp">
                  1st Follow-up WhatsApp
                </option>
                <option value="2nd Follow-up WhatsApp">
                  2nd Follow-up WhatsApp
                </option>
                <option value="3rd Follow-up WhatsApp">
                  3rd Follow-up WhatsApp
                </option>
                <option value="4th Follow-up WhatsApp">
                  4th Follow-up WhatsApp
                </option>
                <option value="5th Follow-up WhatsApp">
                  5th Follow-up WhatsApp
                </option>
                <option value="1st Follow-up WhatsApp">1st Follow-up call</option>
                <option value="2nd Follow-up WhatsApp">2nd Follow-up call</option>
                <option value="3rd Follow-up WhatsApp">3rd Follow-up call</option>
                <option value="4th Follow-up WhatsApp">4th Follow-up call</option>
                <option value="5th Follow-up WhatsApp">5th Follow-up call</option>
              </select>
            </label>
          </p>
          <br>
          <p>
            <label
              >Demo Date :
              <input
                name="Date & Time of the Demo"
                id="date"
                type="datetime-local"
            /></label>
          </p>
          <br>
          <p>
            <label
              >Demo Validity / Mood :
              <select name="Demo Validity" id="Demo Validity">
                <option value="" disabled selected>Select Validity</option>
                <option value="Spicy">Data Missing</option>
                <option value="Spicy">Spicy</option>
                <option value="Dicy">Dicy</option>
                <option value="Icy">Icy</option>
                <option value="Pricy">Pricy</option>
                <option value="Chameleon">Chameleon</option>
                <option value="Never">Never</option>
                <option value="Junk">Junk</option>
              </select>
            </label>
          </p>
          <br>
          <p>
            <label
              >Demo Notes : <br />
              <textarea
                style="height: 100px; width: 98%"
                id="Demo-Notes"
                name="Demo-Notes"
                placeholder="Type the Detailed Requirements, Mood & Minutes of the Demo"
              ></textarea>
            </label>
          </p>
          <br>
          <p>
          <label>Next Action : </label>
          <input
            list="nextAction"
            type="text"
            name="Next Action"
            id="Next Action"
            placeholder="Choose Next Action"
          />

          <datalist id="nextAction">
            <option value="Product Demo">Product Demo</option>
            <option value="Follow up Call">Follow up Call</option>
            <option value="Follow up Email">Follow up Email</option>
            <option value="Follow up WhatsApp">Follow up WhatsApp</option>
            <option value="1st Call">1st Call</option>
            <option value="2nd Call">2nd Call</option>
            <option value="3rd Call">3rd Call</option>
            <option value="4th Call">4th Call</option>
            <option value="5th Call">5th Call</option>
            <option value="1st Email">1st Email</option>
            <option value="2nd Email">2nd Email</option>
            <option value="3rd Email">3rd Email</option>
            <option value="4th Email">4th Email</option>
            <option value="5th Email">5th Email</option>
            <option value="1st WhatsApp">1st WhatsApp</option>
            <option value="2nd WhatsApp">2nd WhatsApp</option>
            <option value="3rd WhatsApp">3rd WhatsApp</option>
            <option value="4th WhatsApp">4th WhatsApp</option>
            <option value="5th WhatsApp">5th WhatsApp</option>
          </datalist>
        </p>
          <br>
          <p>
            <label
              >Next Action on :
              <input
                name="Next Action on"
                id="date"
                type="datetime-local"
                required
            /></label>
          </p>
          <br>
          <p>
            <label
              >Next Action by :
              <select name="Next Action by" id="Next Action by" required>
                <option value="" disabled selected>
                  Next Action to be done by
                </option>
                <option value="S. Daniel">S. Daniel</option>
                <option value="Suhas M.">Suhas M.</option>
                <option value="Kanupriya S.">Kanupriya S.</option>
                <option value="Anamika S.">Anamika S.</option>
                <option value="Naveenraj">Naveenraj</option>
              </select>
            </label>
          </p>
        </form>
      </section>
  
      <section id="emailSection">
        <form id="emailsform">
          <p>
            <label
              >Email Activated Stage :
              <select name="Email Activated Stage" id="Email Activated Stage">
                <option value="" disabled selected>
                  Select Email Activated Stage
                </option>
                <option value="Activated Email">Activated Email</option>
                <option value="Send Immediate">Send Immediate</option>
                <option value="1st Follow-up Email">1st Follow-up Email</option>
                <option value="2nd Follow-up Email">2nd Follow-up Email</option>
                <option value="3rd Follow-up Email">3rd Follow-up Email</option>
                <option value="4th Follow-up Email">4th Follow-up Email</option>
                <option value="5th Follow-up Email">5th Follow-up Email</option>
              </select>
            </label>
          </p>
          <br>
          <p>
            <label
              >Time of the Reply :
              <input
                name="Date & Time of the Reply"
                id="date"
                type="datetime-local"
            /></label>
          </p>
          <br>
          <p>
            <label
              >Email Validity / Mood :
              <select name="Email Validity" id="Email Validity">
                <option value="" disabled selected>Select Validity</option>
                <option value="Spicy">Data Missing</option>
                <option value="Spicy">Spicy</option>
                <option value="Dicy">Dicy</option>
                <option value="Icy">Icy</option>
                <option value="Pricy">Pricy</option>
                <option value="Chameleon">Chameleon</option>
                <option value="Never">Never</option>
                <option value="Junk">Junk</option>
              </select>
            </label>
          </p>
          <br>
          <p>
            <label
              >Email Transcript / Content : <br />
              <textarea
                style="height: 100px; width: 98%"
                id="Email-Transcript"
                name="Email Transcript"
                placeholder="Copy Paste the Replied Content"
              ></textarea>
            </label>
          </p>
          <br>
          <p>
          <label>Next Action : </label>
          <input
            list="nextAction"
            type="text"
            name="Next Action"
            id="Next Action"
            placeholder="Choose Next Action"
          />

          <datalist id="nextAction">
            <option value="Product Demo">Product Demo</option>
            <option value="Follow up Call">Follow up Call</option>
            <option value="Follow up Email">Follow up Email</option>
            <option value="Follow up WhatsApp">Follow up WhatsApp</option>
            <option value="1st Call">1st Call</option>
            <option value="2nd Call">2nd Call</option>
            <option value="3rd Call">3rd Call</option>
            <option value="4th Call">4th Call</option>
            <option value="5th Call">5th Call</option>
            <option value="1st Email">1st Email</option>
            <option value="2nd Email">2nd Email</option>
            <option value="3rd Email">3rd Email</option>
            <option value="4th Email">4th Email</option>
            <option value="5th Email">5th Email</option>
            <option value="1st WhatsApp">1st WhatsApp</option>
            <option value="2nd WhatsApp">2nd WhatsApp</option>
            <option value="3rd WhatsApp">3rd WhatsApp</option>
            <option value="4th WhatsApp">4th WhatsApp</option>
            <option value="5th WhatsApp">5th WhatsApp</option>
          </datalist>
        </p>
          <br>
          <p>
            <label
              >Next Action on :
              <input
                name="Next Action on"
                id="date"
                type="datetime-local"
                required
            /></label>
          </p>
          <br>
          <p>
            <label
              >Next Action by :
              <select name="Next Action by" id="Next Action by" required>
                <option value="" disabled selected>
                  Next Action to be done by
                </option>
                <option value="S. Daniel">S. Daniel</option>
                <option value="Suhas M.">Suhas M.</option>
                <option value="Kanupriya S.">Kanupriya S.</option>
                <option value="Anamika S.">Anamika S.</option>
                <option value="Naveenraj">Naveenraj</option>
              </select>
            </label>
          </p>
        </form>
      </section>
  
      <section id="wapSection">
        <form id="whatsappform">
          <p>
            <label
              >WhatsApp Stage :
              <select
                name="WhatsApp Activated Stage"
                id="WhatsApp Activated Stage"
              >
                <option value="" disabled selected>Select Activated Stage</option>
                <option value="Activated WhatsApp">Activated WhatsApp</option>
                <option value="1st Follow-up WhatsApp">
                  1st Follow-up WhatsApp
                </option>
                <option value="2nd Follow-up WhatsApp">
                  2nd Follow-up WhatsApp
                </option>
                <option value="3rd Follow-up WhatsApp">
                  3rd Follow-up WhatsApp
                </option>
                <option value="4th Follow-up WhatsApp">
                  4th Follow-up WhatsApp
                </option>
                <option value="5th Follow-up WhatsApp">
                  5th Follow-up WhatsApp
                </option>
              </select>
            </label>
          </p>
          <br>
          <p>
            <label
              >Time of the Reply :
              <input
                name="Date & Time of the Reply"
                id="date"
                type="datetime-local"
            /></label>
          </p>
          <br>
          <p>
            <label
              >WhatsApp Validity / Mood :
              <select name="WhatsApp Validity" id="WhatsApp Validity">
                <option value="" disabled selected>Select Validity</option>
                <option value="Spicy">Data Missing</option>
                <option value="Spicy">Spicy</option>
                <option value="Dicy">Dicy</option>
                <option value="Icy">Icy</option>
                <option value="Pricy">Pricy</option>
                <option value="Chameleon">Chameleon</option>
                <option value="Never">Never</option>
                <option value="Junk">Junk</option>
              </select>
            </label>
          </p>
          <br>
          <p>
            <label
              >WhatsApp Transcript / Content : <br />
              <textarea
                style="height: 100px; width: 98%"
                id="WhatsApp-Transcript"
                name="WhatsApp Transcript"
                placeholder="Copy Paste the Replied Content"
              ></textarea>
            </label>
          </p>
          <br>
          <p>
          <label>Next Action : </label>
          <input
            list="nextAction"
            type="text"
            name="Next Action"
            id="Next Action"
            placeholder="Choose Next Action"
          />

          <datalist id="nextAction">
            <option value="Product Demo">Product Demo</option>
            <option value="Follow up Call">Follow up Call</option>
            <option value="Follow up Email">Follow up Email</option>
            <option value="Follow up WhatsApp">Follow up WhatsApp</option>
            <option value="1st Call">1st Call</option>
            <option value="2nd Call">2nd Call</option>
            <option value="3rd Call">3rd Call</option>
            <option value="4th Call">4th Call</option>
            <option value="5th Call">5th Call</option>
            <option value="1st Email">1st Email</option>
            <option value="2nd Email">2nd Email</option>
            <option value="3rd Email">3rd Email</option>
            <option value="4th Email">4th Email</option>
            <option value="5th Email">5th Email</option>
            <option value="1st WhatsApp">1st WhatsApp</option>
            <option value="2nd WhatsApp">2nd WhatsApp</option>
            <option value="3rd WhatsApp">3rd WhatsApp</option>
            <option value="4th WhatsApp">4th WhatsApp</option>
            <option value="5th WhatsApp">5th WhatsApp</option>
          </datalist>
        </p>
          <br>
          <p>
            <label
              >Next Action on :
              <input
                name="Next Action on"
                id="date"
                type="datetime-local"
                required
            /></label>
          </p>
          <br>
          <p>
            <label
              >Next Action by :
              <select name="Next Action by" id="Next Action by" required>
                <option value="" disabled selected>
                  Next Action to be done by
                </option>
                <option value="S. Daniel">S. Daniel</option>
                <option value="Suhas M.">Suhas M.</option>
                <option value="Kanupriya S.">Kanupriya S.</option>
                <option value="Anamika S.">Anamika S.</option>
                <option value="Naveenraj">Naveenraj</option>
              </select>
            </label>
          </p>
        </form>
      </section>
  
      <!------------------------------------------------------------------------------------------------------------------------>
      <br>
      <div class="columnForBasic">
        <button class="button button1" id="copy">Copy</button>
        <button class="button button2" id="reset-template">Reset</button>
        <button class="button button1" id="GenerateINTOBox">Generate</button>
      </div>
      <br />
    </div>
  `
  //   document.body.insertAdjacentElement('beforeend', injectElement)

  //   document.body.insertBefore(injectElement,document.body.firstChild)
  //   document.getElementById('newleft_Notes').before(injectElement)
  //   document.getElementById('newLeftPanel').style.width = "150%"

  try {
    document.getElementById('noteDetails').before(injectElement)
  } catch {
    // new Notification("Not applicable on this page")
    window.alert('Not applicable on this page')
  }
}

document.addEventListener('keydown', evt => {
  if ((evt.key === 'n' || evt.key === 'N') && evt.altKey) {
    try {
      document.getElementById('new-rustyZone-element').remove()
      initforNotes()
    } catch {
      initforNotes()
    }
    // --------------------------------------------- MAIN -----------------------------
    document.getElementById('copy').addEventListener('click', getformDetails)
    document.getElementById('action').addEventListener('change', getOption)
    document
      .getElementById('reset-template')
      .addEventListener('click', resetTemplate)
    document
      .getElementById('GenerateINTOBox')
      .addEventListener('click', pushintoTextBox)

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
        window.open('report.html')
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
      if ((evt.key === 'c' || evt.key === 'C') && evt.shiftKey && evt.altKey) {
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
      document.getElementById('noteContentTxt').value = ''
      document.getElementById('noteContentTxt').style.height = "200px"
      document.getElementById('noteContentTxt').value = queryString
      // document.getElementById('noteContentTxt').scrollIntoView()
      document.getElementById('noteContentTxt').focus()
      document.getElementById('noteContentTxt').select()
      // Crm.trackSpotLightAction('Note Added',{'Version':'NEW UI'})
    }
  }
})

document.addEventListener('keydown', evt => {
  if ((evt.key === 'X' || evt.key === 'x') && evt.altKey && evt.shiftKey) {
    document.getElementById('new-rustyZone-element').remove()
  }
})
