const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');

const showError = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.className = 'form-control error';
    small.innerText = message;
};

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

const getFieldName = (input) => {
    if (input.id === 'confirmpassword') return 'Confirm password';
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkRequired = (inputArr) => {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            console.log(input.value);
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
};

const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailStr = input.value.trim();
    if (re.test(String(emailStr).toLowerCase())) {
        showSuccess(input);
    } else {
        showError(input, "You've entered an invalid email");
    }
};

const checkLength = (input, min, max) => {
    const strLength = input.value.length;

    if (strLength === 0) return;

    if (strLength < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (strLength > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
};

const checkPasswords = (input1, input2) => {
    const pass1 = input1.value;
    const pass2 = input2.value;

    if(pass1 === pass2) {
        showSuccess(input1);
        showSuccess(input2);
    }else {
        showError(input2, "Confirm password doesn't match")
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([username, email, password, confirmpassword]);

    checkLength(username, 4, 15);
    checkLength(password, 8, 30);

    checkEmail(email);

    checkPasswords(password, confirmpassword);
});
