function loadCart() {
  fetch('http://localhost:5000/cart')
      .then(response => response.json())
      .then(data => {
          const cartItemsDiv = document.getElementById('cart-items');
          const totalPriceDiv = document.getElementById('total-price');
          cartItemsDiv.innerHTML = '';
          let totalPrice = 0;

          if (data.length === 0) {
              cartItemsDiv.innerHTML = '<p>Cart is empty</p>';
              totalPriceDiv.innerHTML = 'Total: 0 L.E';
          } else {
              data.forEach(item => {
                  const itemElement = document.createElement('div');
                  itemElement.innerHTML = `
                      <h4>${item.name}</h4>
                      <p>Price: ${item.price} L.E</p>
                      <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)">
                      <button onclick="removeFromCart('${item.id}')">Remove</button>
                  `;
                  cartItemsDiv.appendChild(itemElement);
                  totalPrice += item.price * item.quantity;
              });
              totalPriceDiv.innerHTML = `Total: ${totalPrice} L.E`;
          }
      })
      .catch(error => console.error('Error loading cart:', error));
}

function updateQuantity(productId, quantity) {
  fetch(`http://localhost:5000/cart/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: parseInt(quantity) })
  }).then(loadCart);
}

function removeFromCart(productId) {
  fetch(`http://localhost:5000/cart/${productId}`, { method: 'DELETE' })
      .then(loadCart)
      .catch(error => console.error('Error removing product:', error));
}

window.onload = loadCart;
// وظيفة التحويل إلى صفحة العنوان ورقم الهاتف عند الضغط على زر "Checkout"
document.querySelector('.checkout-btn').addEventListener('click', function() {
  window.location.href = 'checkout.html'; // تأكد من أن لديك صفحة checkout.html
});

