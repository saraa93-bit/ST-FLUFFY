document.addEventListener('DOMContentLoaded', function () {
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

    console.log("Logged in user email from localStorage:", loggedInUserEmail);

    

    fetch('http://localhost:5000/users')
        .then(response => response.json())
        .then(users => {
            console.log("Users data from endpoint:", users);

            const user = users.find(u => u.email === loggedInUserEmail);
            console.log("Found user:", user);

            if (!user) {
                console.error("User not found!");
                Swal.fire({
                    icon: 'error',
                    title: 'User Not Found!',
                    text: 'The logged-in user was not found in the database.',
                });
                return;
            }

            document.getElementById('username').value = user.name || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('password').value = user.password || '';
            document.getElementById('confirm-password').value = user.password || '';

            document.getElementById('profile-form').addEventListener('submit', function (event) {
                event.preventDefault();

                user.name = document.getElementById('username').value;
                user.email = document.getElementById('email').value;
                user.password = document.getElementById('password').value;

                localStorage.setItem('loggedInUser', JSON.stringify(user));

                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated!',
                    text: 'Your profile has been updated successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to fetch user data. Please try again later.',
            });
        });
});