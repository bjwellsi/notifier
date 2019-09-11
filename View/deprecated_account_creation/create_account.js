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
function unique(field, fieldName) {
    return fetch(`http://localhost:8080/check${fieldName}/?${fieldName}=${field.value}`)
        .then((response) => {
            return response.json()
                .then((data) => {
                    return !data.exists;
                });
        });
}

async function validateUser() {
    return await unique(user, "user");;
}

async function validateEmail() {
    //todo: validate email format
    return await unique(email, "email");
}

function validatePassword() {
    //todo, fill in
    return true;
}

async function validateAll() {
    //I know this is syncronous when it maybe shouldn't be, 
    //but that allows me to display what value is invalid,
    //instead of just saying user, email, or password invalid
    let valid = true;
    if (!await validateUser()) {
        valid = false;
        validUser.innerHTML = "Unavailable!"
    }
    if (!await validateEmail()) {
        valid = false;
        validEmail.innerHTML = "Unavailable!"
    }
    if (!await validatePassword()) {
        valid = false;
        validPass.innerHTML = "Unavailable!"
    }
    return valid;
}

//validate the user on check button click
checkUser.addEventListener("click", () => {
    validateUser().then((ret) => {
        if (ret) {
            validUser.innerHTML = "Available!"
        } else {
            validUser.innerHTML = "Unavailable!"
        }
    })
});

//validate the email on check button click
checkEmail.addEventListener("click", () => {
    validateEmail().then((ret) => {
        if (ret) {
            validEmail.innerHTML = "Available!"
        } else {
            validEmail.innerHTML = "Unavailable!"
        }
    })
});

checkPass.addEventListener("click", () => {
    if (validatePassword()) {
        validPass.innerHTML = "Available!"
    } else {
        validPass.innerHTML = "Unavailable!";
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    //vallidate the user, email, pass, send the data to the server
    validateAll().then((ret) => {
        if (ret) {
            //todo send the form
            console.log("valid form")
            let userData = user.value;
            let emailData = email.value;
            let passData = pass.value;

        } else {
            //reject
            let para = document.createElement('p');
            let node = document.createTextNode('Please enter valid data!');
            para.appendChild(node);
            document.getElementById("main content").appendChild(para);
        }
    })
})