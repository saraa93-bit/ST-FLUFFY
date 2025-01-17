document.addEventListener('DOMContentLoaded', function () {
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail'); // جلب إيميل المستخدم المسجل الدخول

    console.log("Logged in user email from localStorage:", loggedInUserEmail); // فحص الإيميل

    if (!loggedInUserEmail) {
        window.location.href = 'login.html'; // إذا لم يكن هناك مستخدم مسجل الدخول، يتم تحويله إلى صفحة تسجيل الدخول
        return;
    }

    // جلب بيانات المستخدم من الـ endpoint
    fetch('http://localhost:5000/users')
        .then(response => response.json())
        .then(users => {
            console.log("Users data from endpoint:", users); // فحص البيانات

            // البحث عن المستخدم المسجل الدخول باستخدام الإيميل
            const user = users.find(u => u.email === loggedInUserEmail);
            console.log("Found user:", user); // فحص المستخدم الذي تم العثور عليه

            if (!user) {
                console.error("User not found!");
                Swal.fire({
                    icon: 'error',
                    title: 'User Not Found!',
                    text: 'The logged-in user was not found in the database.',
                });
                return;
            }

            // تعبئة النموذج ببيانات المستخدم
            document.getElementById('username').value = user.name || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('password').value = user.password || '';
            document.getElementById('confirm-password').value = user.password || '';

            // إضافة حدث لحفظ التغييرات
            document.getElementById('profile-form').addEventListener('submit', function (event) {
                event.preventDefault();

                // تحديث بيانات المستخدم
                user.name = document.getElementById('username').value;
                user.email = document.getElementById('email').value;
                user.password = document.getElementById('password').value;

                // حفظ البيانات المحدثة في localStorage (أو إرسالها إلى الخادم)
                localStorage.setItem('loggedInUser', JSON.stringify(user));

                // عرض رسالة نجاح
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