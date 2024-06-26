const timePicker = document.getElementById('timepicker');
const dataContainer = document.getElementById('dataContainer');

const insid = dataContainer.getAttribute('data-insid');
const userid = dataContainer.getAttribute('data-userid');
const pets = dataContainer.getAttribute('data-pets');
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
const appbtn = document.getElementById('appointmentButton');
let mymodal = new bootstrap.Modal(document.getElementById('appointmentModal'));
let appmodalclosebtn = document.getElementById('appmodalclose');
let time = [];
let flatpickrInstance;
let disableTimeRanges = [];
let appMap = {};
let disabledDates = [];
let formsub = document.getElementById('appsub');
const reviewform = document.getElementById('reviewform');
reviewform.addEventListener('submit', async function (e) {
 e.preventDefault();
 const review = document.getElementById('review').value.trim();
 const rating = document.getElementById('rating').value;

 if (!review || !rating) {
  const toastText = document.getElementById('toastText');
  toastText.innerText = 'All fields need to be supplied!';
  toastBootstrap.show();
  return;
 }
 reviewform.submit();
 // toastBootstrap.show();
});


const myModalEl = document.getElementById('appointmentModal')
myModalEl.addEventListener('hidden.bs.modal', event => {
 if (flatpickrInstance) {

  flatpickrInstance.clear();

 }
 timePicker.disabled = true;

})

myModalEl.addEventListener('show.bs.modal', event => {
 testPets();
})


formsub.addEventListener('click', async function (e) {
 e.preventDefault();
 let service = [];
 document.querySelectorAll('[data-service]').forEach(checkbox => {
  if (checkbox.checked) {
   service.push(checkbox.value);
  }

 });

 const petid = document.getElementById('petSelect').value;
 const desc = document.getElementById('floatingTextarea2').value.trim();
 let date = document.getElementById('date').value;

 let timesub = document.getElementById('timepicker').value;
 if (!date || !timesub || service.length === 0 || !desc) {
  const toastText = document.getElementById('toastText');
  toastText.innerText = 'All fields need to be supplied!';
  toastBootstrap.show();
  return;

 }
 if (!isValidTime(timesub)) {
  const toastText = document.getElementById('toastText');
  toastText.innerText = 'Invalid Time!';
  toastBootstrap.show();
  return;
 }



 let momentDate = new Date(date);

 const timePicked = moment(timesub, 'h:mm A');
 const hour = timePicked.hours();
 momentDate.setHours(hour);
 const minute = timePicked.minutes();
 momentDate.setMinutes(minute);


 getCheckedOptions();





 let appointmentTime = momentDate;



 let res = await axios.post(`/getapp/makeapp/${insid}`, { appointmentTime, category: service, desc, petid: petid });
 const toastText = document.getElementById('toastText');


 toastText.innerText = 'Appointment has been made! Check your email for confirmation!';

 mymodal.hide();

 toastBootstrap.show();

 setTimeout(function () {
  window.location.href = '/institutionapp/myapp';
 }, 1000);





});

initTimepicker();

async function getnewTime() {
 time = [];
 const applist = await axios.get(`/getapp/ins/${insid}`)
 const applistnuser = await axios.get(`/getapp/user/${userid}`)
 for (const value of applist.data) {
  const appointment_time = new Date(value.appointment_time);
  if (appointment_time >= new Date()) {
   time.push(appointment_time);
  }
 }
 for (const value of applistnuser.data) {
  const appointment_time = new Date(value.appointment_time);
  if (appointment_time >= new Date()) {
   time.push(appointment_time);
  }
 }
}

appbtn.addEventListener('click', async function () {

 await getnewTime();
 time.forEach((value) => {
  if (!appMap[value]) {
   appMap[value] = 0;
  }
  appMap[value]++;

 });
 for (let key in appMap) {
  if (appMap[key] === 16) {
   disabledDates.push(key);
  }
 }

 initialflatpick();
});




async function initialflatpick() {
 if (flatpickrInstance) {
  flatpickrInstance.destroy();

 }





 flatpickrInstance = flatpickr('#date', {
  dateFormat: "m/d/Y",
  disable: disabledDates,
  minDate: "today",

  onChange: async function (selectedDates, dateStr, instance) {
   timePicker.disabled = false;

   await getnewTime();


   await getdisableTimeRanges(selectedDates);

   initTimepicker();


  }
 });
}

async function getdisableTimeRanges(selectedDates) {
 let curDate = new Date(selectedDates[0]);
 let curapp = time.filter((value) => {
  let appDate = new Date(value);
  return appDate.getDate() === curDate.getDate() && appDate.getMonth() === curDate.getMonth() && appDate.getFullYear() === curDate.getFullYear();
 });
 disableTimeRanges = [];

 curapp.forEach((value) => {
  let disabletimedate = new moment(value);
  let appTime = disabletimedate.format('HH:mm');

  disabletimedate.add(30, 'minutes');
  let appTime2 = disabletimedate.format('HH:mm');

  disableTimeRanges.push([appTime, appTime2]);
 });


}

function initTimepicker() {

 $('#timepicker').timepicker('remove');
 $('#timepicker').timepicker({
  'disableTimeRanges': disableTimeRanges,
  'minTime': '9:00am',
  'maxTime': '4:30pm',
  'timeFormat': 'h:i A'
 });
 timePicker.value = '';


}
function getCheckedOptions() {
 const options = [];
 const checkboxes = document.querySelectorAll('.form-check-input');

 checkboxes.forEach(checkbox => {
  if (checkbox.checked) {
   options.push(checkbox.value);
  }
 });
 return options;
}

function testPets() {

 if (!pets) {
  const toastText = document.getElementById('toastText');
  toastText.innerText = 'You need to add a pet first! Redirecting to pet page...';
  toastBootstrap.show();


  setTimeout(function () {
   window.location.href = '/pets';
  }, 2000);

  return;
 }
}

function isValidTime(input) {
 const timearr = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'];
 return timearr.includes(input);
}