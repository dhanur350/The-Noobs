window.onload = function () {
    renderCaptcha();
};
function renderCaptcha() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
    console.log(firebase.auth);

}
function phoneAuth() {
    //get the number
    const phoneNumber = document.getElementById('number').value;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            document.getElementById('number').value = "";
            alert("Message sent");
        }).catch((error) => {
            document.getElementById('number').value = "";
            console.log(error);
        });
}
function codeverify() {
    if (!confirmationResult) {
        alert('Please enter mobile number first')
        return;
    }
    var code = document.getElementById('verificationCode').value;
    confirmationResult.confirm(code).then(function (result) {
        document.getElementById('verificationCode').value = "";
        firebase.auth().onAuthStateChanged(function (user) {
            alert("Successfully registered");
            // if (user) {
            //     console.log(user)
            // } else {
            //     console.log(user)
            // }
        });
    }).catch(function (error) {
        document.getElementById('verificationCode').value = "";
        console.log(error.message);
    });
}

const loginBtn = document.querySelector('#login-btn');
loginBtn.addEventListener('click', e => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            console.log('Logged in user!');
        })
        .catch(error => {
            console.log(error.message);
        })
});