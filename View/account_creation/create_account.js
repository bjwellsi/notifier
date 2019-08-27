const user = document.getElementById("username");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
const form = document.getElementById("account info");
const checkUser = document.getElementById("check user");
const checkEmail = document.getElementById("check email");
const checkPass = document.getElementById("check pass");
const validUser = document.getElementById("valid user");
const validEmail = document.getElementById("valid email");
const validPass = document.getElementById("valid pass");

//eventually check the password as valid
//check the username and email as valid 
function unique(field, fieldName){
    fetch(`http://localhost:8080/check${fieldName}/?${fieldName}=${field.value}`)
        .then((response) => {
            response.json()
                .then((data) => {
                    return !data.exists;
                });
        });
}

function validateUser(){
    return unique(user, "user");
}

function validateEmail(){
    //todo: validate email format
    return unique(email, "email");
}

function validatePassword(){
    //todo, fill in
    return true;
}

//validate the user on check button click
checkUser.addEventListener("click", () => {
    if (validateUser()) {
        validUser.innerHTML = "Available!"
    } else{
        validUser.innerHTML = "Unavailable!"
    }
});

//validate the email on check button click
checkEmail.addEventListener("click", () => {
    if (validateEmail()) {
        validEmail.innerHTML = "Available!"
    } else{
        validEmail.innerHTML = "Unavailable!"
    }
});

checkPass.addEventListener("click", () => {
    if(validatePassword()) {
        validPass.innerHTML = "Available!"
    } else {
        validPass.innerHTML = "Unavailable!";
    }
})

form.onsubmit(() => {
    //vallidate the user, email, pass, send the data to the server
    if(validateEmail() && validateUser() && validatePassword()){
        //
    }
})