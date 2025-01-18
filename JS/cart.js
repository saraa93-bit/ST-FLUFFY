document.addEventListener('DOMContentLoaded', function () {
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            window.location.href = 'checkout.html';
        });
    }

    loadCart();
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');

    if (!cartItemsDiv || !totalPriceDiv) {
        console.error('Cart items or total price element not found in the DOM.');
        return;
    }

    cartItemsDiv.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Cart is empty</p>';
        totalPriceDiv.innerHTML = 'Total: 0 L.E';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <div class="caer-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-image-fit">
                    <h4>${item.name}</h4>
                </div>
                <p class="cart-pro-price" >Price: ${item.price} L.E</p>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)">
                <button  class="car-remove" onclick="removeFromCart('${item.id}')">Remove</button>
            `;
            cartItemsDiv.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });
        totalPriceDiv.innerHTML = `Total: ${totalPrice} L.E`;
    }
}

function updateQuantity(productId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Quantity',
            text: 'Please enter a valid quantity (minimum 1).',
        });
        return;
    }

    if (productIndex !== -1) {
        cart[productIndex].quantity = parsedQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    loadCart();
}

function removeFromCart(productId) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to remove this item from the cart?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, remove it',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = cart.filter(item => item.id !== productId);

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            loadCart();

            Swal.fire({
                icon: 'success',
                title: 'Removed',
                text: 'The item has been removed from your cart',
            });
        }
    });
}