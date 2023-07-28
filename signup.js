const button = document.getElementById("theButton");
const button1 = document.getElementById("nam");
let useError = document.getElementById("useError");
let passError = document.getElementById("passError");
const button2 = document.getElementById("password");
let PError = document.getElementById("PError");
let AError = document.getElementById("AError");
let EError = document.getElementById("EError");
let Sucess = document.getElementById("scc");
function checkNull() {
  if (button.value !== null)
    return (
      (useError.style.display = "none"),
      (passError.style.display = "none"),
      (PError.style.display = "none"),
      (AError.style.display = "none"),
      (EError.style.display = "none")
    );
}
button.onclick = function (event) {
  event.preventDefault();
  if (button1.value === "")
    return (useError.style.display = "inline"), (button1.onkeyup = checkNull);
  else if (button2.value === "")
    return (passError.style.display = "inline"), (button2.onkeyup = checkNull);
  // console.log(button1.value)
  else if (button.value !== null) return signup();
};

function signup() {
  const data = { name: button1.value, password: button2.value };
  fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "appliction/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        alert("nom");
      }
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      const message = jsonResponse["mess"];
      console.log(message);
      if (message === "An account with this user name already exists")
        return (EError.style.display = "inline"), (button1.onkeyup = checkNull);
      else Sucess.style.display = "inline";
      setTimeout(() => {
        window.location = "/login.html";
      }, 1000);
    })
    .catch((err) => console.error(err));
}
let userToken = JSON.parse(document.cookie);

let accessToken = JSON.parse(document.cookie);

function checkCookie() {
  if (accessToken["user"] !== "") window.location.replace("/dashboard.html");
  // console.log('Red');
}
checkCookie();
