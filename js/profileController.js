import {ProfileModel} from './profileModel.js';
import {isUserLogged} from './indexModel.js';

class ProfileController {
    constructor() {
        const registratedUsers = JSON.parse(localStorage.getItem('registratedUsers'));
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        var profileModel = new ProfileModel();
        profileModel.setShowCurrentUser(currentUser);

        document.getElementById('saveProfile').addEventListener('click', function(ev) {
            profileModel.refreshData(registratedUsers, currentUser);
        });

    }
}

if(isUserLogged()) {
    new ProfileController();
}
