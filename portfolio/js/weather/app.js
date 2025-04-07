if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", populateTableRows);
} else {
  // DOMContentLoaded has already fired
  populateTableRows();
}
const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
async function populateTableRows() {
  await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Noci,it&units=metric&APPID=bc425ac2188d406c884f4fdd88b339f0"
  )
    .then((response) => {
      if (response.status !== 200) {
        console.log("Error Status Code: " + response.status);
        return;
      }
      response.json().then((data) => {
        // Test if data is being received
        console.log(data);
        let strTableRows = `
        <tr>
            <td><span>Summary</span></td>
            <td>${capitalize(data["weather"][0]["description"])}</td>
        </tr>
        <tr>
            <td><span>Temperature</span></td>
            <td>${data["main"]["temp"] + "°C"}</td>
        </tr>
        <tr>
            <td><span>Humidity</span></td>
            <td>${data["main"]["humidity"] + " %"}</td>
        </tr>
        <tr>
            <td><span>Pressure</span></td>
            <td>${data["main"]["pressure"] + " Pa"}</td>
        </tr>`;
        document.querySelector("#table-weather-dublin tbody").innerHTML =
          strTableRows;
      });
    })
    .catch((error) => {
      // handle any error
    });
}

function change_background() {
  let d = new Date();
  let n = d.getHours();
  // Between 7 AM and 6 PM → use day image
  if (n >= 7 && n <= 18) {
    document.querySelector(".theme-js").style.backgroundImage =
      "url('../assets/img/Noci-View.png')";
  } else {
    // Otherwise → night image
    document.querySelector(".theme-js").style.backgroundImage =
      "url('../assets/img/Noci-Night.jpeg')";
  }
}
change_background();
