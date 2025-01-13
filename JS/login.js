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

            if (user.role === 'admin') {
                successMessage.textContent = 'successfully login as an admin';
                setTimeout(() => window.location.href = '../HTML/admin.html', 1500);
            } 
            else if (user.role === 'customer') {
                successMessage.textContent = 'successfully login as a user';
                setTimeout(() => window.location.href = '/index.html', 1500);
            } 
            else if (user.role === 'seller') {
                successMessage.textContent = 'successfully login as a seller';
                setTimeout(() => window.location.href = '../HTML/seller.html', 1500);
            } 
            else {
                errorElement.textContent = 'email or password is incorrect';
            }
        } else {
            errorElement.textContent = 'email or password is incorrect';
        }

    } catch (error) {
        console.error('error while loading', error);
        errorElement.textContent = 'error while login in';
    }
});
