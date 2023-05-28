
export class ProfileModel {
    constructor() {}

    setShowCurrentUser(currentUser) {
        document.getElementById('name').value = currentUser.name;
        document.getElementById('mobileNumber').value = currentUser.mobileNumber;
        document.getElementById('address').value = currentUser.address;
        document.getElementById('email').value = currentUser.email;
        document.getElementById('postcode').value = currentUser.postcode;
    }

    refreshData(registratedUsers, currentUser) {
        this.setCurrentUserData(currentUser);
        this.refreshRegistratedUsersArray(registratedUsers, currentUser) 

        this.setOnLocalStorage(registratedUsers, currentUser);
    }

    setCurrentUserData(currentUser) {
        currentUser.name = document.getElementById("name").value;
        currentUser.mobileNumber = document.getElementById("mobileNumber").value;
        currentUser.address = document.getElementById("address").value;
        currentUser.email = document.getElementById("email").value;
        currentUser.postcode = document.getElementById("postcode").value;
    }

    refreshRegistratedUsersArray(array, refreshedUser) {
        array.forEach((user) => {
            if(user.email === refreshedUser.email) {
                const index = array.indexOf(user);
                array.splice(index, 1);
            }
        });

        array.push(refreshedUser)
    }

    setOnLocalStorage(registratedUsers, currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('registratedUsers', JSON.stringify(registratedUsers));
    }
}
