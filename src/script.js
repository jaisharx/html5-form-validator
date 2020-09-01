const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');

const showError = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.classList.add('error');
    small.innerText = message;
};

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.classList.add('success');
};

const checkRequired = (inputArr) => {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
};

const getFieldName = (input) => {
    if (input.id === 'confirmpassword') return 'Confirm password';
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([username, email, password, confirmpassword]);
});
