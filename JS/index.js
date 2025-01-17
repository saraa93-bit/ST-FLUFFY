window.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // إخفاء زر تسجيل الدخول إذا كان المستخدم مسجل الدخول
    if (loggedInUser) {
        hideLoginButton();

        // إظهار زر "Add New Product" إذا كان المستخدم من نوع seller
        if (loggedInUser.role === 'seller') {
            showAddProductButton();
        }

        // إظهار أيقونة البروفايل إذا كان المستخدم من نوع customer
        
    }

    // تحميل البيانات من ملف JSON
    fetch('http://localhost:5000/products')
        .then(response => response.json())
        .then(products => {
            // دالة للبحث في البيانات وعرض النتائج
            const searchBar = document.getElementById('searchBar');
            const resultsDiv = document.getElementById('results');

            // استماع لحدث input لتصفية المنتجات حسب النص المدخل
            searchBar.addEventListener('input', () => {
                const searchQuery = searchBar.value.toLowerCase().trim();
                resultsDiv.innerHTML = ''; // مسح النتائج السابقة

                // إخفاء النتائج عندما لا يكون هناك استعلام
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
                        // التوجه إلى صفحة المنتج باستخدام ID
                        resultItem.onclick = () => goToProductPage(product.id);
                        resultsDiv.appendChild(resultItem);
                    });
                } else {
                    resultsDiv.style.display = 'block';
                    resultsDiv.innerHTML = '<div class="result-item">No Result Found</div>';
                }
            });

            // استماع لحدث keypress للتنقل إلى أول منتج عند الضغط على Enter
            searchBar.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    const firstResult = resultsDiv.querySelector('.result-item');
                    if (firstResult) {
                        const productName = firstResult.textContent;
                        const selectedProduct = products.find(product => product.name === productName);
                        if (selectedProduct) {
                            goToProductPage(selectedProduct.id); // التوجه إلى صفحة المنتج
                        }
                    }
                }
            });

            // دالة للتنقل إلى صفحة المنتج باستخدام الـ productId
            function goToProductPage(productId) {
                // التأكد من أن الرابط صحيح:
                window.location.href = `../HTML/product.html?productId=${productId}`;
            }

        })
        .catch(error => console.error('Error loading JSON data:', error));
});

// دالة لإخفاء زر تسجيل الدخول
function hideLoginButton() {
    const loginButton = document.getElementById('loginButton'); // تحديد زر تسجيل الدخول باستخدام الـ ID
    if (loginButton) {
        loginButton.style.display = 'none'; // إخفاء الزر
    } else {
        console.error("Login button not found!"); // رسالة خطأ إذا لم يتم العثور على الزر
    }
}

// دالة لإظهار زر "Add New Product" إذا كان المستخدم من نوع seller
function showAddProductButton() {
    const header = document.querySelector('.header');
    if (header) {
        const addProductButton = document.createElement('button');
        addProductButton.textContent = 'Add New Product';
        addProductButton.classList.add('btn', 'add-product-btn');

        // عند الضغط على الزر، توجيه المستخدم إلى صفحة seller.html
        addProductButton.addEventListener('click', function () {
            window.location.href = '../HTML/seller.html';
        });

        // إضافة الزر في الـ header
        header.appendChild(addProductButton);
    } else {
        console.error('Header element not found');
    }
}

// دالة لإظهار أيقونة البروفايل في الهيدر
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