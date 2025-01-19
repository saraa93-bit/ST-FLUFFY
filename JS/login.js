document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.querySelector('input[name="email"]').value;
            const password = document.querySelector('input[name="password"]').value;
            const errorElement = document.getElementById('Error');
            const successMessage = document.getElementById('successMessage');

            errorElement.textContent = '';
            successMessage.textContent = '';
            successMessage.style.display = 'none';

            if (!email || !password) {
                errorElement.textContent = 'Please fill in all fields.';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorElement.textContent = 'Please enter a valid email address.';
                return;
            }

            if (password.length < 6) {
                errorElement.textContent = 'Password must be at least 6 characters long.';
                return;
            }

            try {
                const response = await fetch('../DB/db.json');
                const data = await response.json();

                const user = data.users.find(user => user.email === email);

                if (!user) {
                    errorElement.textContent = 'Email not found. Please sign up.';
                    return;
                }

                if (user.password === password) {
                    console.log('Login successful as ', user.role);
                    localStorage.setItem('loggedInUser', JSON.stringify(user));

                    successMessage.textContent = `Successfully logged in as ${user.role}`;
                    successMessage.style.display = 'block';
                    console.log('Success message should be visible now');

                    setTimeout(() => {
                        if (user.role === 'admin') {
                            window.location.href = '../HTML/admin.html';
                        } else if (user.role === 'customer') {
                            window.location.href = '/index.html';
                            hideLoginButton();
                            showProfileIcon(user);
                        } else if (user.role === 'seller') {
                            window.location.href = '/index.html';
                            hideLoginButton();
                            showAddProductButton(user);
                        }
                    }, 3000);
                } else {
                    errorElement.textContent = 'Incorrect password';
                }
            } catch (error) {
                console.error('Error while loading', error);
                errorElement.textContent = 'Error while logging in';
            }
        });
    }

    function hideLoginButton() {
        const loginButton = document.getElementById('loginButton');
        if (loginButton) {
            loginButton.style.display = 'none';
        } else {
            console.error("Login button not found!");
        }
    }

    function showProfileIcon(user) {
        if (user.role === 'customer') {
            const profileIconContainer = document.createElement('div');
            profileIconContainer.classList.add('profile-icon-container');

            profileIconContainer.innerHTML = `
                <a href="../HTML/profile.html" id="profileIcon" title="Edit Profile">
                    <i class="fa fa-user"></i> Profile
                </a>
            `;

            const header = document.querySelector('header');
            if (header) {
                header.appendChild(profileIconContainer);
            } else {
                console.error('Header element not found');
            }
        }
    }

    function showAddProductButton(user) {
        if (user.role === 'seller') {
            console.log('User role:', user.role);

            const header = document.querySelector('header');
            if (header) {
                const existingButton = header.querySelector('.add-product-btn');
                if (existingButton) {
                    return;
                }

                const addProductButton = document.createElement('button');
                addProductButton.textContent = 'Add New Product';
                addProductButton.classList.add('btn', 'add-product-btn');

                addProductButton.addEventListener('click', function () {
                    window.location.href = '../HTML/seller.html';
                });

                header.appendChild(addProductButton);
            } else {
                console.error('Header element not found');
            }
        }
    }
});