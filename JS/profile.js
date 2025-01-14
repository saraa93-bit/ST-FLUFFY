const loadUserData = () => {
    fetch('../data/profile.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users[0];
            document.querySelector('.input-field[name="username"]').value = user.username;
            document.querySelector('.input-field[name="email"]').value = user.email;
            document.querySelector('.input-field[name="password"]').value = user.password;
            document.querySelector('.input-field[name="confirm-password"]').value = user.password;
        })
        .catch(error => console.error('Error loading user data:', error));
};

const saveChanges = () => {
    const username = document.querySelector('.input-field[name="username"]').value;
    const email = document.querySelector('.input-field[name="email"]').value;
    const password = document.querySelector('.input-field[name="password"]').value;
    const confirmPassword = document.querySelector('.input-field[name="confirm-password"]').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const updatedData = {
        id: 1,
        username,
        email,
        password
    };

    fetch('../data/profile.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ users: [updatedData] })
    })
    .then(response => response.json())
    .then(data => {
        console.log('User data updated successfully:', data);
        Swal.fire({
            title: 'Success!',
            text: 'Your profile has been updated.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    })
    .catch(error => console.error('Error saving user data:', error));
};

const confirmSaveChanges = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to save the changes?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            saveChanges();
        }
    });
};

document.addEventListener('DOMContentLoaded', loadUserData);

document.querySelector('.submit-btn').addEventListener('click', (event) => {
    event.preventDefault();
    confirmSaveChanges();
});
