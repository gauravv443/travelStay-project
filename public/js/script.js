
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
if (document.getElementById("map")){
var map = L.map('map').setView([coordinates[1], coordinates[0]], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const marker=L.marker(
  [coordinates[1], coordinates[0]]
).addTo(map);

marker.bindPopup(`
    <b>${hotelTitle}</b><br>
    ${hotelLocation}
`);
  }
const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.innerHTML = "☀️";
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = "🌙";
        }
    });

}