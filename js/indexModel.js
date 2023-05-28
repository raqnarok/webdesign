
export function isUserLogged() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(!currentUser || !currentUser.name) {
        window.location.href = 'login.html';
        return 0;
    }

    return 1;
}

export class IndexModel {
    constructor() {
        this.contactCounter = 0;
    }

    getContacts(currentUser) {        
        return currentUser.contacts;
    }

    addContact(contacts) {
        this.contactCounter = 0;
        const newContact = JSON.parse(localStorage.getItem('newContact'));
        if(newContact.name.length) {
            contacts.push(newContact);
            this.sortContacts(contacts);
            
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.contacts = contacts;
            
            const users = JSON.parse(localStorage.getItem('registratedUsers'));
            this.refreshUsersArray(users, currentUser)

            this.setOnLocalStorage(currentUser, users)
        }
    }

    refreshUsersArray(array, refreshedUser) {
        array.forEach((user) => {
            if(user.email === refreshedUser.email) {
                const index = array.indexOf(user);
                array.splice(index, 1);
            }
        });

        array.push(refreshedUser)
    }

    deleteContact(currentUser, registratedUsers, contactElement, index) {
        currentUser.contacts.splice(index, 1);
        if(contactElement.parentNode) {
            contactElement.parentNode.removeChild(contactElement);
        }

        this.setOnLocalStorage(currentUser, registratedUsers);
    }

     getElementIndex(elementsWrapper, element) {
        const nodes = Array.prototype.slice.call(elementsWrapper.childNodes);
        console.log(nodes.indexOf(element))
        return nodes.indexOf(element);
    }

    getContactData(currentUser, index) {
        return currentUser.contacts[index];
    }

    setContactDataToModal(contact) {
        var contactData = document.getElementById('contacts').getElementsByClassName('user-data');

        if(contact) {
            contactData.name.textContent = contact.name;
            contactData.email.textContent = contact.email;
            contactData.mobileNumber.textContent = contact.mobileNumber;
            contactData.address.textContent = contact.address;
            contactData.postcode.textContent = contact.postcode;
        }
    }


    addContactsToHTML(contacts, contactsWrapper) {
        contacts.forEach(contact => {
            const newNameElement = this.createContactContainer(contact.name);
            contactsWrapper.append(newNameElement);
        });
    }

    createContactContainer(name) {
        const container = document.createElement('a');
        container.className = "col-12 name btn btn-lg btn-secondary mb-2";
        container.textContent = name;
        container.value = this.contactCounter;
        this.contactCounter++;
        container.href="#contacts"
        container.setAttribute("data-bs-toggle", "modal");
        return container;
    }

    sortContacts(contacts) {
        contacts.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    clearContactsHTML(contactsWrapper) {
        contactsWrapper.innerHTML = "";
    }

    setOnLocalStorage(currentUser, registratedUsers) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('registratedUsers', JSON.stringify(registratedUsers));
    }

    openNextTab() {
        window.location.href = 'result.html';
    }
}
