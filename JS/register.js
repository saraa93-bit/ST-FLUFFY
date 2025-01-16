document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const role = document.getElementById('role').value;

            ['usernameError', 'emailError', 'passwordError', 'confirmPasswordError'].forEach(id => {
                if (!document.getElementById(id)) {
                    const errorElement = document.createElement('p');
                    errorElement.id = id;
                    errorElement.style.color = 'red';
                    document.getElementById(id.replace('Error', '')).after(errorElement);
                }
                document.getElementById(id).textContent = '';
            });

            let isValid = true;
            if(role == "" || username == "" || email == "" || password == "" || confirmPassword == "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill in all fields!',
                });
            }

            if (username.length < 6 || /[!@#$_-]\d/.test(username)) {
                document.getElementById('usernameError').textContent = 'Username must be at least 6 characters, not contain special characters !@#$_- or numbers';
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById('emailError').textContent = 'Enter a valid email';
                isValid = false;
            }

            if (password.length < 8 || !/[!@#$_-]/.test(password)) {
                document.getElementById('passwordError').textContent = 'Password must be at least 8 characters and contain one special character (@, #, $, _, -)';
                isValid = false;
            }

            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
                isValid = false;
            }

            if (!isValid) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Please fix the errors before submitting!',
                });
                return;
            }

            const user = { username, email, password, role };

            try {
                const response = await fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                });

                if (!response.ok) throw new Error('Error while registering');

                Swal.fire({
                    icon: 'success',
                    title: 'Registered Successfully!',
                    text: 'You will be redirected to the Home page now.',
                    timer: 3000,
                    timerProgressBar: false
                }).then(() => {
                    Swal.fire({
                        title: 'Do you want to log in?',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No'
                    }).then(result => {
                        if (result.isConfirmed) {
                            window.location.href = '../HTML/login.html';
                        } else {
                            window.location.href = '/index.html';
                        }
                    });
                });

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed!',
                    text: error.message
                });
            }
            window.location.href = '/index.html';  
        });
    } 
});
