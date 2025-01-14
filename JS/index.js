window.addEventListener('DOMContentLoaded', () => {
    // قراءة بيانات المستخدم من localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // إذا كان الدور هو "customer" نعرض أيقونة الملف الشخصي
    if (loggedInUser && loggedInUser.role === 'customer') {
        showProfileIcon();  // إظهار الأيقونة فقط إذا كان الدور "customer"
    }
});

// دالة لإظهار الأيقونة في الهيدر
function showProfileIcon() {
    const profileIconContainer = document.createElement('div');
    profileIconContainer.classList.add('profile-icon-container');
    
    profileIconContainer.innerHTML = `
        <a href="HTML/profile.html" id="profileIcon" title="Edit Profile">
            <i class="fa fa-user"></i> Profile
        </a>
    `;
    
    // إضافة الأيقونة إلى الهيدر
    const header = document.querySelector('.header');  // التأكد من أن الهيدر موجود في الصفحة
    const profileContainer = document.getElementById('profileIconContainer');
    if (header && profileContainer) {
        profileContainer.appendChild(profileIconContainer);  // إضافة الأيقونة داخل div المخصص
    } else {
        console.error('Header or profile icon container not found');
    }
}
