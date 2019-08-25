const user = document.getElementByID("username");
const email = document.getElementByID("email");
const pass = document.getElementByID("pass");
const form = document.getElementById("account info");
const checkUser = document.getElementById("check user");
const checkEmail = document.getElementById("check email");
const checkPass = document.getElementById("check pass");
const validUser = document.getElementById("valid user");
const validEmail = document.getElementById("valid email");
const validPass = document.getElementById("valid pass");

//^checkPass does nothing for now
//asyncronously check the username and email as valid 
checkUser.addEventListener(onClick, () => {
    fetch('http://localhost:8080/checkUser/?name=' + user.value)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.valid) {
                        validUser.value = "Good!"
                    } 
                });
        });
});
//eventually asyncronously check the password as valid