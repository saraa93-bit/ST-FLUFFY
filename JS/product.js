let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

document.addEventListener('DOMContentLoaded', async () => {
    const searchBar = document.getElementById('searchBar');
    const resultsDiv = document.getElementById('results');
    const productSection = document.getElementById('product-section');
    const cartCountElement = document.getElementById('cart-count');

    if (!searchBar || !resultsDiv || !productSection || !cartCountElement) {
        console.error('One or more elements are missing in the DOM. Please check your HTML.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) throw new Error('Failed to load products');

        products = await response.json();
        displayAllProducts(products);
        loadCartCount(); 
    } catch (error) {
        console.error('Error while loading products:', error);
    }

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

    document.addEventListener('click', (event) => {
        if (!resultsDiv.contains(event.target) && event.target !== searchBar) {
            resultsDiv.style.display = 'none';
        }
    });
});

function displayAllProducts(products) {
    const productSection = document.getElementById('product-section');
    productSection.innerHTML = '';

    

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.setAttribute('data-id', product.id);
        productItem.innerHTML = `
            <div class="product-card">
                <div class="favorite-icon" onclick="toggleFavorite('${product.id}')">
                     <i class="fas fa-heart"></i>
                </div>
                <img src="${product.image}" alt="${product.name}"/>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">${product.price} L.E</p>
                <button class="btn add-to-cart-btn" onclick="addToCart('${product.id}', '${product.name}', '${product.price}', '${product.image}')">Add to Cart</button>
            </div>
        `;
        productSection.appendChild(productItem);
    });
}

async function addToCart(productId, name, price, image) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartCount();
    Swal.fire('Product successfully added to cart!', '', 'success');
}

function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    cartCountElement.textContent = cartCount;
}

function scrollToProductById(productId) {
    const productElement = document.querySelector(`[data-id='${productId}']`);
    if (productElement) {
        productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        productElement.classList.add('highlight');
        setTimeout(() => productElement.classList.remove('highlight'), 3000);
    }
}
function updateFavoriteIcon(productId, isFavorite) {
    const productElement = document.querySelector(`[data-id='${productId}'] .favorite-icon i`);
    if (productElement) {
        if (isFavorite) {
            productElement.classList.add('active');
        } else {
            productElement.classList.remove('active');
        }
    }
}
function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const product = products.find(item => item.id === productId);

    if (!product) {
        console.error('Product not found');
        return;
    }

    const productIndex = favorites.indexOf(productId);

    if (productIndex !== -1) {
        favorites.splice(productIndex, 1);
        updateFavoriteIcon(productId, false);
        Swal.fire('Product removed from favorites!', '', 'info');
    } else {
        favorites.push(productId);
        updateFavoriteIcon(productId, true);
        Swal.fire('Product added to favorites!', '', 'success');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}


