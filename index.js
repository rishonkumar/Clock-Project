const currentTime = document.querySelector("#current-time");
const setHours = document.querySelector("#hours");
const setMinutes = document.querySelector("#minutes");
const setSeconds = document.querySelector("#seconds");
const setAmPm = document.querySelector("#am-pm");
const setAlarmButton = document.querySelector("#submitButton");
const alarmContainer = document.querySelector("#alarms-container");

// Adding Hours, Minutes, Seconds in DropDown Menu
window.addEventListener("DOMContentLoaded", (event) => {
  dropMenu(1, 12, setHours);
  dropMenu(0, 59, setMinutes);
  dropMenu(0, 59, setSeconds);
  setInterval(getCurrentTime, 1000);
  fetchAlarmTime();
});

// Event Listener added to Set Alarm Button
setAlarmButton.addEventListener("click", getInput);

function dropMenu(s, e, object) {
  for (let i = s; i <= e; i++) {
    const dropElement = document.createElement("option");
    dropElement.value = i < 10 ? "0" + i : i;
    dropElement.innerHTML = i < 10 ? "0" + i : i;
    object.appendChild(dropElement);
  }
}

function getCurrentTime() {
  let time = new Date();
  time = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  currentTime.innerHTML = time;
  return time;
}

function getInput(e) {
  e.preventDefault();
  const hourValue = setHours.value;
  const minuteValue = setMinutes.value;
  const secondValue = setSeconds.value;
  const amPmValue = setAmPm.value;

  const alarmTime = convertToTime(
    hourValue,
    minuteValue,
    secondValue,
    amPmValue
  );
  setAlarm(alarmTime);
}
//Convert clock to 24hr type
function convertToTime(hour, minute, second, amPm) {
  return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
}

// Set Alarm function
function setAlarm(time, fetching = false) {
  const alarm = setInterval(() => {
    if (time === getCurrentTime()) {
      alert("Alarm!!!!");
    }
    console.log("running");
  }, 500);

  addAlaram(time, alarm);
  if (!fetching) {
    saveAlarm(time);
  }
}

// Alarms set by user
function addAlaram(time, iD) {
  const alarm = document.createElement("div");
  alarm.classList.add("alarm", "mb", "d-flex");
  alarm.innerHTML = `
              <div class="time">${time}</div>
              <button class="btn delete-alarm" data-id=${iD}>Delete</button>
              `;
  const deleteButton = alarm.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, iD));

  alarmContainer.prepend(alarm);
}

// Is alarms saved in Local Storage
function checkAlarams() {
  let alarms = [];
  const isPresent = localStorage.getItem("alarms");
  if (isPresent) alarms = JSON.parse(isPresent);

  return alarms;
}

// save alarm to local storage
function saveAlarm(time) {
  const alarms = checkAlarams();

  alarms.push(time);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}
// Fetching alarms from local storage
function fetchAlarm() {
  const alarms = checkAlarams();

  alarms.forEach((time) => {
    setAlarm(time, true);
  });
}
// Deleteing Alarm from Local
function deleteAlarm(event, time, iD) {
  const targetElement = event.target;
  clearInterval(iD);
  console.log(time);

  deleteAlarmLocal(time);
  targetElement.parentElement.remove();
}

function deleteAlarmLocal(time) {
  const index = checkAlarams().indexOf(time);
  checkAlarams().splice(index, 1);
  localStorage.setItem("alarms", JSON.stringify(checkAlarams()));
}