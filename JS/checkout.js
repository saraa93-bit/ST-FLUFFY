document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        window.location.href = '../HTML/login.html';
        return;
    }

    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;

    document.getElementById('checkout-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const form = document.getElementById('checkout-form');

        const existingMessage = document.getElementById('success-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        if (!phone || !address) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Please fill in all fields correctly.',
            });
            return;
        }

        const order = {
            name: user.name,
            email: user.email,
            phone: phone,
            address: address,
            payment: 'Cash on Delivery',
            items: JSON.parse(localStorage.getItem('cart')) || []
        };

        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        const successMessage = document.createElement('p');
        successMessage.id = 'success-message';
        successMessage.textContent = 'Order placed successfully! You will receive a confirmation email shortly.';
        successMessage.style.color = 'green';
        successMessage.style.marginTop = '10px';
        form.appendChild(successMessage);

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Order Confirmed!',
                text: 'Would you like to return to the homepage or continue shopping?',
                showCancelButton: true,
                confirmButtonText: 'Return to Home',
                cancelButtonText: 'Continue Shopping'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/index.html';
                } else {
                    window.location.href = '../HTML/product.html';
                }
            });
        }, 3000);
    });
});
