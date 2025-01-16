document.addEventListener('DOMContentLoaded', async () => {
    // تعريف المتغيرات
    const searchBar = document.getElementById('searchBar');
    const resultsDiv = document.getElementById('results');
    const productSection = document.getElementById('product-section');
    const cartCountElement = document.getElementById('cart-count');
    let products = []; // تعريف متغير المنتجات
    let cart = []; // تعريف متغير السلة

    // تحقق من وجود العناصر في الـ DOM
    if (!searchBar || !resultsDiv || !productSection || !cartCountElement) {
        console.error('One or more elements are missing in the DOM. Please check your HTML.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/products');
        products = await response.json();
        displayAllProducts(products); // عرض المنتجات
        loadCartCount(); // تحميل عدد السلة
    } catch (error) {
        console.error('Error while loading products:', error); // رسالة خطأ عند الفشل
    }

    // البحث داخل المنتجات
    searchBar.addEventListener('input', () => {
        const searchQuery = searchBar.value.toLowerCase().trim();
        resultsDiv.innerHTML = '';
        resultsDiv.style.display = 'none';

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery)
        );

        if (filteredProducts.length > 0) {
            resultsDiv.style.display = 'block';
            filteredProducts.forEach(product => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.textContent = product.name;
                resultItem.onclick = () => scrollToProductById(product.id);
                resultsDiv.appendChild(resultItem);
            });
        } else {
            resultsDiv.style.display = 'block';
            resultsDiv.innerHTML = '<div class="result-item">No Result Found</div>';
        }
    });

    // البحث عند الضغط على Enter
    searchBar.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const firstResult = resultsDiv.querySelector('.result-item');
            if (firstResult) {
                const productName = firstResult.textContent;
                const selectedProduct = products.find(product => product.name === productName);
                if (selectedProduct) {
                    scrollToProductById(selectedProduct.id);
                }
            }
        }
    });
});

// عرض جميع المنتجات
function displayAllProducts(products) {
    const productSection = document.getElementById('product-section');
    productSection.innerHTML = ''; 

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.setAttribute('data-id', product.id);
        productItem.innerHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}"/>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">${product.price} L.E</p>
                <button class="btn" onclick="addToCart('${product.id}', '${product.name}', '${product.price}')">Add To Cart</button>
            </div>
        `;
        productSection.appendChild(productItem);
    });
}

// إضافة المنتج إلى السلة
function addToCart(productId, name, price) {
    const product = { id: productId, name, price, quantity: 1 };

    fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        if (response.ok) {
            alert('Product added to cart successfully');
            loadCartCount(); // تحميل عدد السلة
        } else {
            alert('Error adding product to cart');
        }
    })
    .catch(error => console.error('Error adding product to cart:', error)); // رسالة خطأ عند الفشل
}

// تحميل عدد المنتجات في السلة
function loadCartCount() {
    fetch('http://localhost:5000/cart')
        .then(response => response.json())
        .then(cartData => {
            const cartCountElement = document.getElementById('cart-count');
            if (cartCountElement) {
                cartCountElement.textContent = cartData.length;
            }
        })
        .catch(error => console.error('Error loading cart count:', error)); // رسالة خطأ في تحميل عدد السلة
}

// التمرير إلى المنتج عند النقر عليه
function scrollToProductById(productId) {
    const productElement = document.querySelector(`[data-id='${productId}']`);

    if (productElement) {
        productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        productElement.classList.add('highlight');
        setTimeout(() => {
            productElement.classList.remove('highlight');
        }, 3000);
    }
}
