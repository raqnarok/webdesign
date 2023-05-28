
export class NewUser {
    constructor() {
        this.name = document.getElementById('name');
        this.email = document.getElementById('email');
        this.password1 = document.getElementById('password1');
        this.password2 = document.getElementById('password2');

        this.nameValue = this.name.value.trim();
        this.emailValue = this.email.value.trim();
        this.password1Value = this.password1.value.trim();
        this.password2Value = this.password2.value.trim();

    }
}

export class User {
    constructor(NewUser) {
        this.name = NewUser.nameValue;
        this.email = NewUser.emailValue;
        this.password1 = NewUser.password1Value;
        this.password2 = NewUser.password2Value;

        this.mobileNumber = '';
        this.address = '';
        this.postcode = '';

        this.contacts = [];
    }
}

export class Contact {
    constructor() {
        this.name = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.postcode = '';
    }
}

export function setEmptyCurrentUser() {
    const emptyUser = {
        name: '',
        email: '',
        password1: '',
        password2: '',
    };
    
    localStorage.setItem('currentUser', JSON.stringify(emptyUser));
}
