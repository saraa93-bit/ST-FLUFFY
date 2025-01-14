window.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser && loggedInUser.role === 'customer') {
        showProfileIcon();
    }
});

function showProfileIcon() {
    const profileIconContainer = document.createElement('div');
    profileIconContainer.classList.add('profile-icon-container');
    
    profileIconContainer.innerHTML = `
        <a href="HTML/profile.html" id="profileIcon" title="Edit Profile">
            <i class="fa fa-user"></i> Profile
        </a>
    `;
    
    const header = document.querySelector('.header');
    const profileContainer = document.getElementById('profileIconContainer');
    if (header && profileContainer) {
        profileContainer.appendChild(profileIconContainer);
    } else {
        console.error('Header or profile icon container not found');
    }
}
