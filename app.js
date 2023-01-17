// let user = document.getElementById('username')
// let pass = document.getElementById('password')
// password = pass.value
// console.log(password)
export const a = 34;
export function all() {
  const button = document.getElementById("theButton");
  const button1 = document.getElementById("nam");
  // const button2 = "charity123"
  let useError = document.getElementById("useError");
  let passError = document.getElementById("passError");
  const button2 = document.getElementById("password");
  let PError = document.getElementById("PError");
  let AError = document.getElementById("AError");
  let bx = ["2"];
  let url = "http://localhost:5000/login";

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
      return (
        (passError.style.display = "inline"), (button2.onkeyup = checkNull)
      );
    // console.log(button1.value)
    else if (button.value !== null) return login();
  };
  function login() {
    const data = { name: button1.value, password: button2.value };
    fetch(url, {
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
        const getLevel = jsonResponse["level"];
        // console.log(getToken);

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

        if (message === "wrong password")
          return (
            (PError.style.display = "inline"), (button2.onkeyup = checkNull)
          );
        else if (message === `user doesn't exist`)
          return (
            (AError.style.display = "inline"), (button1.onkeyup = checkNull)
          );

        let cookieHolder = {
          user: getToken,
          Admin: userToken["Admin"],
        };

        let cookieString = JSON.stringify(cookieHolder);
        console.log(cookieString);
        document.cookie = cookieString;
        if (cookieHolder["user"] !== null)
          window.location = "http://127.0.0.1:5503/dashboard.html?token=";

        // // let obj = JSON.parse(document.cookie)
        // console.log(obj)
        // if (getToken !== null)
        //     document.cookie = getToken
        // if (getToken === document.cookie)
        //     window.location = 'http://127.0.0.1:5503/dashboard.html?token=' + getToken
        // else
        //     window.location = 'http://127.0.0.1:5503/login.html'
      })
      .catch((err) => console.error(err));
  }
}

all();
let accessToken = JSON.parse(document.cookie);
console.log(accessToken);
function checkCookie() {
  if (accessToken["user"] !== "")
    window.location.replace("http://127.0.0.1:5503/dashboard.html");
  // console.log('Red');
}
checkCookie();

//     ,{
//         method: 'POST',
//         mode: 'no-cors',
//         body: JSON.stringify({
//             'username': document.getElementById('username').value,
//             'password': document.getElementById('password').value
//         }),
//         headers: {

//         }

//     })
// }
