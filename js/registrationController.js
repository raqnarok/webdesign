import {RegistrationModel} from './registrationModel.js'
import {RegistrationView} from './registrationView.js'

class RegistrationController {
    constructor() {
        document.getElementById('form').addEventListener('submit', e => {
            e.preventDefault();

            const registrationView = new RegistrationView();
            const showError = registrationView.showError;
            const showSuccess = registrationView.showSuccess;
            
            new RegistrationModel(showError, showSuccess);
        });
    }
}

new RegistrationController();