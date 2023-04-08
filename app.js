function countdown(name, year, month, date, hour=0, minute=0){
    const countdownDate = new Date(year, month-1, date, hour, minute, 0);
    let events = JSON.parse(localStorage.getItem("events"));
    events[name] = countdownDate
    localStorage.setItem('events', JSON.stringify(events))
    console.log(localStorage.getItem('events'))
    localStorage.setItem("current", name)
    window.location.reload()
}

function startCountdown(){
    const current = localStorage.getItem('current')
    heading.innerText = 'Countdown to ' + current;
    const theDate = new Date(JSON.parse(localStorage.getItem("events"))[current]).getTime()
    const playCountdown = setInterval(() => {
        let now = new Date().getTime()
        let distance = theDate - now;
        if(distance <=0){
            daysText.innerText = 0;
            hoursText.innerText = 0;
            minutesText.innerText = 0;
            secondsText.innerText = 0;
            heading.innerText = localStorage.getItem('current') + " is here!"
            return;
        }
        let days = Math.floor(distance / (1000*60*60*24))
        let hours = Math.floor((distance - days * (1000*60*60*24)) / (1000*60*60))
        let minutes = Math.floor((distance - (days * (1000*60*60*24)) - (hours * (1000*60*60))) / (1000*60))
        let seconds = Math.floor((distance - (days*1000*60*60*24) - (hours*1000*60*60) - (minutes*1000*60)) / (1000))
        daysText.innerText = days;
        hoursText.innerText = hours;
        minutesText.innerText = minutes;
        secondsText.innerText = seconds;

        if(distance < 0) {
            clearInterval(playCountdown);
            console.log("DONENEEENENEE")
        }
    }, 1001)
}

let form = document.querySelector('#form')
let dateField = document.querySelector('#date')
let timeField = document.querySelector('#time')
let name1 = document.querySelector('#name')
let exit = document.querySelector('#exit');
let dropdown = document.querySelector("#dropdown")
let heading = document.querySelector(".heading")
let hoursText = document.querySelector('#hours')
let daysText = document.querySelector('#days')
let minutesText = document.querySelector('#minutes')
let secondsText = document.querySelector('#seconds')
form.style.display = 'none';

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const [year, month, date] = dateField.value.split("-");
    if(timeField.value){
        const [hour, minute] = timeField.value.split(":")
        countdown(name1.value, year, month, date, hour, minute);
    } else {
        countdown(name1.value, year, month, date)
    }
    
})

let edit = document.querySelector('#edit')
edit.addEventListener('click', () => {
    form.style.display = 'block';
})

exit.addEventListener('click', () => {
    form.style.display = 'none';
})

document.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.getItem("events")){
        localStorage.setItem('events', JSON.stringify({}))
    }
    let events = JSON.parse(localStorage.getItem("events"));
    events['Christmas'] = new Date(2023, 11, 25, 0, 0, 0);
    localStorage.setItem('events', JSON.stringify(events))
    
    // if(events['Christmas'] !== null){
    //     console.log("exists")
    // } else {
    //     console.log('no exists')
    //     events['Christmas'] = new Date(2023, 11, 25, 0, 0, 0);
    //     localStorage.setItem('events', JSON.stringify(events))
    //     localStorage.setItem("current", "Christmas")
    //     setDropdown();
    // }
    let myDates = []
    Object.entries(events).forEach((value, key) => {
        myDates.push({name:value[0], countdownDate:value[1]})
    })
    console.log(myDates)
    for(let i=0; i<myDates.length;i++){
        var element = document.createElement('option')
        element.innerText = myDates[i].name;
        element.dataset.countdownDate = myDates[i].countdownDate;
        dropdown.appendChild(element);
    } 
    setDropdown();
    if(!dropdown.value){
        localStorage.setItem("current", "Christmas")
        setDropdown()
    }
    startCountdown();
    
})

dropdown.addEventListener('change', (e) => {
    localStorage.setItem("current", e.target.value)
    window.location.reload()
})

function setDropdown(){
    dropdown.value = localStorage.getItem("current");
}