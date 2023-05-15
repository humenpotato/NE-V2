
window.addEventListener("load", function () {
    document.getElementById('danuser').addEventListener('change', storeDanUserNumber)
})

function storeDanUserNumber() {
    console.log("Setting USER Number")
    let dan_element = document.getElementById('danuser')
    let name = dan_element.getAttribute('name')
    let userNumber = dan_element.value
    localStorage.setItem(name, userNumber)
}
