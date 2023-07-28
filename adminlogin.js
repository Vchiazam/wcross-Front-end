const button = document.getElementById("theButton");
const button1 = document.getElementById("nam");
let useError = document.getElementById("useError");
let passError = document.getElementById("passError");
const button2 = document.getElementById("password");
let PError = document.getElementById("PError");
let AError = document.getElementById("AError");

function checkNull() {
  if (button.value !== null)
    return (
      (useError.style.display = "none"),
      (passError.style.display = "none"),
      (PError.style.display = "none"),
      (AError.style.display = "none")
    );
}
button.onclick = function (event) {
  event.preventDefault();
  if (button1.value === "")
    return (useError.style.display = "inline"), (button1.onkeyup = checkNull);
  else if (button2.value === "")
    return (passError.style.display = "inline"), (button2.onkeyup = checkNull);
  // console.log(button1.value)
  else if (button.value !== null) return login();
};
let b = 1;
function login() {
  const data = { name: button1.value, password: button2.value };
  fetch("http://localhost:5000/admin/login", {
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
      const getToken = jsonResponse["token"];
      const user = jsonResponse["user"];
      const message = jsonResponse["mess"];

      console.log(getToken);

      if (document.cookie === "") {
        let cookieHolder = {
          user: "",
          Admin: "",
        };

        let cookieString = JSON.stringify(cookieHolder);
        console.log(cookieString);
        document.cookie = cookieString;
      }
      let userToken = JSON.parse(document.cookie);
      // b = userToken['user']
      // console.log(b)

      if (message === "wrong password")
        return (PError.style.display = "inline"), (button2.onkeyup = checkNull);
      else if (message === `user doesn't exist`)
        return (AError.style.display = "inline"), (button1.onkeyup = checkNull);

      let cookieHolder = {
        user: userToken["user"],
        Admin: getToken,
      };

      let cookieString = JSON.stringify(cookieHolder);
      console.log(cookieString);
      document.cookie = cookieString;
      if (cookieHolder["user"] != null) window.location = "/admin.html?token=";

      // if (getToken !== null)
      //     document.cookie = getToken
      //     window.location = 'http://127.0.0.1:5503/admin.html?token=' + getToken
    })
    .catch((err) => console.error(err));
}

// all();
let x = document.cookie;
// console.log(x)

function checkCookie() {
  if (x != "null") window.location.replace("/Admin.html");
  // console.log('Red');
}
// checkCookie();
