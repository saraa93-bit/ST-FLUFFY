async function addUser() {
    try {
        const userName = document.getElementById('userName').value.trim();
        const userEmail = document.getElementById('userEmail').value.trim();
        const userPassword = document.getElementById('userPassword').value.trim();
        const userRole = document.getElementById('userrole').value.trim();

        let isValid = true; 

        if (userName.length < 6) {
            displayError('nameError', 'User Name must be at least 6 characters long');
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(userEmail)) {
            displayError('emailError', 'Invalid email format');
            isValid = false;
        }

        if (userPassword.length < 8) {
            displayError('passwordError', 'Password must be at least 8 characters long');
            isValid = false;
        }

        if (!userRole) {
            displayError('roleError', 'Role is required');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to add this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it',
            cancelButtonText: 'No, Cancel',
        });

        if (result.isConfirmed) {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: userName,
                    email: userEmail,
                    password: userPassword,
                    role: userRole
                })
            });

            const usersResponse = await fetch('http://localhost:5000/users');
            const users = await usersResponse.json();
            renderUsers(users);

            await Swal.fire({
                title: 'Added!',
                text: 'User added successfully!',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true
            });

            setTimeout(() => {
                window.location.href = '../HTML/admin.html';
            }, 1000);

        } else {
            Swal.fire('Cancelled', 'User was not added', 'info');
        }

    } catch (error) {
        console.error('Error adding user:', error);
        Swal.fire('Error', 'There was an error adding the user.', 'error');
    }
}
