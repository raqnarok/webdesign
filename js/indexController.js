import {IndexModel, isUserLogged} from './indexModel.js';

class IndexController {
    constructor() {
        const registratedUsers = JSON.parse(localStorage.getItem('registratedUsers'));
        const contactsWrapper = document.getElementById('contactsWrapper');

        const indexModel = new IndexModel();
        const currentUser = indexModel.getCurrentUser();
        this.contacts = indexModel.getContacts(currentUser, registratedUsers);
        indexModel.addContactsToHTML(this.contacts, contactsWrapper)

        document.getElementById('form').addEventListener('submit', e => {
            e.preventDefault();

            indexModel.addContact(this.contacts);

            indexModel.clearContactsHTML(contactsWrapper);
            indexModel.addContactsToHTML(this.contacts, contactsWrapper);
        });

        contactsWrapper.addEventListener('click', e => {
            const index = indexModel.getElementIndex(contactsWrapper, e.target);
            const contact = indexModel.getContactData(currentUser, index);

            indexModel.setContactDataToModal(contact);

            document.getElementById('delete-contact').addEventListener('click', ev => {
                indexModel.deleteContact(currentUser, registratedUsers, e.target, index);
            });
        });
    }
}

if(isUserLogged()) {
    new IndexController();
}