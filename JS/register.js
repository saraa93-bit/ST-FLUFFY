document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const role = document.getElementById('role').value;

    if (!username || !email || !password || !confirmPassword) {
        alert('please fill all fields');
        return;
    }
    if (password !== confirmPassword) {
        alert('password does not match');
        return;
    }

    const user = {
        username,
        email,
        password,
        role
    };

    try {
        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('error while registering');
        }

        alert('registered successfully, you will be redirected to login page now');
        window.location.href = '../HTML/login.html'; 

    } catch (error) {
        console.error('error while registering', error);
        alert('error while registering');
    }
});
