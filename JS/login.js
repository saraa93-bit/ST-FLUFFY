document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.querySelector('input[name="email"]').value;
            const password = document.querySelector('input[name="password"]').value;
            const errorElement = document.getElementById('Error');
            const successMessage = document.getElementById('successMessage');

            try {
                const response = await fetch('../DB/db.json');
                const data = await response.json();

                // التحقق من وجود الإيميل في قاعدة البيانات
                const user = data.users.find(user => user.email === email);

                if (!user) {
                    errorElement.textContent = 'Email not found. Please sign up.'; // رسالة إذا كان الإيميل غير موجود
                    return;
                }

                // التحقق من صحة كلمة المرور
                if (user.password === password) {
                    localStorage.setItem('loggedInUser', JSON.stringify(user));

                    successMessage.textContent = `Successfully logged in as ${user.role}`;
                    setTimeout(() => {
                        if (user.role === 'admin') {
                            window.location.href = '../HTML/admin.html';
                        } else if (user.role === 'customer') {
                            window.location.href = '/index.html';
                            hideLoginButton(); // إخفاء زر تسجيل الدخول
                            showProfileIcon(user); // عرض زر البروفايل
                        } else if (user.role === 'seller') {
                            window.location.href = '/index.html';
                            hideLoginButton(); // إخفاء زر تسجيل الدخول
                            showAddProductButton(user); // عرض زر إضافة منتج
                        }
                    }, 1500);
                } else {
                    errorElement.textContent = 'Incorrect password'; // رسالة إذا كانت كلمة المرور غير صحيحة
                }

            } catch (error) {
                console.error('Error while loading', error);
                errorElement.textContent = 'Error while logging in';
            }
        });
    }

    // دالة لإخفاء زر تسجيل الدخول
    function hideLoginButton() {
        const loginButton = document.getElementById('loginButton'); // تحديد زر تسجيل الدخول باستخدام الـ ID
        if (loginButton) {
            loginButton.style.display = 'none'; // إخفاء الزر
        } else {
            console.error("Login button not found!"); // رسالة خطأ إذا لم يتم العثور على الزر
        }
    }

    // دالة لعرض زر البروفايل
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

    // دالة لعرض زر "Add New Product" عند دخول المستخدم بنوع "seller"
    function showAddProductButton(user) {
        if (user.role === 'seller') {
            const header = document.querySelector('header');
            if (header) {
                const addProductButton = document.createElement('button');
                addProductButton.textContent = 'Add New Product';
                addProductButton.classList.add('btn', 'add-product-btn');

                // عند الضغط على الزر، توجيه المستخدم إلى صفحة seller.html
                addProductButton.addEventListener('click', function () {
                    window.location.href = '../HTML/seller.html';
                });

                // إضافة الزر في الـ header أو في مكان آخر على الصفحة
                header.appendChild(addProductButton);
            }
        }
    }
});