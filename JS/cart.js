// cart.js

let products = [];

// Fetch the products from the JSON file
async function loadProducts() {
  try {
    const response = await fetch('products.json'); // Load the products.json file
    products = await response.json(); // Parse the JSON data
    renderProductList(); // Render the product list after the data is fetched
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Function to render product cards
function renderProductCard(product) {
  const productCardHTML = `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <span>$${product.price}</span>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
  return productCardHTML;
}

// Function to render the product list on the page
function renderProductList() {
  const productListHTML = products.map(product => renderProductCard(product)).join('');
  document.getElementById('product-list').innerHTML = productListHTML;
}

// Function to add a product to the cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product); // Add the product to the cart
    renderCart(); // Re-render the cart
  }
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  cart = cart.filter(p => p.id !== productId); // Remove the product from the cart
  renderCart(); // Re-render the cart
}

// Function to render the cart content
function renderCart() {
  const cartItemsHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join('');
  document.getElementById('cart-items').innerHTML = cartItemsHTML;

  // If the cart is empty, show a message
  if (cart.length === 0) {
    document.getElementById('cart-items').innerHTML = '<p>Your cart is empty.</p>';
  }
}

// Function to toggle the cart visibility
function toggleCart() {
  const cartElement = document.getElementById('cart');
  cartElement.style.display = cartElement.style.display === 'none' ? 'block' : 'none';
}

// Function to clear the cart
function clearCart() {
  cart = [];
  renderCart(); // Re-render the cart
}

// Adding event listeners for cart toggle and clearing the cart
document.getElementById('show-cart').addEventListener('click', toggleCart);
document.getElementById('clear-cart').addEventListener('click', clearCart);

// Initialize the product list when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadProducts(); // Load the products from the JSON file
});
