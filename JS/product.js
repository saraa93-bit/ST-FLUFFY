const searchBar = document.getElementById('searchBar');
const resultsDiv = document.getElementById('results');
const productSection = document.getElementById('product-section');
const cartCountElement = document.getElementById('cart-count');
let products = [];
let cart = [];

window.onload = async function () {
    try {
        const response = await fetch('http://localhost:5000/products');
        products = await response.json();
        displayAllProducts(products);
        loadCartCount();
    } catch (error) {
        console.error('Error while loading products:', error);
    }
};

function displayAllProducts(products) {
    productSection.innerHTML = ''; 
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
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
            loadCartCount();
        } else {
            alert('Error adding product to cart');
        }
    })
    .catch(error => console.error('Error adding product to cart:', error));
}

function loadCartCount() {
    fetch('http://localhost:5000/cart')
        .then(response => response.json())
        .then(cartData => {
            cartCountElement.textContent = cartData.length;
        });
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

function scrollToProductById(productId) {
  const productElement = document.querySelector(`[data-id='${productId}']`);

  if (productElement) {
      productElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
