function fetchUserProfile() {
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.id === 1);
            if (user) {
                document.getElementById('username').value = user.username;
                document.getElementById('email').value = user.email;
                document.getElementById('phone').value = user.phone;
            }
        });
}

document.getElementById('editProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const updatedUser = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.id === 1);
            if (user) {
                Object.assign(user, updatedUser);
                console.log('Profile updated:', user);
            }
        });
});

fetchUserProfile();
