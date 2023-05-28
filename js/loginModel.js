
export class LoginModel {
    constructor(email, password, emailValue, passwordValue, showError, showSuccess) {
        this.email = email;
        this.password = password;

        this.emailValue = emailValue;
        this.passwordValue = passwordValue;

        this.showError = showError;
        this.showSuccess = showSuccess;
    }

    validateInputs(email, password, emailValue, passwordValue) {
        var emailValid = 0;
        var passwordValid = 0;
        
        if(emailValue === '') {
            this.setError(email, 'Email is required');
        } else if(!this.isValidEmail(emailValue)) {
            this.setError(email, 'Provide a valid email');
        } else {
            emailValid = this.setSuccess(email);
        }
        
        if(passwordValue === '') {
            this.setError(password, 'Email is required');
        } else if(passwordValue.length < 8) {
            this.setError(password, 'Password must be at least 8 character');
        } else {
            passwordValid = this.setSuccess(password);
        }

        if(emailValid && passwordValid) {
            return 1;
        }

        return 0;
    }
    
    checkUser(emailValue, passwordValue) {
        var emailValid = 0;
        var passwordValid = 0;

        var registratedUsers = JSON.parse(localStorage.getItem('registratedUsers'));
        if(registratedUsers == null) {
            alert('First you have to register');
            return 0;
        }
        
        registratedUsers.every((user) => {
            emailValid += this.checkData(emailValue, user.email);
            passwordValid = this.checkData(passwordValue, user.password1);
            
            if(emailValid && passwordValid) {
                this.setCurrentUser(user.email);
                return false;
            }
                
            return true;
        });

        if(!emailValid) {
            this.setError(email, 'Wrong email');
        } else if(emailValid && !passwordValid) {
            this.setError(password, 'Wrong password');
        }

        if(emailValid && passwordValid) {
            return 1;
        }

        return 0;
    }

    checkData(data, validData) {
        if(data === validData) {
            return 1;
        }

        return 0;
    }

    setCurrentUser(email) {
        var registratedUsers = JSON.parse(localStorage.getItem('registratedUsers'));
        
        const currentUser = this.getItemByEmail(registratedUsers, email);
        localStorage.setItem('currentUser', currentUser);
    }

    getItemByEmail(array, email) {
        var item = 0;

        const noItem = array.every((elem) => {
            console.log(elem)
            if(elem.email === email) {
                item = JSON.stringify(elem)
                
                return false;
            }
                
            return true;
        });

        if(Boolean(noItem)) {
            alert("Item is not in the database");
        }

        return item;
    }

    setError(element, message) {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        this.showError(errorDisplay, inputControl, message);

        return 0;
    }
    
    setSuccess(element) {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        this.showSuccess(errorDisplay, inputControl);

        return 1;
    }

    isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    openNextTab() {
        window.location.href = 'index.html';
    }
}
