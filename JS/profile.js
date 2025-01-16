document.addEventListener("DOMContentLoaded", async () => {
    const usernameInput = document.querySelector('input[name="username"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirm-password"]');
    const form = document.querySelector('.profile-form');

    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

    if (!loggedInUserEmail) {
        Swal.fire('Error', 'No logged-in user found. Redirecting to login page.', 'error');
        window.location.href = "../HTML/login.html"; // توجيه لصفحة تسجيل الدخول إذا لم يوجد
        return;
    }

    async function fetchUserData() {
        try {
            const response = await fetch('http://localhost:5000/users');
            if (!response.ok) throw new Error('Failed to fetch user data');
            const users = await response.json();

            const user = users.find(u => u.email === loggedInUserEmail);

            if (!user) {
                Swal.fire('Error', 'User not found.', 'error');
                return;
            }

            // ✅ عرض البيانات في الحقول
            usernameInput.value = user.name || '';  // تجنب undefined
            emailInput.value = user.email || '';
            passwordInput.value = user.password || '';
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', 'Error fetching data.', 'error');
        }
    }

    await fetchUserData();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (passwordInput.value !== confirmPasswordInput.value) {
            Swal.fire('Error', 'Passwords do not match.', 'error');
            return;
        }

        try {
            const updatedUser = {
                name: usernameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value.trim()
            };

            const response = await fetch(`http://localhost:5000/users/${loggedInUserEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });

            if (!response.ok) throw new Error('Failed to update user data');

            Swal.fire('Success', 'Profile updated successfully!', 'success');
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', 'Failed to update profile.', 'error');
        }
    });
});
