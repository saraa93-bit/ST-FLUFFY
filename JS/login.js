function togglePasswordVisibility() {
    const passwordInput = document.querySelector('input[name="password"]');
    const icon = document.querySelector('.toggle-password i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const errorElement = document.getElementById('Error');
    const successMessage = document.getElementById('successMessage');

    try {
        const response = await fetch('../DB/db.json');
        const data = await response.json();

        const user = data.users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            successMessage.textContent = `Successfully logged in as ${user.role}`;
            setTimeout(() => {
                if (user.role === 'admin') {
                    window.location.href = '../HTML/admin.html';
                } else if (user.role === 'customer') {
                    window.location.href = '/index.html';
                    showProfileIcon(user);
                } else if (user.role === 'seller') {
                    window.location.href = '../HTML/seller.html';
                }
            }, 1500);
        } else {
            errorElement.textContent = 'Email or password is incorrect';
        }

    } catch (error) {
        console.error('Error while loading', error);
        errorElement.textContent = 'Error while logging in';
    }
});

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
