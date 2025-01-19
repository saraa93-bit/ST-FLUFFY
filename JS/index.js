function hideLoginButton(userRole) {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        if ( userRole === 'seller') {
           
            loginButton.style.display = 'none';
        }
    } else {
        console.error("Login button not found!");
    }
}
function showLogoutButton() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.style.display = 'block';
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedInUser');
            window.location.href = '../HTML/login.html';
        });
    } else {
        console.error("Logout button not found!");
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        hideLoginButton(loggedInUser.role); 
        showLogoutButton(); 

        if (loggedInUser.role === 'seller') {
            showAddProductButton(); 
        }
    } else {
        hideLoginButton('customer');
    }

    fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(products => {
            const searchBar = document.getElementById('searchBar');
            const resultsDiv = document.getElementById('results');

            if (!searchBar || !resultsDiv) {
                console.error('Search bar or results div not found!');
                return;
            }

            searchBar.addEventListener('input', () => {
                const searchQuery = searchBar.value.toLowerCase().trim();
                resultsDiv.innerHTML = '';

                if (searchQuery === '') {
                    resultsDiv.style.display = 'none';
                    return;
                }

                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(searchQuery)
                );

                if (filteredProducts.length > 0) {
                    resultsDiv.style.display = 'block';
                    filteredProducts.forEach(product => {
                        const resultItem = document.createElement('div');
                        resultItem.classList.add('result-item');
                        resultItem.textContent = product.name;
                        resultItem.onclick = () => goToProductPage(product.id);
                        resultsDiv.appendChild(resultItem);
                    });
                } else {
                    resultsDiv.style.display = 'block';
                    resultsDiv.innerHTML = '<div class="result-item">No Result Found</div>';
                }
            });

            searchBar.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    const firstResult = resultsDiv.querySelector('.result-item');
                    if (firstResult) {
                        const productName = firstResult.textContent;
                        const selectedProduct = products.find(product => product.name === productName);
                        if (selectedProduct) {
                            goToProductPage(selectedProduct.id);
                        }
                    }
                }
            });

            function goToProductPage(productId) {
                window.location.href = `../HTML/product.html?productId=${productId}`;
            }
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

function showAddProductButton() {
    const header = document.querySelector('.header');
    if (header) {
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