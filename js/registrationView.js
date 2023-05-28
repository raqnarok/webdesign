
export class RegistrationView {
    constructor() {}

    showError(errorDisplay, inputControl, message) {
        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }

    showSuccess(errorDisplay, inputControl) {
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }
}
