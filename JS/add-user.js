async function addUser(event) {
    // منع التحديث الافتراضي للفورم
    event.preventDefault();

    try {
        // أخذ القيم من الحقول
        const userName = document.getElementById('userName').value.trim();
        const userEmail = document.getElementById('userEmail').value.trim();
        const userPassword = document.getElementById('userPassword').value.trim();
        const userRole = document.getElementById('userrole').value.trim();

        let isValid = true; 

        // التحقق من صحة البيانات المدخلة
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
            return; // إيقاف التنفيذ إذا كانت البيانات غير صحيحة
        }

        // التأكد من تنفيذ الكود الصحيح
        console.log('User Data:', {
            name: userName,
            email: userEmail,
            password: userPassword,
            role: userRole
        });

        // عرض نافذة تأكيد
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

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            // جلب المستخدمين بعد إضافة الجديد
            const usersResponse = await fetch('http://localhost:5000/users');
            const users = await usersResponse.json();
            renderUsers(users); // عرض المستخدمين

            // عرض رسالة نجاح
            await Swal.fire({
                title: 'Added!',
                text: 'User added successfully!',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true
            });
            

        } else {
            Swal.fire('Cancelled', 'User was not added', 'info');
        }
        console.log("after redirecting...");


    } catch (error) {
        // التعامل مع الأخطاء
        console.error('Error adding user:', error);
        Swal.fire('Error', 'There was an error adding the user.', 'error');
    }
    console.log("after catch ...");


}

// دالة لعرض الأخطاء أسفل الحقول
function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// دالة لعرض المستخدمين بعد إضافتهم
function renderUsers(users) {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = ''; // مسح البيانات السابقة
    users.forEach(user => {
        const userElement = document.createElement('li');
        userElement.textContent = `${user.name} - ${user.email}`;
        usersList.appendChild(userElement);
    });
}

// إضافة الحدث إلى الفورم
document.getElementById('addUserForm').addEventListener('submit', addUser);
